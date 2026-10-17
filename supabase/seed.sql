insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, recovery_token, email_change_token_new, email_change,
    email_change_token_current, reauthentication_token, phone_change, phone_change_token
)
select
    '00000000-0000-0000-0000-000000000000', id, 'authenticated', 'authenticated', email,
    extensions.crypt('Echoverse@2026', extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}', jsonb_build_object('name', name), now(), now(),
    '', '', '', '', '', '', '', ''
from (values
    ('a0000000-0000-4000-8000-000000000001'::uuid, 'admin@echoversehub.com', 'Super Admin'),
    ('a0000000-0000-4000-8000-000000000002'::uuid, 'events@echoversehub.com', 'Event Manager'),
    ('a0000000-0000-4000-8000-000000000003'::uuid, 'finance@echoversehub.com', 'Finance'),
    ('a0000000-0000-4000-8000-000000000004'::uuid, 'marketing@echoversehub.com', 'Marketing'),
    ('a0000000-0000-4000-8000-000000000005'::uuid, 'gate@echoversehub.com', 'Gate Staff'),
    ('a0000000-0000-4000-8000-000000000006'::uuid, 'viewer@echoversehub.com', 'Viewer')
) as seed_users (id, email, name);

insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
select id::text, id, jsonb_build_object('sub', id::text, 'email', email, 'email_verified', true), 'email', now(), now(), now()
from auth.users
where id::text like 'a0000000-%';

insert into public.staff (user_id, name, email, role) values
    ('a0000000-0000-4000-8000-000000000001', 'Super Admin', 'admin@echoversehub.com', 'super_admin'),
    ('a0000000-0000-4000-8000-000000000002', 'Event Manager', 'events@echoversehub.com', 'event_manager'),
    ('a0000000-0000-4000-8000-000000000003', 'Finance', 'finance@echoversehub.com', 'finance'),
    ('a0000000-0000-4000-8000-000000000004', 'Marketing', 'marketing@echoversehub.com', 'marketing'),
    ('a0000000-0000-4000-8000-000000000005', 'Gate Staff', 'gate@echoversehub.com', 'gate_staff'),
    ('a0000000-0000-4000-8000-000000000006', 'Viewer', 'viewer@echoversehub.com', 'viewer');

