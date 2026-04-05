export const SOFT_SKILL_QA = [
  {
    q: "Tell me about yourself.",
    a: "Use a concise 60–90s summary: background → key strengths → recent project → why this role.",
    sample:
      "I'm a final-year CS student who loves backend development. I recently built a room-booking app used by 800+ students. I enjoy designing clean APIs and working on system scalability. I'm excited about this role because your platform works with real-time distributed systems—exactly what I want to specialize in.",
  },
  {
    q: "Describe a conflict at work and how you resolved it.",
    a: "Apply STAR: Situation → Task → Action → Result. Show leadership, listening, clarity.",
    sample:
      "Two devs disagreed on GraphQL vs REST. I evaluated both with a 30-min tech spike and aligned on REST for MVP with a migration plan. We shipped on time and later adopted GraphQL for analytics only.",
  },
  {
    q: "Biggest weakness?",
    a: "Choose a real but non-critical weakness. Show improvement evidence.",
    sample:
      "I used to over-optimize early. I now profile first; recently added Redis caching only after proving DB latency was 40% of response time.",
  },
  {
    q: "Leadership example.",
    a: "Show influence without authority. Highlight results.",
    sample:
      "I led weekly bug-bashes with exit criteria and dashboards. Reduced open bugs by 35% in one month.",
  },
  {
    q: "Working under pressure.",
    a: "Show planning, time-boxing, risk communication.",
    sample:
      "During a hackathon, our auth failed. I split tasks into login, refresh, roles; fixed core in 90 minutes and still demoed.",
  },
  {
    q: "Time you failed.",
    a: "Own it. Show learning and new process.",
    sample:
      "Merged a feature without load testing—caused p95 latency spike. Wrote postmortem, added k6 stress tests to CI; never recurred.",
  },
  {
    q: "Handling feedback.",
    a: "Show maturity, curiosity, and improvement.",
    sample:
      "Mentor said my PRs were too large. I switched to small PRs with screenshots and a test plan. Review time dropped from 24h to 6h.",
  },
  {
    q: "Teamwork example.",
    a: "Highlight collaboration -> shared success.",
    sample:
      "Set clear definition of done, used Kanban, did daily 10-minute standups. Delivered MVP one week early.",
  },
  {
    q: "Communication with non-technical stakeholders.",
    a: "Explain technical ideas using analogies.",
    sample:
      "Explained rate limiting using a water bucket analogy to the dean. Helped secure approval for deployment.",
  },
  {
    q: "Why this company?",
    a: "Align your skills + mission + product.",
    sample:
      "Your privacy-first productivity model stands out. Your recent offline-sync feature impressed me; I built CRDT projects and would love to contribute.",
  },
];
