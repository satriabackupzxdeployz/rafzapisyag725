import { fetchWithTimeout } from "./_shared";

export async function gsmarenaSearch(query) {
  const res = await fetchWithTimeout(`https://m.gsmarena.com/search-json.php3?sSearch=${encodeURIComponent(query)}`, {
    headers:{
      "accept":"*/*",
      "user-agent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36",
      "referer":"https://m.gsmarena.com/"
    }
  });
  const data = await res.json();
  if (!data) throw new Error("Tidak ada perangkat ditemukan di GSMArena");
  return data;
}
