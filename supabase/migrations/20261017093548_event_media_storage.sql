insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('event-media', 'event-media', true, 5242880, array['image/webp', 'image/jpeg', 'image/png']);

create policy "Staff list event media" on storage.objects
for select to authenticated
using (bucket_id = 'event-media' and (select public.is_staff()));

create policy "Event editors upload event media" on storage.objects
for insert to authenticated
with check (bucket_id = 'event-media' and (select public.has_staff_role('super_admin', 'event_manager')));

create policy "Event editors replace event media" on storage.objects
for update to authenticated
using (bucket_id = 'event-media' and (select public.has_staff_role('super_admin', 'event_manager')))
with check (bucket_id = 'event-media' and (select public.has_staff_role('super_admin', 'event_manager')));

create policy "Event editors delete event media" on storage.objects
for delete to authenticated
using (bucket_id = 'event-media' and (select public.has_staff_role('super_admin', 'event_manager')));
