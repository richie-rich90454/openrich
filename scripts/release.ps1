param(
  [ValidateSet('stable', 'prerelease')]
  [string]$Mode = 'stable',
  [string]$Tag = 'next'
)

$ErrorActionPreference = 'Stop'

if ($Mode -eq 'prerelease') {
  Write-Host "=== Entering prerelease mode (tag: $Tag) ===" -ForegroundColor Cyan
  npm run enter-prerelease -- $Tag
  if ($LASTEXITCODE -ne 0) { throw "enter-prerelease failed" }
}

Write-Host "=== Creating changeset (interactive) ===" -ForegroundColor Cyan
Write-Host "Describe your changes then press Enter to continue." -ForegroundColor Yellow
npm run changeset
if ($LASTEXITCODE -ne 0) { throw "changeset failed" }

Write-Host "=== Applying version bumps ===" -ForegroundColor Cyan
npm run version-packages
if ($LASTEXITCODE -ne 0) { throw "version-packages failed" }

Write-Host "=== Building and publishing ===" -ForegroundColor Cyan
npm run release
if ($LASTEXITCODE -ne 0) { throw "release failed" }

if ($Mode -eq 'prerelease') {
  Write-Host "=== Exiting prerelease mode ===" -ForegroundColor Cyan
  npx changeset pre exit
}

Write-Host "=== Done! ===" -ForegroundColor Green