insert into public.events (
    id, slug, title, category, tag, tone, summary, description,
    cover_url, cover_alt, cover_credit, cover_source,
    starts_at, ends_at, city, city_code, region, venue_name, venue_address, map_url,
    highlights, schedule, hosts, age_limit, language, dress_code,
    included, not_included, things_to_know, faqs, terms, refund_policy, questions,
    status, published_at
) values
(
    'e0000000-0000-4000-8000-000000000001',
    'bollywood-dance-night-pune',
    'Bollywood Dance Night',
    'dance_night',
    'Early bird 🐦',
    'pink',
    'A full night of Bollywood bangers, a packed dance floor and zero judgement. Two left feet welcome — come solo or bring the squad.',
    'Think wedding sangeet energy without the wedding. Our DJs play the biggest Bollywood hits from the 90s to right now, our hosts get the shy ones on the floor, and by midnight the whole room knows the hook step.

Come solo — most people do. Come with your squad — even better. Either way you leave with sore feet, a hoarse voice and at least three new friends.',
    '/images/events/bollywood-dance-night.webp',
    'Women in saris dancing together under blue party lights',
    'Photo by Adhitya Sibikumar on Unsplash',
    'https://unsplash.com/photos/kpDmx-MPi5g',
    '2026-11-14T20:00:00+05:30', '2026-11-15T00:00:00+05:30',
    'Pune', 'PUN', 'Maharashtra',
    'The Courtyard, Koregaon Park',
    'Lane 6, North Main Road, Koregaon Park, Pune 411001',
    'https://www.google.com/maps/search/?api=1&query=Koregaon+Park+Pune',
    array['Four hours of non-stop Bollywood', 'Hook-step crash course at 9 PM', 'Photo booth with props', 'Hosts who make sure nobody stands alone'],
    '[{"time":"8:00 PM","title":"Doors open + welcome mocktails"},{"time":"9:00 PM","title":"Hook-step crash course"},{"time":"9:30 PM","title":"DJ set: 90s to now"},{"time":"11:30 PM","title":"Request hour"},{"time":"12:00 AM","title":"Last song, group photo"}]',
    '[{"name":"DJ Riya","role":"On the decks"},{"name":"Kabir","role":"Dance host"}]',
    '18+ (ID checked at the gate)', 'Hindi & English', 'Desi glam or party casual — comfy shoes win',
    array['Entry for the full night', 'Welcome mocktail', 'Hook-step crash course', 'Photo booth'],
    array['Food and extra drinks (available to buy)', 'Travel to the venue'],
    array['Carry a government photo ID', 'Re-entry is not allowed after 10 PM', 'The venue is wheelchair accessible', 'Nearest parking: Lane 5 public lot'],
    '[{"question":"I am coming alone. Will it be awkward?","answer":"Not at all — most people come solo. Our hosts run icebreakers and the crash course is the fastest way to make friends."},{"question":"Can I buy tickets at the door?","answer":"Only if any are left, and at the Phase 2 price. Booking online is cheaper and guarantees entry."},{"question":"Is there parking?","answer":"Street parking is limited. Use the public lot on Lane 5 or take an auto."}]',
    'Entry for ticket holders only. Each QR code admits one person once. Echoverse Hub may refuse entry for unsafe behaviour.',
    'Full refund up to 72 hours before the event. 50% refund up to 24 hours before. No refunds after that, but you can transfer your ticket to a friend by messaging us.',
    '[{"id":"age","kind":"age","label":"Your age","required":true},{"id":"city","kind":"city","label":"Which part of the city are you coming from?","required":false}]',
    'published', now() - interval '20 days'
),
(
    'e0000000-0000-4000-8000-000000000002',
    'rooftop-social-mixer-mumbai',
    'Rooftop Social Mixer',
    'social_mixer',
    'Selling fast 🔥',
    'yellow',
    'Sunset, city views and a rooftop full of new people. Easy icebreakers, good music and a group to leave with.',
    'New to the city, or just tired of the same five people? This one is for you. We take over a rooftop at golden hour, hand you a name tag and a ridiculous icebreaker card, and let the evening do its thing.

No speed-dating, no forced networking — just good music, good people and a view that makes everyone look great in photos.',
    '/images/events/rooftop-social-mixer.webp',
    'Friends cheering with their hands up at a rooftop party at golden hour',
    'Photo by Vitaly Gariev on Unsplash',
    'https://unsplash.com/photos/M9ozCAVRLKo',
    '2026-11-20T19:00:00+05:30', '2026-11-20T23:00:00+05:30',
    'Mumbai', 'BOM', 'Maharashtra',
    'Skyline Terrace, Bandra West',
    '14th Road, Khar–Bandra West, Mumbai 400050',
    'https://www.google.com/maps/search/?api=1&query=Bandra+West+Mumbai',
    array['Golden-hour rooftop views', 'Icebreaker games that are actually fun', 'Live acoustic set', 'Make friends, not small talk'],
    '[{"time":"7:00 PM","title":"Sunset welcome"},{"time":"7:45 PM","title":"Icebreaker round"},{"time":"8:30 PM","title":"Acoustic set"},{"time":"9:30 PM","title":"Open mingling + DJ"}]',
    '[{"name":"Meher","role":"Host"},{"name":"The Bandra Strings","role":"Live acoustic"}]',
    '21+', 'English & Hindi', 'Smart casual',
    array['Entry', 'One welcome drink', 'Icebreaker kit'],
    array['Food (a menu is available at the venue)', 'Extra drinks'],
    array['Carry a photo ID', 'The rooftop is reached by lift', 'Rain plan: the indoor lounge on the same floor'],
    '[{"question":"Is this a dating event?","answer":"No. It is a social mixer — come to meet people, whatever that means for you."},{"question":"Can I bring friends?","answer":"Yes! The Group of 4 pass saves money if you come as a squad."}]',
    'Entry for ticket holders only. Each QR code admits one person once.',
    'Full refund up to 72 hours before the event. No refunds after that.',
    '[{"id":"organisation","kind":"organisation","label":"College or company","required":false}]',
    'published', now() - interval '15 days'
),
(
    'e0000000-0000-4000-8000-000000000003',
    'pottery-and-playlists-pune',
    'Pottery & Playlists',
    'workshop',
    'Only 50 spots 🎟️',
    'cyan',
    'Get your hands in the clay with a guided pottery session set to a curated playlist. Make a piece, take it home.',
    'A slow, messy, happy afternoon. A potter walks you through centring, shaping and trimming on the wheel while a lo-fi playlist sets the mood. You will make at least one piece — wobbly is a style — and we fire and glaze it for you to collect two weeks later.',
    '/images/events/pottery-and-playlists.webp',
    'A pottery wheel spinning beside bowls of clay-shaping tools',
    'Photo by Taylor Heery on Unsplash',
    'https://unsplash.com/photos/ZSgWcW70cTs',
    '2026-11-29T16:00:00+05:30', '2026-11-29T19:00:00+05:30',
    'Pune', 'PUN', 'Maharashtra',
    'Mitti Studio, Baner',
    'Baner Road, near Balewadi Phata, Pune 411045',
    'https://www.google.com/maps/search/?api=1&query=Baner+Pune',
    array['Your own wheel for the session', 'Guided by a working potter', 'Your piece fired and glazed', 'Chai and snacks'],
    '[{"time":"4:00 PM","title":"Welcome + clay basics"},{"time":"4:30 PM","title":"On the wheel"},{"time":"6:00 PM","title":"Trimming + decorating"},{"time":"6:45 PM","title":"Chai and show-and-tell"}]',
    '[{"name":"Ira Deshpande","role":"Potter & teacher"}]',
    '14+', 'English & Hindi', 'Clothes you do not mind getting muddy',
    array['All clay and tools', 'Apron', 'Firing and glazing of one piece', 'Chai and snacks'],
    array['Extra pieces (₹200 each to fire)', 'Delivery of finished pieces'],
    array['Pieces are ready to collect in two weeks', 'Keep nails short for the wheel', 'The studio is on the first floor (stairs only)'],
    '[{"question":"I have never done pottery. Is that okay?","answer":"Perfect, actually. The session is built for complete beginners."},{"question":"Can I take my piece home the same day?","answer":"It needs to dry and be fired first. It is ready to collect from the studio two weeks later."}]',
    'Entry for ticket holders only. Each QR code admits one person once.',
    'Full refund up to 5 days before the workshop. No refunds after that, as materials are prepared for you.',
    '[{"id":"experience","kind":"custom","label":"Have you tried pottery before?","required":true,"options":["Never","A little","Yes, often"]},{"id":"food","kind":"food_preference","label":"Food preference","required":false,"options":["Veg","Non-veg","Vegan","Jain"]}]',
    'published', now() - interval '12 days'
),
(
    'e0000000-0000-4000-8000-000000000004',
    'monsoon-dance-party-pune',
    'Monsoon Dance Party',
    'dance_night',
    'Sold out 🎉',
    'violet',
    'Rain outside, a packed dance floor inside. Our biggest night of the monsoon.',
    'Two hundred people, one DJ and a playlist that did not let anyone sit down. Thank you for making it our biggest night yet.',
    '/images/events/monsoon-dance-party.webp',
    'A packed dance floor with friends dancing under golden party lights',
    'Photo by Nereid Ndreu on Unsplash',
    'https://unsplash.com/photos/h3bZqJlAMOs',
    '2026-08-22T20:00:00+05:30', '2026-08-23T00:00:00+05:30',
    'Pune', 'PUN', 'Maharashtra',
    'The Courtyard, Koregaon Park',
    'Lane 6, North Main Road, Koregaon Park, Pune 411001',
    'https://www.google.com/maps/search/?api=1&query=Koregaon+Park+Pune',
    array['200+ dancers', 'Rain-dance hour'], '[]', '[]',
    '18+', 'Hindi & English', 'Party casual',
    array['Entry'], array[]::text[], array[]::text[], '[]', '', '', '[]',
    'published', '2026-07-20T10:00:00+05:30'
),
(
    'e0000000-0000-4000-8000-000000000005',
    'holi-colour-splash-pune',
    'Holi Colour Splash',
    'meetup',
    'Throwback 🌈',
    'lime',
    'Organic colours, dhol, thandai and a lawn full of new friends.',
    'The happiest mess of the year. Organic colours, a live dhol crew and more thandai than anyone needed.',
    '/images/events/holi-colour-splash.webp',
    'Friends celebrating Holi, throwing coloured powder and confetti into the air',
    'Photo by Dibakar Roy on Unsplash',
    'https://unsplash.com/photos/bVDOSSL4tms',
    '2026-03-04T10:00:00+05:30', '2026-03-04T14:00:00+05:30',
    'Pune', 'PUN', 'Maharashtra',
    'Green Lawns, Kalyani Nagar',
    'Kalyani Nagar, Pune 411006',
    'https://www.google.com/maps/search/?api=1&query=Kalyani+Nagar+Pune',
    array['Organic colours', 'Live dhol'], '[]', '[]',
    'All ages', 'Hindi & English', 'Whites you can say goodbye to',
    array['Entry', 'Colours', 'Thandai'], array[]::text[], array[]::text[], '[]', '', '', '[]',
    'published', '2026-02-01T10:00:00+05:30'
),
(
    'e0000000-0000-4000-8000-000000000006',
    'clay-and-chai-pune',
    'Clay & Chai Workshop',
    'workshop',
    'Throwback ☕',
    'orange',
    'Our first pottery afternoon — wobbly bowls, great chai, zero regrets.',
    'Thirty first-timers, thirty wobbly bowls and a lot of chai. This is where Pottery & Playlists began.',
    '/images/events/clay-and-chai.webp',
    'Hands shaping a clay pot on a spinning pottery wheel',
    'Photo by Vitaly Gariev on Unsplash',
    'https://unsplash.com/photos/BFBikYWtA9c',
    '2026-09-13T16:00:00+05:30', '2026-09-13T19:00:00+05:30',
    'Pune', 'PUN', 'Maharashtra',
    'Mitti Studio, Baner',
    'Baner Road, near Balewadi Phata, Pune 411045',
    'https://www.google.com/maps/search/?api=1&query=Baner+Pune',
    array['30 first-time potters'], '[]', '[]',
    '14+', 'English & Hindi', 'Muddy-friendly',
    array['Clay, tools and firing'], array[]::text[], array[]::text[], '[]', '', '', '[]',
    'published', '2026-08-10T10:00:00+05:30'
);

