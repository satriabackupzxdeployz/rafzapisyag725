import { fetchWithTimeout } from "./_shared";

export async function gptAiChat(message) {
  const clientId = Math.random().toString(36).substring(2,15);
  const chatId   = Math.floor(Math.random()*100000)+90000;
  const form     = new URLSearchParams({
    _wpnonce:"127cb03a82", post_id:"10", url:"https://gptaichat.org",
    action:"wpaicg_chat_shortcode_message", message, bot_id:"0",
    chatbot_identity:"shortcode", wpaicg_chat_history:"[]",
    wpaicg_chat_client_id: clientId, chat_id: chatId
  });

  const res = await fetchWithTimeout("https://gptaichat.org/wp-admin/admin-ajax.php", {
    method:"POST",
    headers:{
      "Content-Type":"application/x-www-form-urlencoded",
      "Accept":"text/event-stream",
      "User-Agent":"Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36"
    },
    body: form.toString()
  });

  const raw   = await res.text();
  let content = "";
  let model   = "unknown";

  for (const line of raw.split("\n")) {
    if (!line.startsWith("data: ")) continue;
    const chunk = line.slice(6);
    if (chunk === "[DONE]") break;
    try {
      const p = JSON.parse(chunk);
      if (p.model && model === "unknown") model = p.model;
      if (p.choices?.[0]?.delta?.content) content += p.choices[0].delta.content;
    } catch {}
  }

  if (!content) throw new Error("AI tidak memberikan respons");
  return { model, content: content.trim() };
}
