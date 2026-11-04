"use client";

import { useCallback, useEffect, useState } from "react";
import { ago, api, fmtSize, type SiteData } from "./lib";

type Lang = "en" | "fi";
type Status = "waiting" | "working" | "done" | "none";
type Row = {
  id: string; slug: string; name: string; owner_name: string | null; owner_email: string | null; token: string;
  preview_url: string | null; status: string; last_client_activity_at: string | null;
  files: number; texts: number; bytes: number; unprocessed: number;
  tasks_total: number; tasks_done: number; tasks_answered: number;
  last_work: { status: "waiting" | "working" | "done"; created_at: string; picked_up_at: string | null; done_at: string | null; item_count: number } | null;
  last_message: { author: string; body: string; created_at: string } | null;
};

const T = {
  en: {
    clients: "Clients", waiting: (n: number) => `${n} waiting`, back: "Clients",
    status: { waiting: "Waiting for Claude", working: "Claude is working", done: "Up to date", none: "Not started" } as Record<Status, string>,
    newN: (n: number) => `${n} new`, homework: "Homework", files: "Files", texts: "Texts",
    start: "Start work now", clientPage: "Client page", copy: "Copy link", copied: "Copied", preview: "Preview", live: "Live",
    paste: "Paste anything…", clientSees: "Client sees it", save: "Save",
    activity: "Activity", nothing: "Nothing yet.", pick: "Pick a client",
    who: { client: "Client", jeff: "Jeff", claude: "Claude" } as Record<string, string>,
    pressed: (n: number) => `Pressed start work · ${n} items`,
    auto: (n: number) => `Saved ${n} items and left · started automatically`,
    denied: "Not allowed.", loading: "Loading…",
    open: "Open", original: "Original", translated: "English", showAll: (n: number) => `Show all ${n}`,
  },
  fi: {
    clients: "Asiakkaat", waiting: (n: number) => `${n} odottaa`, back: "Asiakkaat",
    status: { waiting: "Odottaa Claudea", working: "Claude työskentelee", done: "Ajan tasalla", none: "Ei aloitettu" } as Record<Status, string>,
    newN: (n: number) => `${n} uutta`, homework: "Kotitehtävät", files: "Tiedostot", texts: "Tekstit",
    start: "Aloita työ nyt", clientPage: "Asiakkaan sivu", copy: "Kopioi linkki", copied: "Kopioitu", preview: "Esikatselu", live: "Julkaistu",
    paste: "Liitä mitä vain…", clientSees: "Asiakas näkee", save: "Tallenna",
    activity: "Tapahtumat", nothing: "Ei vielä mitään.", pick: "Valitse asiakas",
    who: { client: "Asiakas", jeff: "Jeff", claude: "Claude" } as Record<string, string>,
    pressed: (n: number) => `Painoi aloita työ · ${n} kpl`,
    auto: (n: number) => `Tallensi ${n} kpl ja lähti · aloitettiin automaattisesti`,
    denied: "Ei pääsyä.", loading: "Ladataan…",
    open: "Avaa", original: "Alkuperäinen", translated: "Suomeksi", showAll: (n: number) => `Näytä kaikki ${n}`,
  },
};

const tone: Record<Status, { chip: string; dot: string }> = {
  waiting: { chip: "bg-[#fbe6cf] text-[#8a3f12]", dot: "bg-[#e07a2b]" },
  working: { chip: "bg-[#dce9f7] text-[#1d4a7a]", dot: "bg-[#3a7bd5] animate-pulse" },
  done: { chip: "bg-[color:var(--d-accent-soft)] text-[color:var(--d-accent)]", dot: "bg-[color:var(--d-accent)]" },
  none: { chip: "bg-black/[.05] text-[color:var(--d-ink2)]", dot: "bg-black/20" },
};

const statusOf = (r: Row): Status => r.last_work?.status ?? "none";
const order = (r: Row) => ({ waiting: 0, working: 1, none: 3, done: 3 })[statusOf(r)] - (r.unprocessed ? 1 : 0);

function readLang(): Lang {
  try {
    const v = localStorage.getItem("admin-lang");
    if (v === "en" || v === "fi") return v;
  } catch {}
  return "en";
}

