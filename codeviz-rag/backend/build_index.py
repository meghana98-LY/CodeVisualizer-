import os
import faiss
import numpy as np

from knowledge import KNOWLEDGE
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

chunks = []

for item in KNOWLEDGE:

    title = item.get("title", "")

    chunks.append(
        f"{title}\n{item.get('summary', '')}"
    )

    for point in item.get("points", []):
        chunks.append(f"{title}\n{point}")

    for example in item.get("examples", []):
        chunks.append(f"{title}\n{example}")

print(f"Total chunks: {len(chunks)}")

embeddings = model.encode(chunks)

embeddings = np.array(
    embeddings,
    dtype=np.float32
)

dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(dimension)

index.add(embeddings)

faiss.write_index(
    index,
    "faiss_index.bin"
)

with open("chunks.txt", "w", encoding="utf-8") as f:
    for chunk in chunks:
        f.write(chunk.replace("\n", " "))
        f.write("\n===CHUNK===\n")

print("FAISS index created successfully.")