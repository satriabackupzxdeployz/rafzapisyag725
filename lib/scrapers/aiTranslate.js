import { createHash } from "node:crypto";
import { fetchWithTimeout } from "./_shared";

function genKey(text) {
  const s = text.length >= 5 ? text.substring(0,5) : "O".repeat(5-text.length)+text;
  return createHash("sha256").update(`${s}ZERO`,"utf8").digest("hex");
}

export async function translappProcess(text, mode = "TRANSLATE", to = "English") {
  const res = await fetchWithTimeout("https://translapp.info/ai/g/ask", {
    method:"POST",
    headers:{ "User-Agent":"Postify/1.0.0","Content-Type":"application/json" },
    body: JSON.stringify({
      k: genKey(text), module:mode.toUpperCase(), text, to,
      userId:`GALAXY_AI${Math.random().toString(36).slice(2)}`
    })
  });
  const data = await res.json();
  if (!data.message) throw new Error("Tidak ada output dari TranslApp");
  return { module:mode, input:text, to, output:data.message };
}
