import React from "react";
import "../../style/company.css";

interface Question {
  id: number;
  title: string;
}

interface Company {
  id: number;
  name: string;
  questions: Question[];
}

interface Props {
  company: Company;
  onSelectQuestion: (q: Question) => void;
  onBack: () => void;
}

export default function QuestionList({ company, onSelectQuestion, onBack }: Props) {
  return (
    

    <div className="ql-container">
<p style={{color:"red", fontSize:"30px"}}>THIS IS QUESTIONLIST</p>
      <div className="ql-header-row">
        <h1 className="ql-heading">{company.name} – Questions</h1>

        <button className="ql-back" onClick={onBack}>
          Back
        </button>
      </div>

      <div className="ql-list">
        {company.questions.map((q, index) => (
          <p
            key={q.id}
            className="ql-item"
            onClick={() => onSelectQuestion(q)}
          >
            <span className="ql-number">Q{index + 1}.</span> {q.title}
          </p>
        ))}
      </div>

    </div>
  );
}
