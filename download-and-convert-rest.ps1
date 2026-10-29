$downloads = @(
    @{
        Url = "https://upload.wikimedia.org/wikipedia/commons/2/26/Nikon_Z_6II_2.jpg"
        Scratch = "scratch\nikon_z6ii.jpg"
        Outs = @("images\products\dslr\nikon-z6ii-front.webp", "public\images\products\dslr\nikon-z6ii-front.webp")
    },
    @{
        Url = "https://upload.wikimedia.org/wikipedia/commons/2/25/Canon_EOS-5D-Mark-IV-03.jpg"
        Scratch = "scratch\canon_5d_iv.jpg"
        Outs = @("images\products\dslr\canon-5d-iv-front.webp", "public\images\products\dslr\canon-5d-iv-front.webp")
    },
    @{
        Url = "https://upload.wikimedia.org/wikipedia/commons/8/8b/Sony_A7_IV_%28ILCE-7M4%29_-_by_Henry_S%C3%B6derlund_%2851739988735%29.jpg"
        Scratch = "scratch\sony_a7iv.jpg"
        Outs = @("images\products\dslr\sony-a7iv-front.webp", "public\images\products\dslr\sony-a7iv-front.webp")
    },
    @{
        Url = "https://upload.wikimedia.org/wikipedia/commons/e/e4/Canon_EOS_R.jpg"
        Scratch = "scratch\canon_creator_kit.jpg"
        Outs = @("images\products\dslr\canon-creator-kit-front.webp", "public\images\products\dslr\canon-creator-kit-front.webp")
    },
    @{
        Url = "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80"
        Scratch = "scratch\macbook_air_m2.jpg"
        Outs = @("images\products\macbooks\macbook-air-m2-front.webp", "public\images\products\macbooks\macbook-air-m2-front.webp")
    },
    @{
        Url = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80"
        Scratch = "scratch\macbook_air_m1.jpg"
        Outs = @("images\products\macbooks\macbook-air-m1-front.webp", "public\images\products\macbooks\macbook-air-m1-front.webp")
    },
    @{
        Url = "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80"
        Scratch = "scratch\iphone15_promax.jpg"
        Outs = @("images\products\iphones\iphone15-promax-front.webp", "public\images\products\iphones\iphone15-promax-front.webp")
    },
    @{
        Url = "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80"
        Scratch = "scratch\iphone15_pro.jpg"
        Outs = @("images\products\iphones\iphone15-pro-front.webp", "public\images\products\iphones\iphone15-pro-front.webp")
    },
    @{
        Url = "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80"
        Scratch = "scratch\iphone15.jpg"
        Outs = @("images\products\iphones\iphone15-front.webp", "public\images\products\iphones\iphone15-front.webp")
    },
    @{
        Url = "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80"
        Scratch = "scratch\marshall_stanmore.jpg"
        Outs = @("images\products\speakers\marshall-stanmore-front.webp", "public\images\products\speakers\marshall-stanmore-front.webp")
    },
    @{
        Url = "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=80"
        Scratch = "scratch\bose_revolve.jpg"
        Outs = @("images\products\speakers\bose-revolve-front.webp", "public\images\products\speakers\bose-revolve-front.webp")
    },
    @{
        Url = "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80"
        Scratch = "scratch\partybox_speaker.jpg"
        Outs = @("images\products\speakers\partybox-speaker-front.webp", "public\images\products\speakers\partybox-speaker-front.webp")
    },
    @{
        Url = "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=1000&q=80"
        Scratch = "scratch\jbl_boombox3.jpg"
        Outs = @("images\products\speakers\jbl-boombox3-front.webp", "public\images\products\speakers\jbl-boombox3-front.webp")
    }
)

if (-not (Test-Path "scratch")) { New-Item -ItemType Directory -Path "scratch" -Force | Out-Null }

# Download all images
foreach ($item in $downloads) {
    try {
        Write-Host "Downloading: $($item.Url)..."
        $wc = [System.Net.WebClient]::new()
        $wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ONRENT/1.0")
        $wc.DownloadFile($item.Url, (Resolve-Path "scratch").Path + "\" + [System.IO.Path]::GetFileName($item.Scratch))
        Write-Host "Downloaded: $($item.Scratch)"
    } catch {
        Write-Warning "Failed downloading $($item.Url): $_"
    }
}

# Convert with CDP
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$port = 9227
$p = Start-Process $edge -ArgumentList "--headless=new", "--remote-debugging-port=$port", "about:blank" -PassThru
Start-Sleep -Seconds 2

try {
    $tab = Invoke-RestMethod -Method Put "http://127.0.0.1:$port/json/new?about:blank"
    $wsUri = [System.Uri]$tab.webSocketDebuggerUrl

    $ws = [System.Net.WebSockets.ClientWebSocket]::new()
    $ct = [System.Threading.CancellationToken]::None
    $ws.ConnectAsync($wsUri, $ct).Wait()

    $msgId = 1
    foreach ($item in $downloads) {
        $scratchPath = "scratch\" + [System.IO.Path]::GetFileName($item.Scratch)
        if (-not (Test-Path $scratchPath)) {
            Write-Warning "Skipping missing scratch file: $scratchPath"
            continue
        }
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
        } else {
            Write-Error "Failed converting $scratchPath"
        }
    }

    $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "done", $ct).Wait()
} finally {
    Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
}
