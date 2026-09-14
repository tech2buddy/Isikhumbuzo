create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  review_text text not null check (char_length(review_text) between 10 and 1200),
  photo_path text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;
create policy "approved reviews are public" on public.reviews for select to anon, authenticated using (approved = true);
create policy "visitors may submit reviews" on public.reviews for insert to anon, authenticated with check (approved = false);
insert into storage.buckets (id, name, public) values ('review-photos', 'review-photos', true) on conflict (id) do nothing;
create policy "review photos are public" on storage.objects for select to anon, authenticated using (bucket_id = 'review-photos');
create policy "visitors may upload review photos" on storage.objects for insert to anon, authenticated with check (bucket_id = 'review-photos');
