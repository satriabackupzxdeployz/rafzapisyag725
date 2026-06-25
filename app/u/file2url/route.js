import { uploadFile } from "@/lib/scrapers/uploader";
import { ok, fail, badRequest } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || typeof file === "string") return badRequest("Field 'file' wajib diisi");
    return ok(await uploadFile(file));
  } catch(e){ return fail(e.message); }
}
