import { tiktokStalk } from "@/lib/scrapers/tiktokStalk";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const username = getParam(request, "username");
  if (!username) return badRequest("Parameter 'username' is required");

  try {
    const data = await tiktokStalk(username);
    return ok(data);
  } catch (error) {
    return fail(error.message);
  }
}
