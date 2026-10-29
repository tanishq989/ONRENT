# ==============================================================================
# ONRENT - Local Static Web Server (PowerShell HttpListener)
# Runs without Node.js or Python on any Windows machine!
# Serves ONRENT at http://localhost:3000
# ==============================================================================

param(
    [switch]$NoBrowser
)

$port = 3000
$prefix = "http://localhost:$port/"
$baseDir = $PSScriptRoot

Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host "  ONRENT -- Rent what you need (Chhatrapati Sambhajinagar)" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host "Starting local static server on: $prefix" -ForegroundColor Cyan
Write-Host "Document Root: $baseDir" -ForegroundColor Gray
Write-Host "Press Ctrl+C to stop the server anytime.`n" -ForegroundColor Yellow

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Warning "Could not bind to port $port. Trying port 8080..."
    $port = 8080
    $prefix = "http://localhost:$port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($prefix)
    $listener.Start()
}

if (-not $NoBrowser) {
    Start-Process $prefix
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq '/' -or $path -eq '') {
            $path = '/index.html'
        }

        $cleanPath = $path.TrimStart('/').Replace('/', '\')
        $localPath = Join-Path $baseDir $cleanPath

        if (Test-Path $localPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $contentType = 'application/octet-stream'
            if ($ext -eq '.html') { $contentType = 'text/html; charset=utf-8' }
            elseif ($ext -eq '.css') { $contentType = 'text/css; charset=utf-8' }
            elseif ($ext -eq '.js') { $contentType = 'application/javascript; charset=utf-8' }
            elseif ($ext -eq '.json') { $contentType = 'application/json; charset=utf-8' }
            elseif ($ext -eq '.svg') { $contentType = 'image/svg+xml' }
            elseif ($ext -eq '.png') { $contentType = 'image/png' }
            elseif ($ext -eq '.jpg' -or $ext -eq '.jpeg') { $contentType = 'image/jpeg' }
            elseif ($ext -eq '.webp') { $contentType = 'image/webp' }
            elseif ($ext -eq '.ico') { $contentType = 'image/x-icon' }

            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            if ($request.HttpMethod -ne 'HEAD') {
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
            $response.ContentLength64 = $errBytes.Length
            if ($request.HttpMethod -ne 'HEAD') {
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
        }

        $response.Close()
    } catch {
        # Continue serving next requests
    }
}
$listener.Stop()
