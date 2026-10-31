// Client drop box API for hutsnordic.fi/drop/<token> and the admin panel hutsnordic.fi/drop/admin/<key>.
// Deployed to the Huts-fi Supabase project with verify_jwt off: every call is checked against a
// client token (client_sites.token) or an admin key (client_admin_keys.key) instead.
import { createClient } from "npm:@supabase/supabase-js@2";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
});
const BUCKET = "client-drops";
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...cors, "Content-Type": "application/json" } });

async function siteByToken(token: unknown) {
  if (typeof token !== "string" || token.length < 16) return null;
  const { data } = await db.from("client_sites").select("*").eq("token", token).eq("status", "active").maybeSingle();
  return data;
}

async function isAdmin(key: unknown) {
  if (typeof key !== "string" || key.length < 20) return false;
  const { data } = await db.from("client_admin_keys").select("key").eq("key", key).maybeSingle();
  return !!data;
}

async function touch(siteId: string) {
  await db.from("client_sites").update({ last_client_activity_at: new Date().toISOString() }).eq("id", siteId);
}

async function sitePayload(site: Record<string, unknown>, forAdmin = false) {
  const [items, tasks, messages, work] = await Promise.all([
    db.from("client_items").select("*").eq("site_id", site.id).is("deleted_at", null)
      .order("created_at", { ascending: false }).limit(500),
    db.from("client_tasks").select("*").eq("site_id", site.id).neq("status", "dropped").order("sort").order("created_at"),
    db.from("client_messages").select("*").eq("site_id", site.id).order("created_at", { ascending: false }).limit(100),
    db.from("client_work_requests").select("*").eq("site_id", site.id).order("created_at", { ascending: false }).limit(20),
  ]);
  const visible = (items.data ?? []).filter((i) => forAdmin || i.visible_to_client);
  const thumbPaths = visible.map((i) => i.thumb_path).filter(Boolean) as string[];
  const thumbs: Record<string, string> = {};
  if (thumbPaths.length) {
    const { data } = await db.storage.from(BUCKET).createSignedUrls(thumbPaths, 60 * 60 * 6);
    for (const s of data ?? []) if (s.path && s.signedUrl) thumbs[s.path] = s.signedUrl;
  }
  return {
    site: {
      name: site.name, owner_name: site.owner_name, language: site.language, preview_url: site.preview_url,
      slug: site.slug,
    },
    items: visible.map((i) => ({
      id: i.id, kind: i.kind, source: i.source, filename: i.filename, mime: i.mime, size_bytes: i.size_bytes,
      body: i.body, created_at: i.created_at, processed_at: i.processed_at, task_id: i.task_id,
      agent_note: i.agent_note, visible_to_client: i.visible_to_client,
      thumb_url: i.thumb_path ? thumbs[i.thumb_path] ?? null : null,
    })),
    tasks: (tasks.data ?? []).map((t) => ({
      id: t.id, page: t.page, question: t.question, hint: t.hint, status: t.status,
    })),
    messages: (messages.data ?? []).map((m) => ({ id: m.id, author: m.author, body: m.body, created_at: m.created_at })),
    work: (work.data ?? []).map((w) => ({
      id: w.id, status: w.status, item_count: w.item_count, created_at: w.created_at, done_at: w.done_at,
      requested_at: w.requested_at,
    })),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "POST only" }, 405);
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return json({ error: "bad json" }, 400);
  }
  const action = b.action;

  // ---------- Admin ----------
  if (typeof action === "string" && action.startsWith("admin_")) {
    if (!(await isAdmin(b.key))) return json({ error: "not allowed" }, 403);

    if (action === "admin_overview") {
      const { data: sites } = await db.from("client_sites").select("*").neq("status", "closed").order("created_at");
      const rows = await Promise.all((sites ?? []).map(async (s) => {
        const [items, tasks, work, msgs] = await Promise.all([
          db.from("client_items").select("kind, source, size_bytes, created_at, processed_at").eq("site_id", s.id).is("deleted_at", null),
          db.from("client_tasks").select("status").eq("site_id", s.id),
          db.from("client_work_requests").select("status, created_at, picked_up_at, done_at, item_count").eq("site_id", s.id)
            .order("created_at", { ascending: false }).limit(1),
          db.from("client_messages").select("author, body, created_at").eq("site_id", s.id)
            .order("created_at", { ascending: false }).limit(1),
        ]);
        const it = items.data ?? [];
        const ts = tasks.data ?? [];
        return {
          id: s.id, slug: s.slug, name: s.name, owner_name: s.owner_name, owner_email: s.owner_email,
          token: s.token, preview_url: s.preview_url, status: s.status,
          last_client_activity_at: s.last_client_activity_at,
          files: it.filter((i) => i.kind === "file").length,
          texts: it.filter((i) => i.kind === "text").length,
          bytes: it.reduce((a, i) => a + (i.size_bytes ?? 0), 0),
          unprocessed: it.filter((i) => !i.processed_at).length,
          tasks_total: ts.filter((t) => t.status !== "dropped").length,
          tasks_done: ts.filter((t) => t.status === "done").length,
          tasks_answered: ts.filter((t) => t.status === "answered").length,
          last_work: work.data?.[0] ?? null,
          last_message: msgs.data?.[0] ?? null,
        };
      }));
      return json({ sites: rows });
    }

    if (action === "admin_site") {
      const { data: s } = await db.from("client_sites").select("*").eq("id", b.site_id).maybeSingle();
      if (!s) return json({ error: "not found" }, 404);
      return json(await sitePayload(s, true));
    }

    if (action === "admin_add_text") {
      const body = String(b.body ?? "").trim();
      if (!body) return json({ error: "empty" }, 400);
      const { error } = await db.from("client_items").insert({
        site_id: b.site_id, kind: "text", source: "jeff", visible_to_client: b.visible_to_client === true,
        body: body.slice(0, 200000),
      });
      return error ? json({ error: error.message }, 500) : json({ ok: true });
    }

    if (action === "admin_start_work") {
      const { count } = await db.from("client_items").select("id", { count: "exact", head: true })
        .eq("site_id", b.site_id).is("deleted_at", null).is("processed_at", null);
      const { error } = await db.from("client_work_requests").insert({
        site_id: b.site_id, note: "Started by Jeff from the admin panel", item_count: count ?? 0,
      });
      return error ? json({ error: error.message }, 500) : json({ ok: true });
    }
    // The actions below are for the Claude worker: everything it needs, with only curl and the admin key.
    if (action === "admin_waiting") {
      const { data } = await db.from("client_work_requests").select("id, site_id, status, item_count, note, created_at, requested_at")
        .in("status", ["waiting", "working"]).order("requested_at");
      return json({ requests: data ?? [] });
    }

    if (action === "admin_file_urls") {
      let q = db.from("client_items").select("id, storage_path, filename, mime, size_bytes, created_at, processed_at, task_id")
        .eq("site_id", b.site_id).eq("kind", "file").is("deleted_at", null);
      if (Array.isArray(b.ids)) q = q.in("id", b.ids as string[]);
      else if (b.all !== true) q = q.is("processed_at", null);
      const { data: files } = await q.order("created_at");
      const paths = (files ?? []).map((f) => f.storage_path).filter(Boolean) as string[];
      const urls: Record<string, string> = {};
      if (paths.length) {
        const { data } = await db.storage.from(BUCKET).createSignedUrls(paths, 60 * 60 * 3);
        for (const s of data ?? []) if (s.path && s.signedUrl) urls[s.path] = s.signedUrl;
      }
      return json({ files: (files ?? []).map((f) => ({ ...f, url: f.storage_path ? urls[f.storage_path] ?? null : null })) });
    }

    if (action === "admin_reply") {
      const body = String(b.body ?? "").trim();
      if (!body) return json({ error: "empty" }, 400);
      const author = b.author === "jeff" ? "jeff" : "claude";
      const { error } = await db.from("client_messages").insert({ site_id: b.site_id, author, body });
      return error ? json({ error: error.message }, 500) : json({ ok: true });
    }

    if (action === "admin_mark_used") {
      if (!Array.isArray(b.ids)) return json({ error: "ids required" }, 400);
      const { error } = await db.from("client_items").update({
        processed_at: new Date().toISOString(), agent_note: typeof b.note === "string" ? b.note : null,
      }).eq("site_id", b.site_id).in("id", b.ids as string[]);
      return error ? json({ error: error.message }, 500) : json({ ok: true });
    }

    if (action === "admin_task") {
      const now = new Date().toISOString();
      if (b.op === "add") {
        const { error } = await db.from("client_tasks").insert({
          site_id: b.site_id, question: String(b.question ?? ""), page: b.page ?? null, hint: b.hint ?? null,
          sort: Number(b.sort) || 0,
        });
        return error ? json({ error: error.message }, 500) : json({ ok: true });
      }
      const status = b.op === "done" ? "done" : b.op === "drop" ? "dropped" : b.op === "reopen" ? "open" : null;
      if (!status) return json({ error: "op must be add, done, drop or reopen" }, 400);
      const { error } = await db.from("client_tasks").update({ status, done_at: status === "done" ? now : null })
        .eq("site_id", b.site_id).eq("id", b.task_id);
      return error ? json({ error: error.message }, 500) : json({ ok: true });
    }

    if (action === "admin_work_status") {
      const status = b.status;
      if (status !== "working" && status !== "done") return json({ error: "status must be working or done" }, 400);
      const now = new Date().toISOString();
      const { error } = await db.from("client_work_requests")
        .update(status === "working" ? { status, picked_up_at: now } : { status, done_at: now })
        .eq("site_id", b.site_id).eq("id", b.work_id);
      return error ? json({ error: error.message }, 500) : json({ ok: true });
    }

    if (action === "admin_create_site") {
      const { data, error } = await db.from("client_sites").insert({
        slug: b.slug, name: b.name, owner_name: b.owner_name ?? null, owner_email: b.owner_email ?? null,
        language: b.language === "en" ? "en" : "fi", preview_url: b.preview_url ?? null, notes: b.notes ?? null,
      }).select("id, token").single();
      return error ? json({ error: error.message }, 500) : json(data);
    }

    return json({ error: "unknown action" }, 400);
  }

  // ---------- Client ----------
  const site = await siteByToken(b.token);
  if (!site) return json({ error: "not found" }, 404);

  if (action === "get") return json(await sitePayload(site));

  if (action === "add_text") {
    const body = String(b.body ?? "").trim();
    if (!body) return json({ error: "empty" }, 400);
    const taskId = typeof b.task_id === "string" ? b.task_id : null;
    const { error } = await db.from("client_items").insert({
      site_id: site.id, kind: "text", body: body.slice(0, 200000), task_id: taskId,
    });
    if (error) return json({ error: error.message }, 500);
    if (taskId) {
      await db.from("client_tasks").update({ status: "answered", answered_at: new Date().toISOString() })
        .eq("id", taskId).eq("site_id", site.id).eq("status", "open");
    }
    await touch(site.id);
    return json({ ok: true });
  }

  if (action === "register_file") {
    const path = String(b.path ?? "");
    const thumb = b.thumb_path ? String(b.thumb_path) : null;
    if (!path.startsWith(`${site.token}/`) || (thumb && !thumb.startsWith(`${site.token}/`))) {
      return json({ error: "bad path" }, 400);
    }
    const taskId = typeof b.task_id === "string" ? b.task_id : null;
    const { error } = await db.from("client_items").insert({
      site_id: site.id, kind: "file", storage_path: path, thumb_path: thumb,
      filename: String(b.filename ?? "").slice(0, 300), mime: String(b.mime ?? "").slice(0, 120),
      size_bytes: Number(b.size_bytes) || null, task_id: taskId,
    });
    if (error) return json({ error: error.message }, 500);
    if (taskId) {
      await db.from("client_tasks").update({ status: "answered", answered_at: new Date().toISOString() })
        .eq("id", taskId).eq("site_id", site.id).eq("status", "open");
    }
    await touch(site.id);
    return json({ ok: true });
  }

  if (action === "delete_item") {
    const { data: item } = await db.from("client_items").select("*").eq("id", b.id).eq("site_id", site.id)
      .eq("source", "client").is("deleted_at", null).maybeSingle();
    if (!item) return json({ error: "not found" }, 404);
    const paths = [item.storage_path, item.thumb_path].filter(Boolean) as string[];
    if (paths.length) await db.storage.from(BUCKET).remove(paths);
    await db.from("client_items").update({ deleted_at: new Date().toISOString() }).eq("id", item.id);
    await touch(site.id);
    return json({ ok: true });
  }

  if (action === "start_work") {
    const { count } = await db.from("client_items").select("id", { count: "exact", head: true })
      .eq("site_id", site.id).is("deleted_at", null).is("processed_at", null);
    const { data: open } = await db.from("client_work_requests").select("id").eq("site_id", site.id)
      .eq("status", "waiting").maybeSingle();
    if (open) {
      await db.from("client_work_requests").update({
        item_count: count ?? 0, note: typeof b.note === "string" ? b.note.slice(0, 2000) : null,
        requested_at: new Date().toISOString(),
      }).eq("id", open.id);
    } else {
      const { error } = await db.from("client_work_requests").insert({
        site_id: site.id, item_count: count ?? 0, note: typeof b.note === "string" ? b.note.slice(0, 2000) : null,
      });
      if (error) return json({ error: error.message }, 500);
    }
    await touch(site.id);
    return json({ ok: true });
  }

  return json({ error: "unknown action" }, 400);
});
