import { fetchWithTimeout } from "./_shared";

const REFRESH_TOKEN = process.env.SIMSIMI_REFRESH_TOKEN || "";
const API_KEY       = process.env.SIMSIMI_API_KEY       || "";
const SIGNATURE     = process.env.SIMSIMI_SIGNATURE     || "";
const UID           = 509694418;

let _token = null;

async function refreshAuth() {
  if (!REFRESH_TOKEN || !API_KEY) throw new Error("SIMSIMI_REFRESH_TOKEN dan SIMSIMI_API_KEY belum diatur di environment variables");
  const res = await fetchWithTimeout(
    `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
    { method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ grant_type:"refresh_token", refresh_token:REFRESH_TOKEN }) }
  );
  const d = await res.json();
  if (!d.access_token) throw new Error("Gagal refresh token SimiSimi — token mungkin sudah expired");
  _token = d.access_token;
  return _token;
}

export async function simsimiChat(text) {
  if (!_token) await refreshAuth();
  const res = await fetchWithTimeout(
    "https://kube-appserver.simsimi.com:30443/ai_character/send_chat_message/stream",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${_token}`,
        "X-Signature": SIGNATURE,
        "X-Client-Platform":"web"
      },
      body: JSON.stringify({
        av:"9.2.6", cc:"KR", lc:"id", logUID:String(UID),
        os:"a", reg_now_days:0, tz:"Asia/Seoul", uid:UID,
        character_id:9075, message:text, is_live_chat:false, cv:""
      })
    }
  );
  const raw = await res.text();
  if (raw.includes("data:402")) throw new Error("Point SimiSimi habis — coba lagi beberapa saat");
  const match = raw.split("\n").find(l => l.startsWith("data: {"));
  if (!match) throw new Error("Tidak ada respons dari SimiSimi");
  const json = JSON.parse(match.replace("data: ",""));
  return { answer: json.content };
}
