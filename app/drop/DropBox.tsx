"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ago, api, fmtSize, uploadFile, type I18n, type Item, type SiteData, type Task } from "./lib";

type Lang = "fi" | "en" | "sv";

const T = {
  fi: {
    preview: "Esikatselu",
    homework: "Kotitehtävät",
    allDone: "Kaikki tehty – kiitos!",
    answer: "Vastaa",
    more: "Lisää",
    answerPh: "Kirjoita vastaus…",
    photo: "Kuva",
    save: "Tallenna",
    cancel: "Peru",
    drop: "Pudota tiedostoja tai napauta",
    textPh: "Kirjoita tai liitä mitä vain…",
    go: "Lähetä tekoälylle – aloita työ",
    waitingN: (n: number) => (n === 1 ? "1 uusi" : `${n} uutta`),
    status: { waiting: "Vastaanotettu", working: "Työn alla", done: "Valmis" },
    help: [
      "Muuta sivujasi milloin tahansa, 24/7.",
      "Kaikki tallentuu heti. Paina nappia, kun olet valmis, niin työ alkaa. Jos unohdat, aloitamme silti puolen tunnin päästä.",
      "Tekoälyagenttimme päivittää esikatselun ja vastaa tälle sivulle.",
      "Jeff tarkistaa, että kaikki menee oikein.",
    ],
    messages: "Viestit",
    you: "Sinä",
    claude: "Tekoälyagentti",
    jeff: "Jeff",
    files: "Tiedostot",
    retry: "Yritä uudelleen",
    keepOpen: "Pidä sivu auki",
    delQ: "Poistetaanko?",
    del: "Poista",
    notFound: "Linkkiä ei löytynyt.",
    loading: "Ladataan…",
  },
  en: {
    preview: "Preview",
    homework: "Homework",
    allDone: "All done – thank you!",
    answer: "Answer",
    more: "Add more",
    answerPh: "Type your answer…",
    photo: "Photo",
    save: "Save",
    cancel: "Cancel",
    drop: "Drop files or tap",
    textPh: "Write or paste anything…",
    go: "Send to AI – start work",
    waitingN: (n: number) => (n === 1 ? "1 new" : `${n} new`),
    status: { waiting: "Received", working: "In progress", done: "Done" },
    help: [
      "Change your site any time, 24/7.",
      "Everything saves right away. Press the button when you're done and work starts. If you forget, we start anyway after half an hour.",
      "Our AI agent updates your preview and replies on this page.",
      "Jeff checks that everything is done right.",
    ],
    messages: "Messages",
    you: "You",
    claude: "AI agent",
    jeff: "Jeff",
    files: "Files",
    retry: "Try again",
    keepOpen: "Keep this page open",
    delQ: "Delete this?",
    del: "Delete",
    notFound: "Link not found.",
    loading: "Loading…",
  },
  sv: {
    preview: "Förhandsvisning",
    homework: "Hemuppgifter",
    allDone: "Allt klart – tack!",
    answer: "Svara",
    more: "Lägg till",
    answerPh: "Skriv ditt svar…",
    photo: "Bild",
    save: "Spara",
    cancel: "Avbryt",
    drop: "Släpp filer eller tryck",
    textPh: "Skriv eller klistra in vad som helst…",
    go: "Skicka till AI – börja arbeta",
    waitingN: (n: number) => (n === 1 ? "1 ny" : `${n} nya`),
    status: { waiting: "Mottaget", working: "Pågår", done: "Klart" },
    help: [
      "Ändra din webbplats när som helst, dygnet runt.",
      "Allt sparas direkt. Tryck på knappen när du är klar så börjar arbetet. Om du glömmer börjar vi ändå efter en halvtimme.",
      "Vår AI-agent uppdaterar förhandsvisningen och svarar på den här sidan.",
      "Jeff kontrollerar att allt blir rätt.",
    ],
    messages: "Meddelanden",
    you: "Du",
    claude: "AI-agent",
    jeff: "Jeff",
    files: "Filer",
    retry: "Försök igen",
    keepOpen: "Håll sidan öppen",
    delQ: "Ta bort?",
    del: "Ta bort",
    notFound: "Länken hittades inte.",
    loading: "Laddar…",
  },
};
type L = (typeof T)["fi"];

