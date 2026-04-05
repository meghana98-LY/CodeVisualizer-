# visualizer/visualizers/linkedlist_visualizer.py

from visualizers.base_visualizer import BaseVisualizer
from ..core.utils import is_linked_list_node, safe_get

class LinkedListVisualizer(BaseVisualizer):

    def can_visualize(self, name, value):
        return is_linked_list_node(value)

    def measure_text(self, draw, text, font):
        try:
            bbox = draw.textbbox((0, 0), text, font=font)
            return bbox[2] - bbox[0], bbox[3] - bbox[1]
        except:
            return len(text) * 6, 12

    def draw(self, draw, state, prev_state, name, head, x, y, font):
        draw.text((x, y), f"Linked List → {name}", fill="black", font=font)
        y += 28

        node = head
        cur_x = x

        box_w = 90
        box_h = 40
        gap = 60   # bigger gap for clarity

        while node:
            # Read the node value properly
            val = safe_get(node, "value", safe_get(node, "val"))
            text = str(val)

            # Node box
            draw.rectangle(
                [cur_x, y, cur_x + box_w, y + box_h],
                fill=(220, 230, 255),
                outline="black",
                width=2
            )

            # Center text
            w, h = self.measure_text(draw, text, font)
            draw.text(
                (cur_x + (box_w - w) / 2, y + (box_h - h) / 2),
                text, fill="black", font=font
            )

            # Draw arrow → next node
            if safe_get(node, "next"):
                start_x = cur_x + box_w
                start_y = y + box_h / 2
                end_x = start_x + gap - 15
                end_y = start_y

                draw.line([(start_x, start_y), (end_x, end_y)],
                          fill="black", width=2)

                # Arrow head
                draw.polygon(
                    [
                        (end_x, end_y),
                        (end_x - 8, end_y - 4),
                        (end_x - 8, end_y + 4)
                    ],
                    fill="black"
                )

            cur_x += box_w + gap
            node = safe_get(node, "next")

        return y + box_h + 20
