import React, { useState, useMemo } from "react";
import { SOFT_SKILL_QA } from "../data/softskill";
import "../style/softskill.css";

type SoftSkillItem = {
  q: string;
  a: string;
  sample: string;
};

export default function SoftSkill() {
  const [search, setSearch] = useState("");
  const [sticky, setSticky] = useState<SoftSkillItem | null>(null);

  const filtered = useMemo(() => {
    const t = search.toLowerCase();
    if (!t) return SOFT_SKILL_QA;
    return SOFT_SKILL_QA.filter(
      (q) =>
        q.q.toLowerCase().includes(t) ||
        q.a.toLowerCase().includes(t) ||
        q.sample.toLowerCase().includes(t)
    );
  }, [search]);

  return (
    <section>
      <h2 className="soft-title">Soft Skill Interview Q&A</h2>

      <input
        className="soft-input"
        placeholder="Search soft skills…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="soft-grid">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="soft-card"
            onClick={() => setSticky(item)}
          >
            <strong>{item.q}</strong>
            <p className="soft-muted">{item.a}</p>
          </div>
        ))}
      </div>

      {sticky && (
        <div className="soft-overlay">
          <div className="soft-note">
            <div className="soft-header">
              <div className="pin" />
              <strong>Soft Skill Answer</strong>
              <button className="close" onClick={() => setSticky(null)}>
                Close
              </button>
            </div>

            <div className="soft-body">
              <h3>{sticky.q}</h3>
              <p>{sticky.a}</p>

              <h4>Example Answer</h4>
              <p>{sticky.sample}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
