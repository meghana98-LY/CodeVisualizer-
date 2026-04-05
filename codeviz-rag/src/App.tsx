import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

import RAGChat from "./components/rag";
import GuidePage from "./components/guide/guide";
import CompanyPage from "./components/company/company";
import SoftSkillPage from "./components/softskill";
import SubjectNotes from "./components/guide/subjectnotes";

import "./style.css";
import "./style/guide.css";
import "./style/company.css";
import "./style/rag.css";
import "./style/softskill.css";

function NavigationTabs() {
  const location = useLocation();

  return (
    <nav className="tabs">
      <Link to="/" className={`tab ${location.pathname === "/" ? "active" : ""}`}>
        💬 RAG Chat
      </Link>

      <Link
        to="/guide"
        className={`tab ${
          location.pathname.startsWith("/guide") &&
          !location.pathname.includes("/guide/") ? "active" : ""
        }`}
      >
        🎓 4-Year Guide
      </Link>

      <Link
        to="/company"
        className={`tab ${location.pathname === "/company" ? "active" : ""}`}
      >
        🏢 Companies
      </Link>

      <Link
        to="/softskill"
        className={`tab ${location.pathname === "/softskill" ? "active" : ""}`}
      >
        📝 Soft Skills
      </Link>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <NavigationTabs />

        <Routes>
          {/* Main pages */}
          <Route path="/" element={<RAGChat />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/softskill" element={<SoftSkillPage />} />

          {/* Subject Notes (new full page) */}
          <Route path="/guide/:year/:subject" element={<SubjectNotes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