insert into public.ticket_types (event_id, name, description, price, quantity, admits, min_per_order, max_per_order, sales_start, sales_end, sort_order) values
    ('e0000000-0000-4000-8000-000000000001', 'Early Bird', 'The cheapest way in. Ends 31 Oct or when they run out.', 399, 60, 1, 1, 6, null, '2026-10-31T23:59:00+05:30', 1),
    ('e0000000-0000-4000-8000-000000000001', 'Phase 1', 'Regular entry once Early Bird closes.', 499, 120, 1, 1, 8, '2026-11-01T00:00:00+05:30', null, 2),
    ('e0000000-0000-4000-8000-000000000001', 'Couple Pass', 'Entry for two. One booking, two QR codes.', 899, 40, 2, 1, 2, null, null, 3),
    ('e0000000-0000-4000-8000-000000000001', 'VIP', 'Fast-lane entry, a reserved lounge spot and two drinks.', 999, 20, 1, 1, 4, null, null, 4),
    ('e0000000-0000-4000-8000-000000000002', 'Solo Pass', 'Entry and a welcome drink.', 499, 80, 1, 1, 6, null, null, 1),
    ('e0000000-0000-4000-8000-000000000002', 'Group of 4', 'Four entries for the price of three and a bit.', 1599, 15, 4, 1, 3, null, null, 2),
    ('e0000000-0000-4000-8000-000000000003', 'Workshop Seat', 'Your own wheel for the whole session.', 599, 40, 1, 1, 4, null, null, 1),
    ('e0000000-0000-4000-8000-000000000003', 'Pair Seat', 'Share a wheel with a friend. Two QR codes.', 1099, 5, 2, 1, 2, null, null, 2),
    ('e0000000-0000-4000-8000-000000000004', 'Entry', '', 449, 200, 1, 1, 6, null, null, 1),
    ('e0000000-0000-4000-8000-000000000005', 'Entry', '', 349, 150, 1, 1, 6, null, null, 1),
    ('e0000000-0000-4000-8000-000000000006', 'Workshop Seat', '', 549, 30, 1, 1, 4, null, null, 1);

