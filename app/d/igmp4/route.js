import { instagramDownload } from "@/lib/scrapers/instagram";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = getParam(request, "url");
  if (!url) return badRequest("Parameter 'url' is required");

  try {
    const data = await instagramDownload(url);
    if (!data.isVideo || !data.video) return fail("This Instagram link has no video", 404);
    return ok({
      username: data.username,
      caption: data.caption,
      thumbnail: data.thumbnail,
      format: "mp4",
      download: data.video
    });
  } catch (error) {
    return fail(error.message);
  }
}
