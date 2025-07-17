$keep = "Hp-WVEfoJtL"
$basePath = "C:\Users\Hp\.virtualenvs"

Write-Host "🔍 Scanning virtual environments in $basePath..."
$envs = Get-ChildItem -Directory -Path $basePath

foreach ($env in $envs) {
    if ($env.Name -ne $keep) {
        Write-Host "`n Found: $($env.Name)"
        $confirmation = Read-Host "Do you want to delete this virtual environment? (y/n)"
        if ($confirmation -eq "y") {
            try {
                Remove-Item -Recurse -Force "$basePath\$($env.Name)"
                Write-Host " Deleted: $($env.Name)"
            } catch {
                Write-Host " Failed to delete: $($env.Name). Error: $_"
            }
        } else {
            Write-Host " Skipped: $($env.Name)"
        }
    } else {
        Write-Host "`n Keeping: $($env.Name)"
    }
}

Write-Host "`n Cleanup complete. Only '$keep' should remain if all others were deleted."
