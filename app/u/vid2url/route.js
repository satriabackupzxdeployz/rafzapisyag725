import { uploadVideo } from "@/lib/scrapers/uploader";
import { ok, fail, badRequest } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || typeof file === "string") return badRequest("Field 'file' (video) wajib diisi");
    if (!file.type?.startsWith("video/"))  return badRequest("File harus berupa video (mp4, webm, dll)");
    return ok(await uploadVideo(file));
  } catch(e){ return fail(e.message); }
}
