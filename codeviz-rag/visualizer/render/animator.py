"""
===========================================================
 ANIMATOR MODULE
-----------------------------------------------------------
Takes generated frames and creates:
 - GIF animation (default)
===========================================================
"""

from PIL import Image

class Animator:

    def create_gif(self, frames, output_path, duration=1100):
        """
        frames: list of PIL Images
        """
        if not frames:
            print("❌ No frames to animate.")
            return

        frames[0].save(
            output_path,
            save_all=True,
            append_images=frames[1:],
            duration=duration,
            loop=0
        )

        print(f"🎉 GIF saved: {output_path}")
