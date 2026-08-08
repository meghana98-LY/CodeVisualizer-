from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from rag import rag_answer
from code_runner import run_and_capture

app = FastAPI()

# -------------------------
# Enable CORS
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Serve static frames
# -------------------------
app.mount("/static", StaticFiles(directory="static"), name="static")

# -------------------------
# Serve frontend build
# -------------------------
frontend_dist = Path(__file__).resolve().parent.parent / "dist"
if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=str(frontend_dist), html=True), name="frontend")
else:
    print("Warning: frontend dist not found. Build the frontend before starting the backend.")

# -------------------------
# Chat RAG API
# -------------------------
@app.post("/api/chat")
async def chat(payload: dict):
    question = payload.get("message", "")
    answer = rag_answer(question)
    return {"answer": answer}

# -------------------------
# Code Visualizer API
# -------------------------
@app.post("/api/run-code")
async def run_code(payload: dict):
    source = payload["source"]

    # Generate the animation GIF
    run_and_capture(source)

    gif_path = "/static/frames/animation.gif"

    # Frontend expects a list called "frames"
    return {
        "frames": [gif_path]
    }
