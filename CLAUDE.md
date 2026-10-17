# echoverse

The official website, first-party ticketing platform and admin panel for Echoverse Hub events: dance nights, social mixers, workshops and trips. It is not a marketplace. It covers only Echoverse events, one brand and one community. The product brief is [the PRD](docs/Echoverse_Hub_Website_Ticketing_Platform_PRD.md). What was built against it is in [the build plan](docs/build-plan.md).

Three pieces share one Supabase backend:

| Piece | Where | Local URL |
|---|---|---|
| Website (discovery, event pages, checkout, QR tickets, My Tickets) | `app/` (root workspace) | http://localhost:7300 |
| Admin panel (dashboard, events, tickets, orders, refunds, community, promo codes, gate scanner, team) | `admin/` (workspace `echoverse-admin`) | http://localhost:7301 |
| Backend (Postgres, RLS, SQL functions, Auth, Storage, Edge Functions) | `supabase/` | API :54321 · Studio :54323 · Mailpit :54324 |

## Rulebooks

Read the one that covers what you are touching. Do not read them all.

| Editing | Read |
|---|---|
| Anything | [global.md](docs/rulebooks/global.md): naming, no-comments, imports, file structure |
| `app/` (website) | [frontend.md](docs/rulebooks/frontend.md) |
| `admin/` | [admin.md](docs/rulebooks/admin.md), which builds on frontend.md |
| `supabase/` (schema, RLS, SQL and edge functions) | [backend.md](docs/rulebooks/backend.md) |
| Committing, branching or releasing | [git.md](docs/rulebooks/git.md) |

`global.md` is short and always applies. The others are read on demand.

## The rules that bite most often

- **Never hand-write boilerplate.** Scaffold with the official tool and edit what it produces:
  - apps: `yarn create react-router`
  - Supabase stubs: `yarn supabase migration new <name> < /dev/null`, `yarn supabase functions new <name>`
  - dependencies: `yarn add` / `yarn workspace echoverse-admin add`
- **`yarn ts:check` must pass** in both apps. It runs in `yarn build`. Fix the type, don't silence it.
- **kebab-case filenames**, everywhere, no exceptions.
- **No explanatory comments or JSDoc.** Only `TODO`/`FIXME`/`HACK` and tooling directives.
- **Never commit without explicit per-batch approval.** Prior approval never carries forward.
- **One file per commit.** No `Co-Authored-By` or any AI attribution.
- **Every piece of text renders through `Text`**, and matching class strings are one component (`PopCard`, `Sticker`, `Chip`, `FramedPhoto`, …).
- **Theme tokens only.** No stock Tailwind palette class, no hex, no `dark:` variant, no arbitrary values like `w-[13px]` or `grid-cols-[1fr_auto]`. Text on a pop fill uses `tone='on-pop'`.
- **All copy lives in `data/`**, never in JSX.
- **The backend is reached only through `services/`.** Never call Supabase directly from components or hooks.
- **Never change a database migration that has already been applied.** Add a new one, then run `yarn db:types`.
- **Every looping animation respects reduced motion** (`motion-safe:` / `motion-reduce:`).
- **No horizontal scroll at 375px, and no section that becomes a wall of stacked cards on phones.** Use `SwipeGrid`. Check light, dark and mobile before handing UI over.
- **Confetti plays once on page open**, never in a loop.
- **Nothing is prerendered invisible.** No JS-driven `opacity: 0` entrances; `Reveal` is CSS. Main content (directory results) doesn't fade in at all.
- **Run Lighthouse after website UI changes**, on a production build served with the SPA fallback, mobile and desktop. Targets: SEO, A11y and Best Practices at 100; mobile Performance 90+. Event detail pages currently reach 88–89.

## Stack

| Layer | Choice |
|---|---|
| Package manager | Yarn 4 workspaces (root = website, `admin/`), `node-modules` linker, `yarnPath` in `.yarn/releases` |
| Runtime | Node ≥ 22.22 (React Router 8 minimum) |
| Web | React 19 + React Router 8 (SPA, `ssr: false`; public pages and every published event prerendered) + Vite 8 (Rolldown) + Tailwind 4 |
| Admin | Same stack, pure SPA (no prerender), same theme tokens in a calmer form |
| Backend | Supabase in Docker via the `supabase` dev dependency (`yarn supabase …`): Postgres + RLS + SQL functions, Auth (email OTP for buyers, password for staff), Storage (`event-media`), Edge Functions (Deno, `@supabase/server` `withSupabase`) |
| Server state | `@tanstack/react-query` via `react-query-kit` (website: booking pages only, through `QueryProvider`) |
| Forms | `react-hook-form` + `zod` (`@hookform/resolvers/zod`) |
| Payments | Razorpay (Orders API + Checkout + webhook); `PAYMENT_PROVIDER=test` (simulated) locally and on the client demo |
| Email | Mailpit locally (HTTP send API), Resend in production |
| QR | `qrcode` (render, emails), `qr-scanner` (admin camera) |
| Maps | Admin venue picker: `leaflet` with OpenStreetMap tiles, place search through Photon (`photon.komoot.io`). No keys. Website and emails only build Google Maps directions URLs |
| Variants | `class-variance-authority` + `tailwind-merge` (`cn` in `~/lib/utils`) |
| Motion | CSS only; `canvas-confetti` (`celebrate`) loaded on demand |
| Fonts | Self-hosted `@fontsource-variable/*`, Latin files preloaded |
| SEO | `~/lib/seo/` builders (meta, JSON-LD, sitemap, robots, manifest), `SITE` in `~/data/seo/site` |
| Icons | `lucide-react` |
| TypeScript | 6.0 (`typescript-eslint` does not support 7 yet) |

