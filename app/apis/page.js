"use client";
import { useState, useRef } from "react";
import { CATEGORIES, ENDPOINTS, SITE } from "@/lib/apiCatalog";
import {
  IcSearch, IcX, IcChevDown, IcChevUp, IcPlay, IcCopy, IcCheck,
  IcSpin, IcFlag, IcFolderDown, IcFolderUp, IcFileAi, IcFileSearch, IcFolderTool
} from "@/components/Icons";

const CAT_ICON = {
  "folder-down": IcFolderDown, "folder-up": IcFolderUp,
  "file-ai": IcFileAi, "file-search": IcFileSearch, "folder-tool": IcFolderTool
};

function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  async function go() { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(()=>setOk(false),1600); } catch{} }
  return (
    <button onClick={go} className="flex h-6 w-6 items-center justify-center rounded-[2px] bg-white/10 text-white/40 transition hover:bg-white/20 hover:text-white">
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

function EndpointRow({ ep }) {
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [reqUrl,  setReqUrl]  = useState("");
  const [curlCmd, setCurlCmd] = useState("");
  const [bugOpen, setBugOpen] = useState(false);
  const [bugMsg,  setBugMsg]  = useState("");
  const [bugSent, setBugSent] = useState(false);

  const fields  = ep.params || ep.body || [];
  const isPost  = ep.method === "POST";

  // String vals untuk text inputs
  const [vals, setVals] = useState(() =>
    fields.filter(f => f.type !== "file").reduce((a,f) => ({ ...a, [f.name]: f.example||"" }), {})
  );
  // File refs untuk file inputs — pisah dari string vals
  const fileRefs = useRef({});

  function buildUrl() {
    const base = ep.path;
    if (isPost) return `${SITE.baseUrl}${base}`;
    const qs = new URLSearchParams();
    fields.filter(f => f.type !== "file").forEach(f => { if (vals[f.name]) qs.set(f.name, vals[f.name]); });
    return qs.toString() ? `${SITE.baseUrl}${base}?${qs}` : `${SITE.baseUrl}${base}`;
  }

  function buildCurl() {
    if (isPost) {
      const parts = fields.map(f => {
        if (f.type === "file") {
          const fname = fileRefs.current[f.name]?.name || f.example || "file";
          return `  -F "${f.name}=@${fname}"`;
        }
        return vals[f.name] ? `  -F "${f.name}=${vals[f.name]}"` : null;
      }).filter(Boolean);
      return `curl -X POST "${SITE.baseUrl}${ep.path}" \\\n${parts.join(" \\\n")}`;
    }
    return `curl "${buildUrl()}"`;
  }

  async function run(e) {
    e.preventDefault();
    setReqUrl(buildUrl());
    setCurlCmd(buildCurl());
    setLoading(true); setResult(null);

    try {
      let res;
      if (isPost) {
        const fd = new FormData();
        fields.forEach(f => {
          if (f.type === "file") {
            const file = fileRefs.current[f.name];
            if (file) fd.append(f.name, file, file.name);
          } else if (vals[f.name]) {
            fd.append(f.name, vals[f.name]);
          }
        });
        res = await fetch(ep.path, { method:"POST", body:fd });
      } else {
        const qs = new URLSearchParams();
        fields.forEach(f => { if (vals[f.name]) qs.set(f.name, vals[f.name]); });
        res = await fetch(`${ep.path}?${qs}`);
      }

      const ct = res.headers.get("content-type") || "";
      if (ct.startsWith("image/")) {
        setResult({ type:"image", src:URL.createObjectURL(await res.blob()) });
      } else if (ct.startsWith("audio/")) {
        setResult({ type:"audio", src:URL.createObjectURL(await res.blob()) });
      } else {
        const json = await res.json();
        setResult({ type: res.ok ? "json" : "error", data:JSON.stringify(json,null,2) });
      }
    } catch(err) {
      setResult({ type:"error", data:err.message });
    } finally { setLoading(false); }
  }

  function clear() {
    setResult(null); setReqUrl(""); setCurlCmd("");
    fileRefs.current = {};
    setVals(fields.filter(f=>f.type!=="file").reduce((a,f)=>({ ...a,[f.name]:f.example||"" }),{}));
  }

  return (
    <div className="border-b border-bdr last:border-0">
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
        <div className="border-t border-bdr bg-white px-5 pb-6 pt-4 anim-up">
          <div className="mb-4 flex items-start justify-between gap-3">
            <p className="text-[13px] leading-relaxed text-fg3">{ep.description}</p>
            <button onClick={() => setBugOpen(v=>!v)}
              className="mt-0.5 shrink-0 rounded-[2px] p-1.5 text-fg4 transition hover:bg-orange/[0.07] hover:text-orange">
              <IcFlag s={14}/>
            </button>
          </div>

          {bugOpen && (
            <div className="mb-4 rounded-[2px] border border-orange/20 bg-orange/[0.04] p-4">
              {bugSent ? (
                <p className="font-mono text-[11.5px] text-orange">Laporan terkirim. Terima kasih!</p>
              ) : (
                <>
                  <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-orange">Bug — {ep.path}</p>
                  <textarea value={bugMsg} onChange={e=>setBugMsg(e.target.value)} rows={2}
                    placeholder="Jelaskan error yang terjadi..."
                    className="w-full resize-none rounded-[2px] border border-orange/15 bg-white px-3 py-2 text-[12.5px] text-ink outline-none focus:border-orange/40"/>
                  <div className="mt-2.5 flex justify-end gap-2">
                    <button onClick={()=>setBugOpen(false)} className="rounded-[2px] px-3 py-1.5 text-[11.5px] text-fg3 hover:bg-bg2">Batal</button>
                    <button onClick={()=>{ if(bugMsg.trim()){ setBugSent(true); setTimeout(()=>{ setBugOpen(false);setBugSent(false);setBugMsg(""); },2000); }}}
                      className="rounded-[2px] bg-orange px-3 py-1.5 font-mono text-[11px] font-bold text-white hover:bg-orange-2">Kirim</button>
                  </div>
                </>
              )}
            </div>
          )}

          <form onSubmit={run} className="space-y-3.5">
            {fields.map(f => (
              <div key={f.name}>
                <label className="mb-1.5 flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[.5px] text-fg2">
                  {f.name}
                  {f.required && <span className="font-sans font-normal normal-case text-orange">*</span>}
                  <span className="font-sans font-normal normal-case tracking-normal text-fg4">({f.type})</span>
                </label>

                {f.type === "file" ? (
                  <label className="flex cursor-pointer items-center gap-3 rounded-[2px] border border-bdr2 bg-bg2 px-3 py-2.5 transition hover:border-cyan/40 hover:bg-white">
                    <span className="shrink-0 rounded-[2px] bg-cyan/[0.08] px-2.5 py-1 font-mono text-[10.5px] font-bold text-cyan">PILIH FILE</span>
                    <span className="min-w-0 flex-1 truncate text-[12.5px] text-fg3" id={`flabel-${ep.slug}-${f.name}`}>
                      Belum ada file dipilih
                    </span>
                    <input type="file" className="sr-only" required={f.required}
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          fileRefs.current[f.name] = file;
                          const lbl = document.getElementById(`flabel-${ep.slug}-${f.name}`);
                          if (lbl) lbl.textContent = `${file.name} (${(file.size/1024).toFixed(1)} KB)`;
                        }
                      }}/>
                  </label>
                ) : (
                  <input type="text" value={vals[f.name]||""} required={f.required}
                    onChange={e => setVals(v=>({ ...v,[f.name]:e.target.value }))}
                    placeholder={f.example || f.name}
                    className="w-full rounded-[2px] border border-bdr bg-bg2 px-3.5 py-2.5 font-mono text-[12.5px] text-ink outline-none placeholder:font-sans placeholder:text-fg4 transition focus:border-cyan/50 focus:bg-white focus:shadow-cyan"/>
                )}
              </div>
            ))}

            <div className="flex items-center gap-2 pt-1">
              <button type="submit" disabled={loading}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[2px] bg-ink px-5 py-2.5 font-mono text-[10.5px] font-bold tracking-wider text-white transition-all hover:bg-ink-2 disabled:opacity-50">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full"/>
                {loading ? <IcSpin s={14}/> : <IcPlay s={14}/>}
                {loading ? "MEMPROSES..." : "EXECUTE"}
              </button>
              {(result || reqUrl) && (
                <button type="button" onClick={clear}
                  className="inline-flex items-center gap-1.5 rounded-[2px] border border-bdr px-4 py-2.5 font-mono text-[10.5px] text-fg3 transition hover:border-bdr2 hover:bg-bg2">
                  <IcX s={13}/> CLEAR
                </button>
              )}
            </div>
          </form>

          {(reqUrl || result) && (
            <div className="mt-4 space-y-2.5 anim-up">
              {reqUrl   && <CodeBox label="REQUEST URL" code={reqUrl}/>}
              {curlCmd  && <CodeBox label="cURL" code={curlCmd}/>}
              {loading  && (
                <div className="flex items-center gap-2 rounded-[2px] bg-ink px-4 py-3 font-mono text-[11.5px] text-[#636363]">
                  <IcSpin s={14} cls="text-cyan"/> Menunggu respons...
                </div>
              )}
              {result && (
                <>
                  {result.type === "json"  && <CodeBox label="RESPONSE" code={result.data}/>}
                  {result.type === "error" && <div className="rounded-[2px] border border-orange/20 bg-orange/[0.04] px-4 py-3 font-mono text-[12px] text-orange">{result.data}</div>}
                  {result.type === "image" && <div className="rounded-[2px] bg-ink p-3"><img src={result.src} alt="result" className="mx-auto max-h-72"/></div>}
                  {result.type === "audio" && <div className="rounded-[2px] bg-ink p-4"><audio controls src={result.src} className="w-full"/></div>}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CategoryBlock({ cat, eps }) {
  const [open, setOpen] = useState(false);
  const CatIcon = CAT_ICON[cat.icon] || IcFolderTool;
  return (
    <div className="border border-bdr bg-white">
      <button onClick={() => setOpen(v=>!v)}
        className="flex w-full items-center gap-3.5 px-5 py-4 text-left transition-colors hover:bg-bg2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] border border-bdr2 text-fg3 transition hover:border-cyan/40 hover:text-cyan">
          <CatIcon s={17}/>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[12.5px] font-bold uppercase tracking-[.5px] text-ink">{cat.label}</p>
          <p className="truncate text-[12px] text-fg3 mt-0.5">{cat.description}</p>
        </div>
        <span className="shrink-0 rounded-[2px] border border-cyan/20 bg-cyan/[0.06] px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-cyan">{eps.length}</span>
        <span className="shrink-0 text-fg4">{open ? <IcChevUp s={16}/> : <IcChevDown s={16}/>}</span>
      </button>
      {open && (
        <div className="border-t border-bdr anim-up">
          {eps.map(ep => <EndpointRow key={`${ep.category}-${ep.slug}`} ep={ep}/>)}
        </div>
      )}
    </div>
  );
}

export default function ApisPage() {
  const [q, setQ] = useState("");
  const query = q.toLowerCase();
  const filtered = CATEGORIES.map(cat => ({
    cat,
    eps: ENDPOINTS.filter(ep =>
      ep.category === cat.slug &&
      (!query || ep.name.toLowerCase().includes(query) || ep.path.toLowerCase().includes(query) || ep.description.toLowerCase().includes(query))
    )
  })).filter(({ eps }) => eps.length > 0);
  const total = filtered.reduce((s,{eps})=>s+eps.length,0);

  return (
    <>
      <div className="relative z-10 border-b border-bdr bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8">
          <p className="mb-1 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[1.5px] text-fg4">
            <span className="h-px w-5 bg-fg4"/> REST API
          </p>
          <h1 className="mb-5 font-display leading-[.9] tracking-[1.5px] text-ink" style={{fontSize:"clamp(38px,5.5vw,56px)"}}>
            DAFTAR ENDPOINT
          </h1>
          <div className="relative max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-fg4"><IcSearch s={15}/></span>
            <input type="text" value={q} onChange={e=>setQ(e.target.value)}
              placeholder={`Cari dari ${ENDPOINTS.length} endpoint...`}
              className="h-11 w-full rounded-[2px] border border-bdr bg-bg2 pl-9 pr-9 font-mono text-[12.5px] text-ink outline-none placeholder:font-sans placeholder:text-fg4 transition focus:border-cyan/50 focus:bg-white focus:shadow-cyan"/>
            {q && <button onClick={()=>setQ("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fg4 hover:text-ink"><IcX s={14}/></button>}
          </div>
          {q && <p className="mt-2 font-mono text-[11px] text-fg4">{total} endpoint ditemukan</p>}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-5 py-6 sm:px-8">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-[36px] tracking-[1px] text-fg4">TIDAK DITEMUKAN</p>
            <p className="mt-2 text-[13px] text-fg3">Coba kata kunci yang berbeda</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {filtered.map(({ cat, eps }) => <CategoryBlock key={cat.slug} cat={cat} eps={eps}/>)}
          </div>
        )}
        {!q && (
          <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[1.5px] text-fg4">
            {ENDPOINTS.length} ENDPOINT · {CATEGORIES.length} KATEGORI · {SITE.baseUrl}
          </p>
        )}
      </div>
    </>
  );
}
