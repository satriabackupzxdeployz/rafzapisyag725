import { aiTextToImage } from "@/lib/scrapers/aiImage";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const prompt = getParam(request, "prompt");
  if (!prompt) return badRequest("Parameter 'prompt' is required");
  const ratio = getParam(request, "ratio");

  try {
    const data = await aiTextToImage(prompt, ratio);
    return ok(data);
  } catch (error) {
    return fail(error.message);
  }
}
