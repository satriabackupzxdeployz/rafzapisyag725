import { facebookDownload } from "@/lib/scrapers/facebook";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = getParam(request, "url");
  if (!url) return badRequest("Parameter 'url' is required");

  try {
    const data = await facebookDownload(url);
    if (!data.image) return fail("No image found for this link", 404);
    return ok({
      format: "jpg",
      download: data.image
    });
  } catch (error) {
    return fail(error.message);
  }
}
