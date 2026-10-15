# echoverse

The official website and, in time, the first-party ticketing platform for Echoverse Hub events — dance nights, social mixers, workshops, trips. It is not a marketplace: only Echoverse events, one brand, one community. The product brief is [the PRD](docs/Echoverse_Hub_Website_Ticketing_Platform_PRD.md).

Today the repo is a static React Router SPA with one prerendered landing page. There is no backend yet; ticketing, payments, QR check-in and the admin dashboard are PRD scope still to come.

## Rulebooks

Read the one that covers what you are touching. Do not read them all.

| Editing | Read |
|---|---|
| Anything | [global.md](docs/rulebooks/global.md) — naming, no-comments, imports, file structure |
| `app/` | [frontend.md](docs/rulebooks/frontend.md) |
| Committing, branching or releasing | [git.md](docs/rulebooks/git.md) |

`global.md` is short and always applies. The others are read on demand.

## The rules that bite most often

- **`yarn ts:check` must pass** — it runs in `yarn build`. Fix the type, don't silence it.
- **kebab-case filenames**, everywhere, no exceptions.
- **No explanatory comments or JSDoc.** Only `TODO`/`FIXME`/`HACK` and tooling directives.
- **Never commit without explicit per-batch approval.** Prior approval never carries forward.
- **One file per commit.** No `Co-Authored-By` or any AI attribution.
- **Every piece of text renders through `Text`**, and matching class strings are one component (`PopCard`, `Sticker`, `Chip`, `FramedPhoto`, …).
- **Theme tokens only** — no stock Tailwind palette class, no hex, no `dark:` variant. Text on a pop fill is `tone='on-pop'`.
- **All copy lives in `app/data/`**, never in JSX.
- **Every looping animation respects reduced motion** (`motion-safe:` / `motion-reduce:`).
- **No horizontal scroll at 375px, and no section that becomes a wall of stacked cards on phones** — use `SwipeGrid`. Check light, dark and mobile before handing UI over.
- **Confetti plays once on page open**, never in a loop.
- **Nothing is prerendered invisible.** No JS-driven `opacity: 0` entrances; `Reveal` is CSS. Run Lighthouse (mobile + desktop) after UI changes — SEO/A11y/Best Practices 100, mobile Performance 90+.

## Stack

| Layer | Choice |
|---|---|
| Package manager | Yarn 4 (`node-modules` linker, `yarnPath` in `.yarn/releases`) |
| Runtime | Node ≥ 22.22 (React Router 8 minimum) |
| Web | React 19 + React Router 8 (SPA, `ssr: false`, `/` prerendered) + Vite 8 + Tailwind 4 |
| Variants | `class-variance-authority` + `tailwind-merge` (`cn` in `~/lib/utils`) |
| Motion | CSS only — keyframes and the scroll-driven `animate-reveal` in `global.css`; `canvas-confetti` (`celebrate`) |
| Fonts | Self-hosted `@fontsource-variable/*`, Latin files preloaded |
| SEO | `~/lib/seo/` builders (meta, JSON-LD, sitemap, robots, manifest), `SITE` in `~/data/seo/site` |
| Icons | `lucide-react` |
| TypeScript | 6.0 (`typescript-eslint` does not support 7 yet) |

## Layout

```
app/
  root.tsx, routes.ts, global.css
  routes/        layout.tsx (navbar + footer), index.tsx (landing)
  components/    ui/ primitives, layout/, landing/<section>/
  data/          brand, navigation, seo/, ui/ (token maps, media, confetti), landing/ (all copy)
  hooks/ lib/ types/
docs/
  rulebooks/     the rules
  Echoverse_Hub_Website_Ticketing_Platform_PRD.md
```

## Commands

```bash
yarn dev          # http://localhost:7300
yarn build        # ts:check, then build/client (static, / prerendered)
yarn preview      # serve build/client
yarn ts:check     # typegen + tsc
yarn lint
yarn format
```

## Gotchas

- **React Router 8 needs Node ≥ 22.22 and Vite 7+.** `future.v8_*` flags no longer exist; `splitRouteModules` is on by default.
- **Path aliases come from Vite itself** (`resolve.tsconfigPaths: true`), not `vite-tsconfig-paths`. TS 6 deprecates `baseUrl`, so `paths` is relative to `tsconfig.json`.
- **`/` is prerendered in Node.** Nothing it imports may touch `window`, `document` or `localStorage` at module scope. That is why `canvas-confetti` is dynamically imported inside `celebrate`.
- **The dev server is pinned to port 7300 (`strictPort`)** — if it is taken, `yarn dev` fails instead of silently moving. Not 7000: macOS's AirPlay Receiver listens there.
- **`app/routes.ts` and `react-router.config.ts` cannot use the `~/` alias** — they load before Vite's resolver. Import with a relative path (`./data/seo/routes`).
- **The production domain is `https://echoversehub.com`** (from the PRD), set once in `SITE.url`. Canonical, Open Graph, JSON-LD, sitemap and robots all derive from it — change it there if the domain changes.
- **The logo comes from `docs/brand/echoverse-hub-logo-source.jpg`** (navy wordmark on black). `public/brand/` holds the cut-out light and dark-mode versions (dark recolours the navy lettering to cream), compact for the navbar and full with the tagline for the footer. `Logo` swaps them through the `--brand-logo` tokens, so it follows the theme like every other token. The favicon and app icons in `public/icons/` are the orange O-and-leaves mark; the share image (`public/og/echoverse-hub.png`, 1200×630) uses the full logo. All of these are rendered once from the source — regenerate them if the logo changes.
- **Event Schema.org data is placeholder too.** The three events emit real `Event` rich-result markup; before launch they must be real events with real venues, and each `offers.url` should point at its event page once one exists.
- **Booking runs through WhatsApp for now.** Every `Explore Events` and `Book Now` is a `WhatsAppLink` to +91 84848 30110 (`WHATSAPP` in `app/data/contact.ts`) with a pre-filled message from `WHATSAPP_MESSAGES`; Book Now names the event, date, time, city and price. Links open in a new tab with `noopener noreferrer`. When the ticketing engine ships, these become links to event and checkout pages.
- **Unknown paths must fall back to `/__spa-fallback.html`** on the static host.
- **`@react-router/node` and `isbot` are runtime dependencies** even though nothing runs on a server: React Router needs them to prerender.
- **ESLint stays on 9** until `eslint-plugin-react` supports 10.
- **Light and dark come from one token set** in `app/global.css`, switched by `data-theme` on `<html>` (set before paint by `THEME_INIT_SCRIPT`). Dark mode's hard shadow is pink, not ink.
- **An unknown Tailwind colour class fails silently** and borders fall back to `currentColor` — grep for old token names after renaming one.
- **Tilted cards overflow narrow screens.** `Section` and the public layout carry `overflow-x-clip` (not `overflow-hidden`, which would break the sticky navbar and anchor scrolling).
- **Event dates format in `Asia/Kolkata`** so prerendered HTML and the browser agree.
- **Event and shoutout photos are Unsplash stock** (Unsplash License, free for commercial use — never Unsplash+), self-hosted as WebP in `public/images/events/` (960×540) and `public/images/shoutouts/` (720×720), sizes from `PHOTO_SHAPES`. Each one's photographer and source page live next to it in `app/data/landing/`. Never pull images from Pinterest or Google Images — they are not licensed for reuse. Swap in real Echoverse event photos before launch.
- **The landing content is placeholder.** Events, prices, the sample ticket and the shoutouts in `app/data/landing/` are illustrative; `Book Now` opens WhatsApp with a pre-filled booking message for that event (and fires confetti).
