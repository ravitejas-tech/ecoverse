create function public.expire_stale_orders() returns void
language sql
security definer
set search_path = ''
as $$
    update public.orders set status = 'expired'
    where status = 'pending' and hold_expires_at < now()
$$;

create function public.ticket_type_remaining(p_ticket_type_id uuid) returns integer
language sql
stable
security definer
set search_path = ''
as $$
    select greatest(tt.quantity - coalesce((
        select sum(oi.quantity)
        from public.order_items oi
        join public.orders o on o.id = oi.order_id
        where oi.ticket_type_id = tt.id
            and (o.status = 'paid' or (o.status = 'pending' and o.hold_expires_at > now()))
    ), 0), 0)::integer
    from public.ticket_types tt
    where tt.id = p_ticket_type_id
$$;

create function public.ticket_availability(p_event_ids uuid[])
returns table (ticket_type_id uuid, event_id uuid, remaining integer)
language sql
stable
security definer
set search_path = ''
as $$
    select tt.id, tt.event_id, public.ticket_type_remaining(tt.id)
    from public.ticket_types tt
    join public.events e on e.id = tt.event_id
    where tt.event_id = any (p_event_ids)
        and ((e.status = 'published' and tt.visible) or public.is_staff())
$$;

create function public.promo_code_uses(p_promo_code_id uuid) returns integer
language sql
stable
security definer
set search_path = ''
as $$
    select count(*)::integer
    from public.orders o
    where o.promo_code_id = p_promo_code_id
        and (o.status = 'paid' or (o.status = 'pending' and o.hold_expires_at > now()))
$$;

create function public.apply_promo(p_event_id uuid, p_code text, p_subtotal integer, p_lock boolean default false)
returns table (promo_id uuid, promo_code text, discount_amount integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_promo public.promo_codes;
begin
    if p_lock then
        select * into v_promo from public.promo_codes p where p.code = upper(trim(p_code)) for update;
    else
        select * into v_promo from public.promo_codes p where p.code = upper(trim(p_code));
    end if;

    if not found
        or not v_promo.active
        or (v_promo.event_id is not null and v_promo.event_id <> p_event_id)
        or (v_promo.starts_at is not null and v_promo.starts_at > now())
        or (v_promo.expires_at is not null and v_promo.expires_at < now()) then
        raise exception 'promo_invalid';
    end if;

    if v_promo.max_uses is not null and public.promo_code_uses(v_promo.id) >= v_promo.max_uses then
        raise exception 'promo_exhausted';
    end if;

    return query select
        v_promo.id,
        v_promo.code,
        case
            when v_promo.discount_type = 'percent' then (greatest(p_subtotal, 0) * v_promo.discount_value / 100)
            else least(v_promo.discount_value, greatest(p_subtotal, 0))
        end;
end;
$$;

create function public.quote_promo(p_event_id uuid, p_code text, p_subtotal integer)
returns table (code text, discount integer)
language sql
security definer
set search_path = ''
as $$
    select promo_code, discount_amount from public.apply_promo(p_event_id, p_code, p_subtotal)
$$;

create function public.generate_booking_code(p_city_code text, p_starts_at timestamptz) returns text
language plpgsql
set search_path = ''
as $$
declare
    v_code text;
begin
    loop
        v_code := 'ECH-' || p_city_code || '-'
            || to_char(p_starts_at at time zone 'Asia/Kolkata', 'YYMMDD') || '-'
            || upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 5));
        exit when not exists (select 1 from public.orders where booking_code = v_code);
    end loop;
    return v_code;
end;
$$;

create function public.validate_buyer(p_name text, p_email text, p_phone text) returns void
language plpgsql
immutable
set search_path = ''
as $$
begin
    if char_length(trim(coalesce(p_name, ''))) not between 2 and 80 then
        raise exception 'invalid_name';
    end if;
    if lower(trim(coalesce(p_email, ''))) !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
        raise exception 'invalid_email';
    end if;
    if char_length(regexp_replace(coalesce(p_phone, ''), '\D', '', 'g')) not between 10 and 13 then
        raise exception 'invalid_phone';
    end if;
end;
$$;

create function public.upsert_customer(p_name text, p_email text, p_phone text, p_city text, p_marketing_consent boolean)
returns uuid
language sql
security definer
set search_path = ''
as $$
    insert into public.customers (email, name, phone, city, marketing_consent, consent_updated_at)
    values (lower(trim(p_email)), trim(p_name), trim(p_phone), nullif(trim(coalesce(p_city, '')), ''), coalesce(p_marketing_consent, false), now())
    on conflict (email) do update set
        name = excluded.name,
        phone = excluded.phone,
        city = coalesce(excluded.city, public.customers.city),
        marketing_consent = excluded.marketing_consent,
        consent_updated_at = now()
    returning id
$$;

