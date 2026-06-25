import { fetchWithTimeout } from "./_shared";

const BASE = "https://api.fabdl.com";

export async function spotifyDownload(url) {
  const r1   = await fetchWithTimeout(`${BASE}/spotify/get?url=${encodeURIComponent(url)}`);
  if (!r1.ok) throw new Error(`Spotify info gagal: HTTP ${r1.status}`);
  const info = await r1.json();
  const t    = info?.result;
  if (!t?.gid || !t?.id) throw new Error("URL Spotify tidak valid atau lagu tidak ditemukan");

  const r2  = await fetchWithTimeout(`${BASE}/spotify/mp3-convert-task/${t.gid}/${t.id}`);
  if (!r2.ok) throw new Error(`Konversi Spotify gagal: HTTP ${r2.status}`);
  const dl  = await r2.json();
  const dlPath = dl?.result?.download_url;
  if (!dlPath) throw new Error("Link download Spotify tidak tersedia");

  return {
    title:      t.title,
    artists:    t.artists,
    album:      t.album,
    durationMs: t.duration_ms,
    cover:      t.image,
    audio:      dlPath.startsWith("http") ? dlPath : `${BASE}${dlPath}`
  };
}
