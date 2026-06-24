from faiss_rag import best_topic
from knowledge import KNOWLEDGE


def rag_answer(question: str):

    topic = best_topic(question)

    if not topic:
        return "No relevant information found."

    best = None

    for item in KNOWLEDGE:

        if item["title"].lower() == topic.lower():
            best = item
            break

    if not best:
        return "No relevant information found."

    points = "\n".join(
        f"• {p}" for p in best.get("points", [])[:5]
    )

    example = (
        best.get("examples", ["No example available"])[0]
    )

    return f"""📘 Topic: {best['title']}

📖 Summary:
{best['summary']}

🔑 Key Points:
{points}

💡 Example:
{example}
"""