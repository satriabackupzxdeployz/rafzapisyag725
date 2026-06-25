import { fetchWithTimeout } from "./_shared";

export async function pinterestDownload(url) {
  // Resolve shortened pin.it URLs
  let finalUrl = url;
  if (url.includes("pin.it/")) {
    const r = await fetchWithTimeout(url, { headers: { "User-Agent":"Mozilla/5.0" }, redirect:"follow" });
    finalUrl = r.url || url;
  }

  const res = await fetchWithTimeout(
    `https://api.pinterestdownloader.io/id/download?url=${encodeURIComponent(finalUrl)}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36",
        "Referer": "https://pinterestdownloader.io/"
      }
    }
  );
  if (!res.ok) throw new Error(`Pinterest downloader gagal: HTTP ${res.status}`);
  const data = await res.json();
  if (!data?.medias?.length) throw new Error("Media Pinterest tidak ditemukan. Pastikan PIN publik dan URL valid");

  return {
    title:     data.title || null,
    thumbnail: data.thumbnail || data.medias?.[0]?.url || null,
    media:     data.medias.map(m => ({
      url:       m.url,
      quality:   m.quality || "original",
      extension: m.extension || "jpg",
      size:      m.formattedSize || null,
      type:      (m.extension === "mp4") ? "video" : "image"
    }))
  };
}
