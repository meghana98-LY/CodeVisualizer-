// src/components/company/QuestionDetail.tsx
import React, { useState } from "react";
import "../../style/company.css";

import { QAItem, CodeBlock } from "../../data/company/types";

interface QDProps {
  question: QAItem;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function QuestionDetail({ question, onBack, onPrev, onNext }: QDProps) {
  const [lang, setLang] = useState<string>("python");

  const langMap: Record<string, keyof CodeBlock> = {
    python: "python",
    cpp: "cpp",
    java: "java",
    c: "c",
  };

  const currentLang = langMap[lang];
  const code = question.codes?.[currentLang] || "";

  return (
    <div className="qd-container">

      {/* Header */}
      <div className="qd-top-row">
        <h2 className="qd-heading">{question.q}</h2>
        <button className="qd-back" onClick={onBack}>Back</button>
      </div>

      {/* Difficulty & Tags */}
<div className="example-box">
  <strong>Difficulty:<span
    style={{
      marginLeft: "10px",
      
      color: "white",
      
    
    }}
  >
    {question.difficulty}
  </span></strong>
  

  <div style={{ marginTop: "12px" }}>
    <strong>Tags:<span style={{ marginLeft: "8px", color:"white" ,opacity: 0.85 }}>
      {question.tags?.join(", ")} </span></strong>

   
  </div>
</div>

      {/* --- END FIX --- */}

      {/* Short Explanation */}
      <div className="example-box">
        <strong>Explanation:</strong>
        <p style={{ marginTop: 10 }}>{question.a}</p>
      </div>

      {/* Steps */}
      {question.steps && (
        <div className="example-box">
          <strong>Steps:</strong>
          <ol className="steps-list">
            {question.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Single Example */}
      {question.samples && (
        <div className="example-box">
          <strong>Example:</strong>
          <pre className="codeblock">
{`Input: ${question.samples.input}
Output: ${question.samples.output}`}
          </pre>
        </div>
      )}

      {/* Multiple Examples */}
      {question.examples && (
        <div className="example-box">
          <strong>Examples:</strong>
          {question.examples.map((ex, i) => (
            <pre key={i} className="codeblock" style={{ marginTop: 10 }}>
{`Input: ${ex.input}
Output: ${ex.output}`}
            </pre>
          ))}
        </div>
      )}

      {/* Complexity */}
      {question.complexity && (
        <div className="example-box">
          <strong>Complexity:</strong>
          <p><b>Time:</b> {question.complexity.time}</p>
          <p><b>Space:</b> {question.complexity.space}</p>
        </div>
      )}

      {/* Detailed Explanation */}
      {question.explain && (
        <div className="example-box">
          <strong>Detailed Explanation:</strong>
          <p style={{ marginTop: 10 }}>{question.explain}</p>
        </div>
      )}

      {/* Language-specific explanation */}
      {question.explainLines?.[lang] && (
        <div className="example-box">
          <strong>Language Notes ({lang.toUpperCase()}):</strong>
          <ul className="steps-list">
            {question.explainLines[lang].map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Language Tabs */}
      {question.codes && (
        <div className="qd-tabs">
          {Object.keys(question.codes).map((l) => (
            <button
              key={l}
              className={`qd-tab ${lang === l ? "active" : ""}`}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Code Block */}
      {code && (
        <div className="code-container">
          <button
            className="copy-btn"
            onClick={() => navigator.clipboard.writeText(code)}
          >
            Copy
          </button>

          <pre className="codeblock">{code}</pre>
        </div>
      )}

      {/* Feedback */}
      {question.feedback && (
        <div className="example-box">
          <strong>Interview Feedback:</strong>
          <p>{question.feedback}</p>
        </div>
      )}

      {/* Improvements */}
      {question.improvements && (
        <div className="example-box">
          <strong>Improvements:</strong>
          <ul className="steps-list">
            {question.improvements.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="qd-nav">
        <button className="qd-nav-btn" onClick={onPrev}>← Previous</button>
        <button className="qd-nav-btn" onClick={onNext}>Next →</button>
      </div>

    </div>
  );
}
