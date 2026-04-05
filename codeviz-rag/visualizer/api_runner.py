import os
import sys

VIS_ROOT = os.path.dirname(os.path.abspath(__file__))
sys.path.append(VIS_ROOT)

from core.tracer import run_and_trace
from visualizers.tree_visualizer import TreeVisualizer
from visualizers.stack_visualizer import StackVisualizer
from visualizers.queue_visualizer import QueueVisualizer
from visualizers.linkedlist_visualizer import LinkedListVisualizer
from render.frame_renderer import FrameRenderer


def visualize_code(code_text: str, output_dir: str):

    # Clear frames
    for f in os.listdir(output_dir):
        os.remove(os.path.join(output_dir, f))

    snapshots = run_and_trace(code_text)
    total_steps = len(snapshots)

    visualizers = [
        TreeVisualizer(),
        StackVisualizer(),
        QueueVisualizer(),
        LinkedListVisualizer(),
    ]

    renderer = FrameRenderer(visualizers)

    prev = None
    for i, state in enumerate(snapshots):
        frame = renderer.render_frame(
            code_text,
            state,
            prev_state=prev,
            frame_idx=i,
            total_steps=total_steps
        )

        frame.save(os.path.join(output_dir, f"frame_{i}.png"))
        prev = state

    return True
