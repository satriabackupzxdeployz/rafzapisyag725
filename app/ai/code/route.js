import { promptToCode, detectBugs, convertCode, explainCode, getLangs } from "@/lib/scrapers/aiCode";
import { ok, fail, badRequest, getParam } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function GET(req) {
  const action = getParam(req,"action");
  const code   = getParam(req,"code");
  const prompt = getParam(req,"prompt");
  const lang   = getParam(req,"lang");
  const target = getParam(req,"target");

  try {
    if (!action) return ok({ actions:["prompt","detect","convert","explain"], langs: getLangs() });
    if (action === "prompt") {
      if (!prompt || !lang) return badRequest("Parameter 'prompt' dan 'lang' wajib diisi");
      return ok(await promptToCode(prompt, lang));
    }
    if (action === "detect") {
      if (!code) return badRequest("Parameter 'code' wajib diisi");
      return ok(await detectBugs(code));
    }
    if (action === "convert") {
      if (!code || !target) return badRequest("Parameter 'code' dan 'target' wajib diisi");
      return ok(await convertCode(code, target));
    }
    if (action === "explain") {
      if (!code) return badRequest("Parameter 'code' wajib diisi");
      return ok(await explainCode(code));
    }
    return badRequest("Action tidak valid. Pilihan: prompt, detect, convert, explain");
  } catch(e){ return fail(e.message); }
}
