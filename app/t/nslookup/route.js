import { nslookupDomain } from "@/lib/scrapers/nslookup";
import { ok, fail, badRequest, getParam } from "@/lib/response";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const domain = getParam(request, "domain");
  if (!domain) return badRequest("Parameter 'domain' is required");

  try {
    const data = await nslookupDomain(domain);
    return ok(data);
  } catch (error) {
    return fail(error.message);
  }
}
