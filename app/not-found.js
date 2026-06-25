import Link from "next/link";
import { IcArrow } from "@/components/Icons";

export const metadata = { title:"404 — Tidak Ditemukan" };

export default function NotFound() {
  return (
    <div className="relative z-10 flex min-h-[75vh] items-center justify-center px-5 py-20">
      <div className="text-center">
        <p className="font-display text-[120px] leading-none tracking-[4px] text-ink/[0.06] select-none">404</p>
        <div className="-mt-8">
          <h1 className="font-display text-[40px] leading-tight tracking-[2px] text-ink">HALAMAN TIDAK<br/>DITEMUKAN</h1>
          <p className="mt-3 text-[14px] text-fg3 max-w-xs mx-auto">Endpoint yang kamu cari mungkin ada di halaman dokumentasi.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/"
              className="inline-flex items-center gap-2 rounded-[2px] bg-ink px-5 py-3 font-mono text-[11px] font-bold tracking-wider text-white transition hover:-translate-y-px hover:bg-ink-2 hover:shadow-md">
              DASHBOARD
            </Link>
            <Link href="/docs"
              className="inline-flex items-center gap-2 rounded-[2px] border border-bdr2 bg-white px-5 py-3 font-mono text-[11px] font-bold tracking-wider text-ink transition hover:border-ink hover:shadow-sm">
              DOKUMENTASI <IcArrow s={13}/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
