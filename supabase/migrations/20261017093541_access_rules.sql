create function public.current_staff_role() returns public.staff_role
language sql
stable
security definer
set search_path = ''
as $$
    select role from public.staff where user_id = auth.uid() and active
$$;

create function public.has_staff_role(variadic roles public.staff_role[]) returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select coalesce(public.current_staff_role() = any (roles), false)
$$;

create function public.is_staff() returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select public.current_staff_role() is not null
$$;

create function public.current_email() returns text
language sql
stable
set search_path = ''
as $$
    select lower(auth.jwt() ->> 'email')
$$;

alter table public.events enable row level security;
alter table public.ticket_types enable row level security;
alter table public.promo_codes enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.tickets enable row level security;
alter table public.staff enable row level security;
alter table public.check_ins enable row level security;
alter table public.page_visits enable row level security;
alter table public.gallery_photos enable row level security;
alter table public.activity_log enable row level security;

create policy "Published events are public" on public.events
for select to anon, authenticated
using (status = 'published');

create policy "Staff see every event" on public.events
for select to authenticated
using ((select public.is_staff()));

create policy "Buyers see events they booked" on public.events
for select to authenticated
using (exists (
    select 1 from public.orders o
    where o.event_id = events.id and o.email = (select public.current_email())
));

create policy "Event editors create events" on public.events
for insert to authenticated
with check ((select public.has_staff_role('super_admin', 'event_manager')));

create policy "Event editors update events" on public.events
for update to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager')))
with check ((select public.has_staff_role('super_admin', 'event_manager')));

create policy "Super admins delete events" on public.events
for delete to authenticated
using ((select public.has_staff_role('super_admin')));

create policy "Visible tickets of published events are public" on public.ticket_types
for select to anon, authenticated
using (visible and exists (
    select 1 from public.events e where e.id = ticket_types.event_id and e.status = 'published'
));

create policy "Staff see every ticket type" on public.ticket_types
for select to authenticated
using ((select public.is_staff()));

create policy "Buyers see ticket types they bought" on public.ticket_types
for select to authenticated
using (exists (
    select 1 from public.order_items oi
    join public.orders o on o.id = oi.order_id
    where oi.ticket_type_id = ticket_types.id and o.email = (select public.current_email())
));

create policy "Event editors manage ticket types" on public.ticket_types
for all to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager')))
with check ((select public.has_staff_role('super_admin', 'event_manager')));

create policy "Staff see promo codes" on public.promo_codes
for select to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer')));

create policy "Promo editors manage promo codes" on public.promo_codes
for all to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager', 'marketing')))
with check ((select public.has_staff_role('super_admin', 'event_manager', 'marketing')));

create policy "Reporting staff see customers" on public.customers
for select to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer')));

create policy "Reporting staff see orders" on public.orders
for select to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer')));

create policy "Buyers see their own bookings" on public.orders
for select to authenticated
using (email = (select public.current_email()) and status in ('paid', 'cancelled', 'refunded'));

create policy "Staff update order notes" on public.orders
for update to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager', 'finance')))
with check ((select public.has_staff_role('super_admin', 'event_manager', 'finance')));

create policy "Reporting staff see order items" on public.order_items
for select to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer')));

create policy "Buyers see their own order items" on public.order_items
for select to authenticated
using (exists (
    select 1 from public.orders o
    where o.id = order_items.order_id
        and o.email = (select public.current_email())
        and o.status in ('paid', 'cancelled', 'refunded')
));

create policy "Staff see tickets" on public.tickets
for select to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer', 'gate_staff')));

create policy "Buyers see their own tickets" on public.tickets
for select to authenticated
using (exists (
    select 1 from public.orders o
    where o.id = tickets.order_id
        and o.email = (select public.current_email())
        and o.status in ('paid', 'cancelled', 'refunded')
));

create policy "Staff see the team" on public.staff
for select to authenticated
using ((select public.is_staff()) or user_id = auth.uid());

create policy "Super admins manage the team" on public.staff
for all to authenticated
using ((select public.has_staff_role('super_admin')))
with check ((select public.has_staff_role('super_admin')));

create policy "Staff see check-ins" on public.check_ins
for select to authenticated
using ((select public.is_staff()));

create policy "Reporting staff see page visits" on public.page_visits
for select to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer')));

create policy "Gallery photos of published events are public" on public.gallery_photos
for select to anon, authenticated
using (exists (
    select 1 from public.events e where e.id = gallery_photos.event_id and e.status = 'published'
));

create policy "Staff see every gallery photo" on public.gallery_photos
for select to authenticated
using ((select public.is_staff()));

create policy "Event editors manage gallery photos" on public.gallery_photos
for all to authenticated
using ((select public.has_staff_role('super_admin', 'event_manager')))
with check ((select public.has_staff_role('super_admin', 'event_manager')));

create policy "Super admins see the activity log" on public.activity_log
for select to authenticated
using ((select public.has_staff_role('super_admin')));

revoke insert, update, delete on public.orders, public.order_items, public.tickets, public.customers, public.check_ins, public.page_visits, public.activity_log from anon, authenticated;
grant update (notes) on public.orders to authenticated;
revoke insert, update, delete on public.events, public.ticket_types, public.promo_codes, public.staff, public.gallery_photos from anon;
