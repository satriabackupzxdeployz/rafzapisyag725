import { fetchWithTimeout } from "./_shared";

export async function facebookDownload(url) {
  // Primary: fdownloader.net
  const form = new URLSearchParams({ url });
  const res  = await fetchWithTimeout("https://fdownloader.net/api/ajaxSearch", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin":  "https://fdownloader.net",
      "Referer": "https://fdownloader.net/",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36"
    },
    body: form.toString()
  });

  if (!res.ok) throw new Error(`Upstream returned ${res.status}`);
  const html = await res.text();

  const qualities = [];
  // Extract all download links from response HTML
  const linkRe = /href="(https:\/\/[^"]+)"[^>]*>[\s\S]*?(HD|SD|[0-9]+p)/gi;
  let m;
  while ((m = linkRe.exec(html)) !== null) {
    const label = m[2].toUpperCase();
    qualities.push({ label, url: m[1] });
  }

  // Also try simple a[href] containing .mp4 or known CDN patterns
  const rawLinks = [...html.matchAll(/href="(https?:\/\/[^"]+(?:\.mp4|\/download\/)[^"]*)"/g)];
  for (const rl of rawLinks) {
    if (!qualities.find(q => q.url === rl[1]))
      qualities.push({ label: "VIDEO", url: rl[1] });
  }

  const thumb = html.match(/<img[^>]* src="(https?:\/\/[^"]+)"/)?.[1] || null;

  if (!qualities.length) throw new Error("Tidak ada video yang bisa diunduh dari link Facebook ini");

  const hd = qualities.find(q => /hd|720/i.test(q.label));
  const sd = qualities.find(q => /sd|360/i.test(q.label));

  return {
    source:    url,
    thumbnail: thumb,
    video:     hd?.url || sd?.url || qualities[0]?.url || null,
    videoHD:   hd?.url || null,
    videoSD:   sd?.url || null,
    qualities
  };
}
