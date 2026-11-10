"use client";

import { useState, useSyncExternalStore } from "react";
import Admin from "../drop/Admin";
import { api } from "../drop/lib";

// hutsnordic.fi/admin: type the admin key once. The browser offers to save it like a password
// (and syncs it to Jeff's other devices); this browser also remembers it, so later visits open straight in.
// The key itself never lives in this public repo.
const STORE = "hn-admin-key";

function readKey() {
  try {
    return localStorage.getItem(STORE) ?? "";
  } catch {
    return "";
  }
}

export default function Page() {
  const saved = useSyncExternalStore(() => () => {}, readKey, () => "");
  const [key, setKey] = useState("");
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const active = key || saved;
  if (active) return <Admin adminKey={active} />;

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    const k = typed.trim();
    if (!k) return;
    setBusy(true);
    setError("");
    try {
      await api({ action: "admin_overview", key: k });
      try {
        localStorage.setItem(STORE, k);
      } catch {}
      setKey(k);
    } catch {
      setError("Wrong key");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold">Huts Nordic admin</h1>
      <form onSubmit={signIn} className="flex flex-col gap-3">
        <input type="text" name="username" autoComplete="username" value="admin" readOnly hidden />
        <input
          id="admin-key"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Admin key"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          className="rounded-lg border border-black/20 px-4 py-3 text-lg"
          autoFocus
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button disabled={busy} className="rounded-lg bg-black px-4 py-3 font-semibold text-white disabled:opacity-50">
          Sign in
        </button>
      </form>
    </main>
  );
}
