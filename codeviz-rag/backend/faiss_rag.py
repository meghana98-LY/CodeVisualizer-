import faiss
import numpy as np

from sentence_transformers import SentenceTransformer

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Load FAISS index
index = faiss.read_index("faiss_index.bin")

# Load chunks
with open("chunks.txt", "r", encoding="utf-8") as f:
    content = f.read()

chunks = [
    c.strip()
    for c in content.split("===CHUNK===")
    if c.strip()
]


def search(question, top_k=1):

    # Generate embedding for user question
    q_embedding = model.encode(
        [question]
    ).astype(np.float32)

    # Search FAISS index
    distances, indices = index.search(
        q_embedding,
        top_k
    )

    results = []

    for rank, idx in enumerate(indices[0]):

        results.append({
            "text": chunks[idx],
            "score": float(distances[0][rank])
        })

    return results