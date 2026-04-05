from ..core.utils import is_tree_node, safe_get
from .base_visualizer import BaseVisualizer


class TreeVisualizer(BaseVisualizer):

    def can_visualize(self, var_name, value):
        return is_tree_node(value)

    # --------------------------------------------------------------------
    # Safe text measurement (Pillow 10 compatible)
    # --------------------------------------------------------------------
    def measure_text(self, draw, t, font):
        try:
            bbox = draw.textbbox((0, 0), t, font=font)
            return bbox[2] - bbox[0], bbox[3] - bbox[1]
        except:
            return len(t) * 6, 12

    # --------------------------------------------------------------------
    # Extract entire tree structure (dictionary format)
    # --------------------------------------------------------------------
    def extract_tree(self, node, seen, counter):
        """ Convert tree nodes into pure dict structure. """
        if node is None:
            return None

        nid = id(node)

        # Handle repeated nodes safely
        if nid in seen:
            return {"_ref": seen[nid]}

        label = f"n{counter[0]}"
        seen[nid] = label
        counter[0] += 1

        return {
            "id": label,
            "val": safe_get(node, "val", safe_get(node, "value")),
            "left": self.extract_tree(safe_get(node, "left"), seen, counter),
            "right": self.extract_tree(safe_get(node, "right"), seen, counter),
        }

    # --------------------------------------------------------------------
    # Inorder layout (ensures perfect spacing)
    # --------------------------------------------------------------------
    def compute_positions(self, tree):
        positions = {}
        x_index = [0]

        def inorder(t, depth):
            if t is None:
                return

            if "_ref" in t:
                positions[t["_ref"]] = (x_index[0], depth)
                x_index[0] += 1
                return

            inorder(t["left"], depth + 1)
            positions[t["id"]] = (x_index[0], depth)
            x_index[0] += 1
            inorder(t["right"], depth + 1)

        inorder(tree, 0)
        return positions

    # --------------------------------------------------------------------
    # Draw tree nodes + arrows
    # --------------------------------------------------------------------
    def draw_tree(self, draw, t, pos, origin_x, origin_y,
                  x_spacing, y_spacing, radius, font, new_ids):

        # helper: get pixel coordinates
        def xy(node_id):
            x_idx, depth = pos[node_id]
            return (origin_x + x_idx * x_spacing,
                    origin_y + depth * y_spacing)

        # Draw edges first (so nodes are on top)
        def draw_edges(el):
            if el is None or "_ref" in el:
                return
            nid = el["id"]
            px, py = xy(nid)

            for child in (el["left"], el["right"]):
                if child:
                    cid = child.get("_ref", child.get("id"))
                    cx, cy = xy(cid)

                    dx, dy = cx - px, cy - py
                    dist = max(1, (dx * dx + dy * dy) ** 0.5)
                    ux, uy = dx / dist, dy / dist

                    # arrow start/end offset by radius
                    sx = px + ux * radius
                    sy = py + uy * radius
                    ex = cx - ux * radius
                    ey = cy - uy * radius

                    draw.line([(sx, sy), (ex, ey)], fill=(0, 0, 0), width=2)

                    # arrowhead
                    back_x = ex - ux * 14
                    back_y = ey - uy * 14
                    perp_x, perp_y = -uy, ux
                    width = 7
                    draw.polygon([
                        (ex, ey),
                        (back_x + perp_x * width, back_y + perp_y * width),
                        (back_x - perp_x * width, back_y - perp_y * width)
                    ], fill=(0, 0, 0))

            draw_edges(el["left"])
            draw_edges(el["right"])

        # Draw nodes next
        def draw_nodes(el):
            if el is None or "_ref" in el:
                return

            nid = el["id"]
            px, py = xy(nid)
            val = str(el["val"])

            # highlight newly inserted nodes
            fill = (175, 255, 175) if nid in new_ids else (255, 245, 200)

            draw.ellipse([(px - radius, py - radius),
                          (px + radius, py + radius)],
                         fill=fill, outline="black", width=2)

            # proper text centering
            w, h = self.measure_text(draw, val, font)
            draw.text((px - w / 2, py - h / 2), val, fill="black", font=font)

            draw_nodes(el["left"])
            draw_nodes(el["right"])

        draw_edges(t)
        draw_nodes(t)

    # --------------------------------------------------------------------
    # Main draw entry point called by frame renderer
    # --------------------------------------------------------------------
    def draw(self, draw, state, prev_state, name, root, x, y, font):

        tree = self.extract_tree(root, {}, [0])
        if not tree:
            return y

        pos = self.compute_positions(tree)

        xs = [p[0] for p in pos.values()]
        min_x, max_x = min(xs), max(xs)
        width = max_x - min_x + 1

        # dynamic spacing based on tree width
        x_spacing = max(60, (100 - x - 100) // max(1, width))
        

        # --- detect new nodes (FIXED) ---
        new_ids = set()
        if prev_state and name in prev_state:
            prev_tree = self.extract_tree(prev_state[name], {}, [0])

            def collect_ids(t):
                out = set()
                if not t: return out
                stack = [t]
                while stack:
                    n = stack.pop()
                    if "_ref" in n:
                        continue
                    out.add(n["id"])
                    if n.get("left"): stack.append(n["left"])
                    if n.get("right"): stack.append(n["right"])
                return out

            prev_ids = collect_ids(prev_tree)
            curr_ids = collect_ids(tree)

            new_ids = curr_ids - prev_ids  # EXACT FIX ✔

        # title
        draw.text((x, y), f"Tree: {name}", fill="black", font=font)
        y += 30

        # origin positioning
        origin_x = x + 60 - min_x * x_spacing
        origin_y = y + 10

        # draw tree
        self.draw_tree(
            draw, tree, pos,
            origin_x, origin_y,
            x_spacing, y_spacing=130,
            radius=24,
            font=font,
            new_ids=new_ids
        )

        return y + 350
