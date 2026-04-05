from .base_visualizer import BaseVisualizer
from ..core.utils import is_stack

class StackVisualizer(BaseVisualizer):

    def can_visualize(self, var_name, value):
        return is_stack(var_name, value)

    def measure_text(self, draw, t, font):
        try:
            bbox = draw.textbbox((0,0), t, font=font)
            return bbox[2]-bbox[0], bbox[3]-bbox[1]
        except:
            return len(t)*6, 12

    def draw(self, draw, state, prev_state, name, lst, x, y, font):
        draw.text((x, y), f"Stack: {name}", fill="black", font=font)
        y += 26

        box_w = 140
        box_h = 36
        gap = 6

        # detect push
        new_idx = None
        if prev_state and name in prev_state:
            old = prev_state[name]
            if isinstance(old, list) and len(lst) > len(old):
                new_idx = len(lst) - 1

        cur_y = y
        for i in range(len(lst)-1, -1, -1):
            val = str(lst[i])
            fill = (170,255,190) if i == new_idx else (204,255,221)

            draw.rectangle([x, cur_y, x+box_w, cur_y+box_h],
                           fill=fill, outline="black", width=2)

            w, h = self.measure_text(draw, val, font)
            draw.text((x + (box_w-w)/2, cur_y+(box_h-h)/2), val, fill="black", font=font)

            cur_y += box_h + gap

        draw.line([(x, cur_y), (x+box_w, cur_y)], fill="black", width=2)

        return cur_y + 20
