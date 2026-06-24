from faiss_rag import best_topic
from database import cursor


def rag_answer(question: str):

    topic = best_topic(question)

    print("\nQuestion:", question)
    print("Retrieved Topic:", topic)

    if not topic:
        return "No relevant information found."

    # -------------------------
    # Load Subjects from Neon
    # -------------------------

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

    # -------------------------
    # Find Best Match
    # -------------------------

    best = None

    # Exact Match

    for item in KNOWLEDGE:

        title = item.get(
            "title",
            ""
        ).strip()

        if title.lower() == topic.lower():

            best = item
            break

    # Partial Match

    if not best:

        for item in KNOWLEDGE:

            title = item.get(
                "title",
                ""
            ).strip()

            if (
                title.lower() in topic.lower()
                or topic.lower() in title.lower()
            ):

                best = item
                break

    if not best:

        print("No matching title found.")

        return "No relevant information found."

    # -------------------------
    # Format Response
    # -------------------------

    points = "\n".join(
        f"• {point}"
        for point in best.get(
            "points",
            []
        )[:5]
    )

    example = best.get(
        "examples",
        ["No example available"]
    )[0]

    return f"""📘 Topic: {best['title']}

📖 Summary:
{best['summary']}

🔑 Key Points:
{points}

💡 Example:
{example}
"""