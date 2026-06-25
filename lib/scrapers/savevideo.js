import { fetchWithTimeout } from "./_shared";

export async function saveVideoDownload(url) {
  const res = await fetchWithTimeout(
    `https://api.v02.savethevideo.com/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin":  "https://www.savethevideo.com",
        "Referer": "https://www.savethevideo.com/",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36"
      },
      body: JSON.stringify({ type:"info", url })
    }
  );
  if (!res.ok) throw new Error(`SaveTheVideo gagal: HTTP ${res.status}`);
  const data = await res.json();
  if (data.state !== "completed" || !data.result?.length)
    throw new Error("Tidak ada video yang bisa diunduh dari URL ini");

  const v = data.result[0];
  return {
    title:     v.title,
    duration:  v.duration_string,
    thumbnail: v.thumbnail,
    formats:   (v.formats || []).map(f => ({
      url:        f.url,
      quality:    f.format,
      resolution: f.resolution,
      ext:        f.ext
    }))
  };
}
