import { fetchWithTimeout } from "./_shared";

export async function songfinderSearch(q) {
  const res = await fetchWithTimeout(`https://flac.zumy.dev/api/search?q=${encodeURIComponent(q)}`, {
    headers:{
      "accept":"*/*","content-type":"application/json",
      "referer":"https://flac.zumy.dev/",
      "user-agent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36"
    }
  });
  const data = await res.json();
  const tracks = data?.data?.tracks;
  if (!tracks?.length) throw new Error("Tidak ada lagu ditemukan");

  return tracks.map(t => ({
    name:       t.name,
    artists:    t.artists,
    album:      t.album_name,
    duration:   t.duration_ms,
    spotifyId:  t.spotify_id,
    cover:      t.images,
    type:       t.item_type
  }));
}
