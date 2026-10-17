create function public.log_activity() returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_old jsonb := case when tg_op in ('UPDATE', 'DELETE') then to_jsonb(old) end;
    v_new jsonb := case when tg_op in ('INSERT', 'UPDATE') then to_jsonb(new) end;
    v_row jsonb := coalesce(v_new, v_old);
    v_changes jsonb := '{}'::jsonb;
begin
    if tg_op = 'UPDATE' then
        select coalesce(jsonb_object_agg(n.key, jsonb_build_object('from', v_old -> n.key, 'to', n.value)), '{}'::jsonb)
        into v_changes
        from jsonb_each(v_new) n
        where n.key not in ('updated_at', 'preview_token')
            and n.value is distinct from v_old -> n.key;
        if v_changes = '{}'::jsonb then
            return new;
        end if;
    elsif tg_op = 'INSERT' then
        v_changes := jsonb_build_object('name', coalesce(v_row ->> 'title', v_row ->> 'name', v_row ->> 'code', v_row ->> 'email'));
    else
        v_changes := jsonb_build_object('name', coalesce(v_row ->> 'title', v_row ->> 'name', v_row ->> 'code', v_row ->> 'email'));
    end if;

    insert into public.activity_log (actor_id, actor_email, action, entity, entity_id, changes)
    values (
        auth.uid(),
        public.current_email(),
        lower(tg_op),
        tg_table_name,
        coalesce(v_row ->> 'id', v_row ->> 'user_id'),
        v_changes
    );

    return coalesce(new, old);
end;
$$;

revoke execute on function public.log_activity() from public, anon, authenticated;

create trigger events_log_activity after insert or update or delete on public.events
for each row execute function public.log_activity();

create trigger ticket_types_log_activity after insert or update or delete on public.ticket_types
for each row execute function public.log_activity();

create trigger promo_codes_log_activity after insert or update or delete on public.promo_codes
for each row execute function public.log_activity();

create trigger staff_log_activity after insert or update or delete on public.staff
for each row execute function public.log_activity();

create trigger orders_log_cancellation after update on public.orders
for each row
when (new.status = 'cancelled' and old.status is distinct from 'cancelled')
execute function public.log_activity();
