import { fetchWithTimeout } from "./_shared";

export async function aiTextToImage(prompt, ratio = "1:1") {
  const res = await fetchWithTimeout(
    "https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image",
    {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ prompt, aspect_ratio:ratio })
    }
  );
  if (!res.ok) throw new Error(`Image generation gagal: HTTP ${res.status}`);
  const data = await res.json();
  if (!data?.image_link) throw new Error("Tidak ada gambar yang dihasilkan");
  return { prompt, ratio, image:data.image_link };
}
