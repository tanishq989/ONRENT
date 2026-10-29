$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$port = 9226
$p = Start-Process $edge -ArgumentList "--headless=new", "--remote-debugging-port=$port", "about:blank" -PassThru
Start-Sleep -Seconds 2

$tasks = @(
    # PS5 Listings (Requirement 5)
    @{
        In = "C:\Users\Tanishq\.gemini\antigravity-ide\brain\cdad90a3-75ec-4c7f-b61a-9039c2d5aafc\ps5_console_standard_1793177214011.jpg"
        Outs = @("images\products\ps5\ps5-standard-front.webp", "public\images\products\ps5\ps5-standard-front.webp")
    },
    @{
        In = "C:\Users\Tanishq\.gemini\antigravity-ide\brain\cdad90a3-75ec-4c7f-b61a-9039c2d5aafc\ps5_digital_front_1793177750590.jpg"
        Outs = @("images\products\ps5\ps5-digital-front.webp", "public\images\products\ps5\ps5-digital-front.webp")
    },
    @{
        In = "C:\Users\Tanishq\.gemini\antigravity-ide\brain\cdad90a3-75ec-4c7f-b61a-9039c2d5aafc\ps5_slim_front_1793177771318.jpg"
        Outs = @("images\products\ps5\ps5-slim-front.webp", "public\images\products\ps5\ps5-slim-front.webp")
    },
    @{
        In = "C:\Users\Tanishq\.gemini\antigravity-ide\brain\cdad90a3-75ec-4c7f-b61a-9039c2d5aafc\ps5_bundle_front_1793177814459.jpg"
        Outs = @("images\products\ps5\ps5-bundle-front.webp", "public\images\products\ps5\ps5-bundle-front.webp")
    },
    @{
        In = "C:\Users\Tanishq\.gemini\antigravity-ide\brain\cdad90a3-75ec-4c7f-b61a-9039c2d5aafc\ps5_console_angle_setup_1793177854510.jpg"
        Outs = @(
            "images\products\ps5\ps5-standard-angle.webp", "public\images\products\ps5\ps5-standard-angle.webp",
            "images\products\ps5\ps5-digital-angle.webp", "public\images\products\ps5\ps5-digital-angle.webp",
            "images\products\ps5\ps5-slim-angle.webp", "public\images\products\ps5\ps5-slim-angle.webp",
            "images\products\ps5\ps5-bundle-angle.webp", "public\images\products\ps5\ps5-bundle-angle.webp"
        )
    },
    @{
        In = "C:\Users\Tanishq\.gemini\antigravity-ide\brain\cdad90a3-75ec-4c7f-b61a-9039c2d5aafc\ps5_dualsense_controllers_1793177834111.jpg"
        Outs = @(
            "images\products\ps5\ps5-standard-detail.webp", "public\images\products\ps5\ps5-standard-detail.webp",
            "images\products\ps5\ps5-digital-detail.webp", "public\images\products\ps5\ps5-digital-detail.webp",
            "images\products\ps5\ps5-slim-detail.webp", "public\images\products\ps5\ps5-slim-detail.webp",
            "images\products\ps5\ps5-bundle-detail.webp", "public\images\products\ps5\ps5-bundle-detail.webp"
        )
    },
    # Lenses (Fixing wrong images - Lumix, dumplings, car, cinema rig)
    @{
        In = "C:\Users\Tanishq\.gemini\antigravity-ide\brain\cdad90a3-75ec-4c7f-b61a-9039c2d5aafc\canon_rf_70_200_lens_1793177883862.jpg"
        Outs = @(
            "images\products\lenses\canon-70-200-front.webp", "public\images\products\lenses\canon-70-200-front.webp",
            "images\products\lenses\canon-70-200-angle.webp", "public\images\products\lenses\canon-70-200-angle.webp"
        )
    },
    @{
        In = "C:\Users\Tanishq\.gemini\antigravity-ide\brain\cdad90a3-75ec-4c7f-b61a-9039c2d5aafc\sony_fe_24_70_gm_lens_1793177905080.jpg"
        Outs = @(
            "images\products\lenses\sony-24-70-front.webp", "public\images\products\lenses\sony-24-70-front.webp",
            "images\products\lenses\sony-24-70-angle.webp", "public\images\products\lenses\sony-24-70-angle.webp"
        )
    },
    @{
        In = "C:\Users\Tanishq\.gemini\antigravity-ide\brain\cdad90a3-75ec-4c7f-b61a-9039c2d5aafc\nikon_z_50mm_lens_1793177929464.jpg"
        Outs = @(
            "images\products\lenses\nikon-50mm-front.webp", "public\images\products\lenses\nikon-50mm-front.webp",
            "images\products\lenses\nikon-50mm-angle.webp", "public\images\products\lenses\nikon-50mm-angle.webp"
        )
    },
    @{
        In = "C:\Users\Tanishq\.gemini\antigravity-ide\brain\cdad90a3-75ec-4c7f-b61a-9039c2d5aafc\sigma_24_70_art_lens_1793177949916.jpg"
        Outs = @(
            "images\products\lenses\sigma-24-70-front.webp", "public\images\products\lenses\sigma-24-70-front.webp",
            "images\products\lenses\sigma-24-70-angle.webp", "public\images\products\lenses\sigma-24-70-angle.webp"
        )
    },
    # Laptops (Fixing wrong images - Asus, Lenovo, HP showing MacBooks)
    @{
        In = "C:\Users\Tanishq\.gemini\antigravity-ide\brain\cdad90a3-75ec-4c7f-b61a-9039c2d5aafc\asus_zephyrus_g14_1793177976183.jpg"
        Outs = @(
            "images\products\laptops\asus-zephyrus-front.webp", "public\images\products\laptops\asus-zephyrus-front.webp",
            "images\products\laptops\asus-zephyrus-angle.webp", "public\images\products\laptops\asus-zephyrus-angle.webp"
        )
    },
    @{
        In = "C:\Users\Tanishq\.gemini\antigravity-ide\brain\cdad90a3-75ec-4c7f-b61a-9039c2d5aafc\lenovo_thinkpad_t14_1793177996093.jpg"
        Outs = @(
            "images\products\laptops\lenovo-thinkpad-front.webp", "public\images\products\laptops\lenovo-thinkpad-front.webp",
            "images\products\laptops\lenovo-thinkpad-angle.webp", "public\images\products\laptops\lenovo-thinkpad-angle.webp"
        )
    },
    @{
        In = "C:\Users\Tanishq\.gemini\antigravity-ide\brain\cdad90a3-75ec-4c7f-b61a-9039c2d5aafc\hp_envy_x360_1793178019758.jpg"
        Outs = @(
            "images\products\laptops\hp-envy-front.webp", "public\images\products\laptops\hp-envy-front.webp",
            "images\products\laptops\hp-envy-angle.webp", "public\images\products\laptops\hp-envy-angle.webp"
        )
    }
)

