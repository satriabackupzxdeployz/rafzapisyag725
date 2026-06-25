import { youtubeDownload } from "@/lib/scrapers/youtube";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = getParam(request, "url");
  if (!url) return badRequest("Parameter 'url' is required");

  try {
    const data = await youtubeDownload(url, "128", "audio");
    return ok({
      title: data.title,
      duration: data.duration,
      thumbnail: data.thumbnail,
      format: "mp3",
      download: data.download
    });
  } catch (error) {
    return fail(error.message);
  }
}
