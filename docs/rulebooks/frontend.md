# Frontend Rules

React 19 + React Router 8 (SPA mode, `/` and the SEO files prerendered) + TypeScript + Tailwind 4. Applies to `app/`.

## Reusability

Repeated code is a defect, not a style preference.

- **Search before writing.** Grep existing hooks/components/services for what you need. A second implementation of something that exists is the most expensive mistake here.
- **Second occurrence = extract.** Write it inline once. The second time, extract to a shared component/hook/constant and update the first caller. Never a third copy.
- **Extend, don't clone.** Needing a variant means adding a prop, not copying the file.
- **Repeated JSX is data.** Blocks differing only in text/icon/link move to an array in `app/data/` and `.map()` over one component.
- **Repeated stateful logic → hook** in `app/hooks/`.
- **Repeated pure logic → util.** One function, one place.
- **Constants declared once.** Any string, URL, key, or option list used twice gets imported, not retyped.
- **Types are composed.** Use `Pick`, `Omit`, `Partial`, `z.infer` and the generated `Tables<>` — never hand-write a second interface with the same fields.
- **Repeated Tailwind strings** mean a missing UI primitive or variant. See below.
- **Delete what you replaced.** An extraction leaving old copies behind made things worse.

**Exception:** two things that merely look alike but answer different requirements are not duplication. Reuse identical *functionality*, not coincidental resemblance.

### Matching classes are one component (non-negotiable)

**When two or more elements carry the same classes — or most of the same classes — they are one component, and both must use it.** Not the third time; the second. A near match counts: a class string that differs by a margin, a weight or one colour is the same thing drawn twice, and the difference becomes a prop or a variant.

Before writing a `className` with more than a couple of visual classes, search for it. The usual finding is that the component already exists and was bypassed.

- **What counts is visual identity:** surface (background, border, radius, padding, shadow), typography (family, size, weight, colour, tracking, case) and shape. A match on those is a component.
- **Layout glue alone does not.** `flex items-center justify-between gap-4` or a `grid-cols-*` on its own is how Tailwind is written, not a hidden component.
- **Text is a component, never a class string.** Every piece of text — `p`, `span`, `h1`–`h4`, `li`, `label` — renders through `Text` (`~/components/ui/text`) with a named `variant` and, when needed, a `tone`. Size, weight, family, colour, tracking and case live in the variant; `className` carries only layout (margin, width, visibility, alignment).
- **A variant missing is a variant added,** to `Text` or the primitive, not a class string at the call site.
- **A shared component may take `className` for placement** (margin, grid span), never to restyle what makes it that component. A new look is a variant.

**Check it with a scan, not by eye.** Before handing over UI work, compare class strings — identical strings and any two sharing three-quarters of their classes, including two in the same file — and compare JSX *structure*: the same tree of elements and classes appearing twice (a sticker + title + scrawl heading, an emoji chip + title + body) is one component even when no single class string repeats.

### One pattern, one look (non-negotiable)

**A pattern the app already has is built the way the app already builds it.** Before adding a section, a card or a heading, open two existing ones and match them.

- **Every landing section is a `Section`** (`~/components/ui/section`) with an `id` from `SECTION_IDS` and a `SectionHeading` (sticker eyebrow, title, optional marker scrawl).
- **Cards are `PopCard`**, labels-on-a-pill are `Sticker`, emoji tiles are `EmojiChip`, ticket tear lines are `Perforation`. Never redraw one with raw classes.
- **Entrance animation is `Reveal`**, with `order` for stagger. It is pure CSS — never add a JS animation library for entrances.
- **A button that celebrates is `CelebrateButton`** — it fires theme-coloured confetti from its own position.
- **Anything that contacts the team is a `WhatsAppLink`** (usually inside `Button asChild`), never a hand-built `wa.me` URL. Messages live in `WHATSAPP_MESSAGES`; event-specific ones are built with `eventBookingMessage`.
- **A row of cards that would stack into a tall column on phones is a `SwipeGrid`** — a snap carousel below `sm`, a grid above. Short tiles stay a two-column grid instead (`grid-cols-2`).
- **When a screen pattern appears for the first time** (page header, empty state, form), build it as a primitive and record it here.

