import { fetchWithTimeout } from "./_shared";

const CATBOX = "https://catbox.moe/user/api.php";

// Catbox.moe sebagai primary uploader — public, gratis, reliable
export async function uploadToCatbox(file) {
  const form = new FormData();
  form.append("reqtype",       "fileupload");
  form.append("fileToUpload",  file, file.name || "upload");

  const res  = await fetchWithTimeout(CATBOX, { method:"POST", body:form });
  const text = (await res.text()).trim();
  if (!res.ok || !text.startsWith("http")) throw new Error(text || `Upload gagal: HTTP ${res.status}`);
  return { url:text, name:file.name||null, size:file.size??null, type:file.type||null };
}

// Alias untuk semua tipe file
export const uploadImage = uploadToCatbox;
export const uploadVideo = uploadToCatbox;
export const uploadFile  = uploadToCatbox;
