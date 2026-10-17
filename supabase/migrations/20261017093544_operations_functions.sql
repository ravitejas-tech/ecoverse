create function public.check_in(p_event_id uuid, p_value text, p_override boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_value text := trim(coalesce(p_value, ''));
    v_ticket public.tickets;
    v_order public.orders;
    v_type_name text;
    v_event_title text;
    v_previous timestamptz;
    v_result public.check_in_result;
begin
    if not public.has_staff_role('super_admin', 'event_manager', 'gate_staff') then
        raise exception 'not_allowed';
    end if;
    if upper(v_value) like 'ECHOVERSE:%' then
        v_value := substr(v_value, 11);
    end if;

    select * into v_ticket from public.tickets
    where qr_token = v_value or code = upper(v_value)
    for update;

    if not found then
        select t.* into v_ticket
        from public.tickets t
        join public.orders o on o.id = t.order_id
        where o.booking_code = upper(v_value)
        order by (t.event_id = p_event_id and t.status = 'valid' and t.checked_in_at is null) desc,
            char_length(t.code), t.code
        limit 1
        for update of t;
    end if;

    if v_ticket.id is null then
        insert into public.check_ins (event_id, scanned_value, result, staff_id)
        values (p_event_id, left(v_value, 200), 'invalid', auth.uid());
        return jsonb_build_object('result', 'invalid');
    end if;

    select * into v_order from public.orders where id = v_ticket.order_id;
    select name into v_type_name from public.ticket_types where id = v_ticket.ticket_type_id;
    select title into v_event_title from public.events where id = v_ticket.event_id;

    if v_ticket.event_id <> p_event_id then
        v_result := 'wrong_event';
    elsif v_ticket.status = 'cancelled' or v_order.status <> 'paid' then
        v_result := 'cancelled';
    elsif v_ticket.checked_in_at is not null
        and not (p_override and public.has_staff_role('super_admin', 'event_manager')) then
        v_result := 'already_checked_in';
    else
        v_previous := v_ticket.checked_in_at;
        v_result := case when v_previous is null then 'valid' else 'override' end;
        update public.tickets set checked_in_at = now(), checked_in_by = auth.uid()
        where id = v_ticket.id
        returning * into v_ticket;
    end if;

    insert into public.check_ins (event_id, ticket_id, scanned_value, result, staff_id)
    values (p_event_id, v_ticket.id, left(v_value, 200), v_result, auth.uid());

    if v_result = 'override' then
        insert into public.activity_log (actor_id, actor_email, action, entity, entity_id, changes)
        values (auth.uid(), public.current_email(), 'check_in_override', 'tickets', v_ticket.id::text,
            jsonb_build_object('ticket', v_ticket.code, 'first_checked_in_at', v_previous));
    end if;

    return jsonb_build_object(
        'result', v_result,
        'ticket_code', v_ticket.code,
        'booking_code', v_order.booking_code,
        'attendee', v_order.name,
        'ticket_type', v_type_name,
        'event_title', v_event_title,
        'checked_in_at', v_ticket.checked_in_at,
        'first_checked_in_at', v_previous
    );
end;
$$;

create function public.check_in_stats(p_event_id uuid)
returns table (valid_tickets integer, checked_in integer)
language sql
stable
security definer
set search_path = ''
as $$
    select
        count(*)::integer,
        count(*) filter (where t.checked_in_at is not null)::integer
    from public.tickets t
    join public.orders o on o.id = t.order_id
    where t.event_id = p_event_id
        and t.status = 'valid'
        and o.status = 'paid'
        and public.is_staff()
$$;

create function public.cancel_order(p_order_id uuid, p_reason text default '')
returns public.orders
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_order public.orders;
begin
    if not public.has_staff_role('super_admin', 'event_manager', 'finance') then
        raise exception 'not_allowed';
    end if;

    select * into v_order from public.orders where id = p_order_id for update;
    if not found then
        raise exception 'order_not_found';
    end if;
    if v_order.status not in ('paid', 'pending') then
        raise exception 'order_not_cancellable';
    end if;

    update public.tickets set status = 'cancelled' where order_id = p_order_id;
    update public.orders set
        status = 'cancelled',
        cancelled_at = now(),
        hold_expires_at = null,
        notes = trim(notes || ' ' || coalesce(trim(p_reason), ''))
    where id = p_order_id
    returning * into v_order;

    return v_order;
end;
$$;

create function public.mark_order_refunded(
    p_order_id uuid,
    p_amount integer,
    p_refund_id text,
    p_actor_id uuid,
    p_actor_email text,
    p_reason text default ''
) returns public.orders
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_order public.orders;
begin
    select * into v_order from public.orders where id = p_order_id for update;
    if not found then
        raise exception 'order_not_found';
    end if;
    if not (v_order.status in ('paid', 'cancelled') or v_order.needs_refund) then
        raise exception 'order_not_refundable';
    end if;

    update public.tickets set status = 'cancelled' where order_id = p_order_id;
    update public.orders set
        status = 'refunded',
        refunded_at = now(),
        refund_amount = p_amount,
        provider_refund_id = p_refund_id,
        needs_refund = false,
        notes = trim(notes || ' ' || coalesce(trim(p_reason), ''))
    where id = p_order_id
    returning * into v_order;

    insert into public.activity_log (actor_id, actor_email, action, entity, entity_id, changes)
    values (p_actor_id, p_actor_email, 'refund', 'orders', p_order_id::text,
        jsonb_build_object('booking_code', v_order.booking_code, 'amount', p_amount, 'refund_id', p_refund_id));

    return v_order;
end;
$$;

create function public.issue_complimentary(
    p_event_id uuid,
    p_ticket_type_id uuid,
    p_quantity integer,
    p_name text,
    p_email text,
    p_phone text,
    p_note text default ''
) returns public.orders
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_event public.events;
    v_type public.ticket_types;
    v_order public.orders;
begin
    if not public.has_staff_role('super_admin', 'event_manager') then
        raise exception 'not_allowed';
    end if;

    select * into v_event from public.events where id = p_event_id;
    if not found then
        raise exception 'event_unavailable';
    end if;

    select * into v_type from public.ticket_types where id = p_ticket_type_id and event_id = p_event_id for update;
    if not found then
        raise exception 'ticket_unavailable';
    end if;
    if p_quantity not between 1 and 20 then
        raise exception 'quantity_limit';
    end if;
    if public.ticket_type_remaining(v_type.id) < p_quantity then
        raise exception 'sold_out';
    end if;

    perform public.validate_buyer(p_name, p_email, p_phone);

    insert into public.orders (
        booking_code, event_id, customer_id, name, email, phone,
        subtotal, discount, total, status, source, payment_provider, paid_at, notes
    ) values (
        public.generate_booking_code(v_event.city_code, v_event.starts_at),
        p_event_id,
        public.upsert_customer(p_name, p_email, p_phone, null, false),
        trim(p_name),
        lower(trim(p_email)),
        trim(p_phone),
        0, 0, 0, 'paid', 'complimentary', 'complimentary', now(),
        coalesce(trim(p_note), '')
    ) returning * into v_order;

    insert into public.order_items (order_id, ticket_type_id, quantity, unit_price, admits)
    values (v_order.id, v_type.id, p_quantity, 0, v_type.admits);

    perform public.issue_tickets(v_order.id);

    insert into public.activity_log (actor_id, actor_email, action, entity, entity_id, changes)
    values (auth.uid(), public.current_email(), 'complimentary', 'orders', v_order.id::text,
        jsonb_build_object('booking_code', v_order.booking_code, 'ticket_type', v_type.name, 'quantity', p_quantity, 'email', v_order.email));

    return v_order;
end;
$$;

create function public.duplicate_event(p_event_id uuid) returns uuid
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
        highlights, schedule, hosts, age_limit, language, dress_code,
        included, not_included, things_to_know, faqs, terms, refund_policy, questions, status
    )
    select
        left(slug, 60) || '-copy-' || substr(encode(extensions.gen_random_bytes(3), 'hex'), 1, 4),
        left(title || ' (copy)', 80),
        category, tag, tone, summary, description,
        cover_url, cover_alt, cover_credit, cover_source,
        starts_at, ends_at, city, city_code, region, venue_name, venue_address, map_url,
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