insert into public.promo_codes (code, label, event_id, discount_type, discount_value, max_uses, expires_at) values
    ('ECHO10', 'Community code', null, 'percent', 10, null, '2026-12-31T23:59:00+05:30'),
    ('DANCE100', 'Dance night launch', 'e0000000-0000-4000-8000-000000000001', 'fixed', 100, 100, '2026-11-14T18:00:00+05:30'),
    ('RIYA15', 'Influencer: Riya Sharma', null, 'percent', 15, 50, null),
    ('TEAMFREE', 'Team and partners (private)', null, 'percent', 100, 10, null);

insert into public.gallery_photos (event_id, url, alt, sort_order) values
    ('e0000000-0000-4000-8000-000000000004', '/images/events/monsoon-dance-party.webp', 'A packed dance floor under golden party lights', 1),
    ('e0000000-0000-4000-8000-000000000004', '/images/shoutouts/dance-floor.webp', 'Friends dancing together on a crowded floor', 2),
    ('e0000000-0000-4000-8000-000000000004', '/images/shoutouts/auto-ride.webp', 'Auto rickshaws lined up outside after the party', 3),
    ('e0000000-0000-4000-8000-000000000004', '/images/events/bollywood-dance-night.webp', 'Dancers in saris under blue lights', 4),
    ('e0000000-0000-4000-8000-000000000005', '/images/events/holi-colour-splash.webp', 'Friends throwing coloured powder into the air', 1),
    ('e0000000-0000-4000-8000-000000000005', '/images/shoutouts/colour-party.webp', 'A cloud of Holi colours and confetti', 2),
    ('e0000000-0000-4000-8000-000000000005', '/images/events/rooftop-social-mixer.webp', 'Friends cheering with their hands up', 3),
    ('e0000000-0000-4000-8000-000000000006', '/images/events/clay-and-chai.webp', 'Hands shaping clay on a pottery wheel', 1),
    ('e0000000-0000-4000-8000-000000000006', '/images/shoutouts/pottery-wheel.webp', 'A clay pot taking shape on the wheel', 2),
    ('e0000000-0000-4000-8000-000000000006', '/images/events/pottery-and-playlists.webp', 'Clay-shaping tools beside a spinning wheel', 3);

