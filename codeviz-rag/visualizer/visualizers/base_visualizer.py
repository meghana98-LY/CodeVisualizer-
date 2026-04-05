"""
===========================================================
 BASE VISUALIZER CLASS
-----------------------------------------------------------
All specific visualizers (tree, stack, queue, linked list)
inherit from this class.

This allows:
 - consistent API
 - easy extension
 - automatic selection based on variable types
===========================================================
"""

class BaseVisualizer:
    """
    All visualizers must implement:
        - can_visualize(var_name, value)
        - draw(draw, state, prev_state, x, y, font)

    The renderer will call:
         visualizer.draw(...)
    when this visualizer is selected.
    """

    def can_visualize(self, var_name, value):
        """
        Returns True if this visualizer is responsible
        for drawing the given variable.
        """
        raise NotImplementedError("can_visualize() not implemented")

    def draw(self, draw, state, prev_state, var_name, value, x, y, font):
        """
        Draws the visualization of the variable at position (x, y).
        Returns new_y (bottom position after drawing).
        """
        raise NotImplementedError("draw() not implemented")
