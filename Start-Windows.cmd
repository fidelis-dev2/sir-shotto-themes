@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0desktop\bridge\install-windows.ps1"
if errorlevel 1 (
    echo Could not connect Sir Shotto to Windows. See the message above.
    pause
    exit /b 1
)
where node.exe >nul 2>nul
if errorlevel 1 (
    start "" "%~dp0index.html"
    exit /b 0
)
node desktop\server.mjs
if errorlevel 1 pause
