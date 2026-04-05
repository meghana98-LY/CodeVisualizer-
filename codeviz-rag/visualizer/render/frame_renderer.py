# visualizer/render/frame_renderer.py

from PIL import Image, ImageDraw, ImageFont
from ..visualizers.base_visualizer import BaseVisualizer


class FrameRenderer:
    def __init__(self, visualizers):
        """
        visualizers: list of visualizer objects
        PRIORITY ORDER MATTERS
        """
        self.visualizers = visualizers

    def render_frame(self, code_text, state, prev_state, frame_idx, total_steps):
        """Render one complete debugging frame."""
        width = 1400
        height = 900

        img = Image.new("RGB", (width, height), "white")
        draw = ImageDraw.Draw(img)

        # ------------ LEFT SIDE: CODE PANEL ------------
        self.draw_code(draw, code_text, state.get("__line__", -1))

        # ------------ RIGHT SIDE: VISUALIZATION --------
        viz_img = self.draw_visualization(state, prev_state)
        if viz_img:
            img.paste(viz_img, (450, 0))

        # ------------ FOOTER ---------------------------
        footer = f"Frame {frame_idx + 1}/{total_steps}"
        draw.text((10, 870), footer, fill="black")

        return img

    def draw_code(self, draw, code_text, current_line):
        """Draw code with highlighted current line."""
        font = ImageFont.load_default()
        x = 20
        y = 20

        for idx, line in enumerate(code_text.split("\n"), start=1):
            line_y = y + (idx * 20)

            if idx == current_line:
                draw.rectangle([0, line_y - 3, 440, line_y + 15], fill="#fff3a6")

            draw.text((x, line_y), f"{idx:2d}  {line}", fill="black", font=font)

    def draw_visualization(self, state, prev_state):
        width = 900
        height = 900
        img = Image.new("RGB", (width, height), "white")
        draw = ImageDraw.Draw(img)
        font = ImageFont.load_default()

        x = 20
        y = 20

        for name, value in state.items():
            if name.startswith("__"):
                continue

            for viz in self.visualizers:
                if viz.can_visualize(name, value):

                    # PASS EVERYTHING POSITIONALLY
                    new_y = viz.draw(
                        draw,
                        state,
                        prev_state,
                        name,
                        value,   # <-- FIXED
                        x,
                        y,
                        font
                    )

                    # Fix LinkedListVisualizer accidental tuple return
                    if isinstance(new_y, tuple):
                        new_y = new_y[0]

                    y = new_y + 30
                    break

        return img
