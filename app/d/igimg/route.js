import { instagramDownload } from "@/lib/scrapers/instagram";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = getParam(request, "url");
  if (!url) return badRequest("Parameter 'url' is required");

  try {
    const data = await instagramDownload(url);
    if (!data.images || data.images.length === 0) return fail("No image found for this link", 404);
    return ok({
      username: data.username,
      caption: data.caption,
      format: "jpg",
      download: data.images[0],
      images: data.images
    });
  } catch (error) {
    return fail(error.message);
  }
}
