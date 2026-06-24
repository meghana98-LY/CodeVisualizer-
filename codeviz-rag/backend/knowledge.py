import json
import os

KNOWLEDGE = []

folder = os.path.join(
    os.path.dirname(__file__),
    "knowledge"
)

for file in os.listdir(folder):

    if not file.endswith(".json"):
        continue

    path = os.path.join(folder, file)

    try:
        if os.path.getsize(path) == 0:
            print(f"⚠ Skipping empty file: {file}")
            continue

        with open(path, "r", encoding="utf-8") as f:
            KNOWLEDGE.append(json.load(f))

        print(f"✅ Loaded: {file}")

    except Exception as e:
        print(f"❌ Failed: {file}")
        print(e)