create function pg_temp.seed_booking(
    p_slug text,
    p_items jsonb,
    p_name text,
    p_email text,
    p_phone text,
    p_answers jsonb,
    p_promo text,
    p_source text,
    p_days_ago integer
) returns void
language plpgsql
as $$
declare
    v_event_id uuid;
    v_order public.orders;
begin
    select id into v_event_id from public.events where slug = p_slug;
    select * into v_order from public.reserve_order(
        v_event_id,
        (
            select jsonb_agg(jsonb_build_object('ticket_type_id', tt.id, 'quantity', (i ->> 'quantity')::integer))
            from jsonb_array_elements(p_items) i
            join public.ticket_types tt on tt.event_id = v_event_id and tt.name = i ->> 'name'
        ),
        p_name, p_email, p_phone, p_answers, p_promo, true,
        jsonb_build_object('source', p_source, 'medium', case when p_source = 'direct' then null else 'social' end)
    );
    perform public.confirm_order(v_order.id, 'test', 'seed_' || v_order.id, v_order.total * 100);
    update public.orders
    set created_at = now() - make_interval(days => p_days_ago, hours => 3),
        paid_at = now() - make_interval(days => p_days_ago, hours => 3)
    where id = v_order.id;
end;
$$;

create function pg_temp.seed_past_booking(p_slug text, p_name text, p_email text, p_phone text, p_quantity integer, p_checked_in boolean)
returns void
language plpgsql
as $$
declare
    v_event public.events;
    v_type public.ticket_types;
    v_order_id uuid;
