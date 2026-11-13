@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0desktop\bridge\install-windows.ps1"
if errorlevel 1 (
    echo Setup did not complete. Review the message above.
    pause
    exit /b 1
)
echo Windows setup is complete. Return to the gallery and choose Apply, then select Windows.
pause
