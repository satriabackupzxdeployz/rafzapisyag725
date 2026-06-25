import { wastedEffect } from "@/lib/scrapers/wasted";
import { ok, fail, badRequest, getParam } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function GET(req) {
  const url = getParam(req,"url");
  if (!url) return badRequest("Parameter 'url' (URL avatar/foto) wajib diisi");
  try { return ok(await wastedEffect(url)); } catch(e){ return fail(e.message); }
}
