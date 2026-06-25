import { veniceChat } from "@/lib/scrapers/aiVenice";
import { ok, fail, badRequest, getParam } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function GET(req) {
  const text  = getParam(req,"text");
  const model = getParam(req,"model");
  if (!text) return badRequest("Parameter 'text' wajib diisi");
  try { return ok(await veniceChat(text, model||undefined)); } catch(e){ return fail(e.message); }
}
