import * as tus from "tus-js-client";

// Huts-fi Supabase project. The anon key is public by design; the client-drop edge function
// and the storage policy check every call against the client's token.
const SUPABASE_URL = "https://aqyqvkpbznygsbmrzfde.supabase.co";
const STORAGE_TUS = "https://aqyqvkpbznygsbmrzfde.storage.supabase.co/storage/v1/upload/resumable";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxeXF2a3Biem55Z3NibXJ6ZmRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MDM0MzEsImV4cCI6MjA4NDk3OTQzMX0.Axw_NnyrUuThontzKAMyKZ6wcznwcZOksWZqxNL3o9Q";

export type Item = {
  id: string;
  kind: "file" | "text";
  source: "client" | "jeff";
  filename: string | null;
  mime: string | null;
  size_bytes: number | null;
  body: string | null;
  created_at: string;
  processed_at: string | null;
  task_id: string | null;
  agent_note: string | null;
  visible_to_client: boolean;
  thumb_url: string | null;
};
export type Task = { id: string; page: string | null; question: string; hint: string | null; status: "open" | "answered" | "done" };
export type Message = { id: string; author: "claude" | "jeff" | "client"; body: string; created_at: string };
export type Work = { id: string; status: "waiting" | "working" | "done"; item_count: number; created_at: string; requested_at: string; done_at: string | null };
export type SiteData = {
  site: { name: string; owner_name: string | null; language: "fi" | "en"; preview_url: string | null; slug: string };
  items: Item[];
  tasks: Task[];
  messages: Message[];
  work: Work[];
};

export async function api<T = { ok: true }>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/client-drop`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON_KEY },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return data as T;
}

function safeName(name: string) {
  const dot = name.lastIndexOf(".");
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8) : "";
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "file";
  return ext ? `${base}.${ext}` : base;
}

function tusUpload(token: string, blob: Blob, objectName: string, contentType: string, onProgress?: (p: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const upload = new tus.Upload(blob, {
      endpoint: STORAGE_TUS,
      retryDelays: [0, 2000, 5000, 10000, 20000, 30000, 60000],
      headers: { authorization: `Bearer ${ANON_KEY}`, apikey: ANON_KEY, "x-upsert": "false" },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      chunkSize: 6 * 1024 * 1024, // Supabase requires exactly 6 MB chunks
      metadata: { bucketName: "client-drops", objectName, contentType: contentType || "application/octet-stream", cacheControl: "3600" },
      onError: reject,
      onProgress: (sent, total) => onProgress?.(total ? sent / total : 0),
      onSuccess: () => resolve(),
    });
    upload.findPreviousUploads().then((prev) => {
      if (prev.length) upload.resumeFromPreviousUpload(prev[0]);
      upload.start();
    });
  });
}

// A small JPEG preview made in the browser, so the page never has to load the big originals.
async function makeThumb(file: File): Promise<Blob | null> {
  const draw = (src: CanvasImageSource, w: number, h: number) => {
    const scale = Math.min(1, 480 / Math.max(w, h));
    const c = document.createElement("canvas");
    c.width = Math.round(w * scale);
    c.height = Math.round(h * scale);
    c.getContext("2d")!.drawImage(src, 0, 0, c.width, c.height);
    return new Promise<Blob | null>((r) => c.toBlob((b) => r(b), "image/jpeg", 0.75));
  };
  const withTimeout = <T,>(p: Promise<T>) =>
    Promise.race([p, new Promise<null>((r) => setTimeout(() => r(null), 8000))]);
  try {
    if (file.type.startsWith("image/")) {
      return await withTimeout((async () => {
        const bmp = await createImageBitmap(file);
        return draw(bmp, bmp.width, bmp.height);
      })());
    }
    if (file.type.startsWith("video/")) {
      return await withTimeout(new Promise<Blob | null>((resolve) => {
        const v = document.createElement("video");
        const url = URL.createObjectURL(file);
        v.muted = true;
        v.playsInline = true;
        v.preload = "metadata";
        v.src = url;
        v.onloadedmetadata = () => { v.currentTime = Math.min(1, (v.duration || 2) / 2); };
        v.onseeked = async () => { resolve(await draw(v, v.videoWidth, v.videoHeight)); URL.revokeObjectURL(url); };
        v.onerror = () => { resolve(null); URL.revokeObjectURL(url); };
      }));
    }
  } catch {}
  return null;
}

export async function uploadFile(token: string, file: File, onProgress: (p: number) => void, taskId?: string) {
  const day = new Date().toISOString().slice(0, 10);
  const id = crypto.randomUUID().slice(0, 8);
  const path = `${token}/${day}/${id}-${safeName(file.name)}`;
  let thumbPath: string | null = null;
  const thumb = await makeThumb(file);
  if (thumb) {
    thumbPath = `${token}/${day}/${id}-thumb.jpg`;
    await tusUpload(token, thumb, thumbPath, "image/jpeg").catch(() => { thumbPath = null; });
  }
  await tusUpload(token, file, path, file.type, onProgress);
  await api({
    action: "register_file", token, path, thumb_path: thumbPath, filename: file.name,
    mime: file.type, size_bytes: file.size, task_id: taskId ?? null,
  });
}

export function fmtSize(n: number | null) {
  if (!n) return "";
  if (n < 1024 * 1024) return `${Math.max(1, Math.round(n / 1024))} KB`;
  if (n < 1024 ** 3) return `${(n / 1024 / 1024).toFixed(n < 10 * 1024 * 1024 ? 1 : 0)} MB`;
  return `${(n / 1024 ** 3).toFixed(1)} GB`;
}

export function ago(iso: string | null, lang: "fi" | "en") {
  if (!iso) return lang === "fi" ? "ei vielä" : "never";
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  const fi = lang === "fi";
  if (s < 60) return fi ? "juuri nyt" : "just now";
  if (s < 3600) return fi ? `${Math.floor(s / 60)} min sitten` : `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return fi ? `${Math.floor(s / 3600)} t sitten` : `${Math.floor(s / 3600)} h ago`;
  const d = Math.floor(s / 86400);
  return fi ? `${d} pv sitten` : `${d} d ago`;
}
