// ==========================================
// RAG Chatbot (standalone utilities)
// ==========================================
// This file provides:
// 1) mockRagSearch() → fake RAG logic
// 2) shuffleArray()  → helper function
// You can import these anywhere in your React project.

// ==========================================
// 1) Mock RAG Search Function
// ==========================================

export async function mockRagSearch(
  query: string,
  code: string
): Promise<{ snippets: any[]; answer: string }> {
  
  // Fake retrieved code snippets
  const snippets = [
    {
      id: "1",
      title: "Two Sum — HashMap Optimization",
      content:
        "Use HashMap to check if complement exists in O(1). Complexity → O(n).",
      score: 0.92,
    },
    {
      id: "2",
      title: "Time Complexity Basics",
      content: "Single loop → O(n). Nested loop → O(n²).",
      score: 0.88,
    },
  ];

  // Show first 120 chars of user code
  const shortCode =
    code?.trim().length
      ? code.slice(0, 120) + (code.length > 120 ? "…" : "")
      : "";

  // Simulated answer
  const answer =
    `🧠 **Analysis for your query:** "${query}"\n\n` +
    `✔ **Task:** Finds two indices whose values add to the target.\n` +
    `✔ **Strategy:** Iterate once, check complement using a Map.\n` +
    `✔ **Time Complexity:** O(n)\n` +
    `✔ **Space Complexity:** O(n)\n\n` +
    (shortCode
      ? `📌 **Your Code Snippet:**\n${shortCode}`
      : `Paste some code to get deeper insights.`);

  // Simulate delay
  return new Promise((resolve) =>
    setTimeout(() => resolve({ snippets, answer }), 400)
  );
}

// ==========================================
// 2) Helper: Shuffle Array (Fisher–Yates)
// ==========================================

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]; // clone
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // swap a[i] <-> a[j]
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
