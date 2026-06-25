import { imgUpscale } from "@/lib/scrapers/imgUpscale";
import { ok, fail, badRequest } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function POST(req) {
  try {
    const form  = await req.formData();
    const file  = form.get("file");
    const scale = Number(form.get("scale") || 2);
    if (!file || typeof file === "string") return badRequest("Form field 'file' (gambar) wajib diisi");
    if (!file.type?.startsWith("image/"))  return badRequest("File harus berupa gambar");
    if (![2,4].includes(scale))            return badRequest("Scale hanya boleh 2 atau 4");
    return ok(await imgUpscale(file, scale));
  } catch(e){ return fail(e.message); }
}
