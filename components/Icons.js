function S({ ch, s = 22, cls }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
      strokeLinejoin="round" className={cls}>{ch}</svg>
  );
}

/* ── Category folder/file icons ──────────────────────── */
export function IcFolderDown(p)   { return <S {...p} ch={<><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M12 11v5M9.5 13.5 12 16l2.5-2.5"/></>}/>; }
export function IcFolderUp(p)     { return <S {...p} ch={<><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M12 16v-5M9.5 13.5 12 11l2.5 2.5"/></>}/>; }
export function IcFileAi(p)       { return <S {...p} ch={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M12 12.5c-.9 0-1.5.6-1.5 1.5s.6 1.5 1.5 1.5M12 12.5c.9 0 1.5.6 1.5 1.5"/><path d="M9.5 17h.5l.5-1.5.5 1.5h.5"/><path d="M14.5 15.5V17m0-1.5-.7-1.5m.7 1.5.7-1.5"/></>}/>; }
export function IcFileSearch(p)   { return <S {...p} ch={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><circle cx="11" cy="14" r="2.5"/><path d="m14 16.5-1.5-1.5"/></>}/>; }
export function IcFolderTool(p)   { return <S {...p} ch={<><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="m10.5 13.5 1 1 2.5-2.5"/><circle cx="12" cy="13.5" r="2.5"/></>}/>; }

/* ── Navigation & UI ─────────────────────────────────── */
export function IcArrow(p)     { return <S {...p} ch={<><path d="M4 12h16M13 6l6 6-6 6"/></>}/>; }
export function IcMenu(p)      { return <S {...p} ch={<><path d="M4 7h16M4 12h16M4 17h16"/></>}/>; }
export function IcX(p)         { return <S {...p} ch={<><path d="m6 6 12 12M18 6 6 18"/></>}/>; }
export function IcChevDown(p)  { return <S {...p} ch={<><path d="m7 9.5 5 5 5-5"/></>}/>; }
export function IcChevUp(p)    { return <S {...p} ch={<><path d="m7 14.5 5-5 5 5"/></>}/>; }
export function IcCopy(p)      { return <S {...p} ch={<><rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M5.5 15.5h-1a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>}/>; }
export function IcCheck(p)     { return <S {...p} ch={<><path d="m4.5 12.5 5 5 10-11"/></>}/>; }
export function IcPlay(p)      { return <S {...p} ch={<><path d="M8 5.5v13l11-6.5-11-6.5Z"/></>}/>; }
export function IcFlag(p)      { return <S {...p} ch={<><path d="M4 4v16M4 4h12l-3 5 3 5H4"/></>}/>; }
export function IcSpin(p)      { return <S {...p} ch={<><path d="M12 3a9 9 0 1 0 9 9" strokeOpacity=".25"/><path d="M21 12A9 9 0 0 0 12 3"/></>} cls={(p.cls||"")+" animate-spin"}/>; }

/* ── Contact & info ──────────────────────────────────── */
export function IcWa(p)        { return <S {...p} ch={<><path d="M7 17.2 4.5 19l1-3.3A7.5 7.5 0 1 1 12 19.5a7.4 7.4 0 0 1-5-1.9Z"/><path d="M9 9.7c0 3 2.3 5.3 5.3 5.3.6 0 .9-.5.7-1l-.6-1.4a.8.8 0 0 0-1-.4l-.7.3a4.2 4.2 0 0 1-2.2-2.2l.3-.7a.8.8 0 0 0-.4-1L9 8c-.5-.2-1 .1-1 .7Z"/></>}/>; }
export function IcTelegram(p)  { return <S {...p} ch={<><path d="m4 12.2 15.2-6.4c.7-.3 1.4.3 1.1 1L17.6 19a.9.9 0 0 1-1.5.3l-3.6-3.3-2 2-.5-4.2L18 8.7 8.7 13.4 4 12.2Z"/></>}/>; }
export function IcMail(p)      { return <S {...p} ch={<><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4.5 7 7.5 6 7.5-6"/></>}/>; }
export function IcHeart(p)     { return <S {...p} ch={<><path d="M12 20s-7.2-4.4-9.4-9A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 9.4 4c-2.2 4.6-9.4 9-9.4 9Z"/></>}/>; }
export function IcQr(p)        { return <S {...p} ch={<><rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h2.5v2.5h-2.5zM19.5 14.5h1v1h-1zM14.5 19.5h1v1h-1zM17.5 17.5h2.5v2.5h-2.5z"/></>}/>; }

/* ── Feature icons ───────────────────────────────────── */
export function IcShield(p)    { return <S {...p} ch={<><path d="M12 3.5 19 6v5.5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-2.5Z"/><path d="m9 12 2 2 4-4.5"/></>}/>; }
export function IcGauge(p)     { return <S {...p} ch={<><path d="M4.5 16.5a8 8 0 1 1 15 0"/><path d="M12 13.5 15.5 9"/><circle cx="12" cy="13.5" r="1.1"/></>}/>; }
export function IcLayers(p)    { return <S {...p} ch={<><path d="M12 3.5 4 8l8 4.5L20 8l-8-4.5ZM4 12l8 4.5L20 12M4 16l8 4.5L20 16"/></>}/>; }
export function IcLock(p)      { return <S {...p} ch={<><rect x="5.5" y="11" width="13" height="9" rx="2"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3"/></>}/>; }
export function IcBell(p)      { return <S {...p} ch={<><path d="M6 10a6 6 0 0 1 12 0v4l2 2H4l2-2v-4Z"/><path d="M10 20a2 2 0 0 0 4 0"/></>}/>; }

/* ── Plug / logo fallback ────────────────────────────── */
export function IcPlug(p)      { return <S {...p} ch={<><path d="M9 7V3.5M15 7V3.5"/><path d="M6.5 7h11a1 1 0 0 1 1 1v3a6.5 6.5 0 0 1-13 0V8a1 1 0 0 1 1-1Z"/><path d="M12 16.5V19M8.5 21h7"/></>}/>; }

/* ── Search standalone ───────────────────────────────── */
export function IcSearch(p)    { return <S {...p} ch={<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.6-4.6"/></>}/>; }