## Layout

```
app/                 website
  routes/            layout, index, events/{index,$slug,$slug.book}, tickets.$token, my-tickets,
                     past-events, about, faqs, contact, terms, privacy, refund-policy, SEO files
  components/        ui/ primitives, layout/, landing/, events/, content/, checkout/, tickets/, account/
  data/ hooks/ lib/ schemas/ services/ types/   (types/database.ts is generated)
admin/app/           admin panel: same folder shape, plus routes for events/$id/*, orders, community, check-in, team, gallery, activity
supabase/
  migrations/        schema, RLS, booking + operations SQL functions, activity triggers, storage, cron
  functions/         create-order, verify-payment, razorpay-webhook, send-tickets, refund-order, invite-staff, _shared/
  templates/         auth emails (login code, invite, recovery)
  seed.sql           local sample data (events, staff, orders)
docs/                PRD, build plan, deployment checklist, rulebooks
```

## Commands

```bash
yarn db:start         # Supabase in Docker (Docker Desktop must be running)
yarn db:reset         # rebuild the local database from migrations + seed
yarn db:types         # regenerate app/types/database.ts and admin/app/types/database.ts
yarn dev              # website  → http://localhost:7300 (needs Supabase: event pages are listed from it)
yarn dev:admin        # admin    → http://localhost:7301
yarn build            # website: ts:check, then build/client (prerendered + __spa-fallback.html)
cd admin && yarn build
yarn ts:check / yarn lint / yarn format          # website (same scripts inside admin/)
```

Local env: copy `.env.example` → `.env`, `admin/.env.example` → `admin/.env`, `supabase/functions/.env.example` → `supabase/functions/.env`.

**Local staff accounts** (seed; password `Echoverse@2026`): `admin@`, `events@`, `finance@`, `marketing@`, `gate@`, `viewer@` `echoversehub.com`. They map to Super Admin, Event Manager, Finance, Marketing, Gate Staff and Viewer. Every email (login codes, tickets, refunds, invites) lands in Mailpit at http://127.0.0.1:54324.

## Gotchas

- **React Router 8 needs Node ≥ 22.22 and Vite 7+.** `future.v8_*` flags no longer exist; `splitRouteModules` is on by default.
- **Path aliases come from Vite itself** (`resolve.tsconfigPaths: true`), not `vite-tsconfig-paths`. TS 6 deprecates `baseUrl`, so `paths` is relative to `tsconfig.json`.
- **Prerendered website pages run in Node.** Nothing they import may touch `window`, `document` or `localStorage` at module scope.
- **Every public data route has a `loader` (build time) and a `clientLoader` (browser).** Both call one function that does `await import('~/services/event-catalog')`.
  - Never import a service statically in a public route. Because `supabase.ts` creates its client when imported, the bare import survives the loader being stripped, and that drags Supabase (54 KB) and zod onto every page.
- **Chunking is tuned in `vite.config.ts` (`codeSplitting.groups`).** It puts React, the router, icons and small shared app modules into a few chunks. On a slow phone network, 50 tiny chunks cost far more than their bytes.
  - Booking-only modules must stay out of the `shared` group: `LAZY_ONLY_MODULES` (QR, checkout libs, query client, toaster).
  - A new heavy module used by only some pages belongs on that list.
- **React Query and the toaster are not global.** Booking pages wrap themselves in `QueryProvider`. The root mounts `Toaster` lazily after hydration.
- **Builds need Supabase.** `react-router.config.ts` lists published events from Supabase to prerender `/events/<slug>`. If Supabase is down, the build (and `yarn dev` start) fails with a clear message.
  - Events published after a build still open through the SPA fallback (`clientLoader` + `HydrateFallback`). In production a database webhook should trigger a rebuild (see [deployment.md](docs/deployment.md)).
