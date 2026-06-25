import { tiktokVideoSearch } from "@/lib/scrapers/tiktokSearch";
import { ok, fail, badRequest, getParam } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function GET(req) {
  const q     = getParam(req,"q");
  const count = getParam(req,"count");
  if (!q) return badRequest("Parameter 'q' wajib diisi");
  try { return ok(await tiktokVideoSearch(q, count ? Number(count) : 12)); } catch(e){ return fail(e.message); }
}
