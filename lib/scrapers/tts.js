import { fetchWithTimeout } from "./_shared";

const ENDPOINT = "https://heroikzre-api.vercel.app/tools/text-to-speech";

export async function textToSpeech(text) {
  const response = await fetchWithTimeout(`${ENDPOINT}?text=${encodeURIComponent(text)}`);

  if (!response.ok) {
    throw new Error(`Upstream returned ${response.status}`);
  }

  const data = await response.json();
  if (!data?.result) {
    throw new Error("Text to speech engine returned no audio");
  }

  return {
    text,
    audio: data.result
  };
}
