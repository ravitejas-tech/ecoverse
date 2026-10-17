alter table public.events
    add column venue_lat double precision,
    add column venue_lng double precision,
    add column venue_place_id text,
    add constraint events_venue_pin check (
        (venue_lat is null) = (venue_lng is null)
        and (venue_lat is null or venue_lat between -90 and 90)
        and (venue_lng is null or venue_lng between -180 and 180)
        and (venue_place_id is null or venue_lat is not null)
    );

create or replace function public.get_booking(p_access_token uuid) returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select jsonb_build_object(
        'order', jsonb_build_object(
            'id', o.id,
            'booking_code', o.booking_code,
            'status', o.status,
            'source', o.source,
            'name', o.name,
            'email', o.email,
            'phone', o.phone,
            'subtotal', o.subtotal,
            'discount', o.discount,
            'total', o.total,
            'needs_refund', o.needs_refund,
            'hold_expires_at', o.hold_expires_at,
            'paid_at', o.paid_at,
            'created_at', o.created_at
        ),
        'event', jsonb_build_object(
            'id', e.id,
            'slug', e.slug,
            'title', e.title,
            'category', e.category,
            'tone', e.tone,
            'starts_at', e.starts_at,
            'ends_at', e.ends_at,
            'city', e.city,
            'venue_name', e.venue_name,
            'venue_address', e.venue_address,
            'venue_lat', e.venue_lat,
            'venue_lng', e.venue_lng,
            'venue_place_id', e.venue_place_id,
            'map_url', e.map_url,
            'cover_url', e.cover_url,
            'cover_alt', e.cover_alt,
            'dress_code', e.dress_code,
            'things_to_know', to_jsonb(e.things_to_know)
        ),
        'items', coalesce((
            select jsonb_agg(jsonb_build_object(
                'name', tt.name,
                'quantity', oi.quantity,
                'unit_price', oi.unit_price,
                'admits', oi.admits
            ) order by tt.sort_order, tt.name)
            from public.order_items oi
            join public.ticket_types tt on tt.id = oi.ticket_type_id
            where oi.order_id = o.id
        ), '[]'::jsonb),
        'tickets', case when o.status = 'paid' then coalesce((
            select jsonb_agg(jsonb_build_object(
                'code', t.code,
                'qr_token', t.qr_token,
                'status', t.status,
                'checked_in_at', t.checked_in_at,
                'ticket_type', tt.name
            ) order by char_length(t.code), t.code)
            from public.tickets t
            join public.ticket_types tt on tt.id = t.ticket_type_id
            where t.order_id = o.id
        ), '[]'::jsonb) else '[]'::jsonb end
    )
    from public.orders o
    join public.events e on e.id = o.event_id
    where o.access_token = p_access_token
$$;

create or replace function public.duplicate_event(p_event_id uuid) returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_new_id uuid;
begin
    if not public.has_staff_role('super_admin', 'event_manager') then
        raise exception 'not_allowed';
    end if;

    insert into public.events (
        slug, title, category, tag, tone, summary, description,
        cover_url, cover_alt, cover_credit, cover_source,
        starts_at, ends_at, city, city_code, region, venue_name, venue_address, map_url,
        venue_lat, venue_lng, venue_place_id,
        highlights, schedule, hosts, age_limit, language, dress_code,
        included, not_included, things_to_know, faqs, terms, refund_policy, questions, status
    )
    select
        left(slug, 60) || '-copy-' || substr(encode(extensions.gen_random_bytes(3), 'hex'), 1, 4),
        left(title || ' (copy)', 80),
        category, tag, tone, summary, description,
        cover_url, cover_alt, cover_credit, cover_source,
        starts_at, ends_at, city, city_code, region, venue_name, venue_address, map_url,
        venue_lat, venue_lng, venue_place_id,
        highlights, schedule, hosts, age_limit, language, dress_code,
        included, not_included, things_to_know, faqs, terms, refund_policy, questions, 'draft'
    from public.events
    where id = p_event_id
    returning id into v_new_id;

    if v_new_id is null then
        raise exception 'event_unavailable';
    end if;

    insert into public.ticket_types (
        event_id, name, description, price, quantity, admits,
        min_per_order, max_per_order, sales_start, sales_end, visible, sold_out, sort_order
    )
    select
        v_new_id, name, description, price, quantity, admits,
        min_per_order, max_per_order, sales_start, sales_end, visible, false, sort_order
    from public.ticket_types
    where event_id = p_event_id;

    return v_new_id;
end;
$$;
