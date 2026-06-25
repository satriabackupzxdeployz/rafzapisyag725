import { fetchWithTimeout } from "./_shared";

export async function instagramDownload(url) {
  const form = new URLSearchParams({ url, locale:"id", device_id:`web-${Date.now()}` });
  const res  = await fetchWithTimeout("https://snapsave.app/action_download.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin":  "https://snapsave.app",
      "Referer": "https://snapsave.app/id",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36"
    },
    body: form.toString()
  });
  if (!res.ok) throw new Error(`Upstream returned ${res.status}`);

  const html = await res.text();
  // snapsave returns HTML table with download links
  const medias = [];
  const rowRe  = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
  let m;
  while ((m = rowRe.exec(html)) !== null) {
    const row  = m[1];
    const href = row.match(/href="(https:\/\/[^"]+)"/)?.[1];
    const type = /video|mp4/i.test(row) ? "video" : "image";
    const qual = row.match(/>(SD|HD|Video|Photo|Image)<\/span/i)?.[1] || type;
    if (href) medias.push({ url: href, type, quality: qual });
  }

  // Fallback: try og:video or og:image via basic page scrape
  if (!medias.length) {
    const pageRes  = await fetchWithTimeout(url, {
      headers: { "User-Agent": "facebookexternalhit/1.1" }
    });
    const pageHtml = await pageRes.text();
    const vidUrl   = pageHtml.match(/"video_url":"([^"]+)"/)?.[1]?.replace(/\\u0026/g, "&");
    const imgUrl   = pageHtml.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    if (vidUrl) medias.push({ url: vidUrl, type: "video", quality: "SD" });
    if (imgUrl) medias.push({ url: imgUrl, type: "image", quality: "thumb" });
  }

  if (!medias.length) throw new Error("Tidak ada media ditemukan. Pastikan link Instagram valid dan akun publik");

  const video    = medias.find(m => m.type === "video");
  const images   = medias.filter(m => m.type === "image");

  return {
    source:    url,
    isVideo:   Boolean(video),
    video:     video?.url || null,
    thumbnail: images[0]?.url || null,
    images:    images.map(i => i.url),
    all:       medias
  };
}
