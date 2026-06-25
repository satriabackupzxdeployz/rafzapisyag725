import { uploadImage } from "@/lib/scrapers/uploader";
import { ok, fail, badRequest } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || typeof file === "string") return badRequest("Field 'file' (gambar) wajib diisi");
    if (!file.type?.startsWith("image/"))  return badRequest("File harus berupa gambar (jpg, png, gif, dll)");
    return ok(await uploadImage(file));
  } catch(e){ return fail(e.message); }
}
