import os
import re
import json

PROJECT_ROOT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..")
)

GUIDES_DIR = os.path.join(
    PROJECT_ROOT,
    "src",
    "data",
    "guides"
)

OUTPUT_DIR = os.path.join(
    os.path.dirname(__file__),
    "knowledge"
)

os.makedirs(OUTPUT_DIR, exist_ok=True)


def extract_array(content, field):
    pattern = rf"{field}\s*:\s*\[(.*?)\]"
    match = re.search(pattern, content, re.S)

    if not match:
        return []

    body = match.group(1)

    items = re.findall(r'"(.*?)"', body, re.S)

    return [x.strip() for x in items]


def extract_summary(content):
    match = re.search(
        r"summary\s*:\s*`(.*?)`",
        content,
        re.S
    )

    if not match:
        return ""

    return match.group(1).strip()


for root, dirs, files in os.walk(GUIDES_DIR):

    for file in files:

        if not file.endswith(".ts"):
            continue

        if file in ["GUIDE.ts", "SUBJECT_INDEX.ts"]:
            continue

        path = os.path.join(root, file)

        with open(path, "r", encoding="utf-8") as f:
            content = f.read()

        data = {
            "title": file.replace(".ts", "").replace("_", " ").title(),
            "summary": extract_summary(content),
            "points": extract_array(content, "points"),
            "examples": extract_array(content, "examples")
        }

        output_file = os.path.join(
            OUTPUT_DIR,
            file.replace(".ts", ".json")
        )

        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

        print("Generated:", output_file)

print("\nKnowledge generation complete.")