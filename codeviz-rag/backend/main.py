from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

import logging
import traceback

# Lazy imports for heavy modules (imported inside handlers to avoid slow startup)


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("backend")

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
backend_static = Path(__file__).resolve().parent / "static"
backend_static.mkdir(parents=True, exist_ok=True)
app.mount("/static", StaticFiles(directory=str(backend_static)), name="static")

# -------------------------
# Simple health endpoint for deploy checks
# -------------------------


@app.get("/api/health")
async def health():
    return {"status": "ok"}


# -------------------------
# Chat RAG API
# -------------------------


@app.post("/api/chat")
async def chat(payload: dict):
    try:
        question = payload.get("message", "")
        logger.info("/api/chat received question: %s", question)
        # lazy import to avoid loading large ML models at startup
        from backend.rag import rag_answer
        answer = rag_answer(question)
        return {"answer": answer}
    except Exception as e:
        logger.error("Error in /api/chat: %s", e)
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": "internal server error"})

# -------------------------
# Code Visualizer API
# -------------------------
@app.post("/api/run-code")
async def run_code(payload: dict):
    try:
        source = payload["source"]

        logger.info("/api/run-code received source (len=%d)", len(source) if source else 0)

        # Generate the animation GIF
        # lazy import so local health checks don't load visualizer code until needed
        from backend.code_runner import run_and_capture
        run_and_capture(source)

        gif_path = "/static/frames/animation.gif"

        # Frontend expects a list called "frames"
        return {"frames": [gif_path]}
    except Exception as e:
        logger.error("Error in /api/run-code: %s", e)
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": "internal server error"})

# -------------------------
# Serve frontend build
# -------------------------
frontend_dist = Path(__file__).resolve().parent.parent / "dist"
if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=str(frontend_dist), html=True), name="frontend")
else:
    print("Warning: frontend dist not found. Build the frontend before starting the backend.")
