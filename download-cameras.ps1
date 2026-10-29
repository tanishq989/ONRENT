$cameras = @(
    @{
        Url = "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1000&q=80"
        Scratch = "scratch\nikon_z6ii.jpg"
        Outs = @("images\products\dslr\nikon-z6ii-front.webp", "public\images\products\dslr\nikon-z6ii-front.webp")
    },
    @{
        Url = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80"
        Scratch = "scratch\canon_5d_iv.jpg"
        Outs = @("images\products\dslr\canon-5d-iv-front.webp", "public\images\products\dslr\canon-5d-iv-front.webp")
    },
    @{
        Url = "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80"
        Scratch = "scratch\sony_a7iv.jpg"
        Outs = @("images\products\dslr\sony-a7iv-front.webp", "public\images\products\dslr\sony-a7iv-front.webp")
    }
)

foreach ($item in $cameras) {
    try {
        $wc = [System.Net.WebClient]::new()
        $wc.Headers.Add("User-Agent", "Mozilla/5.0")
        $wc.DownloadFile($item.Url, (Resolve-Path "scratch").Path + "\" + [System.IO.Path]::GetFileName($item.Scratch))
        Write-Host "Downloaded: $($item.Scratch)"
    } catch {
        Write-Warning "Download error: $_"
    }
}

$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$port = 9228
$p = Start-Process $edge -ArgumentList "--headless=new", "--remote-debugging-port=$port", "about:blank" -PassThru
Start-Sleep -Seconds 2

try {
    $tab = Invoke-RestMethod -Method Put "http://127.0.0.1:$port/json/new?about:blank"
    $wsUri = [System.Uri]$tab.webSocketDebuggerUrl
    $ws = [System.Net.WebSockets.ClientWebSocket]::new()
    $ct = [System.Threading.CancellationToken]::None
    $ws.ConnectAsync($wsUri, $ct).Wait()

    $msgId = 1
    foreach ($item in $cameras) {
        $scratchPath = "scratch\" + [System.IO.Path]::GetFileName($item.Scratch)
        $bytes = [System.IO.File]::ReadAllBytes((Resolve-Path $scratchPath).Path)
        $b64In = [Convert]::ToBase64String($bytes)
        $dataUri = "data:image/jpeg;base64,$b64In"

        $js = @"
new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(c.toDataURL('image/webp', 0.90));
    };
    img.onerror = (e) => reject('Load error');
    img.src = '$dataUri';
})
"@
        $payload = @{
            id = $msgId++
            method = "Runtime.evaluate"
            params = @{
                expression = $js
                awaitPromise = $true
                returnByValue = $true
            }
        } | ConvertTo-Json -Compress

        $sendBytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
        $ws.SendAsync([System.ArraySegment[byte]]::new($sendBytes), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $ct).Wait()

        $buffer = [byte[]]::new(4 * 1024 * 1024)
        $mem = [System.IO.MemoryStream]::new()
        do {
            $recvSeg = [System.ArraySegment[byte]]::new($buffer)
            $res = $ws.ReceiveAsync($recvSeg, $ct).Result
            $mem.Write($buffer, 0, $res.Count)
        } while (-not $res.EndOfMessage)

        $jsonStr = [System.Text.Encoding]::UTF8.GetString($mem.ToArray())
        $respObj = $jsonStr | ConvertFrom-Json

        if ($respObj.result.result.value -match '^data:image/webp;base64,(.+)$') {
            $webpBytes = [Convert]::FromBase64String($matches[1])
            foreach ($outPath in $item.Outs) {
                $outFull = [System.IO.Path]::GetFullPath($outPath)
                $outDir = [System.IO.Path]::GetDirectoryName($outFull)
                if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }
                [System.IO.File]::WriteAllBytes($outFull, $webpBytes)
                Write-Host "Successfully converted: $outPath ($($webpBytes.Length) bytes)"
            }
        }
    }
    $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "done", $ct).Wait()
} finally {
    Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
}
