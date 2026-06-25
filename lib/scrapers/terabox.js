import { fetchWithTimeout } from "./_shared";

export async function teraboxDownload(url) {
  const res = await fetchWithTimeout(
    `https://teradownloader.net/api/parse?link=${encodeURIComponent(url)}`,
    {
      headers: {
        "User-Agent":"Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36",
        "Referer":"https://teradownloader.net/"
      }
    }
  );
  if (!res.ok) throw new Error(`TeraBox downloader gagal: HTTP ${res.status}`);
  const data = await res.json();
  if (!data) throw new Error("Tidak ada data dari TeraBox. Pastikan link valid dan file publik");
  return data;
}
