-- Apex Technology public site
-- Apply in the Supabase SQL editor or with the Supabase CLI.
-- Create the first administrator in Authentication, then insert their user id
-- into public.admin_users. There is no public signup.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client_name text not null,
  industry text not null,
  category text not null,
  summary text not null,
  description text not null,
  requirements text[] not null default '{}',
  features text[] not null default '{}',
  deliverables text[] not null default '{}',
  cover_image text not null,
  cover_alt text not null default '',
  gallery jsonb not null default '[]'::jsonb,
  website_url text,
  featured boolean not null default false,
  homepage_order integer,
  presentation text not null default 'browser',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_published_idx on public.projects (published);
create index if not exists projects_featured_idx on public.projects (featured);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  description text not null,
  icon text not null default 'globe',
  display_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  company text,
  service text not null,
  estimated_budget text not null,
  project_description text not null,
  preferred_contact_method text not null,
  consent boolean not null default false,
  status text not null default 'New',
  created_at timestamptz not null default now(),
  constraint inquiries_status_check check (
    status in ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost')
  ),
  constraint inquiries_consent_check check (consent = true),
  constraint inquiries_description_length check (char_length(project_description) >= 20)
);

create index if not exists inquiries_status_idx on public.inquiries (status);
create index if not exists inquiries_created_idx on public.inquiries (created_at desc);
create index if not exists inquiries_email_idx on public.inquiries (email);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  company text,
  quote text not null,
  approved boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.inquiries enable row level security;
alter table public.site_settings enable row level security;
alter table public.testimonials enable row level security;

create policy "admins read own row" on public.admin_users
  for select to authenticated using (user_id = auth.uid());

create policy "public reads published projects" on public.projects
  for select to anon, authenticated using (published = true);

create policy "admins manage projects" on public.projects
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public reads published services" on public.services
  for select to anon, authenticated using (published = true);

create policy "admins manage services" on public.services
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public submits inquiries" on public.inquiries
  for insert to anon, authenticated
  with check (
    consent = true
    and char_length(full_name) >= 2
    and char_length(project_description) between 20 and 4000
    and status = 'New'
  );

create policy "admins read inquiries" on public.inquiries
  for select to authenticated using (public.is_admin());

create policy "admins update inquiries" on public.inquiries
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public reads settings" on public.site_settings
  for select to anon, authenticated using (true);

create policy "admins manage settings" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public reads approved testimonials" on public.testimonials
  for select to anon, authenticated using (approved = true and published = true);

create policy "admins manage testimonials" on public.testimonials
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

create policy "public reads project media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'project-media');

create policy "admins upload project media" on storage.objects
  for insert to authenticated with check (bucket_id = 'project-media' and public.is_admin());

create policy "admins update project media" on storage.objects
  for update to authenticated using (bucket_id = 'project-media' and public.is_admin());

create policy "admins delete project media" on storage.objects
  for delete to authenticated using (bucket_id = 'project-media' and public.is_admin());
