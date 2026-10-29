$p = Start-Process "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -ArgumentList "--headless=new", "--remote-debugging-port=9222", "about:blank" -PassThru
Start-Sleep -Seconds 2
try {
    $res = Invoke-RestMethod "http://127.0.0.1:9222/json/version"
    Write-Host "Connected to: $($res.'User-Agent')"
} finally {
    Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
}
