# Backend Rules

Supabase: Postgres (tables, row-level security, SQL functions), Auth, Storage and Edge Functions. Applies to `supabase/`.

## Generate, don't hand-write

Every scaffold comes from the CLI. Write only the SQL or TypeScript inside it.

| Need | Command |
|---|---|
| A schema change | `yarn supabase migration new <snake_name> < /dev/null` |
| A new edge function | `yarn supabase functions new <kebab-name>` |
| Types for the apps | `yarn db:types` (writes `app/types/database.ts` and `admin/app/types/database.ts`) |

`migration new` reads SQL from stdin when stdin isn't a terminal. Without `< /dev/null`, a piped or backgrounded run waits forever and leaves an empty file.

## Migrations

- **Never edit a migration that has been applied.** Add a new one. Use `create or replace function` to change a function.
- Apply locally with `yarn supabase migration up` (keeps data) or `yarn db:reset` (rebuilds and re-seeds).
- **Run `yarn db:types` after every schema change.** Both apps type-check against the generated file. Never hand-write a row interface.
- `supabase/seed.sql` is local sample data only: events, staff accounts and orders. It never runs in production.

## Access rules

- **Row-level security is on for every table.** Policies are named in plain words ("Buyers see their own bookings").
- **Money and tickets change only through SQL functions.** `orders`, `order_items`, `tickets`, `customers` and `check_ins` have no direct write grant. Staff may update `orders.notes` and nothing else.
- Functions are `security definer` with `set search_path = ''` and schema-qualified names.
- **An internal function has its `execute` revoked from `public, anon, authenticated`.** Grant it to `service_role` only when an edge function calls it. Supabase grants `execute` to `anon` and `authenticated` by default, so `revoke … from public` alone is not enough.
- Staff checks go through `has_staff_role(...)`. The role list for each action is mirrored in `PERMISSIONS` (`admin/app/data/staff/roles.ts`), so the admin hides what the database would refuse.

## Booking invariants

These are what keep ticketing correct. Changes must preserve them.

| Invariant | Where |
|---|---|
| Seats are counted from paid orders plus unexpired holds, with the ticket type locked (`for update`), so stock never oversells | `reserve_order`, `ticket_type_remaining` |
| Holds last 15 minutes. One email can keep at most 3 unpaid holds open | `reserve_order`, `assert_hold_allowed` |
| A payment counts only after the server verifies it with Razorpay (signature or webhook). The browser's word is never enough | `verify-payment`, `razorpay-webhook` |
| Confirming the same order twice is a no-op | `confirm_order` |
| A late payment for a hold that has since sold out is flagged `needs_refund`. Seats are never oversold to honour it | `confirm_order` |
| A QR code holds only `ECHOVERSE:<random token>`. The gate looks the token up on the server | `tickets.qr_token`, `check_in` |
| A ticket checks in once. Only a super admin or event manager can let someone in again, and that is logged | `check_in` |
| Stale holds are expired every 5 minutes | `pg_cron` job `expire-stale-orders` |

## Errors

SQL raises snake_case codes (`sold_out`, `promo_invalid`, …). Edge functions pass a code through only if it is listed in `KNOWN_ERRORS` (`supabase/functions/_shared/responses.ts`); anything else becomes `unknown`. Each app maps codes to friendly copy in its `data/` folder.

## Edge functions

- Callers are declared through `withSupabase({ auth })`: `['user', 'publishable']` for checkout calls, `'user'` for staff or buyer actions (role checked with `requireStaffRole`), `'none'` for the Razorpay webhook (it verifies its own signature). Each one has `verify_jwt = false` in `config.toml`.
- Shared code lives in `supabase/functions/_shared/`.
- Secrets live in `supabase/functions/.env` (gitignored; copy `.env.example`). Production secrets are set with `supabase secrets set`.
- `PAYMENT_PROVIDER=test` swaps Razorpay for an in-page test payment that confirms bookings without money. The client demo runs live with it. Real sales need `razorpay` plus the keys ([deployment.md](../deployment.md), step 8). Unset means Razorpay.
- Email goes to Mailpit locally (`EMAIL_PROVIDER=mailpit`, viewable at http://127.0.0.1:54324) and through Resend in production.
