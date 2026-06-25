import { fetchWithTimeout } from "./_shared";

const BASE    = "https://api.heckai.weight-wave.com/api/ha/v1";
const MODELS  = ["x-ai/grok-3-mini-beta","x-ai/grok-3-beta","meta-llama/llama-4-scout"];
const DEFAULT = MODELS[0];

async function createSession() {
  try {
    const r = await fetchWithTimeout(`${BASE}/session/create`, {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ title:`RAFZ_${Date.now()}` })
    }, 8000);
    const d = await r.json();
    return d?.id || null;
  } catch { return null; }
}

export async function aiChat(prompt, model) {
  const activeModel = MODELS.includes(model) ? model : DEFAULT;
  const sessionId   = await createSession();

  const res = await fetchWithTimeout(`${BASE}/chat`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ model:activeModel, question:prompt, language:"Indonesian", sessionId })
  });
  if (!res.ok) throw new Error(`AI Chat gagal: HTTP ${res.status}`);
  const raw = await res.text();

  const lines = raw.split("\n");
  let answer  = "";
  let capture = false;
  for (const line of lines) {
    if (!line.startsWith("data: ")) continue;
    const chunk = line.slice(6).trim();
    if (chunk === "[ANSWER_START]") { capture = true; continue; }
    if (chunk === "[ANSWER_DONE]")  { capture = false; break; }
    if (capture) answer += chunk;
  }

  if (!answer.trim()) throw new Error("AI tidak memberikan respons");
  return { model:activeModel, sessionId, answer:answer.replace(/\\n/g,"\n").trim() };
}