create function public.event_summaries()
returns table (
    event_id uuid,
    tickets_sold integer,
    checked_in integer,
    gross_sales integer,
    capacity integer,
    remaining integer
)
language sql
stable
security definer
set search_path = ''
as $$
    select
        e.id,
        (select count(*)::integer from public.tickets t join public.orders o on o.id = t.order_id
            where t.event_id = e.id and o.status = 'paid' and t.status = 'valid'),
        (select count(*)::integer from public.tickets t join public.orders o on o.id = t.order_id
            where t.event_id = e.id and o.status = 'paid' and t.status = 'valid' and t.checked_in_at is not null),
        case when public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer') then
            (select coalesce(sum(o.total), 0)::integer from public.orders o where o.event_id = e.id and o.status = 'paid')
        end,
        (select coalesce(sum(tt.quantity), 0)::integer from public.ticket_types tt where tt.event_id = e.id),
        (select coalesce(sum(public.ticket_type_remaining(tt.id)), 0)::integer from public.ticket_types tt where tt.event_id = e.id)
    from public.events e
    where public.is_staff()
$$;

create function public.promo_code_summaries()
returns table (promo_code_id uuid, uses integer, discount_total integer, revenue integer)
language sql
stable
security definer
set search_path = ''
as $$
    select
        p.id,
        count(o.id)::integer,
        coalesce(sum(o.discount), 0)::integer,
        coalesce(sum(o.total), 0)::integer
    from public.promo_codes p
    left join public.orders o on o.promo_code_id = p.id and o.status = 'paid'
    where public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer')
    group by p.id
