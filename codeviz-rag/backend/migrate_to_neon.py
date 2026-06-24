import json

from knowledge import KNOWLEDGE
from database import conn, cursor

# -------------------------
# Create Table
# -------------------------

cursor.execute("""
CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    title TEXT UNIQUE NOT NULL,
    summary TEXT,
    points JSONB,
    examples JSONB
);
""")

conn.commit()

# -------------------------
# Clear Existing Data
# -------------------------

cursor.execute("DELETE FROM subjects;")
conn.commit()

# -------------------------
# Insert Data
# -------------------------

count = 0

for item in KNOWLEDGE:

    cursor.execute(
        """
        INSERT INTO subjects
        (
            title,
            summary,
            points,
            examples
        )
        VALUES
        (
            %s,
            %s,
            %s,
            %s
        )
        """,
        (
            item.get("title", ""),
            item.get("summary", ""),
            json.dumps(item.get("points", [])),
            json.dumps(item.get("examples", []))
        )
    )

    count += 1

conn.commit()

print(f"Inserted {count} subjects into Neon.")