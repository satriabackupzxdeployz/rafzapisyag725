import Link from "next/link";
import { SITE, CATEGORIES, ENDPOINTS } from "@/lib/apiCatalog";
import {
  IcArrow, IcShield, IcGauge, IcLayers, IcLock, IcBell,
  IcFolderDown, IcFolderUp, IcFileAi, IcFileSearch, IcFolderTool
} from "@/components/Icons";

export const metadata = { title:"Dashboard", description: SITE.tagline };

const CAT_ICON = {
  "folder-down":  IcFolderDown,
  "folder-up":    IcFolderUp,
  "file-ai":      IcFileAi,
  "file-search":  IcFileSearch,
  "folder-tool":  IcFolderTool
};

const FEATURES = [
  { Icon: IcShield, label:"Tanpa API Key",      body:"Langsung pakai tanpa registrasi. Tidak ada token, tidak ada akun." },
  { Icon: IcGauge,  label:"Respons Cepat",       body:"Setiap endpoint dioptimasi untuk latensi serendah mungkin." },
  { Icon: IcLayers, label:"JSON Konsisten",       body:"Struktur status, success, creator, result seragam di semua endpoint." },
  { Icon: IcLock,   label:"HTTPS & CORS",         body:"Semua endpoint HTTPS dan mendukung header CORS penuh." },
  { Icon: IcBell,   label:"Selalu Diperbarui",    body:"Diuji rutin, diperbaiki cepat agar tetap berjalan optimal." },
  { Icon: IcArrow,  label:"Dokumentasi Lengkap",  body:"Parameter, cURL, contoh respons, dan live tester per endpoint." }
];

const TICKER = [
  "TIKTOK DOWNLOADER","INSTAGRAM DL","YOUTUBE MP4","YOUTUBE MP3",
  "SPOTIFY MP3","FACEBOOK DL","IMG2URL","VID2URL","FILE2URL",
  "AI CHAT","TEXT TO IMAGE","LYRICS SEARCH","WIKIPEDIA",
  "TIKTOK STALK","NS LOOKUP","TEXT TO SPEECH","CODE TO IMAGE"
];

const FAQ = [
  { q:"Apakah RAFZ API benar-benar gratis?",             a:"Ya. Semua endpoint gratis, tanpa biaya, tanpa API key, tanpa pendaftaran." },
  { q:"Apakah ada rate limit per hari?",                  a:"Belum ada rate limit ketat. Penggunaan wajar dianjurkan agar layanan tetap stabil." },
  { q:"Endpoint tidak merespons, apa yang harus dilakukan?", a:"Coba beberapa saat lagi. Jika berlanjut, hubungi kami via WhatsApp atau Telegram." },
  { q:"Bisa request endpoint baru?",                      a:"Bisa. Kirim permintaan via WhatsApp atau Telegram dan kami akan pertimbangkan." },
  { q:"Apakah aman dipakai di production?",               a:"Bisa untuk project personal dan non-komersial. Skala besar, hubungi kami dahulu." }
];

