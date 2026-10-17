# Deployment Checklist

How to take Echoverse Hub from local Docker to production. Nothing here has been done yet.

Three things go live:
- The **backend**: a Supabase cloud project.
- The **website** at `echoversehub.com`.
- The **admin panel**, for example at `admin.echoversehub.com`.

## 1. Supabase project

1. Create a project in the Mumbai region (`ap-south-1`), close to Indian buyers.
2. Link it and push everything:
   ```bash
   yarn supabase login
   yarn supabase link --project-ref <ref>
   yarn supabase db push          # migrations, without the seed
   yarn supabase config push      # auth URLs, email templates, function settings
   yarn supabase functions deploy
   ```
3. Under **Auth → URL configuration**, set the Site URL to `https://echoversehub.com`. Add `https://admin.echoversehub.com/**` and `https://echoversehub.com/**` as redirect URLs.
4. Under **Auth → SMTP**, use Resend (see step 3) so login codes and staff invites come from the Echoverse domain.
5. Create the first super admin:
   1. In **Auth → Users**, invite the person by email.
   2. Run `insert into public.staff (user_id, name, email, role) values ('<their user id>', '<name>', '<email>', 'super_admin');`.

   After that, add everyone else from the admin panel's **Team** page.

## 2. Payments: simulated for the client demo

The first live deployment keeps the simulated payment. Checkout shows the "Test checkout — no money moves" sheet, and paying confirms the booking straight away. That way the client can try the whole journey (book, get the email, open the ticket, scan at the gate) before Razorpay keys exist.

What that means while it's on:
- **No money is taken, and every booking gets real, scannable tickets.** Share the demo link only with the client, not publicly, and don't run a real event in this mode.
- Demo bookings show "Test payment" in the admin's order details.

Switch to real payments in step 8 once the client sends the keys.

## 3. Resend (email)

Verify `echoversehub.com` in Resend. Then send from `Echoverse Hub <tickets@echoversehub.com>`.

## 4. Function secrets

```bash
yarn supabase secrets set \
  SITE_URL=https://echoversehub.com \
  ADMIN_URL=https://admin.echoversehub.com \
  PAYMENT_PROVIDER=test \
  EMAIL_PROVIDER=resend RESEND_API_KEY=... \
  "EMAIL_FROM=Echoverse Hub <tickets@echoversehub.com>"
```

`PAYMENT_PROVIDER=test` is the simulated payment from step 2. Leaving it unset means Razorpay, and checkout then fails until the keys are in.

## 5. Website (static)

- Use any static host, such as Cloudflare Pages, Netlify or Vercel. Build command: `yarn build`. Output directory: `build/client`.
- Environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
  - optionally `VITE_GA_MEASUREMENT_ID` and `VITE_META_PIXEL_ID`
- **SPA fallback:** any path without a file serves `/__spa-fallback.html` with status 200 (for example a `/* /__spa-fallback.html 200` rewrite).
- **Rebuild when events change.** Event pages are pre-built so Google and WhatsApp previews work. Create a deploy hook on the host. Then add a Supabase **Database Webhook** on `public.events` (insert, update) that calls that hook. Newly published events then get their own pre-built page within a few minutes. Until the rebuild finishes, they still open in the browser.

## 6. Admin panel (static)

- Build from `admin/` with `yarn build`. Output directory: `admin/build/client`.
- Environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
  - `VITE_WEBSITE_URL=https://echoversehub.com`
- **SPA fallback:** every path serves `index.html`.
- The admin pages are already marked `noindex`. Optionally put the admin behind your host's access controls too.

**The venue map needs no keys or accounts.** The admin's map shows [OpenStreetMap](https://www.openstreetmap.org/copyright) tiles, and its search box uses [Photon](https://photon.komoot.io/), a free OpenStreetMap search. Both are free for light use like an admin team's.
- The team drops a pin on each venue. The website's Directions button and the ticket email then open Google Maps navigation to those exact coordinates.
- If the search ever misses a venue, they search the area and tap the exact spot.
- If the admin is ever used heavily, both services can be swapped for a paid tile and search provider by changing `VENUE_MAP.tiles` and `PLACE_SEARCH` in `admin/app/data/events/venue.ts`.

## 7. Before real ticket sales

- Replace the placeholder events, prices and photos. Remove any local-only test events.
- Get the Terms, Privacy and Refund policy reviewed by a lawyer.
- Replace the placeholder contact email and Instagram handle in `app/data/contact.ts`.
- Add the analytics IDs.
- Switch to real payments (step 8) and clear the demo bookings.
- Do one real ₹1 test booking end to end: pay, receive the email, scan at the gate, then refund it.
- Optional: add Cloudflare Turnstile to checkout if bots start holding seats.

## 8. Switching to real payments

Do this when the client sends the Razorpay keys:

1. In Razorpay, complete KYC and switch to Live mode. Copy the Key ID and Key Secret.
2. Add a webhook pointing to `https://<ref>.supabase.co/functions/v1/razorpay-webhook`, with the events `payment.captured` and `order.paid`. Give it a strong secret.
3. Turn Razorpay on:
   ```bash
   yarn supabase secrets set PAYMENT_PROVIDER=razorpay \
     RAZORPAY_KEY_ID=... RAZORPAY_KEY_SECRET=... RAZORPAY_WEBHOOK_SECRET=...
   ```
   Checkout opens Razorpay (UPI, cards, net banking) from the next booking on. No code or website rebuild is needed.
4. Remove the demo bookings so the dashboard starts at zero. Every booking made before the switch is a demo booking, including free and complimentary ones. Run this once, in the SQL editor, before any real sale:
   ```sql
   delete from public.check_ins;
   delete from public.orders;
   ```
   Deleting the orders also deletes their tickets. Customers and visit counts can stay.

To try Razorpay before going live, use its Test mode keys first. Payments then go through Razorpay's test cards and UPI, and still no money moves.
