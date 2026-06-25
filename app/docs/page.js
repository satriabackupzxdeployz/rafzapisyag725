"use client";
import { useState } from "react";
import { CATEGORIES, ENDPOINTS, SITE } from "@/lib/apiCatalog";
import {
  IcChevDown, IcChevUp, IcCopy, IcCheck, IcArrow, IcLayers,
  IcFolderDown, IcFolderUp, IcFileAi, IcFileSearch, IcFolderTool
} from "@/components/Icons";

const CAT_ICON = {
  "folder-down": IcFolderDown, "folder-up": IcFolderUp,
  "file-ai": IcFileAi, "file-search": IcFileSearch, "folder-tool": IcFolderTool
};

function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  async function go() { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(()=>setOk(false),1600); } catch{} }
  return (
    <button onClick={go}
      className="flex h-6 w-6 items-center justify-center rounded-[2px] bg-white/10 text-white/40 transition hover:bg-white/20 hover:text-white">
      {ok ? <IcCheck s={12}/> : <IcCopy s={12}/>}
    </button>
  );
}
function CodeBox({ label, code }) {
  return (
    <div className="terminal overflow-hidden">
      <div className="t-bar justify-between">
        <span className="font-mono text-[9.5px] uppercase tracking-[1.5px] text-[#4a4a4a]">{label}</span>
        <CopyBtn text={code}/>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap break-all px-4 py-3 font-mono text-[11.5px] leading-relaxed text-[#8a8a8a]">{code}</pre>
    </div>
  );
}
function buildCurl(ep) {
  if (ep.method === "POST") {
    const p = (ep.body||[]).map(f => `  -F "${f.name}=@${f.example||f.name}"`);
    return `curl -X POST "${SITE.baseUrl}${ep.path}" \\\n${p.join(" \\\n")}`;
  }
  const qs = (ep.params||[]).map(f => `${f.name}=${encodeURIComponent(f.example||"")}`).join("&");
  return `curl "${SITE.baseUrl}${ep.path}${qs?"?"+qs:""}"`;
}
function buildSample(ep) {
  if (ep.responseType === "image") return "// Mengembalikan berkas gambar (image/png) langsung.";
  return JSON.stringify({ status:200, success:true, creator:"RAFZ API", result: ep.sampleResult||{} }, null, 2);
}

function EpRow({ ep }) {
  const [open, setOpen] = useState(false);
  const fields = ep.params || ep.body || [];
  return (
    <div id={`${ep.category}-${ep.slug}`} className="scroll-mt-24 border-b border-bdr last:border-0">
      <button onClick={() => setOpen(v=>!v)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-bg2">
        <span className={`shrink-0 rounded-[2px] px-2 py-[3px] font-mono text-[10px] font-bold tracking-wider
          ${ep.method==="GET" ? "bg-cyan/[0.09] text-cyan" : "bg-orange/[0.09] text-orange"}`}>
          {ep.method}
        </span>
        <div className="min-w-0 flex-1">
          <span className="block truncate font-mono text-[12.5px] font-bold text-ink">{ep.path}</span>
          <span className="block truncate text-[12px] text-fg3 mt-0.5">{ep.name}</span>
        </div>
        <span className="shrink-0 text-fg4">{open ? <IcChevUp s={15}/> : <IcChevDown s={15}/>}</span>
      </button>
      {open && (
        <div className="border-t border-bdr bg-white px-5 pb-5 pt-4 anim-up">
          <p className="mb-4 text-[13px] leading-relaxed text-fg2">{ep.description}</p>
          {fields.length > 0 && (
            <div className="mb-4 overflow-hidden rounded-[2px] border border-bdr">
              <div className="border-b border-bdr bg-bg2 px-3 py-2">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-[1.5px] text-fg4">
                  {ep.method==="POST" ? "Form Data" : "Query Parameter"}
                </span>
              </div>
              <table className="w-full text-left">
                <thead className="border-b border-bdr bg-bg2">
                  <tr>
                    {["Nama","Tipe","Wajib","Contoh"].map(h => (
                      <th key={h} className="px-3 py-2 font-mono text-[9.5px] font-bold uppercase tracking-[1px] text-fg4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-bdr">
                  {fields.map(f => (
                    <tr key={f.name} className="transition-colors hover:bg-bg2">
                      <td className="px-3 py-2.5 font-mono text-[12px] font-bold text-ink">{f.name}</td>
                      <td className="px-3 py-2.5 text-[12.5px] text-fg3">{f.type}</td>
                      <td className="px-3 py-2.5 font-mono text-[10.5px] font-bold">
                        {f.required ? <span className="text-orange">YA</span> : <span className="text-fg4">Tidak</span>}
                      </td>
                      <td className="max-w-[130px] truncate px-3 py-2.5 font-mono text-[11.5px] text-fg3">{f.example||"-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="grid gap-2.5 sm:grid-cols-2">
            <CodeBox label="cURL" code={buildCurl(ep)}/>
            <CodeBox label="Contoh Respons" code={buildSample(ep)}/>
          </div>
          <a href="/apis"
            className="mt-3.5 inline-flex items-center gap-1.5 rounded-[2px] bg-ink px-4 py-2 font-mono text-[10.5px] font-bold tracking-wider text-white transition-all hover:bg-ink-2 hover:shadow-sm">
            COBA DI TESTER <IcArrow s={12}/>
          </a>
        </div>
      )}
    </div>
  );
}

function CatSection({ cat }) {
  const [open, setOpen] = useState(true);
  const eps = ENDPOINTS.filter(ep => ep.category === cat.slug);
  const CatIcon = CAT_ICON[cat.icon] || IcFolderTool;
  return (
    <section id={cat.slug} className="scroll-mt-20">
      <button onClick={() => setOpen(v=>!v)}
        className="mb-2.5 flex w-full items-center gap-3 text-left">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-bdr2 text-fg3 transition hover:border-cyan/40 hover:text-cyan">
          <CatIcon s={16}/>
        </div>
        <div className="flex-1">
          <span className="font-mono text-[12.5px] font-bold uppercase tracking-[.5px] text-ink">{cat.label}</span>
          <span className="ml-2.5 rounded-[2px] border border-cyan/20 bg-cyan/[0.06] px-2 py-0.5 font-mono text-[10px] font-bold text-cyan">{eps.length}</span>
        </div>
        <span className="text-fg4">{open ? <IcChevUp s={15}/> : <IcChevDown s={15}/>}</span>
      </button>
      {open && (
        <div className="border border-bdr bg-white anim-up">
          {eps.map(ep => <EpRow key={`${ep.category}-${ep.slug}`} ep={ep}/>)}
        </div>
      )}
    </section>
  );
}

export default function DocsPage() {
  return (
    <div className="relative z-10 mx-auto flex max-w-[1100px]">
      {/* Sidebar */}
      <aside className="sticky top-[58px] hidden h-[calc(100vh-58px)] w-[200px] shrink-0 overflow-y-auto border-r border-bdr bg-white py-6 pl-5 pr-3 xl:block">
        <p className="mb-3 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[1.5px] text-fg4">
          <IcLayers s={12}/> Referensi
        </p>
        <nav className="mb-4 space-y-0.5">
          {[["#intro","Pengantar"],["#format","Format Respons"]].map(([h,l]) => (
            <a key={h} href={h} className="block rounded-[2px] px-3 py-2 text-[12.5px] text-fg3 transition hover:bg-bg2 hover:text-ink">{l}</a>
          ))}
        </nav>
        <div className="border-t border-bdr pt-4">
          <p className="mb-2 px-2 font-mono text-[9.5px] uppercase tracking-[1.5px] text-fg4">Kategori</p>
          <nav className="space-y-0.5">
            {CATEGORIES.map(cat => {
              const CatIcon = CAT_ICON[cat.icon] || IcFolderTool;
              return (
                <a key={cat.slug} href={`#${cat.slug}`}
                  className="flex items-center gap-2 rounded-[2px] px-3 py-2 text-[12.5px] text-fg3 transition hover:bg-bg2 hover:text-ink">
                  <CatIcon s={13}/> <span className="flex-1">{cat.label}</span>
                  <span className="font-mono text-[10px] text-fg4">{ENDPOINTS.filter(e=>e.category===cat.slug).length}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1 px-5 py-8 sm:px-8">
        <div className="mb-8 border-b border-bdr pb-6">
          <p className="mb-1 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[1.5px] text-fg4">
            <span className="h-px w-5 bg-fg4"/> Referensi API
          </p>
          <h1 className="font-display leading-[.9] tracking-[1.5px] text-ink"
            style={{ fontSize:"clamp(38px,5.5vw,56px)" }}>DOKUMENTASI</h1>
          <p className="mt-2 text-[13px] text-fg3">
            {ENDPOINTS.length} endpoint — parameter, cURL, dan contoh respons JSON per endpoint.
          </p>
        </div>

        <section id="intro" className="mb-8 scroll-mt-20">
          <h2 className="mb-3 font-mono text-[12px] font-bold uppercase tracking-[.5px] text-ink">Pengantar</h2>
          <p className="mb-3 text-[13.5px] leading-relaxed text-fg2">Semua endpoint dapat diakses publik tanpa autentikasi. Gunakan base URL berikut:</p>
          <CodeBox label="Base URL" code={SITE.baseUrl}/>
        </section>

        <section id="format" className="mb-8 scroll-mt-20">
          <h2 className="mb-3 font-mono text-[12px] font-bold uppercase tracking-[.5px] text-ink">Format Respons</h2>
          <CodeBox label="JSON" code={`{\n  "status": 200,\n  "success": true,\n  "creator": "RAFZ API",\n  "result": { ... }\n}\n\n// Error:\n{\n  "status": 400,\n  "success": false,\n  "creator": "RAFZ API",\n  "message": "Parameter 'url' is required"\n}`}/>
        </section>

        <div className="space-y-7">
          {CATEGORIES.map(cat => <CatSection key={cat.slug} cat={cat}/>)}
        </div>
      </div>
    </div>
  );
}
