import { fetchWithTimeout } from "./_shared";

const API = "https://django-app-4tbtjdxw2a-uc.a.run.app";
const LANGS = {
  html:1,c:2,"c++":3,"c#":4,dart:5,java:6,swift:7,python:8,r:9,
  javascript:10,typescript:13,kotlin:14,go:15,rust:24,php:29,
  react:25,vue:32,nodejs:19,ruby:12,lua:28
};
const H = {
  "user-agent":"AgungDevX Android/1.0.0",
  "content-type":"application/json","accept":"application/json"
};
function ip() { return Array.from({length:4},()=>Math.floor(Math.random()*256)).join("."); }

async function post(endpoint, body) {
  const res = await fetchWithTimeout(`${API}${endpoint}`, {
    method:"POST", headers:H, body:JSON.stringify({ ...body, ip_address:ip() })
  });
  const data = await res.json();
  if (data.Status !== 1 || !data.Data) throw new Error(data.Message || "Gagal");
  const { title, language, code, explanation } = data.Data;
  return { title, language, code, explanation };
}

export function getLangs() { return Object.keys(LANGS); }
export function promptToCode(prompt, language) {
  const lang = LANGS[language?.toLowerCase()];
  if (!lang) throw new Error(`Bahasa '${language}' tidak didukung. Pilihan: ${Object.keys(LANGS).join(", ")}`);
  return post("/prompt_to_code/", { prompt, language:lang });
}
export function detectBugs(code) { return post("/detect_bugs/", { code }); }
export function convertCode(code, target) {
  const lang = LANGS[target?.toLowerCase()];
  if (!lang) throw new Error(`Bahasa target '${target}' tidak didukung`);
  return post("/convert_code/", { prompt:code, language:lang });
}
export function explainCode(code) { return post("/code_explainer/", { code, optional_param:"" }); }
