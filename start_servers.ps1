# Start Backend
Start-Process -NoNewWindow -FilePath "py" -ArgumentList "-m uvicorn main:app --port 8000" -WorkingDirectory "d:\hcareplus\backend"

# Start Frontend
Start-Process -NoNewWindow -FilePath "npm.cmd" -ArgumentList "run dev" -WorkingDirectory "d:\hcareplus\frontend"

Write-Host "HCarePlus servers are starting..."
Write-Host "Frontend: http://localhost:8080"
Write-Host "Backend: http://localhost:8000"
