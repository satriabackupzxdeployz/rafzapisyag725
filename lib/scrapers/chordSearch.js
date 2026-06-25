import { fetchWithTimeout, UA } from "./_shared";

const BASE = "https://www.gitagram.com";

export async function chordSearch(query) {
  const res = await fetchWithTimeout(`${BASE}/index.php?cat=&s=${encodeURIComponent(query)}`, {
    headers:{ "User-Agent":UA }
  });
  const html = await res.text();

  const results = [];
  const rowRe   = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
  let m;
  while ((m = rowRe.exec(html)) !== null) {
    const row   = m[1];
    const title  = row.match(/class="title is-6"[^>]*>([^<]+)/)?.[1]?.trim();
    const artist = row.match(/class="subtitle is-6"[^>]*>([\s\S]*?)<\/span>/)?.[1]?.replace(/[‣\s]+/g," ").trim();
    const href   = row.match(/href="([^"]+)"/)?.[1];
    if (title && href) {
      results.push({ title, artist:artist||null, url: href.startsWith("http")?href:`${BASE}${href}` });
    }
  }
  if (!results.length) throw new Error("Tidak ada chord ditemukan untuk query ini");
  return results.slice(0,10);
}
