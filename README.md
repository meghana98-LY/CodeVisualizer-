# CodeViz-RAG

CodeViz-RAG is an AI-powered learning platform for Computer Science and Engineering students. It combines Retrieval-Augmented Generation (RAG), FAISS-based semantic search, Neon PostgreSQL, and Code Visualization to provide interactive learning and interview preparation.

---

## Features

### 1. Engineering Learning Assistant
- Search engineering subjects using natural language.
- Semantic retrieval using FAISS.
- Data stored in Neon PostgreSQL.
- Topic summaries.
- Key points extraction.
- Examples and explanations.

### 2. Code Visualization
- Visualize code execution step-by-step.
- Variable tracking.
- Data structure visualization.
- Frame generation.
- Execution animation.

### 3. 4-Year Engineering Guide
- Year-wise learning roadmap.
- Subject summaries.
- Important concepts.
- Learning resources.

### 4. Interview Preparation
- Company-specific interview questions.
- Coding questions.
- Technical interview preparation.
- Soft skills preparation.

---

## Architecture

```text
React + TypeScript
        |
        ▼
     FastAPI
        |
        ├── Neon PostgreSQL
        │
        └── FAISS Vector Search
                |
                ▼
          Semantic Retrieval
```

---

## Project Structure

```text
codeviz-rag/
│
├── backend/
│   ├── main.py
│   ├── rag.py
│   ├── faiss_rag.py
│   ├── build_index.py
│   ├── database.py
│   ├── code_runner.py
│   ├── migrate_to_neon.py
│   ├── faiss_index.bin
│   ├── chunks.txt
│   └── static/
│
├── src/
│   ├── components/
│   │   ├── company/
│   │   ├── guide/
│   │   ├── rag.tsx
│   │   ├── visualizer.tsx
│   │   └── softskill.tsx
│   │
│   ├── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── style/
│
├── visualizer/
│   ├── core/
│   ├── render/
│   ├── visualizers/
│   └── test_programs/
│
└── README.md
```

---

## Technologies Used

### Frontend
- React
- TypeScript
- CSS

### Backend
- FastAPI
- Python

### Database
- Neon PostgreSQL

### AI / RAG
- FAISS
- Sentence Transformers
- all-MiniLM-L6-v2

### Visualization
- AST Processing
- Execution Tracing
- Frame Rendering

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/codeviz-rag.git

cd codeviz-rag
```

---

### Backend Setup

```bash
cd codeviz-rag/backend

python -m venv venv

venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r ..\requirements.txt
```

---

### Configure Database

Create `.env`

```env
DATABASE_URL=postgresql://username:password@host/neondb?sslmode=require
```

---

### Migrate Data

```bash
python migrate_to_neon.py
```

---

### Build FAISS Index

```bash
python build_index.py
```

---

### Run Backend

```bash
uvicorn main:app --reload --port 8000
```

Backend URL:

```text
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
npm install
npm run dev
```

Front-end URL:

```text
http://localhost:5173
```

---

### Run Frontend and Backend Together

From the repository root (`codeviz-rag`):

```bash
npm install
npm run dev:all
```

This uses `concurrently` to launch the Vite frontend and FastAPI backend in a single terminal.

Frontend URL:

```text
http://localhost:5173
```

Backend URL:

```text
http://127.0.0.1:8000
```

---

## Deploy to Render

A `render.yaml` file is included for a single Docker service deployment.

Steps:

1. Push the repo to GitHub.
2. In Render, create a new service from `render.yaml`.
3. Set `DATABASE_URL` in the service environment.
4. Render will build the React frontend and backend together using the included `Dockerfile`.

The backend will serve the built frontend from the same service.

---

## API Endpoints

### Chat API

```http
POST /api/chat
```

Request:

```json
{
  "message": "database"
}
```

Response:

```json
{
  "answer": "DBMS explanation..."
}
```

---

### Code Visualization API

```http
POST /api/run-code
```

Request:

```json
{
  "source": "print('Hello World')"
}
```

Response:

```json
{
  "frames": [
    "/static/frames/animation.gif"
  ]
}
```

---

## Future Enhancements

- Authentication
- Admin Dashboard
- Auto FAISS Rebuild
- Company Question Database
- Soft Skills Database
- Cloud Deployment
- Multi-Language Support

---

## Author

Computer Science Engineering Project

CodeViz-RAG – AI Powered Engineering Learning Platform