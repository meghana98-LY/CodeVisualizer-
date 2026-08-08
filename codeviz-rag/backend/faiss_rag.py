import numpy as np
from pathlib import Path

_model = None
_index = None
_chunks = None


def _load_resources():
    global _model, _index, _chunks

    if _model is not None and _index is not None and _chunks is not None:
        return

    import faiss
    from sentence_transformers import SentenceTransformer

    print("Loading embedding model...")
    _model = SentenceTransformer("all-MiniLM-L6-v2")

    print("Loading FAISS index...")
    index_path = Path(__file__).resolve().parent / "faiss_index.bin"
    _index = faiss.read_index(str(index_path))
    print("FAISS vectors:", _index.ntotal)

    chunks_path = Path(__file__).resolve().parent / "chunks.txt"
    with open(chunks_path, "r", encoding="utf-8") as f:
        content = f.read()

    _chunks = [
        c.strip()
        for c in content.split("===CHUNK===")
        if c.strip()
    ]

    print(f"Loaded {len(_chunks)} chunks")

# -----------------------------
# Search Function
# -----------------------------

def search(question, top_k=3):
    _load_resources()

    q_embedding = _model.encode([question]).astype(np.float32)

    distances, indices = _index.search(q_embedding, top_k)

    results = []

    for rank, idx in enumerate(indices[0]):
        if idx < 0 or idx >= len(_chunks):
            continue

        results.append({
            "text": _chunks[idx],
            "score": float(distances[0][rank])
        })

    return results

# -----------------------------
# Best Topic
# -----------------------------

def best_topic(question):

    results = search(
        question,
        top_k=1
    )

    if not results:
        return None

    chunk = results[0]["text"]

    print("\nRetrieved Chunk:")
    print(chunk[:300])

    lines = chunk.split("\n")

    if not lines:
        return None

    topic = lines[0].strip()

    print("Extracted Topic:", topic)

    return topic