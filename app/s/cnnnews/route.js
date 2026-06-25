import { getCnnNews } from "@/lib/scrapers/cnnNews";
import { ok, fail } from "@/lib/response";
export const dynamic = "force-dynamic";
export async function GET() {
  try { return ok(await getCnnNews()); } catch(e){ return fail(e.message); }
}
