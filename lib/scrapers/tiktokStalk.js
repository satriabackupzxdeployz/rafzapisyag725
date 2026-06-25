import { UA, fetchWithTimeout } from "./_shared";

const BASE = "https://tokviewer.net/api";

const HEADERS = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
  "User-Agent": UA,
  Origin: "https://tokviewer.net",
  Referer: "https://tokviewer.net/"
};

export async function tiktokStalk(username) {
  const profileResponse = await fetchWithTimeout(`${BASE}/check-profile`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ username })
  });
  const profile = await profileResponse.json();

  if (profile.status !== 200 || !profile.data) {
    throw new Error("TikTok profile not found");
  }

  const videoResponse = await fetchWithTimeout(`${BASE}/video`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ username, offset: 0, limit: 10 })
  });
  const videoData = await videoResponse.json();

  return {
    username,
    avatar: profile.data.avatar,
    followers: profile.data.followers,
    following: profile.data.following,
    likes: profile.data.likes,
    videos: (videoData.data || []).map((video) => ({
      cover: video.cover,
      downloadUrl: video.downloadUrl
    })),
    hasMore: Boolean(videoData.has_more)
  };
}
