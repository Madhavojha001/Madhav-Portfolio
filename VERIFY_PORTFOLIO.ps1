$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$requiredFiles = @(
    'index.html',
    '404.html',
    'favicon.svg',
    'assets/images/apple-touch-icon.png',
    'site.webmanifest',
    'assets/css/styles.css',
    'assets/js/app.js',
    'assets/images/madhav-ojha.jpg',
    'firebase.json',
    'netlify.toml',
    'vercel.json'
)

Write-Host 'Madhav Ojha Portfolio - Verification' -ForegroundColor Cyan

foreach ($relativePath in $requiredFiles) {
    $fullPath = Join-Path $projectRoot $relativePath
    if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
        throw "Required file is missing: $relativePath"
    }
}
Write-Host '[PASS] Required project files are present.' -ForegroundColor Green

foreach ($jsonFile in @('firebase.json', 'vercel.json', 'site.webmanifest')) {
    Get-Content -LiteralPath (Join-Path $projectRoot $jsonFile) -Raw | ConvertFrom-Json | Out-Null
}
Write-Host '[PASS] JSON configuration files are valid.' -ForegroundColor Green

$achievementDirectory = Join-Path $projectRoot 'assets/images/achievements'
$achievementImages = @(Get-ChildItem -LiteralPath $achievementDirectory -Filter '*.webp' -File)
if ($achievementImages.Count -ne 34) {
    throw "Expected 34 curated achievement images, found $($achievementImages.Count)."
}
Write-Host '[PASS] All 34 curated achievement images are present.' -ForegroundColor Green

$html = Get-Content -LiteralPath (Join-Path $projectRoot 'index.html') -Raw
if ($html -match 'href="#"' -or $html -match 'example\.com' -or $html -match 'TODO|FIXME') {
    throw 'A placeholder link, address, or unfinished marker remains in index.html.'
}

$localReferences = [regex]::Matches($html, '(?:src|href|data-image)="([^"#][^"]*)"') |
    ForEach-Object { $_.Groups[1].Value } |
    Where-Object { $_ -notmatch '^(https?:|mailto:)' } |
    Sort-Object -Unique

foreach ($reference in $localReferences) {
    $normalized = $reference -replace '^\./', ''
    if (-not (Test-Path -LiteralPath (Join-Path $projectRoot $normalized))) {
        throw "Broken local reference: $reference"
    }
}
Write-Host '[PASS] Local links and asset references resolve.' -ForegroundColor Green

$achievementCardCount = ([regex]::Matches($html, 'class="achievement-card')).Count
if ($achievementCardCount -ne 34) {
    throw "Expected 34 achievement cards, found $achievementCardCount."
}
Write-Host '[PASS] Portfolio content and gallery counts are correct.' -ForegroundColor Green

Write-Host ''
Write-Host 'VERIFICATION PASSED - the portfolio is ready to preview or deploy.' -ForegroundColor Green
