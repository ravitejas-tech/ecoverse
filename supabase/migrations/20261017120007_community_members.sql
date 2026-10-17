create index orders_customer_id_idx on public.orders (customer_id);

create function public.community_members()
returns table (
    id uuid,
    name text,
    email text,
    phone text,
    city text,
    marketing_consent boolean,
    events_booked integer,
    events_attended integer,
    tickets integer,
    total_spent integer,
    first_booked_at timestamptz,
    last_booked_at timestamptz,
    last_event_title text,
    last_event_at timestamptz,
    next_event_title text,
    next_event_at timestamptz,
    is_new boolean,
    is_regular boolean,
    has_upcoming boolean
)
language sql
stable
security definer
set search_path = ''
as $$
    select
        c.id,
        c.name,
        c.email,
        c.phone,
        c.city,
        c.marketing_consent,
        booked.events_booked,
        went.events_attended,
        went.tickets,
        booked.total_spent,
        booked.first_booked_at,
        booked.last_booked_at,
        last_event.title,
        last_event.starts_at,
        next_event.title,
        next_event.starts_at,
        booked.first_booked_at >= now() - interval '30 days',
        booked.events_booked >= 2,
        next_event.starts_at is not null
    from public.customers c
    cross join lateral (
        select
            count(distinct o.event_id)::integer as events_booked,
            coalesce(sum(o.total), 0)::integer as total_spent,
            min(o.created_at) as first_booked_at,
            max(o.created_at) as last_booked_at
        from public.orders o
        where o.customer_id = c.id and o.status = 'paid'
    ) booked
    cross join lateral (
        select
            count(*)::integer as tickets,
            (count(distinct t.event_id) filter (where t.checked_in_at is not null))::integer as events_attended
        from public.tickets t
        join public.orders o on o.id = t.order_id
        where o.customer_id = c.id and o.status = 'paid' and t.status = 'valid'
    ) went
    left join lateral (
        select e.title, e.starts_at
        from public.orders o
        join public.events e on e.id = o.event_id
        where o.customer_id = c.id and o.status = 'paid' and e.ends_at <= now()
        order by e.starts_at desc
        limit 1
    ) last_event on true
    left join lateral (
        select e.title, e.starts_at
        from public.orders o
        join public.events e on e.id = o.event_id
        where o.customer_id = c.id and o.status = 'paid' and e.ends_at > now()
        order by e.starts_at
        limit 1
    ) next_event on true
    where booked.events_booked > 0
        and public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer')
$$;

create function public.community_stats()
returns table (
    total integer,
    new_members integer,
    regulars integer,
    upcoming integer,
    past integer,
    updates_ok integer
)
language sql
stable
security definer
set search_path = ''
as $$
    select
        count(*)::integer,
        (count(*) filter (where m.is_new))::integer,
        (count(*) filter (where m.is_regular))::integer,
        (count(*) filter (where m.has_upcoming))::integer,
        (count(*) filter (where not m.has_upcoming))::integer,
        (count(*) filter (where m.marketing_consent))::integer
    from public.community_members() m
$$;

revoke execute on function public.community_members(), public.community_stats() from public, anon;
