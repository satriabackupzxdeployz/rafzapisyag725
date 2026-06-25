import { fetchWithTimeout } from "./_shared";

const HOST = "https://host.optikl.ink";

export async function soundcloudSearch(query) {
  const res = await fetchWithTimeout(`${HOST}/soundcloud/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`Upstream returned ${res.status}`);
  const data = await res.json();
  if (!data?.length) throw new Error("Tidak ada lagu SoundCloud ditemukan");
  return data;
}

export async function soundcloudSearchDownload(url) {
  const res = await fetchWithTimeout(`${HOST}/soundcloud/download?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(`Upstream returned ${res.status}`);
  const data = await res.json();
  if (!data) throw new Error("Gagal mendapatkan link download SoundCloud");
  return data;
}
