import { fetchWithTimeout } from "./_shared";

export async function deepimgGenerate(prompt) {
  const deviceId = `dev-${Math.floor(Math.random()*1000000)}`;
  const res = await fetchWithTimeout("https://api-preview.chatgot.io/api/v1/deepimg/flux-1-dev", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Origin":"https://deepimg.ai","Referer":"https://deepimg.ai/",
      "User-Agent":"Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36"
    },
    body: JSON.stringify({ prompt, size:"1024x1024", device_id:deviceId })
  });
  const data = await res.json();
  const imageUrl = data?.data?.images?.[0]?.url;
  if (!imageUrl) throw new Error("Gagal menghasilkan gambar dari DeepImg");
  return { prompt, model:"flux-1-dev", image:imageUrl };
}
