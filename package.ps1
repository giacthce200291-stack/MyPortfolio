param(
  [Parameter(Mandatory=$true)]
  [string]$Name
)

$zipName = "Portfolio_Final_$Name.zip"
$root = Get-Location

# Remove existing zip if present
if(Test-Path $zipName){ Remove-Item $zipName -Force }

# Files to include
$items = @(
  "index.html",
  "project1.html",
  "project2.html",
  "project3.html",
  "css",
  "js",
  "images",
  "README.md"
)

# Create zip
Write-Host "Creating $zipName ..."
Add-Type -AssemblyName System.IO.Compression.FileSystem
[IO.Compression.ZipFile]::CreateFromDirectory($root.Path, "$root\$zipName") 2>$null

# Fallback approach: use Compress-Archive if CreateFromDirectory didn't work
if(-not (Test-Path $zipName)){
  Compress-Archive -Path $items -DestinationPath $zipName -Force
}

if(Test-Path $zipName){
  Write-Host "Created $zipName in $root"
} else {
  Write-Error "Failed to create zip. Please run Compress-Archive manually: Compress-Archive -Path $items -DestinationPath $zipName"
}
