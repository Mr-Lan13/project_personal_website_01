$ErrorActionPreference = "Stop"
$Message = if ($args.Count -gt 0) { $args -join " " } else { "Update personal website demo" }
git add .
git commit -m $Message
git status --short