export default function Page() {
  const epCount = Object.fromEntries(
    CATEGORIES.map(c => [c.slug, ENDPOINTS.filter(e => e.category === c.slug).length])
  );

  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative z-10 border-b border-bdr">
        <div className="mx-auto max-w-[1100px] px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">

            <div>
              {/* Status badge */}
              <div className="anim-up mb-5 inline-flex items-center gap-2 rounded-[2px] border border-cyan/20 bg-cyan/[0.06] px-3 py-1.5">
                <span className="pulse-dot h-[6px] w-[6px] rounded-full bg-cyan" />
                <span className="font-mono text-[10.5px] font-bold tracking-[1.2px] text-cyan">GRATIS · TANPA LOGIN · CORS READY</span>
              </div>

              {/* Headline */}
              <h1 className="anim-up d1 font-display leading-[.88] tracking-[2px] text-ink"
                style={{ fontSize:"clamp(64px,9vw,100px)" }}>
                RAFZ<br />
                <span className="text-cyan">API</span>
              </h1>

              {/* Sub stats */}
              <div className="anim-up d2 my-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11.5px] text-fg4">
                <span>{ENDPOINTS.length} endpoint</span>
                <span className="h-px w-4 bg-bdr2" />
                <span>{CATEGORIES.length} kategori</span>
                <span className="h-px w-4 bg-bdr2" />
                <span>100% gratis</span>
              </div>

              <p className="anim-up d3 mb-8 max-w-[480px] text-[15px] leading-[1.7] text-fg2">
                {SITE.tagline} Langsung pakai tanpa daftar, tanpa API key, kapan saja.
              </p>

              <div className="anim-up d4 flex flex-wrap gap-3">
                <Link href="/apis"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-[2px] bg-cyan px-6 py-3.5 font-mono text-[11px] font-bold tracking-wider text-white transition-all hover:-translate-y-px hover:bg-cyan-2 hover:shadow-md">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  JELAJAHI API <IcArrow s={14} />
                </Link>
                <Link href="/docs"
                  className="inline-flex items-center gap-2.5 rounded-[2px] border border-bdr2 bg-white px-6 py-3.5 font-mono text-[11px] font-bold tracking-wider text-ink transition-all hover:-translate-y-px hover:border-ink hover:shadow-md">
                  DOKUMENTASI
                </Link>
              </div>

              <div className="anim-up d5 mt-7 flex items-center gap-2.5">
                <span className="font-mono text-[10.5px] text-fg4">BASE URL</span>
                <code className="rounded-[2px] border border-bdr bg-bg2 px-3 py-1.5 font-mono text-[11px] text-cyan">
                  {SITE.baseUrl}
                </code>
              </div>
            </div>

            {/* Terminal */}
            <div className="anim-up d2">
              <div className="terminal relative shadow-lg">
                <div className="scanlines" />
                <div className="t-bar">
                  <span className="t-dot t-red"/><span className="t-dot t-ylw"/><span className="t-dot t-grn"/>
                  <span className="t-label">rafz-api ~ bash</span>
                </div>
                <div className="t-body">
                  <p><span className="t-cmt"># Download video TikTok tanpa watermark</span></p>
                  <p className="mt-1"><span className="t-prompt">$ </span><span className="t-key">curl</span> <span className="t-str">"{SITE.baseUrl}/d/ttmp4?url=TT_URL"</span></p>
                  <p className="mt-3"><span className="t-cmt"># Response JSON</span></p>
                  <p>{"{"}</p>
                  <p>&nbsp;&nbsp;<span className="t-key">"status"</span>:&nbsp;<span className="t-num">200</span>,</p>
                  <p>&nbsp;&nbsp;<span className="t-key">"success"</span>:&nbsp;<span className="t-ok">true</span>,</p>
                  <p>&nbsp;&nbsp;<span className="t-key">"creator"</span>:&nbsp;<span className="t-str">"RAFZ API"</span>,</p>
                  <p>&nbsp;&nbsp;<span className="t-key">"result"</span>:&nbsp;{"{"}</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-key">"title"</span>:&nbsp;<span className="t-str">"Judul Video..."</span>,</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-key">"author"</span>:&nbsp;<span className="t-str">"@username"</span>,</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-key">"download"</span>:&nbsp;<span className="t-str">"https://cdn..."</span></p>
                  <p>&nbsp;&nbsp;{"}"}</p>
                  <p>{"}"}</p>
                  <p className="mt-2"><span className="t-prompt">$ </span><span className="t-cursor"/></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────── */}
      <section className="relative z-10 border-b border-bdr bg-white">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="grid grid-cols-2 divide-x divide-bdr md:grid-cols-4">
            {[
              { v:String(ENDPOINTS.length), l:"TOTAL ENDPOINT" },
              { v:String(CATEGORIES.length), l:"KATEGORI API" },
              { v:"GRATIS", l:"BIAYA AKSES" },
              { v:"TIDAK", l:"PERLU LOGIN" }
            ].map(({ v, l }) => (
              <div key={l} className="group relative cursor-default overflow-hidden px-6 py-5 transition-colors hover:bg-bg2">
                <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-cyan transition-transform duration-300 group-hover:scale-x-100" />
                <p className="font-display text-[28px] leading-tight tracking-[1px] text-ink">{v}</p>
                <p className="mt-0.5 font-mono text-[9.5px] tracking-[1.5px] text-fg4">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ────────────────────────────────────── */}
      <div className="relative z-10 overflow-hidden border-b border-bdr bg-bg2 py-2.5">
        <div className="ticker-inner flex whitespace-nowrap">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-5 font-mono text-[10.5px] tracking-[1.5px] text-fg4 uppercase">
              <span className="text-cyan">·</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORY GRID ─────────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="mb-10">
            <p className="mb-2 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[1.5px] text-fg4">
              <span className="h-px w-5 bg-fg4" /> KATEGORI
            </p>
            <h2 className="font-display leading-[.9] tracking-[1.5px] text-ink"
              style={{ fontSize:"clamp(38px,5.5vw,58px)" }}>
              {CATEGORIES.length} KATEGORI<br />
              <span className="text-cyan">{ENDPOINTS.length} ENDPOINT</span>
            </h2>
          </div>

          <div className="grid gap-px border border-bdr2 bg-bdr2 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => {
              const CatIcon = CAT_ICON[cat.icon] || IcFolderTool;
              return (
                <Link key={cat.slug} href={`/docs#${cat.slug}`}
                  className="group relative overflow-hidden bg-white px-6 py-7 transition-colors hover:bg-bg2">
                  {/* top accent */}
                  <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cyan to-cyan-2 transition-transform duration-300 group-hover:scale-x-100" />
                  {/* large bg number */}
                  <span className="absolute bottom-2 right-4 font-display text-[72px] leading-none text-black/[0.03] transition-colors group-hover:text-cyan/[0.06] select-none">
                    0{i + 1}
                  </span>

                  {/* folder/file icon */}
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[3px] border border-bdr2 text-fg3 transition-all group-hover:border-cyan/40 group-hover:bg-cyan/[0.06] group-hover:text-cyan">
                    <CatIcon s={20} />
                  </div>

                  <p className="mb-1.5 font-mono text-[12.5px] font-bold uppercase tracking-[.5px] text-ink">{cat.label}</p>
                  <p className="mb-5 text-[13px] leading-relaxed text-fg3">{cat.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="rounded-[2px] border border-cyan/20 bg-cyan/[0.06] px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-cyan">
                      {epCount[cat.slug]} endpoint
                    </span>
                    <span className="text-fg4 transition-all group-hover:translate-x-1 group-hover:text-cyan">
                      <IcArrow s={15} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES DARK ─────────────────────────────── */}
      <section className="relative z-10 border-y border-bdr bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="mb-10">
            <p className="mb-2 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[1.5px] text-white/25">
              <span className="h-px w-5 bg-white/25" /> KENAPA RAFZ API
            </p>
            <h2 className="font-display leading-[.9] tracking-[1.5px] text-white"
              style={{ fontSize:"clamp(38px,5.5vw,58px)" }}>
              DIRANCANG UNTUK<br /><span className="text-cyan">DEVELOPER</span>
            </h2>
          </div>

          <div className="grid gap-px border border-white/[0.07] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ Icon, label, body }, i) => (
              <div key={label}
                className="group relative overflow-hidden bg-ink px-6 py-7 transition-colors hover:bg-white/[0.03]">
                <span className="absolute bottom-2 right-4 font-display text-[72px] leading-none text-white/[0.025] group-hover:text-cyan/[0.05] select-none transition-colors">
                  0{i + 1}
                </span>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[3px] border border-white/10 text-white/40 transition-all group-hover:border-cyan/40 group-hover:text-cyan">
                  <Icon s={18} />
                </div>
                <p className="mb-1.5 font-mono text-[11.5px] font-bold uppercase tracking-[.5px] text-white">{label}</p>
                <p className="text-[13px] leading-relaxed text-white/40">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CODE EXAMPLE ──────────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-2 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[1.5px] text-fg4">
                <span className="h-px w-5 bg-fg4" /> CONTOH PEMAKAIAN
              </p>
              <h2 className="mb-4 font-display leading-[.9] tracking-[1.5px] text-ink"
                style={{ fontSize:"clamp(34px,4.5vw,50px)" }}>
                DUA BARIS<br />SUDAH CUKUP
              </h2>
              <p className="mb-7 text-[14px] leading-[1.75] text-fg2">
                Kirim GET request ke endpoint yang dibutuhkan. Tidak perlu setup library khusus, tidak perlu header autentikasi.
              </p>
              <Link href="/apis"
                className="inline-flex items-center gap-2 rounded-[2px] bg-ink px-5 py-3 font-mono text-[11px] font-bold tracking-wider text-white transition-all hover:-translate-y-px hover:bg-ink-2 hover:shadow-md">
                COBA SEKARANG <IcArrow s={13} />
              </Link>
            </div>

            <div className="terminal shadow-md">
              <div className="t-bar">
                <span className="t-dot t-red"/><span className="t-dot t-ylw"/><span className="t-dot t-grn"/>
                <span className="t-label">spotify.js</span>
              </div>
              <div className="t-body">
                <p><span className="t-cmt">// Spotify Downloader — ambil MP3</span></p>
                <p className="mt-1"><span className="t-kw">const</span> <span className="t-ok">url</span> = <span className="t-str">"https://open.spotify.com/track/..."</span>;</p>
                <p className="mt-2"><span className="t-kw">const</span> <span className="t-ok">res</span> = <span className="t-kw">await</span> <span className="t-key">fetch</span>(</p>
                <p>&nbsp;&nbsp;<span className="t-str">{`\`${SITE.baseUrl}/d/spmp3?url=\${`}<span className="t-ok">url</span>{`}\``}</span></p>
                <p>);</p>
                <p className="mt-2"><span className="t-kw">const</span> {"{"} <span className="t-ok">result</span> {"}"} = <span className="t-kw">await</span> <span className="t-ok">res</span>.<span className="t-key">json</span>();</p>
                <p className="mt-2"><span className="t-cmt">// result.audio  → URL MP3</span></p>
                <p><span className="t-cmt">// result.title  → Judul Lagu</span></p>
                <p><span className="t-cmt">// result.cover  → Cover Art</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <section className="relative z-10 border-t border-bdr bg-bg2 py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <p className="mb-2 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[1.5px] text-fg4">
                <span className="h-px w-5 bg-fg4" /> FAQ
              </p>
              <h2 className="font-display leading-[.9] tracking-[1.5px] text-ink"
                style={{ fontSize:"clamp(34px,4.5vw,50px)" }}>
                PERTANYAAN<br />UMUM
              </h2>
              <p className="mt-4 text-[13.5px] leading-relaxed text-fg3">
                Ada yang belum terjawab? Hubungi kami langsung.
              </p>
              <Link href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-[2px] border border-bdr2 bg-white px-4 py-2.5 font-mono text-[10.5px] font-bold tracking-wider text-ink transition-all hover:border-ink hover:shadow-sm">
                HUBUNGI KAMI <IcArrow s={12} />
              </Link>
            </div>

            <div className="divide-y divide-bdr border border-bdr bg-white">
              {FAQ.map(({ q, a }) => (
                <details key={q} className="group">
                  <summary className="flex cursor-pointer select-none items-center justify-between gap-4 px-5 py-4 text-[13.5px] font-medium text-ink transition-colors hover:bg-bg2">
                    {q}
                    <span className="h-5 w-5 shrink-0 text-fg4 transition-transform group-open:rotate-45">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                        <path d="M10 4v12M4 10h12"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="border-t border-bdr bg-bg2 px-5 py-4 text-[13.5px] leading-relaxed text-fg2">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
          <div className="relative overflow-hidden border border-bdr2 bg-white px-8 py-10 sm:px-12 sm:py-12">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan via-cyan-2 to-transparent" />
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/[0.05] blur-3xl" />
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display leading-[.9] tracking-[1.5px] text-ink"
                  style={{ fontSize:"clamp(32px,4vw,48px)" }}>SIAP INTEGRASI?</h3>
                <p className="mt-2 text-[14px] text-fg2">Tidak ada pendaftaran. Tidak ada tagihan. Langsung pakai.</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link href="/docs"
                  className="inline-flex items-center gap-2 rounded-[2px] bg-ink px-6 py-3 font-mono text-[11px] font-bold tracking-wider text-white transition-all hover:-translate-y-px hover:bg-ink-2 hover:shadow-md">
                  BUKA DOCS <IcArrow s={13} />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 rounded-[2px] border border-bdr2 px-6 py-3 font-mono text-[11px] font-bold tracking-wider text-ink transition-all hover:border-ink hover:shadow-sm">
                  KONTAK
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
