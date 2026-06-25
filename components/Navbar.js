"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IcMenu, IcX, IcArrow } from "./Icons";
import { SITE } from "@/lib/apiCatalog";

const NAV = [
  { href:"/",        label:"Dashboard" },
  { href:"/apis",    label:"List API" },
  { href:"/docs",    label:"Dokumentasi" },
  { href:"/contact", label:"Kontak" }
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-bdr bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex h-[58px] max-w-[1100px] items-center justify-between px-5 sm:px-8">

          {/* Logo */}
          <Link href="/" onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 no-underline">
            <span className="pulse-dot h-[7px] w-[7px] rounded-full bg-cyan" />
            <span className="font-mono text-[13.5px] font-bold tracking-[.5px] text-ink">
              {SITE.name.split(" ")[0]}
              <span className="text-fg3 font-normal">
                {SITE.name.includes(" ") ? " " + SITE.name.split(" ").slice(1).join(" ") : ""}
              </span>
            </span>
            <img src="/images/icon-website.png" alt="" width={26} height={26}
              className="rounded-[2px] object-cover"
              onError={e => { e.currentTarget.style.display = "none"; }} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`rounded-[2px] px-3.5 py-2 font-body text-[13px] font-medium transition-colors
                  ${path === href
                    ? "bg-cyan/[0.08] text-cyan"
                    : "text-fg2 hover:bg-bg2 hover:text-ink"}`}>
                {label}
              </Link>
            ))}
            <span className="mx-2 h-4 w-px bg-bdr2" />
            <Link href="/apis"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-[2px] bg-cyan px-4 py-2 font-mono text-[11px] font-bold tracking-wider text-white transition-all hover:-translate-y-px hover:bg-cyan-2 hover:shadow-md">
              COBA GRATIS
              <IcArrow s={13} />
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(v => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-[2px] border border-bdr text-fg3 transition hover:bg-bg2 hover:text-ink md:hidden">
            {open ? <IcX s={18} /> : <IcMenu s={18} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 anim-in bg-ink/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className={`fixed right-0 top-0 bottom-0 z-50 w-72 bg-white transition-transform duration-300 ease-out md:hidden
        ${open ? "translate-x-0 shadow-lg" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-bdr px-5 py-[17px]">
          <span className="font-mono text-[12px] font-bold tracking-widest text-ink">{SITE.name}</span>
          <button onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-[2px] border border-bdr text-fg3">
            <IcX s={16} />
          </button>
        </div>
        <nav className="p-4 space-y-0.5">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`block rounded-[2px] px-4 py-3 font-body text-[13.5px] font-medium transition-colors
                ${path === href ? "bg-cyan/[0.07] text-cyan" : "text-fg2 hover:bg-bg2"}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-bdr bg-bg2 px-5 py-4">
          <Link href="/apis" onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-[2px] bg-cyan py-2.5 font-mono text-[11px] font-bold tracking-wider text-white">
            COBA GRATIS <IcArrow s={13} />
          </Link>
        </div>
      </div>
    </>
  );
}
