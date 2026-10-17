create type public.event_status as enum ('draft', 'published');
create type public.event_category as enum ('dance_night', 'social_mixer', 'workshop', 'weekend_trip', 'nightlife', 'meetup');
create type public.pop_tone as enum ('pink', 'yellow', 'cyan', 'lime', 'violet', 'orange');
create type public.staff_role as enum ('super_admin', 'event_manager', 'finance', 'marketing', 'gate_staff', 'viewer');
create type public.order_status as enum ('pending', 'paid', 'expired', 'failed', 'cancelled', 'refunded');
create type public.order_source as enum ('online', 'complimentary');
create type public.ticket_status as enum ('valid', 'cancelled');
create type public.discount_type as enum ('percent', 'fixed');
create type public.check_in_result as enum ('valid', 'already_checked_in', 'invalid', 'cancelled', 'wrong_event', 'override');

create function public.set_updated_at() returns trigger
language plpgsql
set search_path = ''
as $$
begin
    new.updated_at := now();
    return new;
end;
$$;

create table public.events (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    title text not null check (char_length(title) between 3 and 80),
    category public.event_category not null,
    tag text not null default '',
    tone public.pop_tone not null default 'pink',
    summary text not null default '' check (char_length(summary) <= 300),
    description text not null default '',
    cover_url text,
    cover_alt text not null default '',
    cover_credit text,
    cover_source text,
    starts_at timestamptz not null,
    ends_at timestamptz not null,
    city text not null,
    city_code text not null check (city_code ~ '^[A-Z]{3}$'),
    region text not null default 'Maharashtra',
    venue_name text not null default '',
    venue_address text not null default '',
    map_url text,
    highlights text[] not null default '{}',
    schedule jsonb not null default '[]'::jsonb check (jsonb_typeof(schedule) = 'array'),
    hosts jsonb not null default '[]'::jsonb check (jsonb_typeof(hosts) = 'array'),
    age_limit text not null default '',
    language text not null default '',
    dress_code text not null default '',
    included text[] not null default '{}',
    not_included text[] not null default '{}',
    things_to_know text[] not null default '{}',
    faqs jsonb not null default '[]'::jsonb check (jsonb_typeof(faqs) = 'array'),
    terms text not null default '',
    refund_policy text not null default '',
    questions jsonb not null default '[]'::jsonb check (jsonb_typeof(questions) = 'array'),
    status public.event_status not null default 'draft',
    sales_paused boolean not null default false,
    preview_token uuid not null default gen_random_uuid(),
    published_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint events_ends_after_start check (ends_at > starts_at)
);

create index events_status_starts_at_idx on public.events (status, starts_at);

create trigger events_set_updated_at before update on public.events
for each row execute function public.set_updated_at();

create table public.ticket_types (
    id uuid primary key default gen_random_uuid(),
    event_id uuid not null references public.events (id) on delete cascade,
    name text not null check (char_length(name) between 2 and 60),
    description text not null default '',
    price integer not null check (price >= 0),
    quantity integer not null check (quantity >= 0),
    admits integer not null default 1 check (admits between 1 and 10),
    min_per_order integer not null default 1 check (min_per_order >= 1),
    max_per_order integer not null default 10 check (max_per_order between 1 and 20),
    sales_start timestamptz,
    sales_end timestamptz,
    visible boolean not null default true,
    sold_out boolean not null default false,
    sort_order integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint ticket_types_order_limits check (max_per_order >= min_per_order),
    constraint ticket_types_sales_window check (sales_end is null or sales_start is null or sales_end > sales_start)
);

create index ticket_types_event_id_idx on public.ticket_types (event_id, sort_order);

create trigger ticket_types_set_updated_at before update on public.ticket_types
for each row execute function public.set_updated_at();

create table public.promo_codes (
    id uuid primary key default gen_random_uuid(),
    code text not null unique check (code ~ '^[A-Z0-9_-]{3,24}$'),
    label text not null default '',
    event_id uuid references public.events (id) on delete cascade,
    discount_type public.discount_type not null,
    discount_value integer not null check (discount_value > 0),
    max_uses integer check (max_uses > 0),
    starts_at timestamptz,
    expires_at timestamptz,
    active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint promo_codes_percent_range check (discount_type <> 'percent' or discount_value <= 100)
);

create trigger promo_codes_set_updated_at before update on public.promo_codes
for each row execute function public.set_updated_at();

