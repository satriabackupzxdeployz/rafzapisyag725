import { searchLyrics } from "@/lib/scrapers/lyrics";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const query = getParam(request, "q");
  if (!query) return badRequest("Parameter 'q' is required");

  try {
    const data = await searchLyrics(query);
    return ok(data);
  } catch (error) {
    return fail(error.message);
  }
}
