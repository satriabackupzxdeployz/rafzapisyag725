import { tiktokDownload } from "@/lib/scrapers/tiktok";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = getParam(request, "url");
  if (!url) return badRequest("Parameter 'url' is required");

  try {
    const data = await tiktokDownload(url);
    const audio = data.audio || data.video;
    if (!audio) return fail("No audio stream found for this link", 404);
    return ok({
      title: data.title,
      author: data.author,
      thumbnail: data.thumbnail,
      format: "mp3",
      download: audio
    });
  } catch (error) {
    return fail(error.message);
  }
}
