import React from "react";
import { COMPANIES, CompanyName } from "../../data/company";
import "../../style/company.css";

interface CompanyListProps {
  onSelect: (c: CompanyName) => void;
}

export default function CompanyList({ onSelect }: CompanyListProps) {
  return (
    <div className="company-list-container">

      {/* Heading */}
      <h2 className="company-heading">Companies</h2>

      {/* Grid */}
      <div className="company-grid">
        {COMPANIES.map((c, i) => (
          <div
            key={c}
            className="company-card"
            onClick={() => onSelect(c)}
          >
            <div className="company-name">{c}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
