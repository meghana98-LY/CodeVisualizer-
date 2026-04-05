export const GUIDE: Record<string, {
  subjects: string[];
  projects: string[];
  notes: string;
}> = {
  "1Year": {
    subjects: ["Programming Basics", "Discrete Math", "Calculus", "Digital Logic", "Linux"],
    projects: ["Personal portfolio", "CLI to-do app", "Static website with forms"],
    notes: "Focus on fundamentals and habits: Git, Linux, problem solving."
  },

  "2Year": {
    subjects: ["DSA", "OOP", "Networks", "DBMS", "Web Basics"],
    projects: ["CRUD App", "SQL Project", "Mini REST API"],
    notes: "Start competitive programming and build real full-stack apps."
  },

  "3Year": {
    subjects: ["Operating Systems", "Advanced Networks", "Cloud", "Backend Services"],
    projects: ["Microservice", "RAG mini-project", "DevOps CI/CD pipeline"],
    notes: "Focus on internships, system design, cloud certifications."
  },

  "4Year": {
    subjects: ["Distributed Systems", "Security", "DevOps", "ML Basics"],
    projects: ["Capstone Project", "Open-source Contribution"],
    notes: "Prepare for placements. Do mock interviews weekly."
  }
};
