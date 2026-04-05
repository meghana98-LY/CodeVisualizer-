import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GUIDE } from "../../data/guides/GUIDE";

export default function GuidePage() {
  const YEARS = ["1Year", "2Year", "3Year", "4Year"];
  const [active, setActive] = useState("1Year");

  const navigate = useNavigate();
  const yearData = GUIDE[active];

  return (
    <section>

      {/* YEAR TABS */}
      <div className="grid-4 year-grid">
        {YEARS.map((y) => (
          <div
            key={y}
            className={`year-tile ${active === y ? "active" : ""}`}
            onClick={() => setActive(y)}
          >
            <strong>{y}</strong>
          </div>
        ))}
      </div>

      {/* MAIN PANEL */}
      <div className="guide-panel">
        <h3>{active} — Study Plan</h3>

        {/* CORE SUBJECTS */}
        <div className="guide-section">
          <h4>Core Subjects</h4>

          <div className="guide-pill-container">
            {yearData.subjects.map((s) => (
              <span
                key={s}
                className="guide-pill"
                onClick={() => navigate(`/guide/${active}/${encodeURIComponent(s)}`)}
                style={{ cursor: "pointer" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* MINI PROJECTS */}
        <div className="guide-section">
          <h4>Mini Projects</h4>
          <ul>
            {yearData.projects.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </div>

        {/* NOTES */}
        <div className="guide-section">
          <p className="guide-notes">{yearData.notes}</p>
        </div>
      </div>

    </section>
  );
}
