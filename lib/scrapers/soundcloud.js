import { fetchWithTimeout } from "./_shared";

const WIDGET = "https://api-widget.soundcloud.com";
const CLIENT = "VBqCJAtWPqllxkQNZPhxkGMGMqoRKNMO"; // public widget client_id

async function resolve(url) {
  const r = await fetchWithTimeout(
    `${WIDGET}/resolve?url=${encodeURIComponent(url)}&format=json&client_id=${CLIENT}`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  );
  if (!r.ok) throw new Error(`SoundCloud resolve gagal: HTTP ${r.status}`);
  return r.json();
}

async function getStream(trackId) {
  const r = await fetchWithTimeout(
    `${WIDGET}/tracks/${trackId}/streams?client_id=${CLIENT}`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  );
  if (!r.ok) throw new Error(`SoundCloud stream gagal: HTTP ${r.status}`);
  return r.json();
}

export async function soundcloudDownload(url) {
  const info    = await resolve(url);
  if (!info.id) throw new Error("Lagu SoundCloud tidak ditemukan atau akun private");
  const streams = await getStream(info.id);
  const mp3url  = streams?.http_mp3_128_url || streams?.hls_mp3_128_url || null;
  if (!mp3url) throw new Error("Stream SoundCloud tidak tersedia untuk lagu ini");
  return {
    title:    info.title,
    artist:   info.user?.username || null,
    cover:    info.artwork_url?.replace("-large", "-t500x500") || null,
    duration: info.duration,
    audio:    mp3url,
    waveform: info.waveform_url || null
  };
}
