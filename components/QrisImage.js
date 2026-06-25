"use client";
import { useState } from "react";
import { IcQr } from "./Icons";

export default function QrisImage() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="flex h-56 w-56 flex-col items-center justify-center gap-3 bg-bg2">
        <IcQr s={44} cls="text-bdr2"/>
        <p className="px-4 text-center text-[11px] leading-relaxed text-fg4">
          Taruh <code className="font-mono">qris-donasi.png</code><br/>
          di <code className="font-mono">/public/images/</code>
        </p>
      </div>
    );
  }
  return (
    <img
      src="/images/qris-donasi.png"
      alt="QRIS Donasi RAFZ API"
      width={224}
      height={224}
      className="block"
      onError={() => setFailed(true)}
    />
  );
}
