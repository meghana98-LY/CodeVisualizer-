from .base_visualizer import BaseVisualizer
from ..core.utils import is_linked_list_node, safe_get


class LinkedListVisualizer(BaseVisualizer):

    def can_visualize(self, name, value):
        """
        Detects if the object is a Linked List node.
        Accepts objects with attributes:
        - data
        - val
        - value
        and next pointer.
        """
        return is_linked_list_node(value)

    def measure_text(self, draw, text, font):
        """Safely measure text width/height."""
        try:
            bbox = draw.textbbox((0, 0), text, font=font)
            return bbox[2] - bbox[0], bbox[3] - bbox[1]
        except:
            return len(text) * 6, 12

    def draw(self, draw, state, prev_state, name, head, x, y, font):
        """
        Draws a Linked List:
        [10] -> [20] -> [30]
        """

        # Title
        draw.text((x, y), f"Linked List: {name}", fill="black", font=font)
        y += 26

        node = head
        cur_x = x

        box_w = 90
        box_h = 40
        gap = 50  # spacing between nodes

        while node:
            # Read node data (supports .data, .val, .value)
            val = safe_get(
                node,
                "data",
                safe_get(
                    node,
                    "val",
                    safe_get(node, "value", None)
                )
            )
            text = str(val)

            # Draw node box
            draw.rectangle(
                [cur_x, y, cur_x + box_w, y + box_h],
                fill=(230, 230, 255),
                outline="black",
                width=2
            )

            # Center text
            w, h = self.measure_text(draw, text, font)
            draw.text(
                (cur_x + (box_w - w) / 2, y + (box_h - h) / 2),
                text,
                fill="black",
                font=font
            )

            # Draw arrow to next node
            nxt = safe_get(node, "next")
            if nxt:
                start_x = cur_x + box_w
                start_y = y + box_h / 2
                end_x = cur_x + box_w + gap - 15
                end_y = start_y

                # Line
                draw.line([(start_x, start_y), (end_x, end_y)],
                          fill="black", width=2)

                # Arrowhead
                draw.polygon(
                    [
                        (end_x, end_y),
                        (end_x - 8, end_y - 4),
                        (end_x - 8, end_y + 4)
                    ],
                    fill="black"
                )

            # Move to next position
            cur_x += box_w + gap
            node = nxt

        return y + box_h + 20
