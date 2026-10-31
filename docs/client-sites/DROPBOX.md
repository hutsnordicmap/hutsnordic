# Client drop box (hutsnordic.fi/drop)

Built 31.10.2026. One private page per client where they drop files (any size), write or paste text, answer
homework, read our replies, and press **"Lähetä tekoälylle – aloita työ"** when they want us to start.

| Piece | Where |
|---|---|
| Client page | `hutsnordic.fi/drop/<token>` (`app/drop/DropBox.tsx`). No login: the link is the key. Finnish or English per client. |
| Jeff's admin panel | `hutsnordic.fi/drop/admin/<admin key>` (`app/drop/Admin.tsx`). Who is waiting, last activity, files, homework, paste box. |
| API | Supabase edge function `client-drop` in the Huts-fi project (`supabase/functions/client-drop/index.ts`). Deploy with the Supabase MCP `deploy_edge_function`, `verify_jwt: false`. |
| Data | Tables `client_sites`, `client_items`, `client_tasks`, `client_messages`, `client_work_requests`, `client_admin_keys` (RLS on, no policies: only the edge function reads them). |
| Files | Private bucket `client-drops`, folder per client token. Browsers upload with resumable (TUS) uploads; the storage policy only lets them write into an active client's folder. Thumbnails are made in the browser. |

Never put the admin key or a client token in this repo (it is public). They live in the database
(`client_admin_keys`, `client_sites.token`) and in Jeff's project chat.

## Costs
- Storage: Supabase Pro includes 100 GB, then about 0.02 €/GB/month.
- Vercel: the drop pages are built once. Client uploads never trigger a build.
- Edge function calls: Pro includes 2 million a month. We use a few hundred.
- Claude: runs on Jeff's plan. No API key, no live AI chat.

## Handling a work request (the Claude worker)

All calls are `POST https://aqyqvkpbznygsbmrzfde.supabase.co/functions/v1/client-drop` with JSON
`{"action": ..., "key": "<admin key>", ...}`.

1. `admin_waiting`: lists requests with status `waiting` or `working`. Nothing waiting? Stop.
2. `admin_work_status` `{site_id, work_id, status: "working"}`: the client sees "Työn alla".
3. `admin_site` `{site_id}`: texts, homework, messages. `admin_file_urls` `{site_id}`: signed download links
   (3 h) for files not used yet (`ids: [...]` for specific ones, `all: true` for everything).
   Download into the scratchpad, never onto the network mount directly.
4. Do the work the playbook way (`PLAYBOOK.md`): update `sites/<site>/`, rebuild the preview, publish once per
   round (each push to main is one Vercel build, so batch).
5. `admin_mark_used` `{site_id, ids, note}` for every item used or deliberately left out.
6. `admin_task` `{site_id, op: "done" | "drop" | "reopen", task_id}` or `{op: "add", question, page, hint, sort}`.
   Keep each question answerable in one line or one photo.
7. `admin_reply` `{site_id, body}`: a short reply in the client's language: what changed, what we left out and why
   ("you're the boss"), and the next question. Write it as from "us"; the page labels it "Tekoälyagentti".
8. `admin_work_status` `{status: "done"}`.
9. Anything that is not a simple update (complaints, money, going live, domain or email changes): don't
   answer, tell Jeff in the project chat.

Jeff's pasted material (`source: "jeff"`) is hidden from the client unless he ticks "Client can see it".

New client: `admin_create_site` `{slug, name, owner_name, owner_email, language, preview_url}` returns the token.
Then add the first homework with `admin_task`.

## Known limits
- The project's global upload limit is set in the Supabase dashboard (Storage → Settings). On 31.10.2026 it was
  50 MB; it must be raised for videos.
- HEIC photos from iPhones upload fine but get no thumbnail in Chrome (an icon shows instead).
