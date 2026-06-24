const API_URL = "http://127.0.0.1:8001";

console.log("API_URL =", API_URL);

export async function askChat(message: string) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  return res.json();
}

export async function runVisualizer(code: string) {
  const res = await fetch(`${API_URL}/api/run-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source: code }),
  });

  return res.json();
}