create function public.issue_tickets(p_order_id uuid) returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_order public.orders;
    v_item record;
    v_number integer := 0;
begin
    select * into v_order from public.orders where id = p_order_id;
    if exists (select 1 from public.tickets where order_id = p_order_id) then
        return;
    end if;

    for v_item in
        select oi.ticket_type_id, oi.quantity * oi.admits as people
        from public.order_items oi
        join public.ticket_types tt on tt.id = oi.ticket_type_id
        where oi.order_id = p_order_id
        order by tt.sort_order, tt.name
    loop
        for i in 1 .. v_item.people loop
            v_number := v_number + 1;
            insert into public.tickets (code, order_id, event_id, ticket_type_id)
            values (v_order.booking_code || '-' || v_number, v_order.id, v_order.event_id, v_item.ticket_type_id);
        end loop;
    end loop;
end;
$$;

create function public.reserve_order(
    p_event_id uuid,
    p_items jsonb,
    p_name text,
    p_email text,
    p_phone text,
    p_answers jsonb default '{}'::jsonb,
    p_promo_code text default null,
    p_marketing_consent boolean default false,
    p_utm jsonb default '{}'::jsonb,
    p_hold_minutes integer default 15
) returns public.orders
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_event public.events;
    v_type public.ticket_types;
    v_item record;
    v_question jsonb;
    v_answers jsonb := coalesce(p_answers, '{}'::jsonb);
    v_subtotal integer := 0;
    v_discount integer := 0;
    v_promo_id uuid;
    v_people integer := 0;
    v_order public.orders;
begin
    perform public.expire_stale_orders();

    select * into v_event from public.events where id = p_event_id;
    if not found or v_event.status <> 'published' or v_event.ends_at < now() then
        raise exception 'event_unavailable';
    end if;
    if v_event.sales_paused then
        raise exception 'sales_paused';
    end if;

    perform public.validate_buyer(p_name, p_email, p_phone);

    if jsonb_typeof(p_items) is distinct from 'array' or jsonb_array_length(p_items) = 0 then
        raise exception 'invalid_items';
    end if;
    if jsonb_typeof(v_answers) <> 'object' then
        raise exception 'invalid_answers';
    end if;

    for v_question in select value from jsonb_array_elements(v_event.questions) loop
        if coalesce((v_question ->> 'required')::boolean, false)
            and coalesce(trim(v_answers ->> (v_question ->> 'id')), '') = '' then
            raise exception 'answers_missing';
        end if;
    end loop;

    for v_item in
        select (item ->> 'ticket_type_id')::uuid as ticket_type_id, sum((item ->> 'quantity')::integer)::integer as quantity
        from jsonb_array_elements(p_items) item
        group by 1
        order by 1
    loop
        select * into v_type from public.ticket_types
        where id = v_item.ticket_type_id and event_id = p_event_id
        for update;

        if not found
            or not v_type.visible
            or v_type.sold_out
            or (v_type.sales_start is not null and v_type.sales_start > now())
            or (v_type.sales_end is not null and v_type.sales_end < now()) then
            raise exception 'ticket_unavailable';
        end if;
        if v_item.quantity < v_type.min_per_order or v_item.quantity > v_type.max_per_order then
            raise exception 'quantity_limit';
        end if;
        if public.ticket_type_remaining(v_type.id) < v_item.quantity then
            raise exception 'sold_out';
        end if;

        v_subtotal := v_subtotal + v_type.price * v_item.quantity;
        v_people := v_people + v_item.quantity * v_type.admits;
    end loop;

    if v_people > 20 then
        raise exception 'quantity_limit';
    end if;

    if nullif(trim(coalesce(p_promo_code, '')), '') is not null then
        select promo_id, discount_amount into v_promo_id, v_discount
        from public.apply_promo(p_event_id, p_promo_code, v_subtotal, true);
    end if;

    insert into public.orders (
        booking_code, event_id, customer_id, name, email, phone, answers,
        subtotal, discount, total, promo_code_id, hold_expires_at,
        utm_source, utm_medium, utm_campaign, referrer, terms_accepted_at
    ) values (
        public.generate_booking_code(v_event.city_code, v_event.starts_at),
        p_event_id,
        public.upsert_customer(p_name, p_email, p_phone, v_answers ->> 'city', p_marketing_consent),
        trim(p_name),
        lower(trim(p_email)),
        trim(p_phone),
        v_answers,
        v_subtotal,
        v_discount,
        v_subtotal - v_discount,
        v_promo_id,
        now() + make_interval(mins => p_hold_minutes),
        left(p_utm ->> 'source', 100),
        left(p_utm ->> 'medium', 100),
        left(p_utm ->> 'campaign', 100),
        left(p_utm ->> 'referrer', 300),
        now()
    ) returning * into v_order;

    insert into public.order_items (order_id, ticket_type_id, quantity, unit_price, admits)
    select v_order.id, tt.id, i.quantity, tt.price, tt.admits
    from (
        select (item ->> 'ticket_type_id')::uuid as ticket_type_id, sum((item ->> 'quantity')::integer)::integer as quantity
        from jsonb_array_elements(p_items) item
        group by 1
    ) i
    join public.ticket_types tt on tt.id = i.ticket_type_id;

    return v_order;