## Imports

**Import the names you use, never the namespace.** `import { useState, useCallback } from 'react'`, not `import * as React from 'react'`. Types come through the same import with the `type` keyword: `import { useState, type ReactNode } from 'react'`.

**Always the `~/*` alias, never a relative path** (`~/components/ui/button`, not `../../components/ui/button`). ESLint enforces both.

## Files and components

- **One component per file**, named after the file (`event-card.tsx` exports `EventCard`). Two components in a file fails review at any size.
- **150-line cap.** Past that, split into focused components — one file = one visual/behavioural responsibility.
- **Extract when it is a component**, not in anticipation. A panel, list item, control, or form is its own file from the moment it exists.
- **Feature components** in `components/<feature>/`. Shared primitives in `components/ui/`. The moment a feature component is used by a second feature, it moves to `ui/` — it does not get copied.
- **Split a feature folder past eight files** into subfolders by the page area the component serves, and drop the prefix the folder already states (`landing/events/section.tsx`, not `landing/events/events-section.tsx`). The exported component name keeps its full name.

## Routes

`app/routes` mirrors the URL. A reader who knows the URL must be able to name the file, and a reader who sees the file must be able to name the URL.

- **A folder only exists to hold more than one thing.** A route with a single file is that file.
- **`$` marks a dynamic segment** and **a dot is the URL's slash**, as in React Router's file conventions.
- **Layouts are `layout.tsx`, section landings are `index.tsx`,** at the folder they apply to. `route.tsx` names nothing — never use it.

| URL | File |
|---|---|
| public pages (navbar + footer) | `routes/layout.tsx` |
| `/` | `routes/index.tsx` |
| `/events` (future) | `routes/events/index.tsx` |
| `/events/:slug` (future) | `routes/events/$slug.tsx` |
| `/admin` layout (future) | `routes/admin/layout.tsx` |

**Routes are assembled explicitly in `app/routes.ts`.** A file's name has no effect on the URL it serves, so the convention is a discipline: rename the file and its `routes.ts` entry together. A file under `app/routes` that no `routes.ts` entry points at is dead code.

**Route files hold composition, not implementation.** A route wires params, data and state to components; the markup lives in `components/<feature>/`.

**Prerendered routes** (`/`, listed in `react-router.config.ts`) render at build time in Node. Nothing they import may touch `window`, `document` or `localStorage` outside an effect or event handler.

## UI primitives

`app/components/ui/` holds hand-written primitives (`Text`, `Button`, `PopCard`, `Sticker`, `Chip`, `EmojiChip`, `FramedPhoto`, `WhatsAppLink`, `Section`, `Container`, `SwipeGrid`, `Reveal`, `Perforation`, `AnchorLink`, `Logo`, `ThemeToggle`). Variants are declared with `cva` or a variant map inside the primitive.

- **Never restyle a primitive at the call site.** A new look is a new `variant`, added to the primitive.
- **Add on demand.** Write a primitive when a second screen needs it, not in anticipation.
- **Theme tokens only.** Primitives read the `@theme` tokens in `app/global.css` — never a stock Tailwind palette class (`bg-pink-500`, `text-yellow-300`, `bg-white/5`) and never a hex value.
- **Prefer an existing library or pattern** over new code. Reuse is the default; from-scratch is the exception that needs a reason.

## Theme

The look is **celebration pop**: a neo-brutalist party poster. Cream "party paper" in light, deep plum "after-party" in dark. Six pop colours, 2px ink borders, hard offset shadows, tilted stickers, confetti, marker-pen scrawls. Loud on purpose — but loud through the system, never through one-off classes.

