import Link from "next/link";
import { IcWa, IcTelegram, IcMail } from "./Icons";
import { SITE, CATEGORIES, CONTACT } from "@/lib/apiCatalog";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 mt-auto border-t border-bdr bg-bg2">
      <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="pulse-dot h-[6px] w-[6px] rounded-full bg-cyan" />
              <span className="font-mono text-[12.5px] font-bold text-ink">{SITE.name}</span>
            </div>
            <p className="text-[12.5px] leading-relaxed text-fg3">{SITE.tagline}</p>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-3 font-mono text-[9.5px] font-bold uppercase tracking-[1.8px] text-fg4">Navigasi</p>
            <ul className="space-y-2">
              {[["Dashboard","/"],["List API","/apis"],["Dokumentasi","/docs"],["Kontak","/contact"]].map(([l,h]) => (
                <li key={h}><Link href={h} className="text-[13px] text-fg3 transition-colors hover:text-ink">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <p className="mb-3 font-mono text-[9.5px] font-bold uppercase tracking-[1.8px] text-fg4">Kategori</p>
            <ul className="space-y-2">
              {CATEGORIES.map(c => (
                <li key={c.slug}><Link href={`/docs#${c.slug}`} className="text-[13px] text-fg3 transition-colors hover:text-ink">{c.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-3 font-mono text-[9.5px] font-bold uppercase tracking-[1.8px] text-fg4">Kontak</p>
            <ul className="space-y-2.5">
              <li>
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] text-fg3 transition-colors hover:text-ink">
                  <IcWa s={13} />+{CONTACT.whatsapp}
                </a>
              </li>
              <li>
                <a href={`https://t.me/${CONTACT.telegram}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] text-fg3 transition-colors hover:text-ink">
                  <IcTelegram s={13} />@{CONTACT.telegram}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 text-[13px] text-fg3 transition-colors hover:text-ink">
                  <IcMail s={13} />{CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center gap-1 border-t border-bdr pt-6">
          <p className="font-mono text-[10.5px] text-fg4">© {year} {SITE.name}. Dibuat untuk developer Indonesia.</p>
          <p className="font-mono text-[10px] text-fg4">{SITE.baseUrl}</p>
        </div>
      </div>
    </footer>
  );
}
