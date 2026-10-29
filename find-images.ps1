$queries = @(
    @{ Term = "Sony Alpha 7 IV"; Target = "Sony_A7_IV" },
    @{ Term = "Sony ILCE-7M4"; Target = "Sony_A7_IV" },
    @{ Term = "Canon EOS R"; Target = "Canon_R50" },
    @{ Term = "MacBook Air"; Target = "MacBook_Air" },
    @{ Term = "iPhone 15"; Target = "iPhone_15" },
    @{ Term = "Marshall"; Target = "Marshall_Speaker" },
    @{ Term = "JBL"; Target = "JBL_Speaker" },
    @{ Term = "Bose"; Target = "Bose_Speaker" }
)

foreach ($q in $queries) {
    try {
        $encoded = [System.Uri]::EscapeDataString($q.Term)
        $api = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=$encoded&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url&format=json"
        $r = Invoke-RestMethod -Uri $api -Headers @{ "User-Agent" = "ONRENTBot/1.0 (contact: test@example.com)" }
        Write-Host "=== Results for: $($q.Term) ==="
        if ($r.query.pages) {
            foreach ($p in $r.query.pages.psobject.Properties) {
                $title = $p.Value.title
                $url = $p.Value.imageinfo[0].url
                Write-Host "  $title"
                Write-Host "    $url"
            }
        } else {
            Write-Host "  No results found"
        }
    } catch {
        Write-Warning "Error searching: $_"
    }
}
