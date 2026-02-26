@echo off
echo =====================================================
echo  SUMMIT 2026 - Full Stack Startup
echo =====================================================

echo.
echo [0/4] Stopping any existing Node.js servers...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul

echo [1/4] Starting Backend API (port 5000)...
start "Backend API" cmd /k "cd /d "%~dp0backend" && node server.js"

timeout /t 3 >nul

echo [2/4] Starting Dashboard (workflow) on port 5173...
start "Dashboard" cmd /k "cd /d "%~dp0workflow" && npm run dev"

timeout /t 2 >nul

echo [3/4] Starting LIUTEX Conference Website on port 5174...
start "LIUTEX Site" cmd /k "cd /d "%~dp0LIUTEXSUMMIT2026" && npm run dev"

timeout /t 2 >nul

echo [4/4] Starting FOOD AGRI Conference Website on port 5175...
start "FOOD AGRI Site" cmd /k "cd /d "%~dp0FOODAGRISUMMIT2026" && npm run dev"

echo.
echo =====================================================
echo  All 4 servers started!
echo.
echo  Dashboard:         http://localhost:5173
echo  LIUTEX Website:    http://localhost:5174  
echo  FOOD AGRI Website: http://localhost:5175
echo  Backend API:       http://localhost:5000
echo.
echo  LOGIN credentials:
echo    LIUTEX:    username = LIUTEXVORTEXSUMMIT2026   OTP = 1234
echo    FOOD AGRI: username = FOODAGRISUMMIT2026       OTP = 1234
echo =====================================================
pause