end;
$$;

create function public.confirm_order(p_order_id uuid, p_provider text, p_payment_id text, p_amount_paise integer)
returns public.orders
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_order public.orders;
    v_item record;
begin
    select * into v_order from public.orders where id = p_order_id for update;
    if not found then
        raise exception 'order_not_found';
    end if;
    if v_order.status = 'paid' then
        return v_order;
    end if;
    if p_amount_paise <> v_order.total * 100 then
        raise exception 'amount_mismatch';
    end if;

    if v_order.status in ('cancelled', 'refunded', 'failed') then
        update public.orders set
            needs_refund = true,
            payment_provider = p_provider,
            provider_payment_id = coalesce(provider_payment_id, p_payment_id),
            notes = trim(notes || ' Payment arrived after this order was closed.')
        where id = p_order_id
        returning * into v_order;
        return v_order;
    end if;

    if v_order.status = 'expired' or v_order.hold_expires_at < now() then
        for v_item in
            select oi.ticket_type_id, oi.quantity
            from public.order_items oi
            where oi.order_id = p_order_id
            order by oi.ticket_type_id
        loop
            perform 1 from public.ticket_types where id = v_item.ticket_type_id for update;
            if public.ticket_type_remaining(v_item.ticket_type_id) < v_item.quantity then
                update public.orders set
                    status = 'failed',
                    needs_refund = true,
                    hold_expires_at = null,
                    payment_provider = p_provider,
                    provider_payment_id = p_payment_id,
                    notes = trim(notes || ' Paid after the seat hold ended and the tickets had sold out.')
                where id = p_order_id
                returning * into v_order;
                return v_order;
            end if;
        end loop;
    end if;

    update public.orders set
        status = 'paid',
        paid_at = now(),
        hold_expires_at = null,
        payment_provider = p_provider,
        provider_payment_id = p_payment_id
    where id = p_order_id
    returning * into v_order;

    perform public.issue_tickets(p_order_id);
    return v_order;
end;
$$;

create function public.get_booking(p_access_token uuid) returns jsonb
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

create function public.track_visit(
    p_path text,
    p_visitor_id text,
    p_event_id uuid default null,
    p_utm jsonb default '{}'::jsonb,
    p_referrer text default null
) returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
    if char_length(coalesce(p_visitor_id, '')) not between 8 and 64
        or char_length(coalesce(p_path, '')) not between 1 and 200 then
        return;
    end if;
    if exists (
        select 1 from public.page_visits
        where visitor_id = p_visitor_id and path = p_path and created_at > now() - interval '30 minutes'
    ) then
        return;
    end if;

    insert into public.page_visits (event_id, path, visitor_id, utm_source, utm_medium, utm_campaign, referrer)
    values (
        (select id from public.events where id = p_event_id and status = 'published'),
        p_path,
        p_visitor_id,
        left(p_utm ->> 'source', 100),
        left(p_utm ->> 'medium', 100),
        left(p_utm ->> 'campaign', 100),
        left(p_referrer, 300)
    );
end;
$$;

create function public.get_event_preview(p_slug text, p_preview_token uuid) returns setof public.events
language sql
stable
security definer
set search_path = ''
as $$
    select * from public.events where slug = p_slug and preview_token = p_preview_token
$$;

create function public.get_event_preview_ticket_types(p_slug text, p_preview_token uuid) returns setof public.ticket_types
language sql
stable
security definer
set search_path = ''
as $$
    select tt.*
    from public.ticket_types tt
    join public.events e on e.id = tt.event_id
    where e.slug = p_slug and e.preview_token = p_preview_token and tt.visible
    order by tt.sort_order, tt.name
$$;

revoke execute on function
    public.expire_stale_orders(),
    public.ticket_type_remaining(uuid),
    public.promo_code_uses(uuid),
    public.apply_promo(uuid, text, integer, boolean),
    public.generate_booking_code(text, timestamptz),
    public.validate_buyer(text, text, text),
    public.upsert_customer(text, text, text, text, boolean),
    public.issue_tickets(uuid),
    public.reserve_order(uuid, jsonb, text, text, text, jsonb, text, boolean, jsonb, integer),
    public.confirm_order(uuid, text, text, integer)
from public, anon, authenticated;

grant execute on function
    public.reserve_order(uuid, jsonb, text, text, text, jsonb, text, boolean, jsonb, integer),
    public.confirm_order(uuid, text, text, integer),
    public.expire_stale_orders()
to service_role;