export default function Admin({ adminKey }: { adminKey: string }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [denied, setDenied] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];

  const load = useCallback(async () => {
    try {
      const d = await api<{ sites: Row[] }>({ action: "admin_overview", key: adminKey });
      setRows(d.sites);
    } catch {
      setDenied(true);
    }
  }, [adminKey]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads localStorage once after mount
    setLang(readLang());
    load();
    const id = setInterval(() => document.visibilityState === "visible" && load(), 30000);
    return () => clearInterval(id);
  }, [load]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // On a wide screen, open the most urgent client right away so the right side is never empty.
  const first = rows?.length ? [...rows].sort((a, b) => order(a) - order(b))[0].id : null;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time default selection on desktop
    if (first && window.matchMedia("(min-width: 1024px)").matches) setSel((cur) => cur ?? first);
  }, [first]);

  const chooseLang = (v: Lang) => {
    setLang(v);
    try { localStorage.setItem("admin-lang", v); } catch {}
  };

  if (denied) return <Shell><p className="mt-24 text-center">{t.denied}</p></Shell>;
  if (!rows) return <Shell><p className="mt-24 text-center text-[color:var(--d-ink3)]">{t.loading}</p></Shell>;

  const sorted = [...rows].sort((a, b) => order(a) - order(b) || (b.last_client_activity_at ?? "").localeCompare(a.last_client_activity_at ?? ""));
  const waiting = rows.filter((r) => statusOf(r) === "waiting").length;
  const current = rows.find((r) => r.id === sel) ?? null;
  const open = (id: string | null) => { setSel(id); window.scrollTo({ top: 0 }); };

  return (
    <Shell>
      <header className={`items-center justify-between gap-3 pt-6 pb-5 sm:pt-8 ${current ? "hidden lg:flex" : "flex"}`}>
        <div className="flex items-center gap-3">
          <h1 className="text-[28px] font-semibold tracking-tight">{t.clients}</h1>
          {waiting > 0 && <span className={`rounded-full px-2.5 py-1 text-[13px] font-semibold ${tone.waiting.chip}`}>{t.waiting(waiting)}</span>}
        </div>
        <div className="flex rounded-full bg-white p-0.5 ring-1 ring-black/10" role="group" aria-label="Language">
          {(["en", "fi"] as Lang[]).map((v) => (
            <button key={v} onClick={() => chooseLang(v)} aria-pressed={lang === v}
              className={`rounded-full px-3 py-1 text-[13px] font-semibold uppercase ${lang === v ? "bg-[color:var(--d-ink)] text-white" : "text-[color:var(--d-ink2)] hover:text-[color:var(--d-ink)]"}`}>
              {v}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 pb-12 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
        <ul className={`space-y-2 ${current ? "hidden lg:block" : ""}`}>
          {sorted.map((r) => (
            <li key={r.id}>
              <ClientRow r={r} t={t} lang={lang} active={r.id === sel} onClick={() => open(r.id)} />
            </li>
          ))}
        </ul>

        {current ? (
          <div className="lg:sticky lg:top-6">
            <button onClick={() => open(null)} className="mt-5 mb-3 flex items-center gap-1 text-[15px] font-medium text-[color:var(--d-accent)] lg:hidden">
              <span aria-hidden>‹</span> {t.back}
            </button>
            <Detail key={current.id} row={current} adminKey={adminKey} t={t} lang={lang} onChange={load} />
          </div>
        ) : (
          <div className="hidden min-h-[320px] items-center justify-center rounded-3xl border-2 border-dashed border-black/10 text-[color:var(--d-ink3)] lg:flex">
            {t.pick}
          </div>
        )}
      </div>
    </Shell>
  );
}

function ClientRow({ r, t, lang, active, onClick }: { r: Row; t: (typeof T)[Lang]; lang: Lang; active: boolean; onClick: () => void }) {
  const s = statusOf(r);
  return (
    <button onClick={onClick}
      className={`w-full rounded-2xl p-4 text-left transition ${active ? "bg-[color:var(--d-ink)] text-white shadow-lg" : "bg-white shadow-sm ring-1 ring-black/5 hover:ring-black/15"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${active && s === "none" ? "bg-white/30" : tone[s].dot}`} title={t.status[s]} />
            <span translate="no" className="truncate text-[17px] font-semibold">{r.name}</span>
            {r.status === "live" && <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${active ? "bg-white/15 text-white" : tone.done.chip}`}>{t.live}</span>}
          </div>
          <div translate="no" className={`mt-0.5 truncate pl-[18px] text-[14px] ${active ? "text-white/65" : "text-[color:var(--d-ink2)]"}`}>{r.owner_name}</div>
        </div>
        <span className={`shrink-0 text-[13px] ${active ? "text-white/60" : "text-[color:var(--d-ink3)]"}`}>{ago(r.last_client_activity_at, lang)}</span>
      </div>
      <div className="mt-3 flex items-center gap-3 pl-[18px]">
        <Bar done={r.tasks_done} total={r.tasks_total} dark={active} />
        {r.unprocessed > 0 && <span className={`shrink-0 rounded-full px-2 py-0.5 text-[12px] font-semibold ${tone.waiting.chip}`}>{t.newN(r.unprocessed)}</span>}
      </div>
    </button>
  );
}

function Bar({ done, total, dark }: { done: number; total: number; dark?: boolean }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <div className={`h-1.5 flex-1 overflow-hidden rounded-full ${dark ? "bg-white/15" : "bg-black/[.07]"}`}>
        <div className={`h-full rounded-full ${dark ? "bg-[color:var(--d-go)]" : "bg-[color:var(--d-accent)]"}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`shrink-0 text-[12px] tabular-nums ${dark ? "text-white/60" : "text-[color:var(--d-ink3)]"}`}>{done}/{total}</span>
    </div>
  );
}

function Detail({ row, adminKey, t, lang, onChange }: { row: Row; adminKey: string; t: (typeof T)[Lang]; lang: Lang; onChange: () => void }) {
  const [d, setD] = useState<SiteData | null>(null);
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const s = statusOf(row);

  const load = useCallback(async () => {
    setD(await api<SiteData>({ action: "admin_site", key: adminKey, site_id: row.id }));
  }, [adminKey, row.id]);
  useEffect(() => { load(); }, [load]);

  const act = async (body: Record<string, unknown>) => {
    setBusy(true);
    try {
      await api({ ...body, key: adminKey, site_id: row.id });
      await load();
      onChange();
    } finally {
      setBusy(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/drop/${row.token}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const recent: Entry[] = d
    ? [
        ...d.items.map((i): Entry => {
          const task = i.task_id ? d.tasks.find((q) => q.id === i.task_id) : undefined;
          const text = i.kind === "text" ? i.i18n?.[lang] || i.body || "" : "";
          return {
            key: `i${i.id}`, at: i.created_at, who: i.source, icon: i.kind === "file" ? "📎" : "✏️", thumb: i.thumb_url,
            text: i.kind === "file" ? `${i.filename} · ${fmtSize(i.size_bytes)}` : text,
            original: i.kind === "text" && i.body && i.body !== text ? i.body : null,
            question: task ? task.i18n?.[lang] || task.question : null,
            file: i.kind === "file" ? { id: i.id, mime: i.mime ?? "" } : null,
            note: i.agent_note, fresh: !i.processed_at,
          };
        }),
        ...d.messages.map((m): Entry => {
          const text = m.i18n?.[lang] || m.body;
          return { key: `m${m.id}`, at: m.created_at, who: m.author, icon: "💬", thumb: null, text,
            original: m.body !== text ? m.body : null, question: null, file: null, note: null, fresh: false };
        }),
        ...d.work.map((w): Entry => ({ key: `w${w.id}`, at: w.created_at, who: "client", icon: "▶︎", thumb: null,
          text: w.auto ? t.auto(w.item_count) : t.pressed(w.item_count), original: null, question: null, file: null, note: null, fresh: false })),
      ].sort((a, b) => b.at.localeCompare(a.at))
    : [];

  const pill = "inline-flex items-center rounded-full bg-white px-3.5 py-2 text-[14px] font-medium ring-1 ring-black/10 hover:ring-black/25";

  return (
    <div className="space-y-4">
      <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 translate="no" className="text-[24px] font-semibold leading-tight tracking-tight">{row.name}</h2>
            <div translate="no" className="mt-1 text-[15px] text-[color:var(--d-ink2)]">
              <div>{row.owner_name}</div>
              {row.owner_email && <a href={`mailto:${row.owner_email}`} className="underline decoration-black/20 underline-offset-2 hover:decoration-black/60">{row.owner_email}</a>}
            </div>
          </div>
          <span className={`rounded-full px-3 py-1 text-[13px] font-semibold ${tone[s].chip}`}>{t.status[s]}</span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <Stat label={t.homework} value={`${row.tasks_done}/${row.tasks_total}`} />
          <Stat label={t.files} value={`${row.files}`} sub={row.bytes ? fmtSize(row.bytes) : undefined} />
          <Stat label={t.texts} value={`${row.texts}`} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button disabled={busy} onClick={() => act({ action: "admin_start_work" })}
            className="inline-flex items-center rounded-full bg-[color:var(--d-go)] px-4 py-2 text-[14px] font-semibold text-[color:var(--d-ink)] shadow-sm hover:brightness-105 disabled:opacity-50">
            {t.start}{row.unprocessed > 0 && <span className="ml-2 rounded-full bg-[color:var(--d-ink)] px-1.5 text-[12px] text-[color:var(--d-go)]">{row.unprocessed}</span>}
          </button>
          <a href={`/drop/${row.token}`} target="_blank" rel="noopener noreferrer" className={pill}>{t.clientPage} ↗</a>
          <button onClick={copy} className={pill}>{copied ? `${t.copied} ✓` : t.copy}</button>
          {row.preview_url && <a href={row.preview_url} target="_blank" rel="noopener noreferrer" className={pill}>{row.status === "live" ? t.live : t.preview} ↗</a>}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder={t.paste}
          className="w-full resize-y rounded-2xl bg-[color:var(--d-bg)] px-4 py-3 text-[15px] outline-none ring-1 ring-transparent focus:ring-[color:var(--d-accent)]" />
        <div className="mt-3 flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[color:var(--d-ink2)]">
            <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} className="h-4 w-4 accent-[color:var(--d-accent)]" /> {t.clientSees}
          </label>
          <button disabled={busy || !text.trim()} onClick={async () => { await act({ action: "admin_add_text", body: text, visible_to_client: show }); setText(""); }}
            className="rounded-full bg-[color:var(--d-ink)] px-5 py-2 text-[14px] font-semibold text-white disabled:opacity-30">{t.save}</button>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
        <h3 className="text-[17px] font-semibold">{t.activity}</h3>
        <Activity entries={recent} loaded={!!d} siteId={row.id} adminKey={adminKey} t={t} lang={lang} />
      </section>
    </div>
  );
}

type Entry = {
  key: string; at: string; who: string; icon: string; thumb: string | null;
  text: string; original: string | null; question: string | null;
  file: { id: string; mime: string } | null; note: string | null; fresh: boolean;
};

// Every line opens in place: full text (in the panel's language, original one tap away), the homework
// question it answers, and files at full size (photos and videos play right here, anything else opens).
function Activity({ entries, loaded, siteId, adminKey, t, lang }: {
  entries: Entry[]; loaded: boolean; siteId: string; adminKey: string; t: (typeof T)[Lang]; lang: Lang;
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [all, setAll] = useState(false);
  const [urls, setUrls] = useState<Record<string, string | null>>({});
  const [orig, setOrig] = useState<Record<string, boolean>>({});
  const shown = all ? entries : entries.slice(0, 25);

  const toggle = async (x: Entry) => {
    const next = openKey === x.key ? null : x.key;
    setOpenKey(next);
    if (next && x.file && !(x.file.id in urls)) {
      const r = await api<{ files: { id: string; url: string | null }[] }>({
        action: "admin_file_urls", key: adminKey, site_id: siteId, ids: [x.file.id],
      }).catch(() => ({ files: [] }));
      setUrls((u) => ({ ...u, [x.file!.id]: r.files[0]?.url ?? null }));
    }
  };

  return (
    <>
      <ul className="mt-3 divide-y divide-black/5">
        {shown.map((x) => {
          const isOpen = openKey === x.key;
          const url = x.file ? urls[x.file.id] : undefined;
          const showOrig = !!orig[x.key] && !!x.original;
          return (
            <li key={x.key}>
              <button onClick={() => toggle(x)} aria-expanded={isOpen}
                className="flex w-full items-center gap-3 py-2.5 text-left hover:bg-black/[.02]">
                {x.thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element -- signed storage URL
                  <img src={x.thumb} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--d-bg)] text-[16px]">{x.icon}</span>
                )}
                <div className="min-w-0 flex-1">
                  <div className={`truncate text-[14px] ${x.fresh ? "font-semibold text-[color:var(--d-ink)]" : "text-[color:var(--d-ink2)]"}`}>{x.text}</div>
                  <div className="text-[12px] text-[color:var(--d-ink3)]">{t.who[x.who] ?? x.who} · {ago(x.at, lang)}</div>
                </div>
                {x.fresh && <span className={`h-2 w-2 shrink-0 rounded-full ${tone.waiting.dot}`} />}
              </button>
              {isOpen && (
                <div className="mb-3 space-y-3 rounded-2xl bg-[color:var(--d-bg)] p-4 text-[15px] leading-relaxed">
                  {x.question && <p className="text-[14px] text-[color:var(--d-ink2)]">{x.question}</p>}
                  {x.file ? (
                    <FileView url={url} mime={x.file.mime} thumb={x.thumb} name={x.text} t={t} />
                  ) : (
                    <p className="whitespace-pre-wrap break-words">{showOrig ? x.original : x.text}</p>
                  )}
                  {x.original && (
                    <button onClick={() => setOrig((o) => ({ ...o, [x.key]: !o[x.key] }))}
                      className="text-[13px] font-medium text-[color:var(--d-accent)]">
                      {showOrig ? t.translated : t.original}
                    </button>
                  )}
                  {x.note && <p className="text-[13px] text-[color:var(--d-ink3)]">Claude: {x.note}</p>}
                </div>
              )}
            </li>
          );
        })}
        {loaded && entries.length === 0 && <li className="py-2 text-[14px] text-[color:var(--d-ink3)]">{t.nothing}</li>}
      </ul>
      {!all && entries.length > 25 && (
        <button onClick={() => setAll(true)} className="mt-2 text-[14px] font-medium text-[color:var(--d-accent)]">{t.showAll(entries.length)}</button>
      )}
    </>
  );
}

function FileView({ url, mime, thumb, name, t }: { url: string | null | undefined; mime: string; thumb: string | null; name: string; t: (typeof T)[Lang] }) {
  if (url === undefined) return <p className="text-[14px] text-[color:var(--d-ink3)]">{t.loading}</p>;
  // Chrome can't show HEIC, so iPhone photos fall back to the thumbnail plus the Open link.
  const img = mime.startsWith("image/") && !/hei[cf]/i.test(mime);
  return (
    <div className="space-y-3">
      {url && img ? (
        // eslint-disable-next-line @next/next/no-img-element -- signed storage URL
        <img src={url} alt="" className="max-h-[70vh] w-auto max-w-full rounded-xl" />
      ) : url && mime.startsWith("video/") ? (
        <video src={url} controls preload="metadata" className="max-h-[70vh] w-full rounded-xl bg-black" />
      ) : thumb ? (
        // eslint-disable-next-line @next/next/no-img-element -- signed storage URL
        <img src={thumb} alt="" className="max-h-[50vh] w-auto max-w-full rounded-xl" />
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="min-w-0 break-all text-[13px] text-[color:var(--d-ink2)]">{name}</span>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-[color:var(--d-ink)] px-4 py-1.5 text-[14px] font-semibold text-white">{t.open} ↗</a>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-[color:var(--d-bg)] px-3 py-3">
      <div className="text-[22px] font-semibold tabular-nums leading-none">{value}</div>
      <div className="mt-1.5 text-[12px] text-[color:var(--d-ink2)]">{label}{sub ? ` · ${sub}` : ""}</div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:var(--d-bg)] text-[color:var(--d-ink)] font-[family-name:var(--font-geist-sans)]">
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</main>
    </div>
  );
}
