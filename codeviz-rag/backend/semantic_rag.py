from sentence_transformers import SentenceTransformer
from knowledge import KNOWLEDGE
import numpy as np

print("Loading embedding model...")

model = SentenceTransformer("all-MiniLM-L6-v2")

documents = []

for item in KNOWLEDGE:
    text = (
        item.get("title", "") + " " +
        item.get("summary", "") + " " +
        " ".join(item.get("points", [])) + " " +
        " ".join(item.get("examples", []))
    )

    documents.append(text)

print("Generating embeddings...")

embeddings = model.encode(documents)

print(f"Loaded {len(documents)} knowledge documents")


def semantic_search(question: str):

    q_embedding = model.encode([question])[0]

    scores = []

    for i, emb in enumerate(embeddings):

        similarity = np.dot(q_embedding, emb) / (
            np.linalg.norm(q_embedding) *
            np.linalg.norm(emb)
        )

        scores.append((similarity, i))

    scores.sort(reverse=True)

    best_index = scores[0][1]

    return KNOWLEDGE[best_index]