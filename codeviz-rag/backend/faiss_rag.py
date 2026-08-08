import numpy as np
from pathlib import Path
import re

_model = None
_index = None
_chunks = None
_failed_load = False
_tfidf_vect = None
_tfidf_matrix = None
_tfidf_chunks = None


def _load_resources():
    global _model, _index, _chunks

    if _model is not None and _index is not None and _chunks is not None:
        return

    if _failed_load:
        # previous attempt failed (likely OOM); skip reloading
        return

    try:
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
    except MemoryError as me:
        # Likely OOM on Render; mark as failed and surface a friendly message later
        print("MemoryError while loading FAISS/model:", me)
        _failed_load = True
    except Exception as e:
        print("Error loading FAISS resources:", e)
        _failed_load = True

# -----------------------------
# Search Function
# -----------------------------

def search(question, top_k=3):
    _load_resources()

    if _failed_load or _model is None or _index is None:
        # resources couldn't be loaded (OOM or other error) — return no results
        return []

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


def _build_tfidf_index():
    global _tfidf_vect, _tfidf_matrix, _tfidf_chunks

    if _tfidf_matrix is not None and _tfidf_vect is not None:
        return

    try:
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.metrics.pairwise import linear_kernel

        chunks_path = Path(__file__).resolve().parent / "chunks.txt"
        with open(chunks_path, "r", encoding="utf-8") as f:
            content = f.read()

        chunks = [c.strip() for c in content.split("===CHUNK===") if c.strip()]

        # Use the first line (title) + a bit of body as the document for each chunk
        docs = []
        for c in chunks:
            parts = c.split("\n", 2)
            title = parts[0] if parts else ""
            body = parts[1] if len(parts) > 1 else ""
            docs.append(title + " \n " + (body[:400] if body else ""))

        vect = TfidfVectorizer(stop_words="english", max_features=20000)
        mat = vect.fit_transform(docs)

        _tfidf_vect = vect
        _tfidf_matrix = mat
        _tfidf_chunks = chunks
        print(f"Built TF-IDF index for {len(chunks)} chunks")
    except Exception as e:
        print("TF-IDF index build failed:", e)
        _tfidf_vect = None
        _tfidf_matrix = None
        _tfidf_chunks = None

# -----------------------------
# Best Topic
# -----------------------------

def best_topic(question):
    # Try the vector search first
    results = search(question, top_k=1)

    if results:
        chunk = results[0]["text"]

        print("\nRetrieved Chunk:")
        print(chunk[:300])

        lines = chunk.split("\n")

        if not lines:
            return None

        topic = lines[0].strip()

        print("Extracted Topic:", topic)

        return topic

    # Fallback: if vector search failed (OOM or resources unavailable), do a cheap keyword match
    # Try TF-IDF fallback first (more robust than simple token overlap)
    try:
        _build_tfidf_index()
        if _tfidf_matrix is not None and _tfidf_vect is not None and _tfidf_chunks is not None:
            from sklearn.metrics.pairwise import linear_kernel

            q_vec = _tfidf_vect.transform([question])
            sims = linear_kernel(q_vec, _tfidf_matrix).flatten()
            best_idx = int(sims.argmax()) if sims.size else None
            if best_idx is not None and sims[best_idx] > 0:
                topic = _tfidf_chunks[best_idx].split("\n")[0].strip()
                print("TF-IDF fallback topic:", topic)
                return topic
    except Exception as e:
        print("TF-IDF fallback failed:", e)

    # If TF-IDF fails or finds nothing, fall back to simple token overlap
    try:
        chunks_path = Path(__file__).resolve().parent / "chunks.txt"
        with open(chunks_path, "r", encoding="utf-8") as f:
            content = f.read()

        chunks = [c.strip() for c in content.split("===CHUNK===") if c.strip()]

        # Normalize and tokenize
        q_tokens = set(re.findall(r"\w+", question.lower()))

        best_idx = None
        best_score = 0

        for idx, c in enumerate(chunks):
            # use the first line as the title/topic
            first_line = (c.split("\n")[0] if c else "").lower()
            c_tokens = set(re.findall(r"\w+", first_line))
            score = len(q_tokens & c_tokens)
            if score > best_score:
                best_score = score
                best_idx = idx

        if best_idx is None:
            return None

        topic = chunks[best_idx].split("\n")[0].strip()
        print("Fallback extracted topic:", topic)
        return topic
    except Exception as e:
        print("Fallback topic extraction failed:", e)
        return None