begin
    select * into v_event from public.events where slug = p_slug;
    select * into v_type from public.ticket_types where event_id = v_event.id limit 1;
    insert into public.orders (
        booking_code, event_id, customer_id, name, email, phone, subtotal, discount, total,
        status, payment_provider, provider_payment_id, paid_at, created_at, terms_accepted_at, utm_source
    ) values (
        public.generate_booking_code(v_event.city_code, v_event.starts_at),
        v_event.id,
        public.upsert_customer(p_name, p_email, p_phone, 'Pune', true),
        p_name, p_email, p_phone,
        v_type.price * p_quantity, 0, v_type.price * p_quantity,
        'paid', 'test', 'seed_past_' || gen_random_uuid(),
        v_event.starts_at - interval '6 days', v_event.starts_at - interval '6 days', v_event.starts_at - interval '6 days',
        'instagram'
    ) returning id into v_order_id;
    insert into public.order_items (order_id, ticket_type_id, quantity, unit_price, admits)
    values (v_order_id, v_type.id, p_quantity, v_type.price, 1);
    perform public.issue_tickets(v_order_id);
    if p_checked_in then
        update public.tickets set checked_in_at = v_event.starts_at + interval '40 minutes' where order_id = v_order_id;
    end if;
end;
$$;

select pg_temp.seed_past_booking('monsoon-dance-party-pune', 'Ananya Kulkarni', 'ananya.k@example.com', '9822012345', 2, true);
select pg_temp.seed_past_booking('monsoon-dance-party-pune', 'Rohan Mehta', 'rohan.mehta@example.com', '9881123456', 1, true);
select pg_temp.seed_past_booking('monsoon-dance-party-pune', 'Sneha Patil', 'sneha.patil@example.com', '9923456781', 3, true);
select pg_temp.seed_past_booking('monsoon-dance-party-pune', 'Arjun Nair', 'arjun.nair@example.com', '9765432109', 1, false);
select pg_temp.seed_past_booking('holi-colour-splash-pune', 'Ananya Kulkarni', 'ananya.k@example.com', '9822012345', 1, true);
select pg_temp.seed_past_booking('holi-colour-splash-pune', 'Ishita Joshi', 'ishita.joshi@example.com', '9850011223', 4, true);
select pg_temp.seed_past_booking('clay-and-chai-pune', 'Rohan Mehta', 'rohan.mehta@example.com', '9881123456', 1, true);
select pg_temp.seed_past_booking('clay-and-chai-pune', 'Kavya Iyer', 'kavya.iyer@example.com', '9970012345', 2, true);

