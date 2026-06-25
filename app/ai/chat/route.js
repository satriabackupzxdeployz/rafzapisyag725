import { aiChat } from "@/lib/scrapers/aiChat";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const text = getParam(request, "text");
  if (!text) return badRequest("Parameter 'text' is required");
  const model = getParam(request, "model");

  try {
    const data = await aiChat(text, model);
    return ok(data);
  } catch (error) {
    return fail(error.message);
  }
}
