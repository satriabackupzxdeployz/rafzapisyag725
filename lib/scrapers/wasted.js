import { fetchWithTimeout } from "./_shared";

export async function wastedEffect(avatarUrl) {
  const resultUrl = `https://some-random-api.com/canvas/wasted?avatar=${encodeURIComponent(avatarUrl)}`;
  const check = await fetchWithTimeout(resultUrl, { method:"HEAD" });
  if (!check.ok) throw new Error("Server efek wasted tidak dapat dijangkau");
  return { avatar: avatarUrl, result: resultUrl, note:"URL ini langsung mengembalikan gambar PNG efek wasted GTA" };
}
