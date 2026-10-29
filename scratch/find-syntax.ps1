$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$p = Start-Process $edge -ArgumentList '--headless=new', '--remote-debugging-port=9233', 'file:///C:/Users/Tanishq/Desktop/ONRENT/index.html' -PassThru
Start-Sleep -Seconds 2
try {
    $tab = Invoke-RestMethod 'http://127.0.0.1:9233/json'
    $target = $tab | Where-Object { $_.url -match 'index\.html' } | Select-Object -First 1
    $wsUri = [System.Uri]$target.webSocketDebuggerUrl
    $ws = [System.Net.WebSockets.ClientWebSocket]::new()
    $ws.ConnectAsync($wsUri, [System.Threading.CancellationToken]::None).Wait()

    function Send-Eval([string]$expr) {
        $req = @{ id = 1; method = 'Runtime.evaluate'; params = @{ expression = $expr; returnByValue = $true } } | ConvertTo-Json -Compress
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($req)
        $ws.SendAsync([System.ArraySegment[byte]]::new($bytes), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, [System.Threading.CancellationToken]::None).Wait()
        $buf = [byte[]]::new(1024*1024)
        $res = $ws.ReceiveAsync([System.ArraySegment[byte]]::new($buf), [System.Threading.CancellationToken]::None).Result
        return [System.Text.Encoding]::UTF8.GetString($buf, 0, $res.Count)
    }

    $raw = [System.IO.File]::ReadAllText('seed-data.js', [System.Text.Encoding]::UTF8)
    $res = Send-Eval $raw
    Write-Host "Result:" $res

} finally {
    Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
}
