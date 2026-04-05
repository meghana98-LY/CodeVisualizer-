import sys
import os

# Make visualizer folder importable
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BACKEND_DIR, ".."))
sys.path.append(PROJECT_ROOT)

# Visualizer import
from visualizer.run_visualizer import visualize_file

# Output frames directory
FRAME_DIR = os.path.join(BACKEND_DIR, "static", "frames")


def run_and_capture(source_code: str):

    # ----------------------------
    # 1. Ensure FRAME_DIR exists
    # ----------------------------
    if not os.path.exists(FRAME_DIR):
        os.makedirs(FRAME_DIR)

    # ----------------------------
    # 2. Clear old frames
    # ----------------------------
    for f in os.listdir(FRAME_DIR):
        try:
            os.remove(os.path.join(FRAME_DIR, f))
        except:
            pass

    # ----------------------------
    # 3. Save temporary file
    # ----------------------------
    temp_path = os.path.join(BACKEND_DIR, "temp_code.py")
    with open(temp_path, "w") as temp:
        temp.write(source_code)

    # ----------------------------
    # 4. Run visualizer → generate frames
    # ----------------------------
    visualize_file(
        temp_path,
        output=os.path.join(FRAME_DIR, "animation.gif"),
        speed=900
    )

    # ----------------------------
    # 5. Remove temp file
    # ----------------------------
    try:
        os.remove(temp_path)
    except:
        pass

    return True
