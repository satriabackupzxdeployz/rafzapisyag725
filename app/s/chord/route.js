import { chordSearch } from "@/lib/scrapers/chordSearch";
import { ok, fail, badRequest, getParam } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function GET(req) {
  const q = getParam(req,"q");
  if (!q) return badRequest("Parameter 'q' wajib diisi");
  try { return ok(await chordSearch(q)); } catch(e){ return fail(e.message); }
}
