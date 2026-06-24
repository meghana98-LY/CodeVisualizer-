import faiss
import numpy as np

from database import cursor
from sentence_transformers import SentenceTransformer

# -----------------------------
# Load Data from Neon
# -----------------------------

cursor.execute("""
SELECT
    title,
    summary,
    points,
    examples
FROM subjects
""")

rows = cursor.fetchall()

KNOWLEDGE = []

for row in rows:

    KNOWLEDGE.append({
        "title": row[0],
        "summary": row[1],
        "points": row[2] or [],
        "examples": row[3] or []
    })

print(f"Loaded {len(KNOWLEDGE)} subjects from Neon")

# -----------------------------
# Load Embedding Model
# -----------------------------

print("Loading embedding model...")

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

# -----------------------------
# Create Chunks
# -----------------------------

chunks = []

for item in KNOWLEDGE:

    title = item.get("title", "")

    chunks.append(
        f"{title}\n{item.get('summary', '')}"
    )

    for point in item.get("points", []):

        chunks.append(
            f"{title}\n{point}"
        )

    for example in item.get("examples", []):

        chunks.append(
            f"{title}\n{example}"
        )

print(f"Total chunks: {len(chunks)}")

# -----------------------------
# Generate Embeddings
# -----------------------------

embeddings = model.encode(
    chunks,
    convert_to_numpy=True
)

embeddings = embeddings.astype(
    np.float32
)

# -----------------------------
# Create FAISS Index
# -----------------------------

dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(
    dimension
)

index.add(embeddings)

# -----------------------------
# Save Index
# -----------------------------

faiss.write_index(
    index,
    "faiss_index.bin"
)

# -----------------------------
# Save Chunks
# -----------------------------

with open(
    "chunks.txt",
    "w",
    encoding="utf-8"
) as f:

    for chunk in chunks:

        f.write(chunk)
        f.write("\n===CHUNK===\n")

print("FAISS index created successfully.")
print("Vectors stored:", index.ntotal)