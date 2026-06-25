import { fetchWithTimeout } from "./_shared";

export async function threadsDownload(url) {
  // Use snapinsta approach via getinsta.net
  const form = new URLSearchParams({ url, lang:"id" });
  const res  = await fetchWithTimeout("https://threadssavedownloader.com/wp-json/dl/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin":  "https://threadssavedownloader.com",
      "Referer": "https://threadssavedownloader.com/",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36"
    },
    body: form.toString()
  });

  // Fallback: try og meta from Threads itself
  if (!res.ok) {
    const pageRes  = await fetchWithTimeout(url, {
      headers: { "User-Agent":"facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)" }
    });
    const pageHtml = await pageRes.text();
    const video = pageHtml.match(/<meta property="og:video"[^>]* content="([^"]+)"/)?.[1];
    const image = pageHtml.match(/<meta property="og:image"[^>]* content="([^"]+)"/)?.[1];
    const title = pageHtml.match(/<meta property="og:title"[^>]* content="([^"]+)"/)?.[1];
    if (!video && !image) throw new Error("Tidak ada media yang bisa diunduh dari Threads ini");
    return { source:url, title: title||null, video:video||null, image:image||null, download: video||image };
  }

  const data = await res.json();
  if (!data) throw new Error("Tidak ada media yang bisa diunduh dari link Threads ini");
  return { source:url, ...data };
}
