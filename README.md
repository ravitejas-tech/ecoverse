# Echoverse Hub

The official website, ticketing platform and admin panel for Echoverse Hub events.

| App | Folder | Local address |
|---|---|---|
| Website: events, booking, QR tickets, My Tickets | `app/` | http://localhost:7300 |
| Admin panel: dashboard, events, orders, refunds, gate scanner | `admin/` | http://localhost:7301 |
| Backend: Supabase in Docker | `supabase/` | Studio http://127.0.0.1:54323 |

## Run it locally

You need Node 22.22+, Yarn (bundled in the repo) and Docker Desktop (running).

```bash
yarn install
cp .env.example .env
cp admin/.env.example admin/.env
cp supabase/functions/.env.example supabase/functions/.env

yarn db:start      # first run downloads the Supabase images
yarn dev           # website
yarn dev:admin     # admin panel (second terminal)
```

- **Emails:** every email (login codes, tickets, refunds, staff invites) is caught by the local inbox at http://127.0.0.1:54324. Nothing is really sent.
- **Payments:** in test mode. Checkout shows a "Test checkout" sheet instead of Razorpay.
- **Venue map:** the event form's map (OpenStreetMap) and place search (Photon) need no keys. Drop a pin, and Directions on the website open Google Maps to that exact spot.
- **Admin sign-in:** password `Echoverse@2026`, with one account per role:

| Email | Role |
|---|---|
| admin@echoversehub.com | Super Admin |
| events@echoversehub.com | Event Manager |
| finance@echoversehub.com | Finance |
| marketing@echoversehub.com | Marketing |
| gate@echoversehub.com | Gate Staff |
| viewer@echoversehub.com | Viewer |

- **Sample data:** run `yarn db:reset` any time to go back to it.
- **Promo codes:** `ECHO10` (10% off), `DANCE100` (₹100 off the dance night), `TEAMFREE` (free).

## Docs

- [What we built and why](docs/build-plan.md), from [the PRD](docs/Echoverse_Hub_Website_Ticketing_Platform_PRD.md)
- [Going live](docs/deployment.md)
- Rules for changing the code: [docs/rulebooks/](docs/rulebooks/) and [CLAUDE.md](CLAUDE.md)
