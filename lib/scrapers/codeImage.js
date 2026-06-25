import { fetchWithTimeout } from "./_shared";

const ENDPOINT = "https://carbonara.solopov.dev/api/cook";

export async function codeToImage(code, language, theme) {
  const response = await fetchWithTimeout(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      language: language || "javascript",
      theme: theme || "seti",
      backgroundColor: "#0B1220",
      dropShadow: true,
      windowControls: true,
      widthAdjustment: true,
      lineNumbers: true,
      paddingVertical: "48px",
      paddingHorizontal: "48px"
    })
  });

  if (!response.ok) {
    throw new Error(`Upstream returned ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
