@echo off
echo =====================================================
echo  LIUTEX SUMMIT 2026 - Full Stack Startup
echo =====================================================

echo.
echo [0/3] Stopping any existing Node.js servers...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul

echo [1/3] Starting Backend API (port 5000)...
start "Backend API" cmd /k "cd /d "%~dp0backend" && node server.js"

timeout /t 3 >nul

echo [2/3] Starting Dashboard (workflow) on port 5173...
start "Dashboard" cmd /k "cd /d "%~dp0workflow" && npm run dev"

timeout /t 2 >nul

echo [3/3] Starting Conference Website on port 5174...
start "Conference Site" cmd /k "cd /d "%~dp0LIUTEXSUMMIT2026" && npm run dev"

echo.
echo =====================================================
echo  All 3 servers started!
echo.
echo  - Dashboard:    http://localhost:5173
echo  - Website:      http://localhost:5174  
echo  - Backend API:  http://localhost:5000
echo.
echo  LOGIN: username = LIUTEXSUMMIT2026
echo         OTP      = 1234
echo =====================================================
pause
