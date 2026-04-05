// src/components/company/Company.tsx
import React, { useState, useMemo } from "react";
import {
  COMPANIES,
  DEFAULT_QA,
  CompanyName,
  QAItem
} from "../../data/company";

import "../../style/company.css";
import QuestionDetail from "./QuestionDetail";

export default function Company() {
  const [company, setCompany] = useState<CompanyName | null>(null);
  const [selectedQ, setSelectedQ] = useState<QAItem | null>(null);
  const [search, setSearch] = useState("");

  const questions: QAItem[] = company ? DEFAULT_QA[company] : [];

  const filtered = useMemo(() => {
    const t = search.trim().toLowerCase();
    if (!t) return questions;
    return questions.filter(
      (q) =>
        q.q.toLowerCase().includes(t) ||
        q.a.toLowerCase().includes(t)
    );
  }, [search, questions]);

  // Prev / Next within company
  const handlePrev = () => {
    if (!selectedQ) return;
    const id = questions.indexOf(selectedQ);
    if (id > 0) setSelectedQ(questions[id - 1]);
  };

  const handleNext = () => {
    if (!selectedQ) return;
    const id = questions.indexOf(selectedQ);
    if (id >= 0 && id < questions.length - 1) {
      setSelectedQ(questions[id + 1]);
    }
  };

  return (
    <section className="company-section">
      {!company && (
        <>
          <h2 className="panel-title">Companies</h2>
          <div className="company-grid">
            {COMPANIES.map((c, i) => (
              <div
                key={c}
                className={`tile company-tile t${(i % 4) + 1}`}
                onClick={() => {
                  setCompany(c);
                  setSelectedQ(null);
                  setSearch("");
                }}
              >
                <strong>{c}</strong>
              </div>
            ))}
          </div>
        </>
      )}

      {company && !selectedQ && (
        <div className="panel company-detail">
          <div className="row between center">
            <h3>{company} – Questions</h3>
            <div className="row center" style={{ gap: 10 }}>
              <input
                className="input"
                placeholder="Search questions…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn ghost sm" onClick={() => setCompany(null)}>
                Back
              </button>
            </div>
          </div>

          <div className="qa-list">
            {filtered.length === 0 && <p>No questions found.</p>}
            {filtered.map((q, idx) => (
              <div key={idx} className="qa-row" onClick={() => setSelectedQ(q)}>
                <strong>Q{idx + 1}. {q.q}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* render detail component only — pass onBack to close detail */}
      {company && selectedQ && (
        <QuestionDetail
          question={selectedQ}
          onBack={() => setSelectedQ(null)}   // <-- important: closes detail view
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}
