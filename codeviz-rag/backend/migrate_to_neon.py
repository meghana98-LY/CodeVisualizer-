import json
import os
import sys

if __package__ is None:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(current_dir)
    if repo_root not in sys.path:
        sys.path.insert(0, repo_root)

from backend.knowledge import KNOWLEDGE
from backend.database import conn, cursor

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