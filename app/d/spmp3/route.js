import { spotifyDownload } from "@/lib/scrapers/spotify";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = getParam(request, "url");
  if (!url) return badRequest("Parameter 'url' is required");

  try {
    const data = await spotifyDownload(url);
    return ok({
      title: data.title,
      artists: data.artists,
      cover: data.cover,
      durationMs: data.durationMs,
      format: "mp3",
      download: data.audio
    });
  } catch (error) {
    return fail(error.message);
  }
}
