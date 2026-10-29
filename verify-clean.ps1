$files = Get-ChildItem -Path . -Recurse -Include *.html,*.js,*.css,*.md | Where-Object { $_.FullName -notmatch '\\\.git\\' -and $_.Name -ne 'verify-clean.ps1' }

Write-Host "Total files to check: $($files.Count)"

function Check-Pattern([string]$name, [string]$pattern) {
    $found = 0
    foreach ($f in $files) {
        $lines = Select-String -Path $f.FullName -Pattern $pattern -SimpleMatch
        if ($lines) {
            $found += $lines.Count
            foreach ($l in $lines) {
                Write-Host "  [$name] in $($f.Name):$($l.LineNumber)"
            }
        }
    }
    if ($found -eq 0) {
        Write-Host "OK: No '$name' found." -ForegroundColor Green
    } else {
        Write-Warning "FAIL: Found $found instances of '$name'."
    }
}

Check-Pattern "RENT SMARTER, LIVE LIGHTER" "RENT SMARTER, LIVE LIGHTER"
Check-Pattern "Tagline: Rent what you need" 'Tagline: "Rent what you need"'
Check-Pattern "Headphones" "Headphones"
Check-Pattern "headphones" "headphones"
Check-Pattern "Garbled rupee (ASCII \u00e2\u201a\u00b9)" ([char]0x00E2 + [char]0x201A + [char]0x00B9)
Check-Pattern "Garbled eth (ASCII \u00f0)" ([char]0x00F0)
Check-Pattern "Garbled A tilde (\u00c3)" ([char]0x00C3)
Check-Pattern "Garbled quote (\u00e2\u20ac\u2122)" ([char]0x00E2 + [char]0x20AC + [char]0x2122)
Check-Pattern "Garbled degree 360A" ("360" + [char]0x00C2 + [char]0x00B0)
