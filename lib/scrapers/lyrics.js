import { fetchWithTimeout } from "./_shared";

export async function searchLyrics(query) {
  const response = await fetchWithTimeout(`https://lrclib.net/api/search?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error(`Upstream returned ${response.status}`);
  }

  const data = await response.json();
  const song = data?.[0];

  if (!song) {
    throw new Error("No lyrics found for this query");
  }

  const raw = song.plainLyrics || song.syncedLyrics;
  if (!raw) {
    throw new Error("This track has no lyrics available");
  }

  const lyrics = raw.replace(/\[.*?\]/g, "").trim();

  return {
    title: song.trackName,
    artist: song.artistName,
    album: song.albumName,
    duration:
      typeof song.duration === "number"
        ? `${Math.floor(song.duration / 60)}:${String(song.duration % 60).padStart(2, "0")}`
        : null,
    lyrics
  };
}
