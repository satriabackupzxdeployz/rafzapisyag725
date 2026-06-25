import { fetchWithTimeout, UA } from "./_shared";

export async function getCnnNews() {
  const res = await fetchWithTimeout("https://www.cnnindonesia.com", {
    headers:{ "User-Agent":UA }
  });
  const html = await res.text();

  const articles = [];
  const articleRe = /<article[^>]*>([\s\S]*?)<\/article>/g;
  let m;
  while ((m = articleRe.exec(html)) !== null && articles.length < 10) {
    const block = m[1];
    const href  = block.match(/href="(https?:\/\/www\.cnnindonesia\.com\/[^"]+)"/)?.[1];
    const title = block.match(/<h2[^>]*>([^<]+)<\/h2>/)?.[1]?.trim();
    const img   = block.match(/<img[^>]* src="([^"]+)"/)?.[1];
    const cat   = block.match(/class="[^"]*text-cnn_red[^"]*"[^>]*>([^<]+)/)?.[1]?.trim();
    if (href && title) articles.push({ title, url:href, image:img||null, category:cat||null });
  }
  if (!articles.length) throw new Error("Tidak ada berita CNN yang dapat diambil saat ini");
  return articles;
}
