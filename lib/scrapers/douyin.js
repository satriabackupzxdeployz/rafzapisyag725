import { fetchWithTimeout } from "./_shared";

export async function douyinDownload(url) {
  // Douyin resolves via tikwm.com which supports both TikTok and Douyin URLs
  const res  = await fetchWithTimeout(
    `https://tikwm.com/api?url=${encodeURIComponent(url)}&hd=1`,
    { headers: { "User-Agent":"Mozilla/5.0", "Referer":"https://tikwm.com/" } }
  );
  if (!res.ok) throw new Error(`Douyin downloader gagal: HTTP ${res.status}`);
  const data = await res.json();
  if (data.code !== 0) throw new Error(data.msg || "Video Douyin tidak ditemukan atau private");
  const v = data.data;
  return {
    source:    url,
    title:     v.title,
    author:    v.author?.nickname || null,
    thumbnail: v.cover,
    video:     `https://tikwm.com${v.play}`,
    videoHD:   `https://tikwm.com${v.hdplay}`,
    audio:     v.music ? `https://tikwm.com${v.music}` : null
  };
}
