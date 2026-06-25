import { fetchWithTimeout } from "./_shared";

function genId() { return Math.random().toString(36).substring(2,14); }

function getVersion() {
  const d = new Date();
  const ds = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;
  return `interface@${ds}.230844+7989322`;
}

export async function veniceChat(prompt, model = "dolphin-3.0-mistral-24b") {
  const res = await fetchWithTimeout("https://outerface.venice.ai/api/inference/chat", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "X-Venice-Version": getVersion(),
      "User-Agent":"Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36",
      "Referer":"https://venice.ai/"
    },
    body: JSON.stringify({
      requestId: genId(), conversationType:"text", type:"text",
      modelId: model, modelName:"Venice Uncensored", modelType:"text",
      prompt:[{ content:prompt, role:"user" }], systemPrompt:"",
      messageId: genId(), includeVeniceSystemPrompt:true,
      isCharacter:false, userId:`user_anon_${Math.floor(Math.random()*1e9)}`,
      simpleMode:false, webEnabled:true, reasoning:true
    })
  });
  const raw = await res.text();

  let text = "";
  let refs = [];
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      const p = JSON.parse(line);
      if (p.kind === "content" && p.content) text += p.content;
      if (p.kind === "meta" && p.references) refs = p.references;
    } catch {}
  }

  if (!text) throw new Error("Tidak ada respons dari Venice AI");
  return { model, answer: text.trim(), references: refs };
}
