/*import React, { useEffect, useState } from "react";

export default function Visualizer({ frames }: { frames: string[] }) {
  const [index, setIndex] = useState(0);

  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    if (!frames || frames.length === 0) return;

    // Reset animation
    setIndex(0);

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (!frames.length) return 0;
        return (prev + 1) % frames.length;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [frames]);

  if (!frames || frames.length === 0) {
    return (
      <p style={{ color: "#aaa", textAlign: "center", marginTop: "20px" }}>
        No animation loaded yet.
      </p>
    );
  }

  // 🔥 FIX: Add timestamp to avoid GIF caching
  const url = BASE_URL + frames[index] + "?t=" + Date.now();

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={url}
        alt="Algorithm animation frame"
        style={{
          width: "95%",
          maxWidth: "460px",
          height: "auto",
          borderRadius: "10px",
          border: "1px solid #333",
        }}
      />

      <p style={{ color: "#aaa", marginTop: 10 }}>
        Frame {index + 1} / {frames.length}
      </p>
    </div>
  );
}
*/


import React, { useEffect, useState, useRef } from "react";

export default function Visualizer({ frames }: { frames: string[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(800);
  const [timestamp, setTimestamp] = useState(Date.now());

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const BASE_URL = "http://127.0.0.1:8000";

  // Reset when new frames arrive
  useEffect(() => {
    if (!frames || frames.length === 0) return;

    setIndex(0);
    setTimestamp(Date.now()); // Only refresh on NEW animation
  }, [frames]);

  // Auto-play logic
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (playing && frames.length > 0) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => {
          const next = (prev + 1) % frames.length;
          setTimestamp(Date.now()); // Refresh ONLY on next frame
          return next;
        });
      }, speed);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, speed, frames.length]);

  if (!frames.length) {
    return <p style={{ color: "#aaa", textAlign: "center" }}>No animation loaded yet.</p>;
  }

  // Cached GIF refresh only on frame change, not on play/pause
  const url = `${BASE_URL}${frames[index]}?t=${timestamp}`;

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={url}
        alt="Algorithm animation"
        style={{
          width: "95%",
          maxWidth: "460px",
          height: "auto",
          borderRadius: "10px",
          border: "1px solid #333",
        }}
      />

      <p style={{ color: "#aaa", marginTop: 10 }}>
        Frame {index + 1} / {frames.length}
      </p>

      {/* Play / Pause */}
      <button
        onClick={() => setPlaying((p) => !p)}
        style={{
          padding: "8px 16px",
          border: "1px solid #333",
          borderRadius: 6,
          background: playing ? "#ffdddd" : "#ddffdd",
          cursor: "pointer",
          marginTop: 10,
        }}
      >
        {playing ? "Play" : "restart"}
      </button>

      {/* Speed Slider */}

    </div>
  );
}
