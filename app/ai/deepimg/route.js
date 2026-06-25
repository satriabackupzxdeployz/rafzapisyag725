import { deepimgGenerate } from "@/lib/scrapers/aiDeepimg";
import { ok, fail, badRequest, getParam } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function GET(req) {
  const prompt = getParam(req,"prompt");
  if (!prompt) return badRequest("Parameter 'prompt' wajib diisi");
  try { return ok(await deepimgGenerate(prompt)); } catch(e){ return fail(e.message); }
}
