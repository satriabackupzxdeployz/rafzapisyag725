import { fetchWithTimeout } from "./_shared";

export async function twitterDownload(url) {
  // Use ssstwitter.com — simple and reliable
  const form = new URLSearchParams({ id: url });
  const res  = await fetchWithTimeout("https://ssstwitter.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer":      "https://ssstwitter.com/",
      "User-Agent":   "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36",
      "HX-Request":   "true",
      "HX-Target":    "target",
      "HX-Current-URL": "https://ssstwitter.com/"
    },
    body: form.toString()
  });
  if (!res.ok) throw new Error(`Upstream returned ${res.status}`);
  const html  = await res.text();

  const title = html.match(/<p[^>]*class="[^"]*maintext[^"]*"[^>]*>([\s\S]*?)<\/p>/)?.[1]?.trim() || null;
  const thumb = html.match(/<img[^>]* src="(https?:\/\/[^"]+)"/)?.[1] || null;

  const videos = [];
  const re = /href="(https?:\/\/[^"]+\.mp4[^"]*)"[^>]*>[\s\S]*?>([\w\s]+)</g;
  let m;
  while ((m = re.exec(html)) !== null) {
    videos.push({ url: m[1], quality: m[2].trim() });
  }

  // Fallback regex for any mp4 link
  if (!videos.length) {
    const rawMp4 = [...html.matchAll(/href="(https?:\/\/[^"]+\.mp4[^"]*)"/g)];
    for (const r of rawMp4) videos.push({ url: r[1], quality: "video" });
  }

  if (!videos.length) throw new Error("Tidak ada video ditemukan. Pastikan URL Twitter/X valid dan tweet berisi video");
  return { source: url, title, thumbnail: thumb, videos, video: videos[0]?.url };
}
