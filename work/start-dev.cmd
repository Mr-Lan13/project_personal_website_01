@echo off
cd /d "%~dp0.."
start "lan-portfolio-dev" /b cmd.exe /d /c "npm run dev -- --port 5173 --strictPort > work\vite-dev.log 2>&1"
