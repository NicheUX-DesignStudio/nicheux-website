Write-Host "=== DIAGNOSTIC TEST: Frontend Form Submission ===" -ForegroundColor Cyan
Write-Host "Testing if frontend can reach backend..." -ForegroundColor Yellow

# Test 1: Is backend running?
Write-Host "`n1. Checking if backend is running..." -ForegroundColor White
try {
    $health = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method Get -ErrorAction Stop
    Write-Host "   ✅ Backend is running" -ForegroundColor Green
    Write-Host "   Status: $($health.status)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Backend NOT running on port 3001" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Solution: Run 'node server-corrected.js' in another terminal" -ForegroundColor Yellow
}

# Test 2: Can frontend reach backend (CORS test)?
Write-Host "`n2. Testing CORS access from frontend..." -ForegroundColor White
try {
    $corsTest = Invoke-WebRequest -Uri "http://localhost:3001/api/test" -Method Options -ErrorAction Stop
    $corsHeaders = $corsTest.Headers['Access-Control-Allow-Origin']
    Write-Host "   ✅ CORS headers present" -ForegroundColor Green
    Write-Host "   Allowed Origins: $corsHeaders" -ForegroundColor Gray
} catch {
    Write-Host "   ⚠️  CORS preflight check failed" -ForegroundColor Yellow
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
}

# Test 3: Simulate frontend form submission
Write-Host "`n3. Simulating frontend form submission..." -ForegroundColor White
$formData = @{
    name = "Diagnostic Test"
    email = "diagnostic@test.com"
    phone = "+441234567890"
    company = "Diagnostic Corp"
    timeline = "ASAP (1-2 weeks)"
    source = "Direct"
    message = "This is a diagnostic test from PowerShell"
    services = @("Logo Design", "Website Development")
    country = "United Kingdom"
    currency = "£"
    estimateAmount = 1450
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/submit-to-notion" -Method Post -Body $formData -ContentType "application/json"
    Write-Host "   ✅ Backend accepted submission!" -ForegroundColor Green
    Write-Host "   Success: $($response.success)" -ForegroundColor Gray
    Write-Host "   Message: $($response.message)" -ForegroundColor Gray
    if ($response.success) {
        Write-Host "   Notion Page ID: $($response.notionPageId)" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ❌ Backend rejected submission" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host "   Details: $errorBody" -ForegroundColor Red
    }
}

# Test 4: Check your notionService.ts
Write-Host "`n4. Checking frontend service file..." -ForegroundColor White
if (Test-Path "src/services/notionService.ts") {
    $serviceContent = Get-Content "src/services/notionService.ts" -Raw
    if ($serviceContent -match "localhost:3001") {
        Write-Host "   ✅ notionService.ts points to correct backend" -ForegroundColor Green
    } else {
        Write-Host "   ❌ notionService.ts points to WRONG endpoint" -ForegroundColor Red
        Write-Host "   It should call: http://localhost:3001/api/submit-to-notion" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ❌ notionService.ts file not found!" -ForegroundColor Red
}

Write-Host "`n=== DIAGNOSIS COMPLETE ===" -ForegroundColor Cyan
Write-Host "`n🔧 If form still doesn't work:" -ForegroundColor Yellow
Write-Host "1. Open browser DevTools (F12)" -ForegroundColor Gray
Write-Host "2. Go to Network tab" -ForegroundColor Gray
Write-Host "3. Submit form and check:" -ForegroundColor Gray
Write-Host "   - What URL is being called?" -ForegroundColor Gray
Write-Host "   - Is there a CORS error?" -ForegroundColor Gray
Write-Host "   - What's the response?" -ForegroundColor Gray
