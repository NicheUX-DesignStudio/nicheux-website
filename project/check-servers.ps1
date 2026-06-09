# Check if servers are running
try {
    $backend = Invoke-RestMethod "http://localhost:3001/api/test" -ErrorAction Stop
    Write-Host "✅ Backend: $($backend.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend not running" -ForegroundColor Red
}

try {
    $frontend = Invoke-WebRequest "http://localhost:5174" -ErrorAction SilentlyContinue
    Write-Host "✅ Frontend is running" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Frontend not running" -ForegroundColor Yellow
}
