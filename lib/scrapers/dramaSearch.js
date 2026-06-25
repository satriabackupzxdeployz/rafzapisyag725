import { fetchWithTimeout } from "./_shared";

const BASE = "https://dramabox.dramabos.my.id";
const H = {
  "accept":"*/*","origin":BASE,"referer":`${BASE}/`,
  "user-agent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36"
};

export async function searchDrama(query, lang = "in") {
  const res = await fetchWithTimeout(`${BASE}/api/v1/search?query=${encodeURIComponent(query)}&lang=${lang}`, { headers:H });
  const data = await res.json();
  if (!data) throw new Error("Tidak ada drama ditemukan");
  return data;
}