- **`app/routes.ts` and `react-router.config.ts` cannot use the `~/` alias.** They load before Vite's resolver, so import with a relative path.
- **The dev servers are pinned (`strictPort`):** website 7300, admin 7301. Not 7000: macOS's AirPlay Receiver listens there.
- **The production domain is `https://echoversehub.com`**, set once in `SITE.url`. Canonical, Open Graph, JSON-LD, sitemap, robots and ticket-email links derive from it (functions use `SITE_URL`).
- **Booking runs on the platform now.** Book Now goes from the event page to `/events/:slug/book`, Explore Events goes to `/events`, and WhatsApp (+91 84848 30110, `WHATSAPP` in `app/data/contact.ts`) is only "Ask us". Links open in a new tab with `noopener noreferrer`.
- **Payments are confirmed only on the server.** The `verify-payment` signature check and the `razorpay-webhook` both call the idempotent `confirm_order`.
  - `PAYMENT_PROVIDER=test` shows an in-page "Test checkout" sheet instead of Razorpay, and every booking gets real, scannable tickets without payment.
  - It is on locally, and on the first live deployment too, so the client can try the whole journey before Razorpay keys exist.
  - Switch to `razorpay` before any real sales ([deployment.md](docs/deployment.md), step 8).
- **A venue is pinned on a map in the admin.** The pin is stored as `venue_lat` and `venue_lng`.
  - Picking a venue result (Photon `type: house`) fills the name and address and drops the pin. Picking an area only moves the map and asks for a tap, so an area's centre never becomes the pin.
  - Directions open `google.com/maps/dir/?api=1&destination=<lat,lng>`. Unpinned events fall back to `map_url` (old pasted links), then to the venue name and address.
  - That logic exists twice, in `app/lib/events.ts` (`directionsUrl`) and `supabase/functions/_shared/directions.ts` (ticket email). Change both together.
  - Leaflet touches `window` when imported, so it is loaded with a dynamic `import()` inside the map hook. Never import it statically, or the admin build's prerender breaks.
- **A QR code holds `ECHOVERSE:<qr_token>` and nothing else.** The gate's `check_in` looks the token up. A ticket code (`ECH-PUN-261114-A82F4-2`) or booking ID can be typed instead.
  - The QR stays dark-on-yellow in both themes.
- **Seat holds last 15 minutes. One email can hold at most 3 unpaid bookings.** A `pg_cron` job expires stale holds every 5 minutes.
- **Admin date and time fields are India time** (`admin/app/lib/date-input.ts`), whatever the browser's zone.
  - Event questions use `id = kind` for preset questions and `custom-xxxxxxxx` for custom ones. The website checkout reads that shape exactly.
- **Edge function errors are snake_case codes** listed in `supabase/functions/_shared/responses.ts`. Each app maps them to copy (`app/data/checkout/errors.ts`, `admin/app/data/ui/function-errors.ts`).
- **Unknown paths must fall back to `/__spa-fallback.html`** on the website's static host, and to `index.html` for the admin.
- **`@react-router/node` and `isbot` are runtime dependencies** even though nothing runs on a server: React Router needs them to prerender.
- **ESLint stays on 9** until `eslint-plugin-react` supports 10. One root `eslint.config.js` and `.prettierrc` serve both workspaces.
- **Light and dark come from one token set** in each app's `global.css`, switched by `data-theme` on `<html>` (set before paint by `THEME_INIT_SCRIPT`). Dark mode's hard shadow is pink, not ink.
- **An unknown Tailwind colour class fails silently** and borders fall back to `currentColor`. Grep for old token names after renaming one.
- **Tilted cards overflow narrow screens.** `Section` and the public layout carry `overflow-x-clip`, not `overflow-hidden`, which would break the sticky navbar and anchor scrolling. Grid and flex children holding truncated text need `min-w-0`.
- **Event dates format in `Asia/Kolkata`** so prerendered HTML and the browser agree.
- **The logo comes from `docs/brand/echoverse-hub-logo-source.jpg`** (navy wordmark on black).
  - `public/brand/` holds cut-out light and dark-mode versions (dark recolours the navy lettering to cream): compact for the navbar, full with the tagline for the footer. The admin uses copies in `admin/public/brand/`.
  - `Logo` swaps them through the `--brand-logo` tokens.
  - The favicon and app icons in `public/icons/` are the orange O-and-leaves mark. The share image (`public/og/echoverse-hub.png`, 1200×630) uses the full logo.
  - All of these are rendered once from the source; regenerate them if the logo changes.
- **Photos are Unsplash stock** (Unsplash License, free for commercial use, never Unsplash+). They are self-hosted as WebP:
  - `public/images/events/`: 960×540 plus -480/-720 versions
  - `public/images/shoutouts/`: 720×720 plus -360/-480 versions

  Each photo's photographer and source live next to it (`supabase/seed.sql`, `app/data/landing/shoutouts.ts`). Never pull images from Pinterest or Google Images. Photos uploaded in the admin are resized to WebP in the browser and stored in the `event-media` bucket; they get no srcset.
- **Event content is placeholder sample data** in `supabase/seed.sql`: events, venues, prices, hosts and orders. Before launch it must be real, and the legal pages need a lawyer's review.
  - The contact email and Instagram handle in `app/data/contact.ts` are placeholders too.
  - [deployment.md](docs/deployment.md) has the go-live checklist.
- **`supabase migration new` reads SQL from stdin when stdin isn't a terminal.** Redirect from `/dev/null` or it hangs and leaves an empty file.
