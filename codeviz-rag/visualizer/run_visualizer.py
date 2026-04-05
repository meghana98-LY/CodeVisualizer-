"""
===========================================================
 RUN VISUALIZER (MAIN ENTRY POINT)
-----------------------------------------------------------
This file connects:
 - tracer
 - visualizers
 - frame renderer
 - animator

Usage:
    python run_visualizer.py test_programs/stack.py
    python run_visualizer.py test_programs/bst.py
===========================================================
"""

import sys
import os

# -----------------------------------------------------------
# CORRECTED RELATIVE IMPORTS
# -----------------------------------------------------------

from .core.tracer import run_and_trace
from .core.utils import *

from .visualizers.tree_visualizer import TreeVisualizer
from .visualizers.stack_visualizer import StackVisualizer
from .visualizers.queue_visualizer import QueueVisualizer
from .visualizers.linkedlist_visualizer import LinkedListVisualizer

from .render.frame_renderer import FrameRenderer
from .render.animator import Animator


# ============================================================
# MAIN EXECUTION
# ============================================================
def visualize_file(path, output="animation.gif", speed=1100):

    # ------------------------------
    # 1. Check file
    # ------------------------------
    if not os.path.exists(path):
        print("❌ File not found:", path)
        return

    with open(path, "r") as f:
        code_text = f.read()

    print("📌 Loaded code:", path)
    print("🔍 Running tracer...")

    # ------------------------------
    # 2. Run tracer
    # ------------------------------
    snapshots = run_and_trace(code_text)
    total_steps = len(snapshots)
    print(f"📸 Captured {total_steps} snapshots")

    # ------------------------------
    # 3. Create visualizer list
    # FIXED PRIORITY: LinkedList BEFORE Tree
    # ------------------------------
    visualizers = [
        StackVisualizer(),
        QueueVisualizer(),
        LinkedListVisualizer(),  # Must be before tree
        TreeVisualizer()
    ]

    # ------------------------------
    # 4. Create renderer + animator
    # ------------------------------
    renderer = FrameRenderer(visualizers)
    animator = Animator()

    # ------------------------------
    # 5. Render all frames
    # ------------------------------
    frames = []
    prev = None

    print("🎨 Rendering frames...")

    for i, state in enumerate(snapshots):
        img = renderer.render_frame(
            code_text,
            state,
            prev_state=prev,
            frame_idx=i,
            total_steps=total_steps
        )
        frames.append(img)
        prev = state

    print("✨ All frames rendered.")

    # ------------------------------
    # 6. Save GIF animation
    # ------------------------------
    animator.create_gif(frames, output, duration=speed)

    print("\n🎉 DONE!")
    print("Output saved at:", output)
    print("=========================================")


# ============================================================
# CLI ENTRY
# ============================================================
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python run_visualizer.py <path_to_program.py>")
        sys.exit(0)

    input_path = sys.argv[1]

    file_name = os.path.basename(input_path).replace(".py", "")
    output_name = f"{file_name}_animation.gif"

    visualize_file(input_path, output=output_name)
