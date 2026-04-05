export async function askChat(message: string) {
  const res = await fetch("http://127.0.0.1:8000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  return res.json();
}

export async function runVisualizer(code: string) {
  const res = await fetch("http://127.0.0.1:8000/api/run-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source: code }),
  });

  return res.json();
}
