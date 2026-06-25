import { gptAiChat } from "@/lib/scrapers/aiGptChat";
import { ok, fail, badRequest, getParam } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function GET(req) {
  const text = getParam(req,"text");
  if (!text) return badRequest("Parameter 'text' wajib diisi");
  try { return ok(await gptAiChat(text)); } catch(e){ return fail(e.message); }
}
