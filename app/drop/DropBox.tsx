"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ago, api, fmtSize, uploadFile, type Item, type SiteData, type Task } from "./lib";

const T = {
  fi: {
    hello: (n: string | null) => (n ? `Hei ${n.split(" ")[0]}` : "Hei"),
    intro: (site: string) => `Tänne kaikki ${site} -sivujen aineisto. Pudota, kirjoita tai liitä – me lajitellaan.`,
    preview: "Katso sivujesi esikatselu",
    dropTitle: "Pudota tiedostot tähän",
    dropTap: "tai napauta ja valitse",
    dropAny: "Kuvat, videot, zipit, äänitteet – mitä vain, isotkin.",
    textPh: "Kirjoita tai liitä tekstiä: mikä on väärin, mitä haluat muuttaa, hinnat, arvostelut…",
    saveText: "Tallenna",
    uploading: "Lähetetään",
    uploadFail: "Ei onnistunut – yritä uudelleen",
    keepOpen: "Pidä sivu auki, kunnes lähetys on valmis.",
    pendingN: (n: number) => (n === 1 ? "1 uusi odottaa" : `${n} uutta odottaa`),
    nothingNew: "Lisää jotain yllä, niin voit lähettää sen työhön.",
    go: "Lähetä tekoälylle – aloita työ",
    goSub: "Tekoälyagenttimme alkaa päivittää sivujasi heti. Toimii 24/7.",
    whatTitle: "Miten tämä toimii?",
    what: [
      "Voit muuttaa sivujasi milloin tahansa, myös yöllä ja viikonloppuna.",
      "Pudota kuvia tai kirjoita mitä haluat, ja paina nappia. Tekoälyagenttimme tekee muutokset esikatseluun ja vastaa sinulle tälle sivulle.",
      "Jeff seuraa kaikkea ja tarkistaa, että työ on tehty oikein.",
    ],
    status: {
      waiting: "Vastaanotettu – työ alkaa pian",
      working: "Työn alla",
      done: "Valmis – katso vastaus alta",
    },
    homework: "Kotitehtävät",
    homeworkSub: "Vastaa yhdellä rivillä tai kuvalla. Lista lyhenee sitä mukaa kun valmistuu.",
    of: (a: number, b: number) => `${a}/${b} valmis`,
    answer: "Vastaa",
    answerPh: "Vastauksesi…",
    addPhoto: "Lisää kuva",
    send: "Lähetä",
    cancel: "Peru",
    st: { open: "", answered: "Vastattu ✓ tarkistetaan", done: "Valmis ✓" },
    allDone: "Kaikki tehtävät tehty – kiitos!",
    convo: "Viestit",
    you: "Sinä",
    claude: "Tekoälyagentti",
    jeff: "Jeff",
    files: "Lähettämäsi tiedostot",
    noFiles: "Ei vielä tiedostoja.",
    used: "käytetty",
    del: "Poista",
    delQ: "Poistetaanko tämä?",
    notFound: "Linkkiä ei löytynyt. Tarkista linkki sähköpostista tai kysy Jeffiltä.",
    loading: "Ladataan…",
    footer: "Jeff Foster · 045 661 7229",
  },
  en: {
    hello: (n: string | null) => (n ? `Hi ${n.split(" ")[0]}` : "Hi"),
    intro: (site: string) => `Everything for the new ${site} website goes here. Drop, write or paste – we sort it out.`,
    preview: "See your site preview",
    dropTitle: "Drop files here",
    dropTap: "or tap to choose",
    dropAny: "Photos, videos, zips, audio – anything, large files too.",
    textPh: "Write or paste text: what's wrong, what to change, prices, reviews…",
    saveText: "Save",
    uploading: "Uploading",
    uploadFail: "Didn't work – try again",
    keepOpen: "Keep this page open until the upload finishes.",
    pendingN: (n: number) => (n === 1 ? "1 new item waiting" : `${n} new items waiting`),
    nothingNew: "Add something above, then send it to work.",
    go: "Send to AI – start work",
    goSub: "Our AI agent starts updating your site right away. Works 24/7.",
    whatTitle: "How does this work?",
    what: [
      "You can change your site any time, nights and weekends too.",
      "Drop photos or write what you want, then press the button. Our AI agent makes the changes in your preview and answers you on this page.",
      "Jeff watches everything and checks the work is done right.",
    ],
    status: {
      waiting: "Received – work starts soon",
      working: "Being worked on",
      done: "Done – see the reply below",
    },
    homework: "Homework",
    homeworkSub: "Answer in one line or one photo. The list gets shorter as you go.",
    of: (a: number, b: number) => `${a}/${b} done`,
    answer: "Answer",
    answerPh: "Your answer…",
    addPhoto: "Add photo",
    send: "Send",
    cancel: "Cancel",
    st: { open: "", answered: "Answered ✓ checking", done: "Done ✓" },
    allDone: "All homework done – thank you!",
    convo: "Messages",
    you: "You",
    claude: "AI agent",
    jeff: "Jeff",
    files: "Files you sent",
    noFiles: "No files yet.",
    used: "used",
    del: "Delete",
    delQ: "Delete this?",
    notFound: "We couldn't find this link. Check the link in the email or ask Jeff.",
    loading: "Loading…",
    footer: "Jeff Foster · +358 45 661 7229",
  },
};
type L = (typeof T)["fi"];

