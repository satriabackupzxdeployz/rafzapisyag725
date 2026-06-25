import { searchDrama } from "@/lib/scrapers/dramaSearch";
import { ok, fail, badRequest, getParam } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function GET(req) {
  const q    = getParam(req,"q");
  const lang = getParam(req,"lang");
  if (!q) return badRequest("Parameter 'q' wajib diisi");
  try { return ok(await searchDrama(q, lang || "in")); } catch(e){ return fail(e.message); }
}