| Ingredient | How |
|---|---|
| Display type | `font-display` — Bricolage Grotesque (headings, buttons, stickers) |
| Body type | `font-sans` — Plus Jakarta Sans |
| Scrawls | `font-marker` — Permanent Marker, one short line per block at most (`marker`, `marker-lg` variants) |
| Edges | `border-2 border-border` on every card, sticker, chip and button |
| Depth | `shadow-pop-sm`, `shadow-pop`, `shadow-pop-lg` — hard offset shadows, never blurred |
| Tilt | `tilt` variant from `~/data/ui/tilts` (`left`, `right`, `hard-left`, `hard-right`) |
| Colour per item | `tone` variant from `~/data/ui/pop-tones` (`pink`, `yellow`, `cyan`, `lime`, `violet`, `orange`) |
| Texture | `bg-party-dots` (a `Section` `surface='dots'`) — the only background pattern |

The palette is defined once in `app/global.css`: raw values on `:root` (light) and `:root[data-theme='dark']`, exposed to Tailwind through `@theme inline`. Tailwind 4 is CSS-first: there is no `tailwind.config.js`.

| Token | Use |
|---|---|
| `bg-bg`, `bg-surface`, `bg-surface-muted` | Page, cards, alternating section bands |
| `border-border` | Every border — ink in light, cream in dark |
| `text-text-primary` / `text-text-secondary` / `text-text-muted` | Text hierarchy on `bg`/`surface` |
| `bg-accent`, `hover:bg-accent-hover`, `text-accent-foreground` | Primary action fill and its text |
| `text-accent-text` | Scrawls, accent text |
| `bg-pop-*` | Pop fills — always paired with `text-on-pop` (`tone='on-pop'`) |
| `text-on-pop` | Text on any pop fill; ink in both themes |
| `--hard-shadow` | Shadow colour — ink in light, pink in dark |
| `var(--pop-*)` | Raw values for canvas confetti (`~/data/ui/confetti`) |

- **Text on a pop fill uses `tone='on-pop'`.** `text-primary` flips to cream in dark mode and disappears on yellow.
- **Gradients and glows are not part of this look.** The only gradient is the dot texture inside `bg-party-dots`. Depth comes from hard shadows; colour comes from flat pop fills.
- **Never hardcode a hex value or reach for a stock Tailwind palette class.** If a shade is missing, add it to both theme blocks in `global.css`.
- **A new pop colour** goes into both theme blocks, `@theme inline`, `POP_FILLS` and `CONFETTI_COLOR_VARS` — together.

**Never an arbitrary size.** No `text-[11px]`, no `rotate-[7deg]`. If no step fits, add one to `@theme`. Per-item numbers that are data (confetti positions and delays) go through `style`.

**An unknown colour class fails silently.** Tailwind leaves it unstyled and borders fall back to `currentColor`. After renaming or removing a token, grep for every use of the old name.

### Motion

- **Motion is celebration, not decoration noise.** Keyframes live in `@theme` (`animate-marquee`, `animate-confetti-fall`, `animate-float`, `animate-wiggle`, `animate-spin-slow`).
- **Confetti celebrates once.** The hero shower (`animate-confetti-fall`, one iteration) and the canvas burst play when the page opens, then stop. Nothing falls continuously behind content; later confetti only comes from a click (`CelebrateButton`).
- **Every looping animation is `motion-safe:` or paired with `motion-reduce:`** — the marquee stops, confetti rain hides. Canvas confetti passes `disableForReducedMotion`.
- **Content is visible without JavaScript.** `Reveal` is a CSS scroll-driven animation (`animate-reveal`, `animation-timeline: view()`); browsers without support just play it once on load. Nothing is prerendered at `opacity: 0`, and the hero has no entrance animation at all — it is the LCP element.
- **Canvas confetti is loaded on demand** (`celebrate` in `~/lib/confetti` dynamically imports `canvas-confetti`), so it never runs during prerender.

### Light and dark

