import { facebookDownload } from "@/lib/scrapers/facebook";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = getParam(request, "url");
  if (!url) return badRequest("Parameter 'url' is required");

  try {
    const data = await facebookDownload(url);
    if (!data.video) return fail("No audio track found for this link", 404);
    return ok({
      thumbnail: data.thumbnail,
      format: "mp3",
      download: data.video,
      note: "Facebook does not expose a standalone audio stream, this is the original video file containing the audio track"
    });
  } catch (error) {
    return fail(error.message);
  }
}
