param(
    [string]$InputPath,
    [string]$OutputPath
)

$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$port = 9225
$p = Start-Process $edge -ArgumentList "--headless=new", "--remote-debugging-port=$port", "about:blank" -PassThru
Start-Sleep -Seconds 2

try {
    # Create new target
    $tab = Invoke-RestMethod -Method Put "http://127.0.0.1:$port/json/new?about:blank"
    $wsUri = [System.Uri]$tab.webSocketDebuggerUrl

    $ws = [System.Net.WebSockets.ClientWebSocket]::new()
    $ct = [System.Threading.CancellationToken]::None
    $ws.ConnectAsync($wsUri, $ct).Wait()

    # Read input file as base64
    $bytes = [System.IO.File]::ReadAllBytes((Resolve-Path $InputPath).Path)
    $b64In = [Convert]::ToBase64String($bytes)
    $ext = [System.IO.Path]::GetExtension($InputPath).ToLower().TrimStart('.')
    $mime = if ($ext -eq "png") { "image/png" } else { "image/jpeg" }
    $dataUri = "data:$mime;base64,$b64In"

    $js = @"
new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
        const c = document.createElement('canvas');
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(c.toDataURL('image/webp', 0.92));
    };
    img.onerror = (e) => reject('Load error');
    img.src = '$dataUri';
})
"@

    $payload = @{
        id = 1
        method = "Runtime.evaluate"
        params = @{
            expression = $js
            awaitPromise = $true
            returnByValue = $true
        }
    } | ConvertTo-Json -Compress

    $sendBytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
    $segment = [System.ArraySegment[byte]]::new($sendBytes)
    $ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $ct).Wait()

    # Receive result
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
        $outFull = [System.IO.Path]::GetFullPath($OutputPath)
        $outDir = [System.IO.Path]::GetDirectoryName($outFull)
        if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }
        [System.IO.File]::WriteAllBytes($outFull, $webpBytes)
        Write-Host "Successfully generated WebP: $OutputPath ($($webpBytes.Length) bytes)"
    } else {
        Write-Error "Failed: $($respObj.result.exceptionDetails.exception.description)"
    }

    $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "done", $ct).Wait()
} finally {
    Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
}