- **Both themes come from the same tokens.** `data-theme='light' | 'dark'` on `<html>` swaps the raw values; components never branch on the theme and the `dark:` variant is never used.
- **The preference** (`system`, `light`, `dark`) lives in `localStorage` under `echoverse-theme` and is read through `useTheme` (`~/hooks/use-theme`). `THEME_INIT_SCRIPT` in `root.tsx` applies it before first paint, so prerendered pages never flash the wrong theme.
- **Check every UI change in both themes and at 375px wide** — screenshot light, dark and mobile before handing it over. A page must never scroll horizontally; tilted cards are clipped by `overflow-x-clip` on `Section` and the public layout.

### Mobile

- **Design the 375px layout on purpose**, not as whatever the desktop grid collapses into. A section that turns into several screen-heights of single-column cards needs a `SwipeGrid`, a two-column grid or a compact row layout.
- **Phones get the clean version.** Floating stickers, decorative shapes and secondary copy are desktop flourishes — hide them below `sm` rather than squeezing them around content. One primary action per screen.
- **An ordered sequence becomes a timeline on phones**, not a stack of cards: `PopCard flatOnPhone` drops the card chrome below `sm`, and a dashed connector joins each step's chip to the next (see `journey-step.tsx`).
- **Stacked buttons are full width** below `sm` (`grid gap-3 sm:flex`).
- **Navigation below `lg` lives in `MobileMenu`**; the navbar keeps only the logo, theme toggle and menu button on phones.
- **Spacing and type scale down on phones** through the primitives (`Section` padding, `display`/`heading`/`lead` variants) — never per call site.
- **The container is `max-w-8xl` (100rem)** so wide screens do not frame the page with empty gutters.

## Where non-component files go

| Kind | Location | Import as |
|---|---|---|
| Hooks (queries, mutations, stateful logic) | `app/hooks/<feature>/` | `~/hooks/...` |
| Constants, static data, copy tables | `app/data/<feature>/` | `~/data/...` |
| Pure helpers | `app/lib/` | `~/lib/...` |
| Types | `app/types/` | `~/types/...` |
| API clients and data access | `app/services/` | `~/services/...` |
| Zod schemas | `app/schemas/` | `~/schemas/...` |

Never inline these in component files. `hooks/`, `data/` and `lib/` mirror `components/<feature>/`; a file is placed by **the feature it is about, not the feature that imports it**. Only code that belongs to no feature stays at the root (`lib/format.ts`, `data/navigation.ts`). All landing copy lives in `app/data/landing/`, never in JSX.

Query and mutation hooks are created with `react-query-kit` in `hooks/<feature>/queries.ts` and `hooks/<feature>/mutations.ts` once the first service exists.

## Data access

There is no backend yet. When one lands (ticketing, payments, My Tickets):

- **The backend is reached only through `app/services/`.** Components and hooks never call `fetch` or an SDK client directly.
- Response types are declared once in `app/types/` (or generated from the schema) and returned from the service. Never a hand-written interface mirroring a generated type.
- **Payment confirmation is server-side** (gateway verification or webhooks), never trusted from the browser — see the PRD's reliability constraints.

## Mutations (when server state lands)

**Use `mutate`, never `mutateAsync`.** `mutateAsync` returns a rejecting promise, which forces a `try/catch` at every call site.

- **No `try/catch` in components.**
- **Handle outcomes in the hook.** `onSuccess` / `onError` on the `createMutation` options is the default home for toasts and cache invalidation. Per-call callbacks (`mutate(vars, { onSuccess })`) are for call-site-specific outcomes such as closing a dialog.
- **Always toast on mutation success and error** (`react-hot-toast`, added with the first mutation).
- **Never mirror mutation state into `useState`.** Render from `isPending` and `error`, and call `reset()` when the user backs out.
- **The only exception is a genuine sequence** — a second request that needs the first one's response. Even then, chain in `onSuccess`.

## Application rules

