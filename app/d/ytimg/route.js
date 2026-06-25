import { youtubeInfo } from "@/lib/scrapers/youtube";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = getParam(request, "url");
  if (!url) return badRequest("Parameter 'url' is required");

  try {
    const data = await youtubeInfo(url);
    return ok({
      title: data.title,
      duration: data.duration,
      format: "jpg",
      download: data.thumbnail
    });
  } catch (error) {
    return fail(error.message);
  }
}
