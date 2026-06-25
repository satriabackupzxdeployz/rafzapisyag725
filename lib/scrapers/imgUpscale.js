import { fetchWithTimeout } from "./_shared";

const UPLOAD = "https://get1.imglarger.com/api/UpscalerNew/UploadNew";
const STATUS = "https://get1.imglarger.com/api/UpscalerNew/CheckStatusNew";
const H = { "Origin":"https://imgupscaler.com","Referer":"https://imgupscaler.com/","User-Agent":"Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36" };

export async function imgUpscale(file, scale = 2) {
  const form = new FormData();
  form.append("myfile", file, file.name||"upload.png");
  form.append("scaleRadio", String(scale));

  const up = await fetchWithTimeout(UPLOAD, { method:"POST", headers:H, body:form });
  const upData = await up.json();
  if (upData.code !== 200 || !upData.data?.code) throw new Error("Gagal mengunggah gambar ke server upscaler");

  const jobCode = upData.data.code;
  for (let i = 0; i < 25; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const st = await fetchWithTimeout(STATUS, {
      method:"POST",
      headers:{ "Content-Type":"application/json", ...H },
      body: JSON.stringify({ code:jobCode, scaleRadio:scale })
    });
    const stData = await st.json();
    if (stData.code === 200 && stData.data?.status === "success") {
      return { scale, result: stData.data.downloadUrls[0] };
    }
  }
  throw new Error("Upscaler timeout — coba lagi dengan gambar yang lebih kecil");
}
