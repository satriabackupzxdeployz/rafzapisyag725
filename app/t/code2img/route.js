import { codeToImage } from "@/lib/scrapers/codeImage";
import { fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const code = getParam(request, "code");
  if (!code) return badRequest("Parameter 'code' is required");
  const lang = getParam(request, "lang");
  const theme = getParam(request, "theme");

  try {
    const buffer = await codeToImage(code, lang, theme);
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    return fail(error.message);
  }
}
