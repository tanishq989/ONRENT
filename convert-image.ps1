param(
    [Parameter(Mandatory=$true)][string]$InputFile,
    [Parameter(Mandatory=$true)][string]$OutputFile
)

$inputFull = (Resolve-Path $InputFile).Path
$inputUri = "file:///" + $inputFull.Replace("\", "/")
$converterPath = (Resolve-Path ".\converter.html").Path
$url = "file:///" + $converterPath.Replace("\", "/") + "?src=" + [System.Uri]::EscapeDataString($inputUri)

$tmpOut = [System.IO.Path]::GetTempFileName()

$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
& $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=8000 --run-all-compositor-stages-before-draw --dump-dom $url | Out-File -FilePath $tmpOut -Encoding utf8

$content = [System.IO.File]::ReadAllText($tmpOut)
Remove-Item -Path $tmpOut -ErrorAction SilentlyContinue

if ($content -match '<div id="output">(.*?)</div>') {
    $b64 = $matches[1]
    if ($b64 -like "ERROR:*") {
        Write-Error "Conversion error: $b64"
        exit 1
    }
    if ($b64.Length -gt 100) {
        $bytes = [Convert]::FromBase64String($b64)
        $outFull = [System.IO.Path]::GetFullPath($OutputFile)
        $outDir = [System.IO.Path]::GetDirectoryName($outFull)
        if (-not (Test-Path $outDir)) {
            New-Item -ItemType Directory -Path $outDir -Force | Out-Null
        }
        [System.IO.File]::WriteAllBytes($outFull, $bytes)
        Write-Host "Successfully saved $OutputFile ($($bytes.Length) bytes)"
        exit 0
    }
}
Write-Error "Failed to extract WebP from converter output."
exit 1
