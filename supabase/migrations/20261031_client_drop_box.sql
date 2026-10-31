-- Applied to the Huts-fi project on 31.10.2026 through the Supabase MCP (migrations client_drop_box and
-- client_work_requests_requested_at). Kept here as a record.
create table public.client_sites (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  owner_name text,
  owner_email text,
  language text not null default 'fi' check (language in ('fi','en')),
  token text unique not null default replace(replace(encode(gen_random_bytes(18),'base64'),'/','_'),'+','-'),
  preview_url text,
  status text not null default 'active' check (status in ('active','paused','closed')),
  notes text,
  last_client_activity_at timestamptz,
  created_at timestamptz not null default now()
);
create table public.client_tasks (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.client_sites(id) on delete cascade,
  page text, question text not null, hint text,
  status text not null default 'open' check (status in ('open','answered','done','dropped')),
  sort int not null default 0,
  created_at timestamptz not null default now(), answered_at timestamptz, done_at timestamptz
);
create table public.client_items (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.client_sites(id) on delete cascade,
  task_id uuid references public.client_tasks(id) on delete set null,
  kind text not null check (kind in ('file','text')),
  source text not null default 'client' check (source in ('client','jeff')),
  visible_to_client boolean not null default true,
  storage_path text, thumb_path text, filename text, mime text, size_bytes bigint, body text,
  created_at timestamptz not null default now(), deleted_at timestamptz, processed_at timestamptz, agent_note text
);
create table public.client_work_requests (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.client_sites(id) on delete cascade,
  note text, item_count int not null default 0,
  status text not null default 'waiting' check (status in ('waiting','working','done')),
  created_at timestamptz not null default now(), requested_at timestamptz not null default now(),
  picked_up_at timestamptz, done_at timestamptz
);
create table public.client_messages (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.client_sites(id) on delete cascade,
  author text not null check (author in ('claude','jeff','client')),
  body text not null,
  created_at timestamptz not null default now()
);
create table public.client_admin_keys (
  key text primary key default replace(replace(encode(gen_random_bytes(24),'base64'),'/','_'),'+','-'),
  label text, created_at timestamptz not null default now()
);
create index on public.client_items (site_id, created_at desc);
create index on public.client_tasks (site_id, sort);
create index on public.client_work_requests (status, created_at);
create index on public.client_messages (site_id, created_at desc);
alter table public.client_sites enable row level security;
alter table public.client_tasks enable row level security;
alter table public.client_items enable row level security;
alter table public.client_work_requests enable row level security;
alter table public.client_messages enable row level security;
alter table public.client_admin_keys enable row level security;

insert into storage.buckets (id, name, public) values ('client-drops','client-drops', false);
create or replace function public.client_drop_token_ok(t text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.client_sites where token = t and status = 'active');
$$;
revoke all on function public.client_drop_token_ok(text) from public;
grant execute on function public.client_drop_token_ok(text) to anon, authenticated;
create policy "client drop uploads into own token folder"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'client-drops' and public.client_drop_token_ok((storage.foldername(name))[1]));
