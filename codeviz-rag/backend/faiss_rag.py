import faiss
import numpy as np

from sentence_transformers import SentenceTransformer

# -----------------------------
# Load Embedding Model
# -----------------------------

print("Loading embedding model...")

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

# -----------------------------
# Load FAISS Index
# -----------------------------

print("Loading FAISS index...")

index = faiss.read_index(
    "faiss_index.bin"
)

print("FAISS vectors:", index.ntotal)

# -----------------------------
# Load Chunks
# -----------------------------

with open(
    "chunks.txt",
    "r",
    encoding="utf-8"
) as f:

    content = f.read()

chunks = [
    c.strip()
    for c in content.split("===CHUNK===")
    if c.strip()
]

print(f"Loaded {len(chunks)} chunks")

# -----------------------------
# Search Function
# -----------------------------

def search(question, top_k=3):

    q_embedding = model.encode(
        [question]
    ).astype(np.float32)

    distances, indices = index.search(
        q_embedding,
        top_k
    )

    results = []

    for rank, idx in enumerate(indices[0]):

        if idx < 0 or idx >= len(chunks):
            continue

        results.append({
            "text": chunks[idx],
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