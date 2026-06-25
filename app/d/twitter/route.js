import { twitterDownload } from "@/lib/scrapers/twitter";
import { ok, fail, badRequest, getParam } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function GET(req) {
  const url = getParam(req,"url");
  if (!url) return badRequest("Parameter 'url' wajib diisi");
  try { return ok(await twitterDownload(url)); } catch(e){ return fail(e.message); }
}
