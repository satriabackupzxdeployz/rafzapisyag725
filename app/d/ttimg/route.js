import { tiktokDownload } from "@/lib/scrapers/tiktok";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = getParam(request, "url");
  if (!url) return badRequest("Parameter 'url' is required");

  try {
    const data = await tiktokDownload(url);
    if (!data.thumbnail) return fail("No thumbnail found for this link", 404);
    return ok({
      title: data.title,
      author: data.author,
      format: "jpg",
      download: data.thumbnail
    });
  } catch (error) {
    return fail(error.message);
  }
}
