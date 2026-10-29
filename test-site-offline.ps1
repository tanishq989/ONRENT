$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$port = 9229
$p = Start-Process $edge -ArgumentList "--headless=new", "--remote-debugging-port=$port", "--window-size=1440,900", "file:///C:/Users/Tanishq/Desktop/ONRENT/index.html" -PassThru
Start-Sleep -Seconds 3

try {
    $tab = Invoke-RestMethod -Method Get "http://127.0.0.1:$port/json"
    $wsUri = [System.Uri]($tab | Where-Object { $_.url -match 'index\.html' } | Select-Object -First 1).webSocketDebuggerUrl

    $ws = [System.Net.WebSockets.ClientWebSocket]::new()
    $ct = [System.Threading.CancellationToken]::None
    $ws.ConnectAsync($wsUri, $ct).Wait()

    function Exec-JS([string]$expr) {
        $payload = @{
            id = [System.Threading.Interlocked]::Increment([ref]$global:msgId)
            method = "Runtime.evaluate"
            params = @{
                expression = $expr
                awaitPromise = $true
                returnByValue = $true
            }
        } | ConvertTo-Json -Compress

        $bytes = [System.Text.Encoding]::UTF8.GetBytes($payload)
        $ws.SendAsync([System.ArraySegment[byte]]::new($bytes), [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $ct).Wait()

        $buffer = [byte[]]::new(4 * 1024 * 1024)
        $mem = [System.IO.MemoryStream]::new()
        do {
            $recvSeg = [System.ArraySegment[byte]]::new($buffer)
            $res = $ws.ReceiveAsync($recvSeg, $ct).Result
            $mem.Write($buffer, 0, $res.Count)
        } while (-not $res.EndOfMessage)

        $jsonStr = [System.Text.Encoding]::UTF8.GetString($mem.ToArray())
        return ($jsonStr | ConvertFrom-Json).result.result.value
    }

    $global:msgId = 1

    # 1. Check title & general state
    $title = Exec-JS "document.title"
    Write-Host "Page Title: $title"

    # 2. Check for any garbled characters in entire body HTML
    $hasGarbled = Exec-JS @"
    (() => {
        const text = document.body.innerText;
        const issues = [];
        if (/â‚¹|ð|Ã|â€™|360Â°/.test(document.body.innerHTML)) issues.push('Garbled bytes in DOM');
        if (text.includes('Rent smarter, live lighter') || text.includes('RENT SMARTER, LIVE LIGHTER')) issues.push('Found hero tagline');
        if (text.includes('Tagline: "Rent what you need"')) issues.push('Found footer tagline');
        if (/headphones/i.test(text)) issues.push('Found headphones text: ' + text.match(/.*headphones.*/i));
        return issues;
    })()
"@
    Write-Host "Text/Encoding Issues: $($hasGarbled | ConvertTo-Json -Compress)"

    # 3. Check search bar dimensions
    $searchBoxMetrics = Exec-JS @"
    (() => {
        const box = document.querySelector('.hero-search-box');
        const form = document.querySelector('.search-form-grid');
        const product = document.getElementById('heroProductQuery');
        const loc = document.getElementById('heroLocationQuery');
        const dur = document.getElementById('heroDurationSelect');
        const btn = document.getElementById('heroSearchSubmitBtn');
        return {
            boxWidth: box ? box.offsetWidth : 0,
            boxHeight: box ? box.offsetHeight : 0,
            productWidth: product ? product.offsetWidth : 0,
            locWidth: loc ? loc.offsetWidth : 0,
            durWidth: dur ? dur.offsetWidth : 0,
            btnWidth: btn ? btn.offsetWidth : 0
        };
    })()
"@
    Write-Host "Search Box Metrics: $($searchBoxMetrics | ConvertTo-Json -Compress)"

    # 4. Check category chips (Gaming included, Speakers included, no Audio/Headphones)
    $chips = Exec-JS @"
    Array.from(document.querySelectorAll('.category-chip')).map(c => c.innerText.trim())
"@
    Write-Host "Category Chips: $($chips -join ', ')"

    # 5. Check moment tiles
    $moments = Exec-JS @"
    Array.from(document.querySelectorAll('.moment-card')).map(m => ({
        tag: m.querySelector('.moment-tag-pill')?.innerText,
        title: m.querySelector('.moment-card-title')?.innerText,
        desc: m.querySelector('.moment-card-desc')?.innerText,
        hasSvg: !!m.querySelector('svg')
    }))
"@
    Write-Host "Moment Tiles: $($moments | ConvertTo-Json -Compress)"

    # 6. Check all images on Home view
    $homeImages = Exec-JS @"
    Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        loaded: img.complete && img.naturalWidth > 0,
        width: img.naturalWidth,
        height: img.naturalHeight
    }))
"@
    $failedImages = $homeImages | Where-Object { -not $_.loaded }
    Write-Host "Total Home Images: $($homeImages.Count), Broken Images: $($failedImages.Count)"

    # 7. Test Browse view & filter by PS5
    Exec-JS "window.AppState.navigateTo('browse')"
    Start-Sleep -Milliseconds 500

    $browseProducts = Exec-JS @"
    (() => {
        const products = window.AppState.getFilteredProducts();
        return {
            count: products.length,
            ps5Count: products.filter(p => p.productType === 'PS5').length,
            speakersCount: products.filter(p => p.productType === 'Speakers').length,
            firstPS5Price: products.find(p => p.productType === 'PS5')?.dailyPrice,
            firstPS5Deposit: products.find(p => p.productType === 'PS5')?.deposit
        };
    })()
"@
    Write-Host "Browse Products Stats: $($browseProducts | ConvertTo-Json -Compress)"

    # 8. Test Product view for first PS5
    Exec-JS "window.AppState.navigateTo('product', { productId: 'onr-ps5-01' })"
    Start-Sleep -Milliseconds 500

    $productViewCheck = Exec-JS @"
    (() => {
        const title = document.querySelector('.product-title')?.innerText;
        const price = document.querySelector('.product-price-large')?.innerText;
        const deposit = document.querySelector('.product-deposit-pill, .deposit-badge')?.innerText;
        const images = Array.from(document.querySelectorAll('.gallery-thumb img, .product-main-gallery img')).map(i => ({
            src: i.src,
            loaded: i.complete && i.naturalWidth > 0
        }));
        return {
            title,
            price,
            imagesCount: images.length,
            allLoaded: images.every(i => i.loaded)
        };
    })()
"@
    Write-Host "Product View Check (PS5): $($productViewCheck | ConvertTo-Json -Compress)"

    $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "done", $ct).Wait()
} finally {
    Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
}
