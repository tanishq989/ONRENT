$raw = [System.IO.File]::ReadAllText((Resolve-Path "seed-data.js").Path, [System.Text.Encoding]::UTF8)

# Construct garbled character sequences
$garbledRupee = [char]0x00E2 + [char]0x201A + [char]0x00B9
$garbledQuote = [char]0x00E2 + [char]0x20AC + [char]0x2122
$garbledDash  = [char]0x00E2 + [char]0x20AC + [char]0x201D
$garbledDegree = "360" + [char]0x00C2 + [char]0x00B0

$realRupee  = [char]0x20B9
$realDegree = "360" + [char]0x00B0
$realQuote  = "'"
$realDash   = [char]0x2014

$fixed = $raw.Replace($garbledRupee, $realRupee)
$fixed = $fixed.Replace($garbledQuote, $realQuote)
$fixed = $fixed.Replace($garbledDash, $realDash)
$fixed = $fixed.Replace($garbledDegree, $realDegree)
$fixed = $fixed.Replace("HEADPHONES DEPRECATED", "PS5 INCLUDED")

[System.IO.File]::WriteAllText((Resolve-Path "seed-data.js").Path, $fixed, [System.Text.UTF8Encoding]::new($false))
Write-Host "Fixed encoding in seed-data.js"
