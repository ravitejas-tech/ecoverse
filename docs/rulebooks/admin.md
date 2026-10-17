# Admin Rules

The admin panel in `admin/` is a separate React Router 8 SPA (`ssr: false`, nothing prerendered) on the same Supabase backend. It follows [global.md](global.md) and [frontend.md](frontend.md):
- `Text` for all text
- copy in `data/`
- `services/`, `hooks/`, `schemas/` and `types/` placement
- react-query-kit with `mutate` only and toasts in hooks
- react-hook-form + zod
- theme tokens only, no arbitrary values
- 150-line files, one component per file

This page covers only what differs.

Its users are the Echoverse team and gate volunteers, not engineers. **Every screen must be usable without training**:
- plain words
- sensible defaults
- one obvious primary action
- works on a phone

## Access

- **Every route's `clientLoader` calls `requireStaff()` or `requirePermission('<permission>')`** (`~/lib/guards`). The signed-in layout loads the staff row once; read it with `useStaff()`.
- **`PERMISSIONS` (`~/data/staff/roles`) mirrors the database rules** (`has_staff_role` in RLS and SQL functions). Change both together.
- **Hide what a role can't do.**
  - Write actions are wrapped in `useCan('<permission>')`.
  - Read-only roles see forms inside `<fieldset disabled>` with a `Notice`.
  - The database refuses anyway; the UI just never offers it.
- Navigation items carry their permission (`NAV_ITEMS`). Gate staff only see Check-in, and `/` sends them there.

## Look

The website's "celebration pop" brand, calmer:
- `PopCard` is `rounded-2xl` with `shadow-pop-sm` (`padding='md'` for content cards).
- Statuses are `Badge` with a pop tone.
- No tilts on content.
- Pages fill the screen up to 1600px (`max-w-8xl` in `AppShell`). Don't narrow a page with its own centred `max-w-*`. Long forms split into `FormColumns` instead.

Primitives in `admin/app/components/ui/`:

| Group | Primitives |
|---|---|
| Page | `PageHeader`, `BackLink`, `TabsNav` (2×2 grid on phones), `SegmentedControl`, `Panel`, `InsetCard`, `Notice`, `EmptyState`, `Spinner` |
| Data | `DataTable` (cards on phones, table above `sm`; column options `align`, `hideOnPhone`, `wideOnPhone`, `nowrap`), `DetailList`, `DividedList`, `StatCard`, `StatCardGrid` (four cards from a `StatCardConfig` list), `StackedCell`, `ProgressBar`, `LoadMoreButton`, `Badge` |
| Forms | `FormColumns` (two columns from `2xl`), `Field`, `TextField` / `SelectField` (react-hook-form aware), `Input`, `Textarea`, `Select`, `Switch`, `Checkbox`, `SwatchPicker`, `ListEditor`, `MoveButtons`, `FileButton`, `SearchInput`, `SaveBar`, `UnsavedChangesGuard` |
| Dialogs | `Dialog` (native `<dialog>`, header and footer stay in view), `ConfirmDialog` |
| Links | `TextLink`, `ExternalLinkButton` |

## Forms

- **Long forms use `FormProvider` with `TextField<Values>` / `SelectField<Values>`.** `SaveBar` appears, sticky, only when there are unsaved changes. `UnsavedChangesGuard` asks before leaving.
- **Lists inside forms use `ListEditor` with `useFieldArray`.** Text lists are edited as `{ value }` items and saved as `text[]`.
- **Dates and times are India time.**
  - `datetime-local` values are read and written through `~/lib/date-input` (`+05:30`), whatever the browser's zone.
  - Show dates with `~/lib/format`.
- **Event questions** save as `[{ id, kind, label, required, options? }]`. Preset questions use `id = kind`; custom ones use `custom-xxxxxxxx`. The website checkout renders exactly this shape.

## Data

- **Searchable lists keep their filters in the URL** through `useListParams(searchKey)` (debounced search plus `setParam`), so a filtered view can be refreshed or shared.
- **Community groups are defined once, in SQL.** `community_members()` returns `is_new`, `is_regular` and `has_upcoming`. The list filters on those columns and `community_stats()` counts them, so the tabs and the cards always agree.
- **Edge functions are called only through `invokeFunction(name, body)`** (`~/services/functions`). It throws an `Error` whose message is the function's error code. Show it with `functionErrorMessage(error)`.
- **SQL function errors use the same snake_case codes.** Map them with `errorMessage(error, map, fallback)`.
- **Mutations refresh data in their hook's `onSuccess`** through the `context.client` argument, and show their toast there. One exception: the gate scanner shows no success toast, because the full-screen result is the feedback.
- **Images are resized in the browser** to WebP (`uploadEventImage(eventId, file, 'cover' | 'gallery')`) and stored in the `event-media` bucket.
  - Seeded images are website-relative paths; show them through `websiteAssetUrl`.
  - Never delete a storage file when a cover is replaced. A duplicated event shares the original's file.
- **Website links** (preview, live page, ticket page) are built from `VITE_WEBSITE_URL`.
- **The venue map is Leaflet with OpenStreetMap tiles. Search goes through `~/services/place-search` (Photon).** Neither needs a key.
  - `VenuePicker` writes `venue_name`, `venue_address`, `venue_lat` and `venue_lng` into whichever event form it sits in.
  - Leaflet is loaded with `loadLeaflet()` (dynamic import) and its CSS is imported by `VenueMapFrame`, so neither reaches other pages.
  - Zoom animation is off: Leaflet 1.9 throws `_leaflet_pos` errors when a map is removed mid-zoom. Scroll-wheel zoom is off too, so scrolling the form never zooms the map.
  - Photon allows search-as-you-type. Keep the debounce and the 3-character minimum, and never point the search at Nominatim, whose usage policy forbids autocomplete.

## The gate scanner

- `qr-scanner` loads only on the scanner page. The camera needs HTTPS on phones (or localhost).
  - Headless tests can feed Chromium a fake camera video.
- **The result fills the screen with colour:**
  - lime: let them in
  - yellow: already checked in
  - pink: stop, with the reason

  Each result has its own vibration pattern. The scanner returns to scanning after 2.5 s, except while an override decision is waiting.
- **The same code is ignored for 3 s while it stays in view.** The "Type a code" box accepts a ticket code or a booking ID. It clears only after the check succeeds.
- The screen is kept awake with the Wake Lock API, and counts refresh every 5 s.

## Phones

- Grid and flex children that hold truncated text or an aspect-ratio box need `min-w-0`, or they push the page wide at 375 px.
- Stacked actions are full width below `sm`. Tabs become a 2×2 grid instead of a scroller.