$$;

create function public.dashboard_stats(p_event_id uuid default null) returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
    v_stats jsonb;
begin
    if not public.has_staff_role('super_admin', 'event_manager', 'finance', 'marketing', 'viewer') then
        raise exception 'not_allowed';
    end if;

    with
    scoped_orders as (
        select * from public.orders where p_event_id is null or event_id = p_event_id
    ),
    paid_orders as (
        select * from scoped_orders where status = 'paid'
    ),
    live_tickets as (
        select t.* from public.tickets t
        join paid_orders o on o.id = t.order_id
        where t.status = 'valid'
    ),
    scoped_types as (
        select tt.*, e.title as event_title
        from public.ticket_types tt
        join public.events e on e.id = tt.event_id
        where p_event_id is null or tt.event_id = p_event_id
    ),
    scoped_visits as (
        select * from public.page_visits where p_event_id is null or event_id = p_event_id
    ),
    repeaters as (
        select customer_id from public.orders
        where status = 'paid'
        group by customer_id
        having count(distinct event_id) >= 2
    )
    select jsonb_build_object(
        'tickets_sold', (select count(*) from live_tickets),
        'checked_in', (select count(*) from live_tickets where checked_in_at is not null),
        'gross_sales', (select coalesce(sum(total), 0) from scoped_orders where status in ('paid', 'refunded')),
        'net_sales', (select coalesce(sum(total), 0) from paid_orders),
        'average_order_value', (select coalesce(round(avg(total)), 0) from paid_orders where source = 'online'),
        'capacity', (select coalesce(sum(quantity), 0) from scoped_types),
        'remaining', (select coalesce(sum(public.ticket_type_remaining(id)), 0) from scoped_types),
        'orders', jsonb_build_object(
            'paid', (select count(*) from paid_orders),
            'pending', (select count(*) from scoped_orders where status = 'pending' and hold_expires_at > now()),
            'abandoned', (select count(*) from scoped_orders where status = 'expired' or (status = 'pending' and hold_expires_at <= now())),
            'failed', (select count(*) from scoped_orders where status = 'failed'),
            'cancelled', (select count(*) from scoped_orders where status = 'cancelled'),
            'refunded', (select count(*) from scoped_orders where status = 'refunded'),
            'needs_refund', (select count(*) from scoped_orders where needs_refund),
            'complimentary', (select count(*) from paid_orders where source = 'complimentary')
        ),
        'refunds', jsonb_build_object(
            'count', (select count(*) from scoped_orders where status = 'refunded'),
            'amount', (select coalesce(sum(refund_amount), 0) from scoped_orders where status = 'refunded')
        ),
        'page_views', (select count(*) from scoped_visits),
        'unique_visitors', (select count(distinct visitor_id) from scoped_visits),
        'conversion_rate', (
            select case when count(distinct v.visitor_id) = 0 then 0
                else round(100.0 * (select count(*) from paid_orders where source = 'online') / count(distinct v.visitor_id), 1)
            end
            from scoped_visits v
        ),
        'customers', jsonb_build_object(
            'total', (select count(distinct customer_id) from paid_orders),
            'repeat', (select count(distinct customer_id) from paid_orders where customer_id in (select customer_id from repeaters))
        ),
        'ticket_types', coalesce((
            select jsonb_agg(jsonb_build_object(
                'id', tt.id,
                'event_title', tt.event_title,
                'name', tt.name,
                'price', tt.price,
                'quantity', tt.quantity,
                'sold', coalesce((select sum(oi.quantity) from public.order_items oi join paid_orders o on o.id = oi.order_id where oi.ticket_type_id = tt.id), 0),
                'revenue', coalesce((select sum(oi.quantity * oi.unit_price) from public.order_items oi join paid_orders o on o.id = oi.order_id where oi.ticket_type_id = tt.id), 0),
                'remaining', public.ticket_type_remaining(tt.id)
            ) order by tt.event_title, tt.sort_order, tt.name)
            from scoped_types tt
        ), '[]'::jsonb),
        'promo_codes', coalesce((
            select jsonb_agg(row_to_json(p) order by p.uses desc)
            from (
                select pc.code, count(*) as uses, coalesce(sum(o.discount), 0) as discount, coalesce(sum(o.total), 0) as revenue
                from paid_orders o
                join public.promo_codes pc on pc.id = o.promo_code_id
                group by pc.code
            ) p
        ), '[]'::jsonb),
        'sources', coalesce((
            select jsonb_agg(row_to_json(s) order by s.orders desc)
            from (
                select coalesce(nullif(utm_source, ''), 'direct') as source, count(*) as orders, coalesce(sum(total), 0) as revenue
                from paid_orders
                where source = 'online'
                group by 1
            ) s
        ), '[]'::jsonb),
        'daily', (
            select jsonb_agg(jsonb_build_object('day', d.day, 'orders', d.orders, 'revenue', d.revenue) order by d.day)
            from (
                select day::date as day,
                    (select count(*) from paid_orders o where (o.paid_at at time zone 'Asia/Kolkata')::date = day::date) as orders,
                    (select coalesce(sum(total), 0) from paid_orders o where (o.paid_at at time zone 'Asia/Kolkata')::date = day::date) as revenue
                from generate_series(
                    (now() at time zone 'Asia/Kolkata')::date - 13,
                    (now() at time zone 'Asia/Kolkata')::date,
                    interval '1 day'
                ) as day
            ) d
        )
    ) into v_stats;

    return v_stats;
end;
$$;

revoke execute on function public.mark_order_refunded(uuid, integer, text, uuid, text, text) from public, anon, authenticated;
grant execute on function public.mark_order_refunded(uuid, integer, text, uuid, text, text) to service_role;

revoke execute on function
    public.check_in(uuid, text, boolean),
    public.check_in_stats(uuid),
    public.cancel_order(uuid, text),
    public.issue_complimentary(uuid, uuid, integer, text, text, text, text),
    public.duplicate_event(uuid),
    public.event_summaries(),
    public.promo_code_summaries(),
    public.dashboard_stats(uuid)
from public, anon;
