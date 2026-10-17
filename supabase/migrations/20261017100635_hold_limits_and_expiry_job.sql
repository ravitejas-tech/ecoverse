create extension if not exists pg_cron with schema pg_catalog;

create function public.assert_hold_allowed(p_email text) returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
    if (
        select count(*) from public.orders
        where email = lower(trim(p_email)) and status = 'pending' and hold_expires_at > now()
    ) >= 3 then
        raise exception 'too_many_holds';
    end if;
end;
$$;

revoke execute on function public.assert_hold_allowed(text) from public, anon, authenticated;

create or replace function public.reserve_order(
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
    perform public.assert_hold_allowed(p_email);

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

revoke execute on function public.reserve_order(uuid, jsonb, text, text, text, jsonb, text, boolean, jsonb, integer) from public, anon, authenticated;
grant execute on function public.reserve_order(uuid, jsonb, text, text, text, jsonb, text, boolean, jsonb, integer) to service_role;

select cron.schedule('expire-stale-orders', '*/5 * * * *', 'select public.expire_stale_orders()');