select pg_temp.seed_booking('bollywood-dance-night-pune', '[{"name":"Early Bird","quantity":2}]', 'Ananya Kulkarni', 'ananya.k@example.com', '9822012345', '{"age":"24","city":"Kothrud"}', null, 'instagram', 12);
select pg_temp.seed_booking('bollywood-dance-night-pune', '[{"name":"Couple Pass","quantity":1}]', 'Rohan Mehta', 'rohan.mehta@example.com', '9881123456', '{"age":"27"}', 'ECHO10', 'instagram', 10);
select pg_temp.seed_booking('bollywood-dance-night-pune', '[{"name":"VIP","quantity":2}]', 'Priya Shah', 'priya.shah@example.com', '9819988776', '{"age":"29","city":"Baner"}', null, 'google', 9);
select pg_temp.seed_booking('bollywood-dance-night-pune', '[{"name":"Early Bird","quantity":4}]', 'Sneha Patil', 'sneha.patil@example.com', '9923456781', '{"age":"22"}', 'DANCE100', 'whatsapp', 7);
select pg_temp.seed_booking('bollywood-dance-night-pune', '[{"name":"Early Bird","quantity":1}]', 'Vikram Rao', 'vikram.rao@example.com', '9890123456', '{"age":"31"}', 'RIYA15', 'influencer', 5);
select pg_temp.seed_booking('bollywood-dance-night-pune', '[{"name":"Early Bird","quantity":3}]', 'Neha Gupta', 'neha.gupta@example.com', '9860098765', '{"age":"25","city":"Viman Nagar"}', null, 'instagram', 3);
select pg_temp.seed_booking('bollywood-dance-night-pune', '[{"name":"Couple Pass","quantity":1}]', 'Aditya Kulkarni', 'aditya.k@example.com', '9822098765', '{"age":"28"}', null, 'direct', 1);
select pg_temp.seed_booking('rooftop-social-mixer-mumbai', '[{"name":"Solo Pass","quantity":1}]', 'Meera Pillai', 'meera.pillai@example.com', '9833012345', '{"organisation":"TISS"}', null, 'instagram', 11);
select pg_temp.seed_booking('rooftop-social-mixer-mumbai', '[{"name":"Group of 4","quantity":1}]', 'Karan Malhotra', 'karan.m@example.com', '9920012345', '{}', 'ECHO10', 'whatsapp', 8);
select pg_temp.seed_booking('rooftop-social-mixer-mumbai', '[{"name":"Solo Pass","quantity":2}]', 'Ishita Joshi', 'ishita.joshi@example.com', '9850011223', '{"organisation":"Infosys"}', null, 'google', 6);
select pg_temp.seed_booking('rooftop-social-mixer-mumbai', '[{"name":"Solo Pass","quantity":1}]', 'Zara Khan', 'zara.khan@example.com', '9821123456', '{}', 'RIYA15', 'influencer', 2);
select pg_temp.seed_booking('pottery-and-playlists-pune', '[{"name":"Workshop Seat","quantity":2}]', 'Kavya Iyer', 'kavya.iyer@example.com', '9970012345', '{"experience":"A little","food":"Veg"}', null, 'instagram', 9);
select pg_temp.seed_booking('pottery-and-playlists-pune', '[{"name":"Pair Seat","quantity":1}]', 'Tanvi Deshmukh', 'tanvi.d@example.com', '9881012345', '{"experience":"Never"}', null, 'google', 4);
select pg_temp.seed_booking('pottery-and-playlists-pune', '[{"name":"Workshop Seat","quantity":1}]', 'Rohan Mehta', 'rohan.mehta@example.com', '9881123456', '{"experience":"A little","food":"Jain"}', 'ECHO10', 'whatsapp', 2);
select pg_temp.seed_booking('pottery-and-playlists-pune', '[{"name":"Workshop Seat","quantity":1}]', 'Sameer Kulkarni', 'sameer.k@example.com', '9822033445', '{"experience":"Never"}', null, 'direct', 0);

insert into public.page_visits (event_id, path, visitor_id, utm_source, created_at)
select
    e.id,
    '/events/' || e.slug,
    'seed-visitor-' || (random() * 400)::integer,
    (array['instagram', 'instagram', 'google', 'whatsapp', 'influencer', null])[1 + floor(random() * 6)::integer],
    now() - make_interval(days => floor(random() * 14)::integer, hours => floor(random() * 24)::integer)
from public.events e
cross join generate_series(1, 120)
where e.starts_at > now();
