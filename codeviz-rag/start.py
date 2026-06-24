import subprocess
import time

backend = subprocess.Popen(
"python -m uvicorn main:app --reload --port 8001",
cwd="backend",
shell=True
)

time.sleep(3)

frontend = subprocess.Popen(
"cmd /c npm run dev",
cwd=".",
shell=True
)

print("Frontend and Backend started")

backend.wait()
frontend.wait()