create table public.customers (
    id uuid primary key default gen_random_uuid(),
    email text not null unique check (email = lower(email)),
    name text not null,
    phone text not null,
    city text,
    marketing_consent boolean not null default false,
    consent_updated_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create trigger customers_set_updated_at before update on public.customers
for each row execute function public.set_updated_at();

create table public.orders (
    id uuid primary key default gen_random_uuid(),
    booking_code text not null unique,
    access_token uuid not null unique default gen_random_uuid(),
    event_id uuid not null references public.events (id) on delete restrict,
    customer_id uuid not null references public.customers (id) on delete restrict,
    name text not null,
    email text not null check (email = lower(email)),
    phone text not null,
    answers jsonb not null default '{}'::jsonb check (jsonb_typeof(answers) = 'object'),
    subtotal integer not null check (subtotal >= 0),
    discount integer not null default 0 check (discount >= 0),
    total integer not null check (total >= 0),
    promo_code_id uuid references public.promo_codes (id) on delete set null,
    status public.order_status not null default 'pending',
    source public.order_source not null default 'online',
    hold_expires_at timestamptz,
    payment_provider text,
    provider_order_id text unique,
    provider_payment_id text unique,
    paid_at timestamptz,
    cancelled_at timestamptz,
    refunded_at timestamptz,
    refund_amount integer check (refund_amount >= 0),
    provider_refund_id text,
    needs_refund boolean not null default false,
    notes text not null default '',
    utm_source text,
    utm_medium text,
    utm_campaign text,
    referrer text,
    terms_accepted_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index orders_event_status_idx on public.orders (event_id, status);
create index orders_email_idx on public.orders (email);
create index orders_created_at_idx on public.orders (created_at desc);

create trigger orders_set_updated_at before update on public.orders
for each row execute function public.set_updated_at();

create table public.order_items (
    id uuid primary key default gen_random_uuid(),
    order_id uuid not null references public.orders (id) on delete cascade,
    ticket_type_id uuid not null references public.ticket_types (id) on delete restrict,
    quantity integer not null check (quantity > 0),
    unit_price integer not null check (unit_price >= 0),
    admits integer not null check (admits >= 1)
);

create index order_items_order_id_idx on public.order_items (order_id);
create index order_items_ticket_type_id_idx on public.order_items (ticket_type_id);

create table public.tickets (
    id uuid primary key default gen_random_uuid(),
    code text not null unique,
    qr_token text not null unique default encode(extensions.gen_random_bytes(18), 'hex'),
    order_id uuid not null references public.orders (id) on delete cascade,
    event_id uuid not null references public.events (id) on delete restrict,
    ticket_type_id uuid not null references public.ticket_types (id) on delete restrict,
    status public.ticket_status not null default 'valid',
    checked_in_at timestamptz,
    checked_in_by uuid references auth.users (id) on delete set null,
    created_at timestamptz not null default now()
);

create index tickets_order_id_idx on public.tickets (order_id);
create index tickets_event_id_idx on public.tickets (event_id);

create table public.staff (
    user_id uuid primary key references auth.users (id) on delete cascade,
    name text not null,
    email text not null unique check (email = lower(email)),
    role public.staff_role not null,
    active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create trigger staff_set_updated_at before update on public.staff
for each row execute function public.set_updated_at();

create table public.check_ins (
    id bigint generated always as identity primary key,
    event_id uuid not null references public.events (id) on delete cascade,
    ticket_id uuid references public.tickets (id) on delete set null,
    scanned_value text not null,
    result public.check_in_result not null,
    staff_id uuid references auth.users (id) on delete set null,
    created_at timestamptz not null default now()
);

create index check_ins_event_id_idx on public.check_ins (event_id, created_at desc);

create table public.page_visits (
    id bigint generated always as identity primary key,
    event_id uuid references public.events (id) on delete cascade,
    path text not null,
    visitor_id text not null,
    utm_source text,
    utm_medium text,
    utm_campaign text,
    referrer text,
    created_at timestamptz not null default now()
);

create index page_visits_event_id_idx on public.page_visits (event_id, created_at desc);
create index page_visits_visitor_idx on public.page_visits (visitor_id, path, created_at desc);

create table public.gallery_photos (
    id uuid primary key default gen_random_uuid(),
    event_id uuid not null references public.events (id) on delete cascade,
    url text not null,
    alt text not null default '',
    sort_order integer not null default 0,
    created_at timestamptz not null default now()
);

create index gallery_photos_event_id_idx on public.gallery_photos (event_id, sort_order);

create table public.activity_log (
    id bigint generated always as identity primary key,
    actor_id uuid,
    actor_email text,
    action text not null,
    entity text not null,
    entity_id text,
    changes jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create index activity_log_created_at_idx on public.activity_log (created_at desc);
