import { translappProcess } from "@/lib/scrapers/aiTranslate";
import { ok, fail, badRequest, getParam } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function GET(req) {
  const text = getParam(req,"text");
  const mode = getParam(req,"mode");
  const to   = getParam(req,"to");
  if (!text) return badRequest("Parameter 'text' wajib diisi");
  try { return ok(await translappProcess(text, mode||"TRANSLATE", to||"English")); } catch(e){ return fail(e.message); }
}
