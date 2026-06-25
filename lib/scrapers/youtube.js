import { createDecipheriv } from "node:crypto";
import { fetchWithTimeout, extractYoutubeId } from "./_shared";

const KEY      = Buffer.from("C5D58EF67A7584E4A29F6C35BBC4EB12", "hex");
const FALLBACK = "d2.savetube.me";

function decrypt(b64) {
  const raw  = Buffer.from(b64, "base64");
  const iv   = raw.subarray(0, 16);
  const data = raw.subarray(16);
  const d    = createDecipheriv("aes-128-cbc", KEY, iv);
  return JSON.parse(Buffer.concat([d.update(data), d.final()]).toString("utf-8"));
}

async function getCdn() {
  try {
    const r = await fetchWithTimeout("https://media.savetube.me/api/random-cdn", {}, 8000);
    const d = await r.json();
    return d?.cdn || FALLBACK;
  } catch { return FALLBACK; }
}

async function getInfo(url) {
  const cdn = await getCdn();
  const r   = await fetchWithTimeout(`https://${cdn}/v2/info`, {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body:   JSON.stringify({ url })
  });
  if (!r.ok) throw new Error(`YouTube info gagal: HTTP ${r.status}`);
  const res = await r.json();
  if (!res.status) throw new Error(res.message || "Gagal mendapatkan info YouTube");
  const dec = decrypt(res.data);
  return { cdn, title: dec.title, duration: dec.durationLabel, thumbnail: dec.thumbnail, key: dec.key };
}

async function getDl(cdn, key, quality, type) {
  const r = await fetchWithTimeout(`https://${cdn}/download`, {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body:   JSON.stringify({ downloadType: quality === "128" ? "audio" : type, quality, key })
  });
  if (!r.ok) throw new Error(`YouTube download gagal: HTTP ${r.status}`);
  const res = await r.json();
  if (!res.status) throw new Error(res.message || "Gagal membuat link download");
  return res.data.downloadUrl;
}

export async function youtubeInfo(input) {
  const id = extractYoutubeId(input);
  if (!id) throw new Error("URL atau ID YouTube tidak valid");
  const url  = `https://www.youtube.com/watch?v=${id}`;
  const info = await getInfo(url);
  return {
    source:    url,
    videoId:   id,
    title:     info.title,
    duration:  info.duration,
    thumbnail: info.thumbnail || `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
  };
}

export async function youtubeDownload(input, quality, type) {
  const id   = extractYoutubeId(input);
  if (!id) throw new Error("URL atau ID YouTube tidak valid");
  const url  = `https://www.youtube.com/watch?v=${id}`;
  const info = await getInfo(url);
  const dl   = await getDl(info.cdn, info.key, quality, type);
  return {
    source:    url,
    videoId:   id,
    title:     info.title,
    duration:  info.duration,
    thumbnail: info.thumbnail || `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    quality, type,
    download:  dl
  };
}
