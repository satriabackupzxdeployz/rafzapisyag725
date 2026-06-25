import { fetchWithTimeout } from "./_shared";

export async function tiktokVideoSearch(keywords, count = 12) {
  const payload = new URLSearchParams({ keywords, count, cursor:0, HD:1 });
  const res = await fetchWithTimeout("https://tikwm.com/api/feed/search", {
    method:"POST",
    headers:{
      "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Cookie":"current_language=en"
    },
    body: payload.toString()
  });
  const data = await res.json();
  const videos = data?.data?.videos;
  if (!videos?.length) throw new Error("Tidak ada video TikTok ditemukan");

  return videos.map(v => ({
    id:       v.video_id,
    title:    v.title || "No Title",
    cover:    v.cover,
    duration: v.duration,
    author: { id:v.author.id, username:v.author.unique_id, name:v.author.nickname },
    media: {
      noWatermark: `https://tikwm.com${v.play}`,
      watermark:   `https://tikwm.com${v.wmplay}`,
      hd:          `https://tikwm.com${v.hdplay}`,
      music:       v.music
    },
    stats: { play:v.play_count, like:v.digg_count, comment:v.comment_count, share:v.share_count }
  }));
}
