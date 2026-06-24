from faiss_rag import search


def rag_answer(question: str):

    results = search(question, top_k=1)

    if not results:
        return "No relevant information found."

    best = results[0]

    chunk = best["text"]

    lines = chunk.split("\n")

    topic = lines[0]

    content = "\n".join(lines[1:])

    return f"""📘 Topic: {topic}

📖 Answer:
{content}
"""