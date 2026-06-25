import { CONTACT, SITE } from "@/lib/apiCatalog";
import { IcWa, IcTelegram, IcMail, IcHeart, IcQr } from "@/components/Icons";
import QrisImage from "@/components/QrisImage";

export const metadata = {
  title:"Kontak & Donasi",
  description:`Hubungi tim ${SITE.name} atau dukung pengembangan lewat donasi QRIS.`
};

const CARDS = [
  { Icon:IcWa,       label:"WhatsApp", val:`+${CONTACT.whatsapp}`, href:`https://wa.me/${CONTACT.whatsapp}`,       hint:"Balas dalam beberapa jam" },
  { Icon:IcTelegram, label:"Telegram", val:`@${CONTACT.telegram}`, href:`https://t.me/${CONTACT.telegram}`,        hint:"Respons lebih cepat" },
  { Icon:IcMail,     label:"Email",    val:CONTACT.email,           href:`mailto:${CONTACT.email}`,                hint:"Bug report & kerjasama" }
];

const FAQ = [
  { q:"Apakah RAFZ API benar-benar gratis?",         a:"Ya. Semua endpoint gratis, tanpa biaya, tanpa API key, tanpa pendaftaran." },
  { q:"Apakah ada rate limit per hari?",              a:"Belum ada rate limit ketat. Penggunaan wajar sangat dianjurkan agar layanan tetap stabil." },
  { q:"Endpoint tidak merespons, apa yang harus dilakukan?", a:"Coba beberapa saat lagi. Jika berlanjut, hubungi kami via WhatsApp atau Telegram." },
  { q:"Bisa request endpoint baru?",                  a:"Bisa. Kirim permintaanmu via WhatsApp atau Telegram dan kami akan pertimbangkan." }
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <div className="relative z-10 border-b border-bdr bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8">
          <p className="mb-1 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[1.5px] text-fg4">
            <span className="h-px w-5 bg-fg4"/> Hubungi Kami
          </p>
          <h1 className="font-display leading-[.9] tracking-[1.5px] text-ink"
            style={{ fontSize:"clamp(38px,5.5vw,56px)" }}>KONTAK &amp;<br/>DONASI</h1>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-fg2">
            Ada pertanyaan, bug report, atau ingin request endpoint baru? Pilih platform paling nyaman.
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-5 py-10 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">

          {/* Left */}
          <div className="space-y-10">
            {/* Contact cards */}
            <div>
              <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[1.5px] text-fg4">Platform Kontak</p>
              <div className="flex flex-col gap-1.5">
                {CARDS.map(({ Icon, label, val, href, hint }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-4 border border-bdr bg-white px-5 py-4 transition-all hover:-translate-y-px hover:border-bdr2 hover:shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] border border-bdr2 text-fg3 transition group-hover:border-cyan/40 group-hover:bg-cyan/[0.06] group-hover:text-cyan">
                      <Icon s={18}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[12px] font-bold uppercase tracking-[.5px] text-ink">{label}</p>
                      <p className="truncate font-mono text-[12px] text-fg3 mt-0.5">{val}</p>
                    </div>
                    <span className="hidden shrink-0 border border-bdr bg-bg2 px-2.5 py-1 font-mono text-[10.5px] text-fg3 sm:inline">
                      {hint}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[1.5px] text-fg4">Pertanyaan Umum</p>
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
                    <div className="border-t border-bdr bg-bg2 px-5 py-4 text-[13.5px] leading-relaxed text-fg2">{a}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Donasi */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="overflow-hidden border border-bdr bg-white">
              {/* Header strip */}
              <div className="relative overflow-hidden bg-ink px-6 py-7">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan via-cyan-2 to-transparent"/>
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan/[0.08] blur-2xl"/>
                <div className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-white/10 text-cyan">
                  <IcHeart s={20}/>
                </div>
                <h2 className="mt-3 font-display text-[28px] leading-tight tracking-[1px] text-white">DUKUNG<br/>RAFZ API</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-white/50">
                  RAFZ API dirawat secara sukarela. Donasi kecilmu membantu server tetap jalan dan fitur terus berkembang.
                </p>
              </div>

              {/* QRIS */}
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[.5px] text-ink">
                  <IcQr s={15}/> Scan QRIS untuk Donasi
                </div>
                <div className="flex justify-center">
                  <div className="border border-bdr bg-bg2 p-3">
                    <QrisImage/>
                  </div>
                </div>
                <ul className="mt-5 space-y-2">
                  {[
                    "Donasi berapa pun sangat dihargai",
                    "Tidak ada jumlah minimum",
                    "Membantu biaya server & pengembangan"
                  ].map(t => (
                    <li key={t} className="flex items-start gap-2.5 text-[13px] text-fg3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan"/>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
