import React, { useState, useEffect, useRef } from "react";
import { askChat, runVisualizer } from "../api";
import Visualizer from "./visualizer";

// Improved code detection
function isCode(text: string) {
  const codeKeywords = ["def ", "class ", "{", "}", "return", "while", "for", "="];
  return codeKeywords.some((k) => text.includes(k));
}

// Format code block with line numbers
function formatCodeBlock(code: string) {
  const lines = code.split("\n");

  return (
    <div
      style={{
        background: "#111723",
        padding: "12px",
        borderRadius: "10px",
        marginTop: "8px",
        border: "1px solid #333",
        fontFamily: "monospace",
        color: "#eee",
      }}
    >
      {lines.map((line, index) => (
        <div
          key={index}
          style={{ display: "flex", fontSize: "14px", lineHeight: "20px" }}
        >
          <span
            style={{
              width: "35px",
              opacity: 0.5,
              textAlign: "right",
              paddingRight: "10px",
              userSelect: "none",
            }}
          >
            {index + 1}
          </span>
          <span>{line}</span>
        </div>
      ))}
    </div>
  );
}

export default function RagChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { from: string; text: string; isCode: boolean }[]
  >([]);
  const [frames, setFrames] = useState<string[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const codeDetected = isCode(text);

    setMessages((prev) => [
      ...prev,
      { from: "user", text, isCode: codeDetected },
    ]);

    setInput("");

    // Clear old frames when user sends new code
    if (codeDetected) {
      try {
        setFrames([]); // clear display
        const data = await runVisualizer(text);

        if (data.error) {
          setMessages((prev) => [
            ...prev,
            { from: "bot", text: "⚠ Error running visualizer.", isCode: false },
          ]);
          return;
        }

        if (data.frames?.length > 0) {
          setFrames(data.frames);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              from: "bot",
              text: "No frames were generated. Please check your code.",
              isCode: false,
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Server error running code.", isCode: false },
        ]);
      }
      return;
    }

    // Send to RAG backend
    try {
      const res = await askChat(text);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.answer || "No response", isCode: false },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Error connecting to backend.",
          isCode: false,
        },
      ]);
    }
  }

  return (
    <div
      style={{
        width: "95%",
        margin: "0 auto",
        paddingTop: 20,
        display: "flex",
        gap: "20px",
      }}
    >
      {/* LEFT SIDE — CHAT */}
      <div style={{ flex: 1 }}>
        <div
          ref={chatRef}
          style={{
            height: "500px",
            overflowY: "auto",
            border: "1px solid #222",
            borderRadius: 12,
            padding: 12,
            background: "#0b0f19",
            marginBottom: 20,
          }}
        >
          {messages.map((msg, i) => (
  <div
    key={i}
    style={{
      marginBottom: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: msg.from === "user" ? "flex-end" : "flex-start",
    }}
  >
    <div
      style={{
        maxWidth: "90%",
        padding: "12px",
        borderRadius: "12px",
        background:
          msg.from === "user" ? "#1d4ed8" : "#111723",
        border: "1px solid #333",
        color: "white",
      }}
    >
      <strong
        style={{
          display: "block",
          marginBottom: "8px",
          color: msg.from === "user" ? "#fff" : "#67ff8a",
        }}
      >
        {msg.from}
      </strong>

      {msg.isCode ? (
        formatCodeBlock(msg.text)
      ) : (
        <div
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: "1.7",
          }}
        >
          {msg.text}
        </div>
      )}
    </div>
  </div>
))}
        </div>

        {/* Input */}
        <div style={{ display: "flex", gap: 10 }}>
          <textarea
            placeholder="Ask something or paste Python code..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            style={{
              flexGrow: 1,
              padding: 12,
              borderRadius: 10,
              border: "1px solid #333",
              resize: "vertical",
              fontFamily: "monospace",
              fontSize: "14px",
              background: "#111723",
              color: "white",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              padding: "12px 22px",
              borderRadius: 10,
              cursor: "pointer",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              fontSize: "15px",
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* RIGHT SIDE — VISUALIZER */}
      <div
        style={{
          flex: 1,
          border: "1px solid #333",
          borderRadius: "12px",
          background: "#080c14",
          padding: "12px",
          height: "550px",
          overflow: "auto",
        }}
      >
        <Visualizer frames={frames} />
      </div>
    </div>
  );
}
