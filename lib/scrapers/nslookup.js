import { UA, fetchWithTimeout } from "./_shared";

export async function nslookupDomain(domain) {
  const response = await fetchWithTimeout("https://www.nslookup.io/api/v1/webservers", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "User-Agent": UA,
      Referer: `https://www.nslookup.io/domains/${domain}/webservers/`
    },
    body: JSON.stringify({ domain })
  });

  if (!response.ok) {
    throw new Error(`Upstream returned ${response.status}`);
  }

  const data = await response.json();
  return { domain, records: data };
}
