import { fetchWithTimeout } from "./_shared";

export async function mediafireDownload(url) {
  const res  = await fetchWithTimeout(url, {
    headers: { "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
  });
  if (!res.ok) throw new Error(`Halaman MediaFire tidak dapat diakses: HTTP ${res.status}`);
  const html = await res.text();

  // Extract download button href — ID is downloadButton or dlbutton
  const dlHref = html.match(/id=["']downloadButton["'][^>]* href="([^"]+)"/)?.[1]
               || html.match(/href="([^"]+)"[^>]*id=["']downloadButton["']/)?.[1]
               || html.match(/https:\/\/download[0-9]*.mediafire\.com\/[^"'\s]+/)?.[0];

  if (!dlHref) throw new Error("Link download MediaFire tidak ditemukan. File mungkin dihapus atau private");

  const title = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1]
              || html.match(/<div class="filename">([^<]+)<\/div>/)?.[1]?.trim()
              || null;
  const size  = html.match(/class="download-file-info"[^>]*>[^<]*<[^>]+>([0-9.,]+ [KMG]B)/)?.[1]
              || html.match(/([0-9.,]+ [KMGT]B)/)?.[1] || null;

  return {
    title,
    size,
    download: dlHref.startsWith("http") ? dlHref : `https://www.mediafire.com${dlHref}`
  };
}
