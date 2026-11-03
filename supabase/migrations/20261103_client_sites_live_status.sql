-- A client whose site has gone live (shown with a "Live" label in the drop admin; preview_url holds the live address).
alter table public.client_sites drop constraint if exists client_sites_status_check;
alter table public.client_sites add constraint client_sites_status_check check (status in ('active','paused','live','closed'));
