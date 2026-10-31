"use client";

import { useCallback, useEffect, useState } from "react";
import { ago, api, fmtSize, type SiteData } from "./lib";

type Row = {
  id: string; slug: string; name: string; owner_name: string | null; owner_email: string | null; token: string;
  preview_url: string | null; status: string; last_client_activity_at: string | null;
  files: number; texts: number; bytes: number; unprocessed: number;
  tasks_total: number; tasks_done: number; tasks_answered: number;
  last_work: { status: "waiting" | "working" | "done"; created_at: string; picked_up_at: string | null; done_at: string | null; item_count: number } | null;
  last_message: { author: string; body: string; created_at: string } | null;
};

const badge = {
  waiting: { label: "Waiting for Claude", cls: "bg-amber-100 text-amber-900 ring-amber-300" },
  working: { label: "Claude working", cls: "bg-sky-100 text-sky-900 ring-sky-300" },
  done: { label: "Up to date", cls: "bg-emerald-50 text-emerald-800 ring-emerald-200" },
  none: { label: "No request yet", cls: "bg-black/5 text-black/60 ring-black/10" },
};

export default function Admin({ adminKey }: { adminKey: string }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [denied, setDenied] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const d = await api<{ sites: Row[] }>({ action: "admin_overview", key: adminKey });
      setRows(d.sites);
    } catch {
      setDenied(true);
    }
  }, [adminKey]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async fetch, not a sync update
    load();
    const id = setInterval(() => document.visibilityState === "visible" && load(), 30000);
    return () => clearInterval(id);
  }, [load]);

  if (denied) return <Wrap><p className="mt-20 text-center">Not allowed.</p></Wrap>;
  if (!rows) return <Wrap><p className="mt-20 text-center text-black/50">Loading…</p></Wrap>;

  const order = (r: Row) => (r.last_work?.status === "waiting" ? 0 : r.last_work?.status === "working" ? 1 : r.unprocessed ? 2 : 3);
  const sorted = [...rows].sort((a, b) => order(a) - order(b) || (b.last_client_activity_at ?? "").localeCompare(a.last_client_activity_at ?? ""));
  const waiting = rows.filter((r) => r.last_work?.status === "waiting").length;

  return (
    <Wrap>
      <header className="flex flex-wrap items-end justify-between gap-3 pt-8">
        <div>
          <div className="text-[12px] uppercase tracking-[0.18em] text-black/50">Huts Nordic · admin</div>
          <h1 className="mt-1 text-[30px] font-semibold tracking-tight">Client drop boxes</h1>
        </div>
        <div className="text-[14px] text-black/60">
          {rows.length} {rows.length === 1 ? "client" : "clients"} · <span className={waiting ? "font-semibold text-amber-800" : ""}>{waiting} waiting for Claude</span>
        </div>
      </header>

      <ul className="mt-6 space-y-3">
        {sorted.map((r) => {
          const b = badge[r.last_work?.status ?? "none"];
          return (
            <li key={r.id} className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <button onClick={() => setOpen(open === r.id ? null : r.id)} className="w-full p-4 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[17px] font-semibold">{r.name}</div>
                    <div className="text-[13px] text-black/55">{r.owner_name ?? "?"}{r.owner_email ? ` · ${r.owner_email}` : ""}</div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[12px] font-medium ring-1 ${b.cls}`}>
                    {b.label}{r.last_work ? ` · ${ago(r.last_work.status === "done" ? r.last_work.done_at : r.last_work.created_at, "en")}` : ""}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[13px] text-black/65 sm:grid-cols-4">
                  <span>Last activity <b className="font-medium text-black">{ago(r.last_client_activity_at, "en")}</b></span>
                  <span>{r.files} files · {r.texts} texts · {fmtSize(r.bytes) || "0 MB"}</span>
                  <span>{r.unprocessed ? <b className="font-medium text-amber-800">{r.unprocessed} not used yet</b> : "All used"}</span>
                  <span>Homework {r.tasks_done}/{r.tasks_total}{r.tasks_answered ? ` (+${r.tasks_answered} answered)` : ""}</span>
                </div>
                {r.last_message && (
                  <div className="mt-2 truncate text-[13px] text-black/50">
                    Last reply ({r.last_message.author}, {ago(r.last_message.created_at, "en")}): {r.last_message.body}
                  </div>
                )}
              </button>
              {open === r.id && <Detail row={r} adminKey={adminKey} onChange={load} />}
            </li>
          );
        })}
      </ul>
      <p className="mt-10 mb-10 text-center text-[12px] text-black/40">Refreshes every 30 seconds. New clients are added by Claude.</p>
    </Wrap>
  );
}

function Detail({ row, adminKey, onChange }: { row: Row; adminKey: string; onChange: () => void }) {
  const [d, setD] = useState<SiteData | null>(null);
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const link = `${typeof window !== "undefined" ? window.location.origin : "https://hutsnordic.fi"}/drop/${row.token}`;

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

  const recent = d
    ? [
        ...d.items.map((i) => ({ at: i.created_at, who: i.source, what: i.kind === "file" ? `📎 ${i.filename} (${fmtSize(i.size_bytes)})` : `✏️ ${(i.body ?? "").slice(0, 140)}`, used: !!i.processed_at })),
        ...d.messages.map((m) => ({ at: m.created_at, who: m.author, what: `💬 ${m.body.slice(0, 140)}`, used: true })),
        ...d.work.map((w) => ({ at: w.created_at, who: "client", what: `▶︎ Pressed "start work" (${w.item_count} items) → ${w.status}`, used: true })),
      ].sort((a, b) => b.at.localeCompare(a.at)).slice(0, 15)
    : [];

  return (
    <div className="border-t border-black/5 p-4">
      <div className="flex flex-wrap gap-2 text-[13px]">
        <a href={`/drop/${row.token}`} target="_blank" className="rounded-full px-3 py-1.5 ring-1 ring-black/15 hover:bg-black/5">Open client page</a>
        <button onClick={() => { navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="rounded-full px-3 py-1.5 ring-1 ring-black/15 hover:bg-black/5">{copied ? "Copied ✓" : "Copy client link"}</button>
        {row.preview_url && <a href={row.preview_url} target="_blank" className="rounded-full px-3 py-1.5 ring-1 ring-black/15 hover:bg-black/5">Preview</a>}
        <button disabled={busy} onClick={() => act({ action: "admin_start_work" })}
          className="rounded-full bg-black px-3 py-1.5 font-medium text-white disabled:opacity-40">Tell Claude to start work</button>
      </div>

      <div className="mt-4">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4}
          placeholder="Paste anything for this client: Booking or Google reviews, notes, facts…"
          className="w-full rounded-xl border border-black/10 px-3 py-2 text-[15px] outline-none focus:border-black/40" />
        <div className="mt-2 flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-[13px] text-black/60">
            <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} /> Client can see it
          </label>
          <button disabled={busy || !text.trim()} onClick={async () => { await act({ action: "admin_add_text", body: text, visible_to_client: show }); setText(""); }}
            className="rounded-full bg-black px-4 py-1.5 text-[14px] font-medium text-white disabled:opacity-40">Save</button>
        </div>
      </div>

      <ul className="mt-4 space-y-1.5 text-[13px]">
        {recent.map((x, i) => (
          <li key={i} className="flex gap-3">
            <span className="w-16 shrink-0 text-black/40">{ago(x.at, "en")}</span>
            <span className="w-12 shrink-0 text-black/50">{x.who}</span>
            <span className={`min-w-0 flex-1 truncate ${x.used ? "text-black/55" : "text-black"}`}>{x.what}</span>
          </li>
        ))}
        {d && recent.length === 0 && <li className="text-black/40">Nothing yet.</li>}
      </ul>
    </div>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f2ec] text-[#1b1d1a] font-[family-name:var(--font-geist-sans)]">
      <main className="mx-auto w-full max-w-3xl px-4 sm:px-6">{children}</main>
    </div>
  );
}
