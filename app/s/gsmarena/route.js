import { gsmarenaSearch } from "@/lib/scrapers/gsmarena";
import { ok, fail, badRequest, getParam } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function GET(req) {
  const q = getParam(req,"q");
  if (!q) return badRequest("Parameter 'q' wajib diisi");
  try { return ok(await gsmarenaSearch(q)); } catch(e){ return fail(e.message); }
}
