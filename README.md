# CodeViz-RAG

CodeViz-RAG is a full-stack educational platform that combines code execution visualization, engineering learning resources, interview preparation content, and a chat interface.

The project helps students understand how programs execute internally by generating visual animations of data structures and program state changes during execution.

---

# Features

## Code Execution Visualizer

Visualizes Python code execution step-by-step using execution tracing.

### Supported Data Structures

* Stack
* Queue
* Linked List
* Binary Tree

### Visualization Pipeline

```text
Python Code
     ↓
Execution Tracer
     ↓
Snapshots
     ↓
Frame Renderer
     ↓
GIF Animation
     ↓
Frontend Viewer
```

### Technologies Used

* Python
* sys.settrace()
* Pillow (PIL)
* FastAPI

---

## RAG Chat

Provides a chat interface for asking programming and engineering-related questions.

### Current Status

* Chat API integrated
* Backend connected
* Placeholder RAG implementation

### Planned Improvements

* FAISS Vector Database
* Semantic Search
* Engineering Notes Retrieval
* LLM Integration

---

## 4-Year Engineering Guide

Provides a structured roadmap for engineering students.

### Includes

* Year-wise study plan
* Core subjects
* Learning resources
* Study notes
* Mini projects

### Years Covered

* First Year
* Second Year
* Third Year
* Fourth Year

---

## Company Interview Preparation

Contains company-wise interview preparation material.

### Includes

* Coding Questions
* Interview Questions
* Explanations
* Complexity Analysis
* Multiple Language Solutions

### Supported Languages

* Python
* Java
* C++
* C

---

## Soft Skills Preparation

Helps students prepare for placement interviews.

### Includes

* HR Questions
* Communication Skills
* Behavioral Questions
* Interview Preparation Tips

---

# Screenshots

## RAG Chat

*Add screenshot here*

## Code Visualizer

*Add screenshot here*

## 4-Year Guide

*Add screenshot here*

## Company Interview Preparation

*Add screenshot here*

---

# System Architecture

```text
CodeViz-RAG
│
├── Frontend (React + TypeScript + Vite)
│
├── Backend (FastAPI)
│
├── Visualizer Engine
│   ├── Tracer
│   ├── Stack Visualizer
│   ├── Queue Visualizer
│   ├── Linked List Visualizer
│   ├── Tree Visualizer
│   ├── Frame Renderer
│   └── Animator
│
├── Guide Module
│
├── Company Module
│
└── Soft Skills Module
```

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* React Router

## Backend

* FastAPI
* Uvicorn

## Visualization Engine

* Python
* Pillow
* sys.settrace()

---

# Project Structure

```text
codeviz-rag/
│
├── backend/
│   ├── main.py
│   ├── rag.py
│   ├── code_runner.py
│   ├── static/
│  
│
├── visualizer/
│   ├── core/
│   ├── render/
│   ├── visualizers/
│   └── run_visualizer.py
│
├── src/
│
├── requirements.txt
├── package.json
├── README.md
└── .gitignore
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd codeviz-rag
```

## Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / Mac

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## Install Frontend Dependencies

```bash
npm install
```

---

# Running the Project

## Start Backend

Open Terminal 1:

```bash
cd backend
python -m uvicorn main:app --reload --port 8001
```

Backend URL:

```text
http://127.0.0.1:8001
```

---

## Start Frontend

Open Terminal 2:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# Production Build

Build the frontend:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# Example Visualization

Example Input:

```python
stack = []

stack.append(10)
stack.append(20)
stack.append(30)
```

Output:

* Execution Trace
* Program Snapshots
* Rendered Frames
* Animated GIF

---

# Future Enhancements

## Real RAG Implementation

* FAISS Integration
* Embedding Generation
* Semantic Search
* Context Retrieval

## Cloud Database

* MongoDB Atlas
* Guide Storage
* Subject Storage
* Company Question Storage

## Deployment

### Frontend

* Vercel

### Backend

* Render
* Railway

### Database

* MongoDB Atlas

---

# Learning Outcomes

This project demonstrates:

* Execution Tracing
* Data Structure Visualization
* FastAPI Backend Development
* React Frontend Development
* Animation Generation
* Full Stack Development
* Retrieval-Augmented Generation Concepts

---

# Author

Developed as an educational platform to help engineering students understand programming concepts, prepare for interviews, and visualize code execution interactively.