type Up = { key: string; name: string; size: number; progress: number; error?: boolean; file: File; taskId?: string };

function Icon({ d, className = "w-5 h-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}
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
};

function fileIcon(mime: string | null) {
  if (!mime) return I.file;
  if (mime.startsWith("video/")) return I.video;
  if (mime.startsWith("audio/")) return I.audio;
  if (mime.includes("zip") || mime.includes("compressed")) return I.zip;
  return I.file;
}

export default function DropBox({ token }: { token: string }) {
  const [data, setData] = useState<SiteData | null>(null);
  const [missing, setMissing] = useState(false);
  const [ups, setUps] = useState<Up[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [help, setHelp] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const lang = data?.site.language ?? "fi";
  const t: L = T[lang];

  const load = useCallback(async () => {
    try {
      setData(await api<SiteData>({ action: "get", token }));
    } catch {
      setMissing(true);
    }
  }, [token]);

  useEffect(() => {
    load();
    const id = setInterval(() => document.visibilityState === "visible" && load(), 45000);
    return () => clearInterval(id);
  }, [load]);

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
      const list: Up[] = Array.from(files).map((f) => ({
        key: `${f.name}-${f.size}-${Math.random()}`, name: f.name, size: f.size, progress: 0, file: f, taskId,
      }));
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
    if (!body.trim()) return false;
    setBusy(true);
    try {
      await api({ action: "add_text", token, body, task_id: taskId ?? null });
      await load();
      return true;
    } finally {
      setBusy(false);
    }
  };

  const startWork = async () => {
    setBusy(true);
    try {
      if (text.trim()) {
        await api({ action: "add_text", token, body: text });
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

  if (missing) {
    return <Shell><p className="mt-24 text-center text-[17px] text-[color:var(--d-ink2)]">{T.fi.notFound}<br /><span className="text-sm">{T.en.notFound}</span></p></Shell>;
  }
  if (!data) {
    return <Shell><p className="mt-24 text-center text-[color:var(--d-ink2)]">{t.loading}</p></Shell>;
  }

  const files = data.items.filter((i) => i.kind === "file");
  const totalBytes = files.reduce((a, i) => a + (i.size_bytes ?? 0), 0);
  const tasks = data.tasks;
  const doneCount = tasks.filter((x) => x.status === "done").length;
  const convo = [
    ...data.messages.map((m) => ({ id: m.id, who: m.author, body: m.body, at: m.created_at })),
    ...data.items.filter((i) => i.kind === "text" && i.source === "client").map((i) => ({ id: i.id, who: "client" as const, body: i.body ?? "", at: i.created_at })),
  ].sort((a, b) => b.at.localeCompare(a.at));
  const canGo = pending > 0 || text.trim().length > 0;
  const showStatus = lastWork && pending === 0;

  return (
    <Shell>
      <header className="pt-8 sm:pt-12">
        <div className="text-[12px] tracking-[0.18em] uppercase text-[color:var(--d-ink2)]">Huts Nordic · {data.site.name}</div>
        <h1 className="mt-3 text-[34px] sm:text-[44px] leading-[1.05] font-semibold tracking-tight">{t.hello(data.site.owner_name)} 👋</h1>
        <p className="mt-3 text-[17px] leading-relaxed text-[color:var(--d-ink2)] max-w-xl">{t.intro(data.site.name)}</p>
        {data.site.preview_url && (
          <a href={data.site.preview_url} target="_blank" rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[15px] font-medium shadow-sm ring-1 ring-black/5 hover:ring-black/15 transition">
            {t.preview} <Icon d={I.ext} className="w-4 h-4" />
          </a>
        )}
      </header>

      {/* 1. Drop + write */}
      <section className="mt-8 rounded-3xl bg-white p-4 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,.04),0_8px_30px_rgba(0,0,0,.05)] ring-1 ring-black/5">
        <button type="button"
          onClick={() => fileInput.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
          className={`w-full rounded-2xl border-2 border-dashed px-6 py-10 sm:py-14 text-center transition ${drag ? "border-[color:var(--d-accent)] bg-[color:var(--d-accent-soft)]" : "border-black/15 hover:border-black/30 bg-[color:var(--d-bg)]"}`}>
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--d-accent)] text-white shadow-md">
            <Icon d={I.up} className="w-7 h-7" />
          </span>
          <span className="mt-4 block text-[20px] font-semibold">{t.dropTitle}</span>
          <span className="block text-[15px] text-[color:var(--d-ink2)]">{t.dropTap}</span>
          <span className="mt-2 block text-[13px] text-[color:var(--d-ink3)]">{t.dropAny}</span>
        </button>
        <input ref={fileInput} type="file" multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />

        {ups.length > 0 && (
          <ul className="mt-4 space-y-2">
            {ups.map((u) => (
              <li key={u.key} className="rounded-xl bg-[color:var(--d-bg)] px-3 py-2.5">
                <div className="flex items-center justify-between gap-3 text-[14px]">
                  <span className="truncate">{u.name} <span className="text-[color:var(--d-ink3)]">{fmtSize(u.size)}</span></span>
                  {u.error ? (
                    <button onClick={() => retry(u)} className="shrink-0 text-[13px] font-medium text-[color:var(--d-warn)] underline">{t.uploadFail}</button>
                  ) : (
                    <span className="shrink-0 tabular-nums text-[13px] text-[color:var(--d-ink2)]">{Math.round(u.progress * 100)}%</span>
                  )}
                </div>
                {!u.error && (
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/5">
                    <div className="h-full rounded-full bg-[color:var(--d-accent)] transition-[width] duration-300" style={{ width: `${Math.max(3, u.progress * 100)}%` }} />
                  </div>
                )}
              </li>
            ))}
            {uploading && <li className="px-1 text-[13px] text-[color:var(--d-ink3)]">{t.keepOpen}</li>}
          </ul>
        )}

        <div className="mt-4">
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t.textPh} rows={4}
            className="w-full resize-y rounded-2xl border border-black/10 bg-white px-4 py-3 text-[16px] leading-relaxed outline-none focus:border-[color:var(--d-accent)] focus:ring-4 focus:ring-[color:var(--d-accent-soft)]" />
          {text.trim() && (
            <div className="mt-2 flex justify-end">
              <button disabled={busy} onClick={async () => { if (await saveText(text)) setText(""); }}
                className="rounded-full px-4 py-2 text-[14px] font-medium ring-1 ring-black/15 hover:bg-black/5 disabled:opacity-50">{t.saveText}</button>
            </div>
          )}
        </div>
      </section>

      {/* 2. The big button */}
      <section className="mt-5 rounded-3xl bg-[color:var(--d-ink)] p-5 sm:p-6 text-white">
        {showStatus ? (
          <StatusLine status={lastWork!.status} label={t.status[lastWork!.status]} when={ago(lastWork!.status === "done" ? lastWork!.done_at : lastWork!.requested_at ?? lastWork!.created_at, lang)} />
        ) : (
          <div className="text-[15px] text-white/75">{pending > 0 ? t.pendingN(pending) : t.nothingNew}</div>
        )}
        <button disabled={!canGo || busy || uploading} onClick={startWork}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[color:var(--d-go)] px-5 py-4 text-[17px] font-semibold text-[color:var(--d-ink)] shadow-lg transition hover:brightness-105 active:scale-[.99] disabled:opacity-35 disabled:shadow-none">
          <Icon d={I.spark} /> {t.go}
        </button>
        <div className="mt-3 flex items-start justify-center gap-2 text-center text-[13px] text-white/65">
          <span>{t.goSub}</span>
          <button onClick={() => setHelp((h) => !h)} aria-expanded={help} aria-label={t.whatTitle}
            className="-mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ring-white/40 text-[12px] font-semibold hover:bg-white/10">?</button>
        </div>
        {help && (
          <div className="mt-4 rounded-2xl bg-white/8 p-4 text-[14px] leading-relaxed text-white/85 ring-1 ring-white/10">
            <div className="font-semibold text-white">{t.whatTitle}</div>
            {t.what.map((p) => <p key={p} className="mt-1.5">{p}</p>)}
          </div>
        )}
      </section>

      {/* 3. Homework */}
      {tasks.length > 0 && (
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[24px] font-semibold tracking-tight">{t.homework}</h2>
              <p className="mt-1 text-[14px] text-[color:var(--d-ink2)]">{t.homeworkSub}</p>
            </div>
            <div className="shrink-0 text-right text-[14px] font-medium tabular-nums">{t.of(doneCount, tasks.length)}</div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/8">
            <div className="h-full rounded-full bg-[color:var(--d-accent)] transition-[width] duration-700" style={{ width: `${(doneCount / tasks.length) * 100}%` }} />
          </div>
          {doneCount === tasks.length ? (
            <p className="mt-5 rounded-2xl bg-[color:var(--d-accent-soft)] p-4 text-[15px] font-medium">{t.allDone} 🎉</p>
          ) : null}
          <ul className="mt-5 space-y-3">
            {[...tasks].sort((a, b) => rank(a) - rank(b)).map((task) => (
              <TaskCard key={task.id} task={task} t={t} busy={busy}
                onText={(body) => saveText(body, task.id)} onFiles={(f) => addFiles(f, task.id)} />
            ))}
          </ul>
        </section>
      )}

      {/* 4. Messages */}
      {convo.length > 0 && (
        <section className="mt-10">
          <h2 className="text-[24px] font-semibold tracking-tight">{t.convo}</h2>
          <ul className="mt-4 space-y-3">
            {convo.slice(0, 60).map((m) => {
              const mine = m.who === "client";
              return (
                <li key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[88%] rounded-2xl px-4 py-3 ${mine ? "bg-[color:var(--d-accent)] text-white rounded-br-md" : "bg-white ring-1 ring-black/5 rounded-bl-md shadow-sm"}`}>
                    <div className={`text-[12px] ${mine ? "text-white/70" : "text-[color:var(--d-ink3)]"}`}>
                      {mine ? t.you : m.who === "jeff" ? t.jeff : t.claude} · {ago(m.at, lang)}
                    </div>
                    <div className="mt-1 whitespace-pre-wrap break-words text-[15px] leading-relaxed">{m.body.length > 1200 ? `${m.body.slice(0, 1200)}…` : m.body}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* 5. Files */}
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="text-[24px] font-semibold tracking-tight">{t.files}</h2>
          {files.length > 0 && <span className="text-[13px] text-[color:var(--d-ink3)]">{files.length} · {fmtSize(totalBytes)}</span>}
        </div>
        {files.length === 0 ? (
          <p className="mt-3 text-[15px] text-[color:var(--d-ink3)]">{t.noFiles}</p>
        ) : (
          <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
            {files.map((f) => (
              <li key={f.id} className="group relative aspect-square overflow-hidden rounded-xl bg-white ring-1 ring-black/5">
                {f.thumb_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.thumb_url} alt={f.filename ?? ""} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-[color:var(--d-ink2)]">
                    <Icon d={fileIcon(f.mime)} className="w-7 h-7" />
                    <span className="line-clamp-2 break-all text-center text-[11px]">{f.filename}</span>
                  </div>
                )}
                {f.mime?.startsWith("video/") && f.thumb_url && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-black/55 p-1 text-white"><Icon d={I.video} className="w-3.5 h-3.5" /></span>
                )}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2 pb-1 pt-4 text-[11px] text-white">{fmtSize(f.size_bytes)}</span>
                {f.processed_at && (
                  <span title={t.used} className="absolute right-1.5 bottom-1.5 rounded-full bg-[color:var(--d-go)] p-0.5 text-[color:var(--d-ink)]"><Icon d={I.check} className="w-3.5 h-3.5" /></span>
                )}
                {f.source === "client" && (
                  <button onClick={() => del(f)} aria-label={t.del}
                    className="absolute right-1.5 top-1.5 rounded-full bg-black/55 p-1 text-white opacity-100 sm:opacity-0 transition group-hover:opacity-100">
                    <Icon d={I.x} className="w-3.5 h-3.5" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="mt-16 mb-10 text-center text-[13px] text-[color:var(--d-ink3)]">
        {t.footer} · <a className="underline" href="https://www.huts.fi/" target="_blank" rel="noopener noreferrer">huts.fi</a>
      </footer>
    </Shell>
  );
}

function rank(task: Task) {
  return task.status === "open" ? 0 : task.status === "answered" ? 1 : 2;
}

function StatusLine({ status, label, when }: { status: "waiting" | "working" | "done"; label: string; when: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[15px]">
      <span className={`relative flex h-2.5 w-2.5`}>
        {status !== "done" && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--d-go)] opacity-60" />}
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--d-go)]" />
      </span>
      <span className="font-medium">{label}</span>
      <span className="text-white/50">· {when}</span>
    </div>
  );
}

function TaskCard({ task, t, busy, onText, onFiles }: {
  task: Task; t: L; busy: boolean; onText: (b: string) => Promise<boolean>; onFiles: (f: FileList | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const photo = useRef<HTMLInputElement>(null);
  const done = task.status !== "open";
  return (
    <li className={`rounded-2xl p-4 transition ${done ? "bg-white/50 ring-1 ring-black/5" : "bg-white shadow-sm ring-1 ring-black/5"}`}>
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${task.status === "done" ? "bg-[color:var(--d-accent)] text-white" : task.status === "answered" ? "bg-[color:var(--d-accent-soft)] text-[color:var(--d-accent)]" : "ring-2 ring-black/15"}`}>
          {done && <Icon d={I.check} className="w-4 h-4" />}
        </span>
        <div className="min-w-0 flex-1">
          {task.page && <div className="text-[12px] font-medium uppercase tracking-wider text-[color:var(--d-ink3)]">{task.page}</div>}
          <div className={`text-[16px] leading-snug ${task.status === "done" ? "text-[color:var(--d-ink3)] line-through decoration-black/20" : "font-medium"}`}>{task.question}</div>
          {task.hint && !done && <div className="mt-0.5 text-[14px] text-[color:var(--d-ink2)]">{task.hint}</div>}
          {done && <div className="mt-1 text-[13px] font-medium text-[color:var(--d-accent)]">{t.st[task.status]}</div>}
          {!done && !open && (
            <button onClick={() => setOpen(true)} className="mt-3 rounded-full bg-[color:var(--d-ink)] px-4 py-1.5 text-[14px] font-medium text-white hover:opacity-90">{t.answer}</button>
          )}
          {!done && open && (
            <div className="mt-3">
              <textarea autoFocus value={val} onChange={(e) => setVal(e.target.value)} rows={2} placeholder={t.answerPh}
                className="w-full rounded-xl border border-black/10 px-3 py-2 text-[16px] outline-none focus:border-[color:var(--d-accent)] focus:ring-4 focus:ring-[color:var(--d-accent-soft)]" />
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button disabled={busy || !val.trim()} onClick={async () => { if (await onText(val)) { setVal(""); setOpen(false); } }}
                  className="rounded-full bg-[color:var(--d-accent)] px-4 py-1.5 text-[14px] font-medium text-white disabled:opacity-40">{t.send}</button>
                <button onClick={() => photo.current?.click()} className="rounded-full px-4 py-1.5 text-[14px] font-medium ring-1 ring-black/15 hover:bg-black/5">{t.addPhoto}</button>
                <button onClick={() => setOpen(false)} className="px-2 py-1.5 text-[14px] text-[color:var(--d-ink3)]">{t.cancel}</button>
                <input ref={photo} type="file" multiple hidden onChange={(e) => { onFiles(e.target.files); e.target.value = ""; setOpen(false); }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:var(--d-bg)] text-[color:var(--d-ink)] font-[family-name:var(--font-geist-sans)]">
      <main className="mx-auto w-full max-w-2xl px-4 sm:px-6">{children}</main>
    </div>
  );
}
