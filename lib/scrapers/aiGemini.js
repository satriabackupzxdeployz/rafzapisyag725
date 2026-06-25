import { fetchWithTimeout } from "./_shared";

const MODELS = ["gemini-2.5-flash","gemini-2.5-flash-lite","gemini-2.5-pro"];

export async function geminiChat(message, model = "gemini-2.5-flash") {
  if (!MODELS.includes(model)) model = MODELS[0];

  const res = await fetchWithTimeout("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY || ""
    },
    body: JSON.stringify({
      contents: [{ parts:[{ text: message }] }],
      generationConfig: { temperature:0.9, topK:1, topP:1, maxOutputTokens:2048 }
    })
  });

  // Fallback jika tidak ada API key — pakai proxy publik
  if (!res.ok || !process.env.GEMINI_API_KEY) {
    const fallback = await fetchWithTimeout(
      `https://ai.google.dev/api/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyDdHAGMFnOuEYAIVHTzIbBJYUkNuJoMnI4`,
      {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ contents:[{ parts:[{ text:message }] }] })
      }
    );
    if (!fallback.ok) throw new Error("Gemini AI tidak tersedia. Atur GEMINI_API_KEY di environment variables.");
    const fd = await fallback.json();
    const answer = fd?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!answer) throw new Error("Tidak ada respons dari Gemini AI");
    return { model:"gemini-1.5-flash (fallback)", answer };
  }

  const data   = await res.json();
  const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!answer) throw new Error("Tidak ada respons dari Gemini AI");
  return { model, answer };
}
