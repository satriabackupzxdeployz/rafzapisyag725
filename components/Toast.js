"use client";
import { useEffect, useState, useCallback } from "react";
import { IcCheck, IcX } from "./Icons";

let _push = null;
export function toast(msg, type = "success") { _push?.({ msg, type, id: Date.now() }); }

export default function ToastProvider() {
  const [list, setList] = useState([]);
  const remove = useCallback(id => setList(p => p.filter(t => t.id !== id)), []);

  useEffect(() => {
    _push = t => { setList(p => [...p, t]); setTimeout(() => remove(t.id), 3000); };
    return () => { _push = null; };
  }, [remove]);

  if (!list.length) return null;
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[1000] flex -translate-x-1/2 flex-col items-center gap-2">
      {list.map(t => (
        <div key={t.id}
          className="pointer-events-auto anim-up flex items-center gap-2.5 rounded-[3px] border border-white/10 bg-ink px-5 py-3 shadow-lg font-body text-[13px] font-medium text-white">
          {t.type === "success"
            ? <IcCheck s={15} cls="text-cyan" />
            : <IcX s={15} cls="text-orange" />}
          {t.msg}
        </div>
      ))}
    </div>
  );
}
