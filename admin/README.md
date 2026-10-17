# Echoverse Admin

The team's admin panel: dashboard, events, tickets, orders, refunds, promo codes, gate check-in, team and activity log. It is a static React Router SPA (`ssr: false`) that talks to the same Supabase backend as the website.

```bash
yarn dev:admin            # from the repo root → http://localhost:7301
cd admin && yarn build    # static build in admin/build/client
```

Copy `.env.example` to `.env`. Local staff accounts are listed in the root `CLAUDE.md`. Rules: `docs/rulebooks/admin.md`.
