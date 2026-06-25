import { tiktokDownload } from "@/lib/scrapers/tiktok";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = getParam(request, "url");
  if (!url) return badRequest("Parameter 'url' is required");

  try {
    const data = await tiktokDownload(url);
    if (!data.video) return fail("No video stream found for this link", 404);
    return ok({
      title: data.title,
      author: data.author,
      thumbnail: data.thumbnail,
      format: "mp4",
      download: data.video
    });
  } catch (error) {
    return fail(error.message);
  }
}
