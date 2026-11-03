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

1. `admin_waiting`: lists requests with status `waiting` or `working`. It first turns any client who saved things and
   then went quiet for 30 minutes without pressing the button into a request (note `auto: saved and left`), so
   nothing a client saves is ever missed. Nothing waiting? Stop.
2. `admin_work_status` `{site_id, work_id, status: "working"}`: the client sees "Työn alla".
3. `admin_site` `{site_id}`: texts, homework, messages. `admin_file_urls` `{site_id}`: signed download links
   (3 h) for files not used yet (`ids: [...]` for specific ones, `all: true` for everything).
   Download into the scratchpad, never onto the network mount directly.
4. Do the work the playbook way (`PLAYBOOK.md`): update `sites/<site>/`, rebuild the preview, publish once per
   round (each push to main is one Vercel build, so batch).
5. `admin_mark_used` `{site_id, ids, note}` for every item used or deliberately left out.
6. `admin_task` `{site_id, op: "done" | "drop" | "reopen", task_id}` or `{op: "add", question, page, hint, sort, i18n}`.
   Always pass `i18n: {fi, en, sv}` (the page has a FI/EN/SV switch); `{op: "i18n", task_id, i18n}` fixes an old one.
   Keep each question answerable in one line or one photo.
7. `admin_reply` `{site_id, body, i18n: {fi, en, sv}}`: a short reply in the client's language: what changed, what we left out and why
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

## Page layout (Jeff, 3.11.2026)
- Homework first: it is what the client can act on. On desktop the drop + "send to AI" panel sticks on the right
  like a buy box; on phones it follows the homework and a send bar sticks to the bottom while there is something to send.
- No taglines, helper text or secondary labels. If a screen needs them, fix the layout.
- FI / EN / SV switch. Homework questions and replies carry `i18n {fi, en, sv}`; the client's own answers stay as written.
- One way to send work: everything saves at once ("Tallenna" on homework), the big button says "start now", and if
  the client forgets, `admin_waiting` starts it after 30 quiet minutes.
- Gotcha: copy `input.files` with `Array.from` before resetting `input.value`. The FileList is live, and a
  state updater that reads it later gets an empty list (this silently dropped homework photos).

## Preview banner (3.11.2026)
`proxy.ts` adds a big "this is a draft of your new website, not live yet" banner (FI/EN/SV from `<html lang>`) to every
`/preview/<site>` page that has the "ei vielä julkaistu / not live yet" ribbon, so owners never think it is their live
site. It is CSS on `html::before`/`body::before` because React hydration removes extra nodes from `<body>`.
Photo galleries such as `/preview/lohja-kuvat` have no ribbon and get no banner. On the drop page the preview link is a
big green "Katso uudet nettisivusi" card at the top.
