import { instagramDownload } from "@/lib/scrapers/instagram";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = getParam(request, "url");
  if (!url) return badRequest("Parameter 'url' is required");

  try {
    const data = await instagramDownload(url);
    if (!data.isVideo || !data.video) return fail("This Instagram link has no audio track", 404);
    return ok({
      username: data.username,
      caption: data.caption,
      thumbnail: data.thumbnail,
      format: "mp3",
      download: data.video,
      note: "Instagram does not expose a standalone audio stream, this is the original video file containing the audio track"
    });
  } catch (error) {
    return fail(error.message);
  }
}
