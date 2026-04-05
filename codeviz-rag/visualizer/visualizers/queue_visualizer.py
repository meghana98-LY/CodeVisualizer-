from .base_visualizer import BaseVisualizer
from ..core.utils import is_queue

class QueueVisualizer(BaseVisualizer):

    def can_visualize(self, var_name, value):
        return is_queue(var_name, value)

    def measure_text(self, draw, t, font):
        try:
            bbox = draw.textbbox((0,0), t, font=font)
            return bbox[2]-bbox[0], bbox[3]-bbox[1]
        except:
            return len(t)*6, 12

    def draw(self, draw, state, prev_state, name, queue_list, x, y, font):
        draw.text((x, y), f"Queue: {name}", fill="black", font=font)
        y += 26

        box_w = 60
        box_h = 36
        gap = 6

        cur_x = x

        for val in queue_list:
            s = str(val)

            # Draw box
            draw.rectangle(
                [cur_x, y, cur_x + box_w, y + box_h],
                fill=(230, 255, 230),
                outline="black",
                width=2
            )

            # Center text
            w, h = self.measure_text(draw, s, font)
            draw.text(
                (cur_x + (box_w - w) / 2, y + (box_h - h) / 2),
                s,
                fill="black",
                font=font
            )

            cur_x += box_w + gap

        return y + box_h + 20
