import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SUBJECT_DATA } from "../../data/guides/SUBJECT_INDEX"; // ensure correct file name
import "../../style/guide.css";

export default function SubjectNotes() {
  const { year, subject } = useParams();
  const navigate = useNavigate();

  const subjectName = decodeURIComponent(subject || "");
  const info = SUBJECT_DATA[subjectName];

  return (
    <section style={{ marginTop: "20px" }}>
      {/* BACK BUTTON */}
      <button className="guide-back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      {/* FULL PAGE PANEL */}
      <div className="guide-panel">
        <h3>
          {year} — {subjectName}
        </h3>

        {/* SUMMARY */}
        <div className="guide-section">
          <h4>Summary</h4>
          <p className="guide-notes">
            {info?.summary || "No summary available."}
          </p>
        </div>

        {/* DIAGRAMS */}
        <div className="guide-section">
          <h4>Diagrams</h4>
          {info?.diagrams?.length ? (
            <ul>
              {info.diagrams.map((d: string) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>
          ) : (
            <p className="guide-notes">No diagrams available.</p>
          )}
        </div>

        {/* IMPORTANT POINTS */}
        <div className="guide-section">
          <h4>Important Points</h4>
          {info?.points?.length ? (
            <ul>
              {info.points.map((p: string) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          ) : (
            <p className="guide-notes">No points available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
