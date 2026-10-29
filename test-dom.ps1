$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$port = 9231
$p = Start-Process $edge -ArgumentList '--headless=new', '--remote-debugging-port=9231', 'file:///C:/Users/Tanishq/Desktop/ONRENT/index.html' -PassThru
Start-Sleep -Seconds 3
try {
    $tab = Invoke-RestMethod 'http://127.0.0.1:9231/json'
    $target = $tab | Where-Object { $_.url -match 'index\.html' } | Select-Object -First 1
    $wsUri = [System.Uri]$target.webSocketDebuggerUrl
    $ws = [System.Net.WebSockets.ClientWebSocket]::new()
    $ws.ConnectAsync($wsUri, [System.Threading.CancellationToken]::None).Wait()

    function Eval([string]$js) {
        $req = @{ id = 1; method = 'Runtime.evaluate'; params = @{ expression = $js; returnByValue = $true } } | ConvertTo-Json -Compress
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($req)
        $ws.SendAsync([System.ArraySegment[byte]]::new($bytes), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, [System.Threading.CancellationToken]::None).Wait()
        $buf = [byte[]]::new(1024*1024)
        $res = $ws.ReceiveAsync([System.ArraySegment[byte]]::new($buf), [System.Threading.CancellationToken]::None).Result
        $str = [System.Text.Encoding]::UTF8.GetString($buf, 0, $res.Count)
        return ($str | ConvertFrom-Json).result
    }

    Write-Host "window.AppState:" (Eval 'typeof window.AppState' | ConvertTo-Json -Compress)
    Write-Host "window.ONRENT_SEEDS:" (Eval 'typeof window.ONRENT_SEEDS' | ConvertTo-Json -Compress)
    Write-Host "products count:" (Eval 'window.AppState ? window.AppState.products.length : 0' | ConvertTo-Json -Compress)
    Write-Host "currentScreen:" (Eval 'window.AppState ? window.AppState.currentScreen : "none"' | ConvertTo-Json -Compress)
    Write-Host "viewContainer innerHTML length:" (Eval 'document.getElementById("viewContainer").innerHTML.length' | ConvertTo-Json -Compress)
    Write-Host "hero search width:" (Eval 'document.querySelector(".hero-search-box") ? document.querySelector(".hero-search-box").getBoundingClientRect().width : "no search box"' | ConvertTo-Json -Compress)
    Write-Host "card images count:" (Eval 'document.querySelectorAll(".onrent-img").length' | ConvertTo-Json -Compress)

} finally {
    Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
}