- **State:** local state or URL params first. There is no global store.
- **Server state:** `@tanstack/react-query` via `react-query-kit`, added with the first service.
- **Forms:** `react-hook-form` + Zod (`@hookform/resolvers/zod`), schemas in `app/schemas/`. No per-field `useState`.
- **A one- or two-line handler belongs in the JSX.** Name it only when it grows past a couple of statements, is used twice, or needs `useCallback`.
- **Performance:** do not create new objects or functions inline in JSX when the prop feeds a memoized child, a dependency array, or a list row. A trivial inline arrow on a DOM element is fine.
- **Styling:** Tailwind only, theme tokens only.

## Copy voice

The landing page talks like a friend hyping the plan: short, playful, meme-literate, a little self-aware. Every block gets at most one joke; the facts (date, price, city, what to do next) are never buried under it.

- **Calls to action are plain.** `Explore Events`, `Book Now` — the PRD's CTAs. The joke goes in the sticker or scrawl next to it.
- **Emoji are seasoning.** One per label at most, and decorative emoji are `aria-hidden` when they stand alone.
- **Inside future admin and account screens, copy never explains the system** — it says what the user is looking at and what they can do, nothing about how it works behind the screen.

## SEO

The page is the product's front door; search and share previews are built in, not bolted on.

- **Every route exports `meta` through `buildPageMeta`** (`~/lib/seo/meta`) — title, description, robots, canonical, Open Graph and Twitter in one call. Copy lives in `app/data/<feature>/meta.ts`. Titles stay at or under 60 characters, descriptions at or under 155.
- **Structured data is one JSON-LD `@graph` per page**, built in `~/lib/seo/` and emitted with `{ 'script:ld+json': … }`. Events use `buildEventSchema`; every new event field Google's Event rich result needs (`description`, `endsAt`, `region`, photo) is required by the `EventPreview` type.
- **`SITE.url` (`~/data/seo/site`) is the only place the domain is written.** Absolute URLs go through `absoluteUrl`.
- **`robots.txt`, `sitemap.xml` and `manifest.webmanifest` are resource routes** (`routes/robots[.]txt.ts` …) prerendered to static files. A new public page is added to `SITEMAP_PAGES`; a new image is picked up from its data file.
- **One `<h1>` per page and no skipped heading levels.** Decorative titles (the hero ticket) are not headings. Every landing `Section` is `aria-labelledby` its `<h2>` via `sectionTitleId`.
- **Semantic markup for content:** events are `<article>` with a `<time dateTime>`, testimonials are `<figure>` + `<blockquote>` + `<figcaption>`, navs carry `aria-label`.
- **A link's accessible name contains its visible text.** Don't put an `aria-label` on a link whose text already names it.
- **Photos render through `FramedPhoto`**, which emits `width`/`height`, `srcset` and `sizes`. Each photo ships at its base size plus the smaller widths in `PHOTO_SHAPES`, named `<name>-<width>.webp` beside the original.
- **Fonts are self-hosted** (`@fontsource-variable/*`, imported in `global.css`) and the two Latin files used above the fold are preloaded from `FONT_PRELOADS`. No third-party request blocks render.
- **Check with Lighthouse before handing over** (mobile and desktop presets). The bar: SEO, Accessibility and Best Practices at 100, Performance at 90+ on mobile.

## Library CSS loads globally

**A library stylesheet is `@import`ed in `app/global.css`, never imported from a module.** In the production build a CSS import inside a route's module graph becomes that route's stylesheet, and React Router removes it when the route stops matching. Check a styling fix like this with `yarn build && yarn preview`, not `yarn dev`.

## Dates and money

- An event's `startsAt` is an ISO instant with its offset (`2026-11-14T20:00:00+05:30`). Show it with `formatEventDay` / `formatEventTime` from `~/lib/format`, which format in `Asia/Kolkata` so prerendered HTML and the browser agree.
- Never `new Date('YYYY-MM-DD')` — it parses as UTC midnight and shows the previous day west of Greenwich.
- Prices are whole rupees as numbers, shown with `formatRupees`. Never type `Rs.` or `₹` into copy.