try {
    $tab = Invoke-RestMethod -Method Put "http://127.0.0.1:$port/json/new?about:blank"
    $wsUri = [System.Uri]$tab.webSocketDebuggerUrl

    $ws = [System.Net.WebSockets.ClientWebSocket]::new()
    $ct = [System.Threading.CancellationToken]::None
    $ws.ConnectAsync($wsUri, $ct).Wait()

    $msgId = 1
    foreach ($t in $tasks) {
        if (-not (Test-Path $t.In)) {
            Write-Warning "Skipping missing file: $($t.In)"
            continue
        }
        $bytes = [System.IO.File]::ReadAllBytes((Resolve-Path $t.In).Path)
        $b64In = [Convert]::ToBase64String($bytes)
        $ext = [System.IO.Path]::GetExtension($t.In).ToLower().TrimStart('.')
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
            foreach ($outPath in $t.Outs) {
                $outFull = [System.IO.Path]::GetFullPath($outPath)
                $outDir = [System.IO.Path]::GetDirectoryName($outFull)
                if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }
                [System.IO.File]::WriteAllBytes($outFull, $webpBytes)
                Write-Host "Wrote: $outPath ($($webpBytes.Length) bytes)"
            }
        } else {
            Write-Error "Failed converting $($t.In): $($respObj.result.exceptionDetails.exception.description)"
        }
    }

    $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "done", $ct).Wait()
} finally {
    Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
}
