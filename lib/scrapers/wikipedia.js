import { UA, fetchWithTimeout } from "./_shared";

const API = "https://id.wikipedia.org/w/api.php";

export async function searchWikipedia(query) {
  const searchParams = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: query,
    format: "json",
    srlimit: "5"
  });

  const searchResponse = await fetchWithTimeout(`${API}?${searchParams.toString()}`, {
    headers: { "User-Agent": UA }
  });
  const searchData = await searchResponse.json();
  const results = searchData?.query?.search;

  if (!results || results.length === 0) {
    throw new Error("No Wikipedia article found for this query");
  }

  const pageTitle = results[0].title;
  const pageParams = new URLSearchParams({
    action: "query",
    titles: pageTitle,
    prop: "extracts|info",
    exintro: "1",
    explaintext: "1",
    inprop: "url",
    format: "json"
  });

  const pageResponse = await fetchWithTimeout(`${API}?${pageParams.toString()}`, {
    headers: { "User-Agent": UA }
  });
  const pageData = await pageResponse.json();
  const pages = pageData?.query?.pages || {};
  const page = Object.values(pages)[0];

  return {
    title: page?.title || pageTitle,
    url: page?.fullurl || null,
    summary: page?.extract || null,
    relatedResults: results.map((item) => ({
      title: item.title,
      snippet: item.snippet.replace(/<[^>]+>/g, "")
    }))
  };
}
