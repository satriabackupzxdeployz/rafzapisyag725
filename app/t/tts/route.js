import { textToSpeech } from "@/lib/scrapers/tts";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const text = getParam(request, "text");
  if (!text) return badRequest("Parameter 'text' is required");

  try {
    const data = await textToSpeech(text);
    return ok(data);
  } catch (error) {
    return fail(error.message);
  }
}