const tr = (i18n: I18n, l: Lang, text: string) => i18n?.[l] || text;

type Up = { key: string; name: string; progress: number; error?: boolean; file: File; taskId?: string };

const I = {
  up: "M12 16V4m0 0-4.5 4.5M12 4l4.5 4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3",
  file: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5",
  video: "M15 10l5-3v10l-5-3M4 6h11v12H4z",
  audio: "M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
  zip: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM11 5h1M11 8h1M11 11h1M11 14h1v3h-1z",
  x: "M6 6l12 12M18 6 6 18",
  ext: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8",
  check: "M5 12.5l4.5 4.5L19 7",
  camera: "M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
};

function Icon({ d, className = "w-5 h-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

function fileIcon(mime: string | null) {
  if (!mime) return I.file;
  if (mime.startsWith("video/")) return I.video;
  if (mime.startsWith("audio/")) return I.audio;
  if (mime.includes("zip") || mime.includes("compressed")) return I.zip;
  return I.file;
}

function readLang(fallback: Lang): Lang {
  try {
    const v = localStorage.getItem("drop-lang");
    if (v === "fi" || v === "en" || v === "sv") return v;
  } catch {}
  return fallback;
}

export default function DropBox({ token }: { token: string }) {
  const [data, setData] = useState<SiteData | null>(null);
  const [missing, setMissing] = useState(false);
  const [lang, setLang] = useState<Lang | null>(null);
  const [ups, setUps] = useState<Up[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [help, setHelp] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const panelGo = useRef<HTMLDivElement>(null);
  const [panelGoVisible, setPanelGoVisible] = useState(false);
  const l: Lang = lang ?? data?.site.language ?? "fi";
  const t: L = T[l];

  const load = useCallback(async () => {
    try {
      const d = await api<SiteData>({ action: "get", token });
      setData(d);
      setLang((cur) => cur ?? readLang(d.site.language));
    } catch {
      setMissing(true);
    }
  }, [token]);

  useEffect(() => {
    load();
    const id = setInterval(() => document.visibilityState === "visible" && load(), 45000);
    return () => clearInterval(id);
  }, [load]);

  useEffect(() => {
    document.documentElement.lang = l;
  }, [l]);

  const loaded = !!data;
  useEffect(() => {
    const el = panelGo.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPanelGoVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [loaded]);

  const chooseLang = (v: Lang) => {
    setLang(v);
    try { localStorage.setItem("drop-lang", v); } catch {}
  };

  const uploading = ups.some((u) => !u.error && u.progress < 1);
  useEffect(() => {
    if (!uploading) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [uploading]);

  const runUploads = useCallback(
    async (list: Up[]) => {
      // Two at a time is kind to phone connections and still quick.
      const queue = [...list];
      const worker = async () => {
        for (let u = queue.shift(); u; u = queue.shift()) {
          const key = u.key;
          try {
            await uploadFile(token, u.file, (p) => setUps((s) => s.map((x) => (x.key === key ? { ...x, progress: Math.min(p, 0.99) } : x))), u.taskId);
            setUps((s) => s.filter((x) => x.key !== key));
            load();
          } catch {
            setUps((s) => s.map((x) => (x.key === key ? { ...x, error: true } : x)));
          }
        }
      };
      await Promise.all([worker(), worker()]);
    },
    [token, load],
  );

  const addFiles = useCallback(
    (files: FileList | File[] | null, taskId?: string) => {
      if (!files || !files.length) return;
      const list: Up[] = Array.from(files).map((f) => ({ key: `${f.name}-${f.size}-${Math.random()}`, name: f.name, progress: 0, file: f, taskId }));
      setUps((s) => [...s, ...list]);
      runUploads(list);
    },
    [runUploads],
  );

  const retry = (u: Up) => {
    setUps((s) => s.map((x) => (x.key === u.key ? { ...x, error: false, progress: 0 } : x)));
    runUploads([{ ...u, error: false, progress: 0 }]);
  };

  const saveText = async (body: string, taskId?: string) => {
    if (!body.trim()) return;
    await api({ action: "add_text", token, body, task_id: taskId ?? null });
  };

  const startWork = async () => {
    setBusy(true);
    try {
      if (text.trim()) {
        await saveText(text);
        setText("");
      }
      await api({ action: "start_work", token });
      await load();
    } finally {
      setBusy(false);
    }
  };

  const del = async (it: Item) => {
    if (!confirm(t.delQ)) return;
    await api({ action: "delete_item", token, id: it.id });
    load();
  };

  const lastWork = data?.work[0];
  const pending = useMemo(() => {
    if (!data) return 0;
    const since = lastWork ? new Date(lastWork.requested_at ?? lastWork.created_at).getTime() : 0;
    return data.items.filter((i) => i.source === "client" && !i.processed_at && new Date(i.created_at).getTime() > since).length;
  }, [data, lastWork]);

  if (missing) return <Shell><p className="mt-24 text-center text-[color:var(--d-ink2)]">{T.fi.notFound} · {T.en.notFound} · {T.sv.notFound}</p></Shell>;
  if (!data) return <Shell><p className="mt-24 text-center text-[color:var(--d-ink2)]">{t.loading}</p></Shell>;

  const files = data.items.filter((i) => i.kind === "file");
  const tasks = data.tasks;
  const doneCount = tasks.filter((x) => x.status === "done").length;
  const convo = [
    ...data.messages.map((m) => ({ id: m.id, who: m.author, body: tr(m.i18n, l, m.body), at: m.created_at })),
    ...data.items.filter((i) => i.kind === "text" && i.source === "client" && !i.task_id).map((i) => ({ id: i.id, who: "client" as const, body: i.body ?? "", at: i.created_at })),
  ].sort((a, b) => b.at.localeCompare(a.at));
  const canGo = (pending > 0 || text.trim().length > 0) && !busy && !uploading;
  const status = lastWork && pending === 0 && !text.trim() ? lastWork : null;
  const looseUps = ups.filter((u) => !u.taskId);

  const goButton = (
    <button disabled={!canGo} onClick={startWork}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--d-go)] px-5 py-4 text-[17px] font-semibold text-[color:var(--d-ink)] shadow-lg transition hover:brightness-105 active:scale-[.99] disabled:bg-white/15 disabled:text-white/45 disabled:shadow-none">
      <Icon d={I.spark} /> {t.go}
      {pending > 0 && <span className="rounded-full bg-[color:var(--d-ink)] px-2 py-0.5 text-[12px] font-semibold text-[color:var(--d-go)]">{pending}</span>}
    </button>
  );

  return (
    <Shell>
      <header className="flex flex-wrap items-center justify-between gap-3 pt-6 sm:pt-10">
        <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-tight">{data.site.name}</h1>
        <div className="flex items-center gap-2">
          {data.site.preview_url && (
            <a href={data.site.preview_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[14px] font-medium ring-1 ring-black/10 hover:ring-black/25">
              {t.preview} <Icon d={I.ext} className="w-3.5 h-3.5" />
            </a>
          )}
          <div className="flex rounded-full bg-white p-0.5 ring-1 ring-black/10" role="group" aria-label="Language">
            {(["fi", "en", "sv"] as Lang[]).map((v) => (
              <button key={v} onClick={() => chooseLang(v)} aria-pressed={l === v}
                className={`rounded-full px-2.5 py-1 text-[13px] font-semibold uppercase ${l === v ? "bg-[color:var(--d-ink)] text-white" : "text-[color:var(--d-ink2)] hover:text-[color:var(--d-ink)]"}`}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10 pb-28 lg:pb-12">
        {/* Homework: the first thing to act on */}
        {tasks.length > 0 && (
          <section className="lg:col-start-1">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[22px] font-semibold tracking-tight">{t.homework}</h2>
              <span className="text-[14px] font-medium tabular-nums text-[color:var(--d-ink2)]">{doneCount}/{tasks.length}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/8">
              <div className="h-full rounded-full bg-[color:var(--d-accent)] transition-[width] duration-700" style={{ width: `${(doneCount / tasks.length) * 100}%` }} />
            </div>
            {doneCount === tasks.length && <p className="mt-4 rounded-2xl bg-[color:var(--d-accent-soft)] p-4 font-medium">{t.allDone} 🎉</p>}
            <ul className="mt-4 space-y-2.5">
              {[...tasks].sort((a, b) => rank(a) - rank(b)).map((task) => (
                <TaskCard key={task.id} task={task} t={t} l={l}
                  answers={data.items.filter((i) => i.task_id === task.id)}
                  ups={ups.filter((u) => u.taskId === task.id)}
                  onSend={async (body, picked) => {
                    await saveText(body, task.id);
                    if (picked.length) addFiles(picked, task.id);
                    await load();
                  }}
                  onRetry={retry} />
              ))}
            </ul>
          </section>
        )}

        {/* The action panel: sticky on the right on desktop */}
        <aside className="lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:self-start lg:sticky lg:top-6">
          <div className="rounded-3xl bg-[color:var(--d-ink)] p-3 text-white shadow-xl">
            <button type="button"
              onClick={() => fileInput.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
              className={`flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-4 py-8 transition ${drag ? "border-[color:var(--d-go)] bg-white/10" : "border-white/25 hover:border-white/50"}`}>
              <Icon d={I.up} className="w-8 h-8 text-[color:var(--d-go)]" />
              <span className="text-[16px] font-medium">{t.drop}</span>
            </button>
            <input ref={fileInput} type="file" multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />

            {looseUps.length > 0 && <UpList ups={looseUps} t={t} onRetry={retry} dark />}

            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t.textPh} rows={3}
              className="mt-3 w-full resize-y rounded-2xl bg-white px-4 py-3 text-[16px] leading-relaxed text-[color:var(--d-ink)] outline-none focus:ring-4 focus:ring-[color:var(--d-go)]/40" />

            <div ref={panelGo} className="mt-3">{goButton}</div>

            <div className="mt-3 flex items-center justify-center gap-2 text-[13px] text-white/60">
              {status && (
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    {status.status !== "done" && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--d-go)] opacity-60" />}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--d-go)]" />
                  </span>
                  {t.status[status.status]} · {ago(status.status === "done" ? status.done_at : status.requested_at ?? status.created_at, l)}
                </span>
              )}
              <button onClick={() => setHelp((h) => !h)} aria-expanded={help} aria-label="?"
                className="flex h-5 w-5 items-center justify-center rounded-full text-[12px] font-semibold ring-1 ring-white/40 hover:bg-white/10">?</button>
            </div>
            {help && (
              <div className="mt-3 space-y-1.5 rounded-2xl bg-white/10 p-4 text-[14px] leading-relaxed text-white/85">
                {t.help.map((p) => <p key={p}>{p}</p>)}
              </div>
            )}
          </div>
        </aside>

        {convo.length > 0 && (
          <section className="lg:col-start-1">
            <h2 className="text-[22px] font-semibold tracking-tight">{t.messages}</h2>
            <ul className="mt-4 space-y-3">
              {convo.slice(0, 60).map((m) => {
                const mine = m.who === "client";
                return (
                  <li key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[88%] rounded-2xl px-4 py-3 ${mine ? "rounded-br-md bg-[color:var(--d-accent)] text-white" : "rounded-bl-md bg-white shadow-sm ring-1 ring-black/5"}`}>
                      <div className={`text-[12px] ${mine ? "text-white/70" : "text-[color:var(--d-ink3)]"}`}>
                        {mine ? t.you : m.who === "jeff" ? t.jeff : t.claude} · {ago(m.at, l)}
                      </div>
                      <div className="mt-1 whitespace-pre-wrap break-words text-[15px] leading-relaxed">{m.body.length > 1200 ? `${m.body.slice(0, 1200)}…` : m.body}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {files.length > 0 && (
          <section className="lg:col-start-1">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[22px] font-semibold tracking-tight">{t.files}</h2>
              <span className="text-[13px] text-[color:var(--d-ink3)]">{files.length} · {fmtSize(files.reduce((a, i) => a + (i.size_bytes ?? 0), 0))}</span>
            </div>
            <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
              {files.map((f) => (
                <li key={f.id} className="group relative aspect-square overflow-hidden rounded-xl bg-white ring-1 ring-black/5">
                  <Thumb item={f} />
                  {f.processed_at && (
                    <span className="absolute bottom-1.5 right-1.5 rounded-full bg-[color:var(--d-go)] p-0.5 text-[color:var(--d-ink)]"><Icon d={I.check} className="w-3.5 h-3.5" /></span>
                  )}
                  {f.source === "client" && (
                    <button onClick={() => del(f)} aria-label={t.del}
                      className="absolute right-1.5 top-1.5 rounded-full bg-black/55 p-1 text-white transition sm:opacity-0 group-hover:opacity-100">
                      <Icon d={I.x} className="w-3.5 h-3.5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Phones: the send button stays in reach once there is something to send */}
      {pending > 0 && !panelGoVisible && (
        <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[color:var(--d-bg)] via-[color:var(--d-bg)]/95 to-transparent px-4 pb-4 pt-6 lg:hidden">
          <div className="mx-auto max-w-2xl rounded-3xl bg-[color:var(--d-ink)] p-2">{goButton}</div>
        </div>
      )}
    </Shell>
  );
}

function rank(task: Task) {
  return task.status === "open" ? 0 : task.status === "answered" ? 1 : 2;
}

function Thumb({ item }: { item: Item }) {
  if (item.thumb_url) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.thumb_url} alt={item.filename ?? ""} loading="lazy" className="h-full w-full object-cover" />
        {item.mime?.startsWith("video/") && (
          <span className="absolute left-1.5 top-1.5 rounded-full bg-black/55 p-1 text-white"><Icon d={I.video} className="w-3.5 h-3.5" /></span>
        )}
      </>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-[color:var(--d-ink2)]">
      <Icon d={fileIcon(item.mime)} className="w-7 h-7" />
      <span className="line-clamp-2 break-all text-center text-[11px]">{item.filename}</span>
    </div>
  );
}

function UpList({ ups, t, onRetry, dark }: { ups: Up[]; t: L; onRetry: (u: Up) => void; dark?: boolean }) {
  return (
    <ul className="mt-3 space-y-2">
      {ups.map((u) => (
        <li key={u.key} className={`rounded-xl px-3 py-2 ${dark ? "bg-white/10" : "bg-[color:var(--d-bg)]"}`}>
          <div className="flex items-center justify-between gap-3 text-[13px]">
            <span className="truncate">{u.name}</span>
            {u.error ? (
              <button onClick={() => onRetry(u)} className="shrink-0 font-medium text-[color:var(--d-warn)] underline">{t.retry}</button>
            ) : (
              <span className="shrink-0 tabular-nums opacity-70">{Math.round(u.progress * 100)}%</span>
            )}
          </div>
          {!u.error && (
            <div className={`mt-1.5 h-1 overflow-hidden rounded-full ${dark ? "bg-white/15" : "bg-black/5"}`}>
              <div className="h-full rounded-full bg-[color:var(--d-go)] transition-[width] duration-300" style={{ width: `${Math.max(3, u.progress * 100)}%` }} />
            </div>
          )}
        </li>
      ))}
      <li className="px-1 text-[12px] opacity-60">{t.keepOpen}</li>
    </ul>
  );
}

function TaskCard({ task, t, l, answers, ups, onSend, onRetry }: {
  task: Task; t: L; l: Lang; answers: Item[]; ups: Up[];
  onSend: (body: string, files: File[]) => Promise<void>; onRetry: (u: Up) => void;
}) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const [picked, setPicked] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const photo = useRef<HTMLInputElement>(null);
  const done = task.status === "done";
  const answered = task.status === "answered" || answers.length > 0;
  const previews = useMemo(() => picked.map((f) => (f.type.startsWith("image/") ? URL.createObjectURL(f) : null)), [picked]);
  useEffect(() => () => previews.forEach((p) => p && URL.revokeObjectURL(p)), [previews]);

  const send = async () => {
    setSending(true);
    try {
      await onSend(val, picked);
      setVal("");
      setPicked([]);
      setOpen(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <li className={`rounded-2xl ring-1 transition ${done ? "bg-white/40 ring-black/5" : "bg-white shadow-sm ring-black/5"}`}>
      <div className="flex items-start gap-3 p-4">
        <div className="min-w-0 flex-1">
          <div className={`text-[16px] leading-snug ${done ? "text-[color:var(--d-ink3)] line-through decoration-black/20" : "font-medium"}`}>{tr(task.i18n, l, task.question)}</div>

          {answers.length > 0 && !done && (
            <div className="mt-3 space-y-2">
              {answers.filter((a) => a.kind === "text").map((a) => (
                <p key={a.id} className="whitespace-pre-wrap rounded-xl bg-[color:var(--d-accent-soft)] px-3 py-2 text-[15px]">{a.body}</p>
              ))}
              {answers.some((a) => a.kind === "file") && (
                <div className="flex flex-wrap gap-2">
                  {answers.filter((a) => a.kind === "file").map((a) => (
                    <div key={a.id} className="relative h-16 w-16 overflow-hidden rounded-lg bg-[color:var(--d-bg)] ring-1 ring-black/5"><Thumb item={a} /></div>
                  ))}
                </div>
              )}
            </div>
          )}
          {ups.length > 0 && <UpList ups={ups} t={t} onRetry={onRetry} />}

          {open && (
            <div className="mt-3">
              <textarea autoFocus value={val} onChange={(e) => setVal(e.target.value)} rows={2} placeholder={t.answerPh}
                className="w-full rounded-xl border border-black/10 px-3 py-2 text-[16px] outline-none focus:border-[color:var(--d-accent)] focus:ring-4 focus:ring-[color:var(--d-accent-soft)]" />
              {picked.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {picked.map((f, i) => (
                    <div key={i} className="relative h-16 w-16 overflow-hidden rounded-lg bg-[color:var(--d-bg)] ring-1 ring-black/10">
                      {previews[i] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={previews[i]!} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[color:var(--d-ink2)]"><Icon d={fileIcon(f.type)} /></div>
                      )}
                      <button onClick={() => setPicked((p) => p.filter((_, j) => j !== i))} aria-label={t.del}
                        className="absolute right-0.5 top-0.5 rounded-full bg-black/60 p-0.5 text-white"><Icon d={I.x} className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button disabled={sending || (!val.trim() && !picked.length)} onClick={send}
                  className="rounded-full bg-[color:var(--d-accent)] px-4 py-1.5 text-[14px] font-medium text-white disabled:opacity-40">{t.save}</button>
                <button onClick={() => photo.current?.click()} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[14px] font-medium ring-1 ring-black/15 hover:bg-black/5">
                  <Icon d={I.camera} className="w-4 h-4" /> {t.photo}
                </button>
                <button onClick={() => { setOpen(false); setPicked([]); }} className="px-2 py-1.5 text-[14px] text-[color:var(--d-ink3)]">{t.cancel}</button>
                <input ref={photo} type="file" multiple hidden onChange={(e) => {
                  // Copy before clearing: the FileList is live and empties when value is reset.
                  const f = Array.from(e.target.files ?? []);
                  setPicked((p) => [...p, ...f]);
                  e.target.value = "";
                }} />
              </div>
            </div>
          )}

          {!open && !done && (
            <button onClick={() => setOpen(true)}
              className={`mt-3 rounded-full px-4 py-1.5 text-[14px] font-medium ${answered ? "ring-1 ring-black/15 hover:bg-black/5" : "bg-[color:var(--d-ink)] text-white hover:opacity-90"}`}>
              {answered ? t.more : t.answer}
            </button>
          )}
        </div>
        {(done || answered) && (
          <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${done ? "bg-[color:var(--d-accent)] text-white" : "bg-[color:var(--d-accent-soft)] text-[color:var(--d-accent)]"}`}>
            <Icon d={I.check} className="w-4 h-4" />
          </span>
        )}
      </div>
    </li>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:var(--d-bg)] text-[color:var(--d-ink)] font-[family-name:var(--font-geist-sans)]">
      <main className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:max-w-6xl">{children}</main>
    </div>
  );
}
