import { fetchWithTimeout } from "./_shared";

const BASE = "https://tikwm.com";

async function callApi(url) {
  const res = await fetchWithTimeout(`${BASE}/api?url=${encodeURIComponent(url)}&hd=1`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Referer": `${BASE}/`
    }
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error(data.msg || "Gagal mengambil data dari TikTok");
  return data.data;
}

export async function tiktokDownload(url) {
  const v = await callApi(url);
  return {
    source:    url,
    id:        v.id,
    title:     v.title,
    author:    v.author?.nickname || null,
    username:  v.author?.unique_id || null,
    thumbnail: v.cover,
    video:     `${BASE}${v.play}`,
    videoHD:   `${BASE}${v.hdplay}`,
    videoWM:   `${BASE}${v.wmplay}`,
    audio:     v.music ? `${BASE}${v.music}` : null,
    stats: {
      play:    v.play_count,
      like:    v.digg_count,
      comment: v.comment_count,
      share:   v.share_count
    }
  };
}
