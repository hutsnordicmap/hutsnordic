-- Live client sites keep their drop box (uploads were limited to status 'active').
create or replace function public.client_drop_token_ok(t text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.client_sites where token = t and status in ('active', 'live'));
$$;
