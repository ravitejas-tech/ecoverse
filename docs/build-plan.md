# Echoverse Hub — Build Plan

What we build to finish the website, ticketing and admin panel. Scope is the **Version 1 (MVP)** list in [the PRD](Echoverse_Hub_Website_Ticketing_Platform_PRD.md). Written 17 October 2026.

> **Status, 17 October 2026: everything below is built and tested locally.** That covers the website, checkout, QR tickets, My Tickets, the admin panel, the gate scanner and the backend. It works end to end: book on a phone, get the email, scan at the gate, see it on the dashboard, refund it. What's left before launch is in [deployment.md](deployment.md).

## The goal in one line

Someone finds an Echoverse event, books it in under a minute without creating an account, gets a QR ticket, and gets in with one scan. The team runs everything from the admin panel without needing a developer.

## Three pieces

| Piece | What it is | Who uses it | Local address |
|---|---|---|---|
| **Website** | The site we have now, plus events, booking and tickets | Attendees | `localhost:7300` |
| **Admin panel** | A separate app: events, tickets, orders, check-in | Echoverse team, gate staff | `localhost:7301` |
| **Backend** | Supabase (database, login, photo storage, server functions) running in Docker | Both apps | `localhost:54321` · Studio `54323` · test inbox `54324` |

Payments go through **Razorpay** (UPI, cards, net banking). It stays in test mode until launch.

## How simple it should feel

1. **No account to buy.** Name, phone and email, plus only what that event really needs.
2. **Booking fits on one screen.** Pick tickets, add your details, then pay.
3. **Your ticket is always one tap away.** It comes by email, you can share it to WhatsApp, and it is in My Tickets.
4. **Built for phones first.** Big buttons, easy to use with one hand, no tiny text, nothing breaks on a small phone.
5. **Plain words.** "Your ticket", "Pay ₹798", "Sold out". No jargon.
6. **Same look everywhere.** The colours, cards and stickers from the landing page, in light and dark mode.
7. **The admin panel is calm and obvious.** Forms start with sensible defaults and have clear Save and Publish buttons. Nothing needs training.
8. **The gate scanner shows one big answer.** Green means let them in. Red means stop, and it says why.

## Website pages

| Page | Address | What's on it |
|---|---|---|
| Home | `/` | Already built. The events now come from the admin panel instead of being written into the code |
| Events | `/events` | Upcoming and past events, with city and category filters |
| Event page | `/events/bollywood-dance-night-pune` | Photo, date and time, venue with a Google Maps link, about, highlights, schedule, hosts, age limit, language, dress code, what's included and not included, things to know, FAQs, refund policy, ticket types ("Few left" / "Sold out"), Book Now, share, more events |
| Checkout | `/events/:slug/book` | Pick tickets, promo code, your details, pay |
| Your ticket | `/tickets/:private-link` | Booking ID, one QR per person, event details, directions, send to WhatsApp |
| My Tickets | `/my-tickets` | Log in with a code sent to your email (no password), then see Upcoming, Past and Cancelled tickets |
| Past events | `/past-events` | Photo gallery of previous events |
| About | `/about` | The Echoverse story |
| FAQs | `/faqs` | Common questions |
| Contact | `/contact` | WhatsApp, email, Instagram |
| Terms, Privacy, Refunds | `/terms` · `/privacy` · `/refund-policy` | Placeholder text that needs a legal review before launch |

**Menu:** Home · Events · Experiences · Past Events · About · My Tickets

**Book Now** goes to the real checkout instead of WhatsApp. WhatsApp stays as the "Need help?" button.

## Booking flow

```
Event page → Book Now
  → choose tickets (+ / −), add a promo code
  → name, phone, email (+ any event questions), accept terms
  → seats are held for 15 minutes
  → pay with Razorpay (UPI / card / net banking)
  → our server confirms the payment with Razorpay
  → booking confirmed: Booking ID + one QR ticket per person
  → ticket email, "Send to WhatsApp" button, saved in My Tickets
```

**What the system guarantees:**

- **No overselling.** The database counts and holds seats, so two people can never buy the last ticket.
- **A payment only counts once our server has checked it with Razorpay.** What the buyer's browser reports is never enough.
- **No duplicates.** Refreshing the page or paying twice never creates extra tickets.
- **The QR code holds only a random code.** The scanner checks that code against the database, so no personal details are stored in the QR.
- **Booking IDs look like `ECH-PUN-261114-A82F4`:** city, event date, then a random part.

## Admin panel screens

| Screen | What the team can do |
|---|---|
| **Log in** | Log in with email and password. A Super Admin invites each team member |
| **Dashboard** | Tickets sold, money in, checked in, seats left, sales by ticket type, promo code use, payments and refunds, event page visits compared with bookings |
| **Events** | Create, save as draft, preview with a private link, publish or unpublish, duplicate, edit, upload a poster, pause sales |
| **Tickets** (inside an event) | Ticket types such as Early Bird, Phase 1, Couple, Group of 4 and VIP. Each one has a price, quantity, sale start and end, min and max per order, description, show or hide, and sold out. A phase closes by itself when it sells out or its end date passes |
| **Questions** (inside an event) | Pick what to ask buyers: age, gender, city, college or company, emergency contact, T-shirt size, food preference, or a custom question |
| **Promo codes** | Percentage or ₹ off, use limit, expiry date, one event or all events, private codes. Shows how often each code was used and how much it earned |
| **Orders** | Search by name, phone or booking ID. See the payment, resend tickets, cancel, refund |
| **Community** | Everyone who has booked, in five groups: All, New (first booking in the last 30 days), Regulars (two or more events), Coming up and Past (nothing booked now). Search, sort, download as CSV. Each person's page shows their bookings, check-ins and spend. Everyone except gate staff can see it |
| **Attendees** | Everyone coming to an event and whether they have checked in. Download as CSV |
| **Free tickets** | Give someone a complimentary ticket using their name and email |
| **Gallery** | Upload photos to a past event |
| **Check-in** | A live count of people checked in compared with tickets sold |
| **Scanner** | Scan with the phone camera to get VALID / ALREADY CHECKED IN / INVALID / CANCELLED / WRONG EVENT. Type the booking ID if a QR won't scan. Only a Super Admin or Event Manager can let someone in a second time |
| **Team** | Add people and give each one a role |

**Roles**

| Role | Can use |
|---|---|
| Super Admin | Everything |
| Event Manager | Events, tickets, questions, attendees, free tickets, gallery |
| Finance | Orders, payments, refunds, reports |
| Marketing | Promo codes, dashboard numbers |
| Gate Staff | Scanner only |
| Viewer | Dashboard, read-only |

Sensitive actions are written to an activity log: who did what, and when. These are refunds, cancellations, re-entry approvals, price changes and role changes.

## What the backend stores

| Table | What it holds |
|---|---|
| `events` | Everything shown on the event page, plus draft or published status |
| `ticket_types` | Prices, quantities, sale dates, limits |
| `orders` | One per booking: buyer, total, promo code, payment status, where the buyer came from (UTM) |
| `tickets` | One per person: ticket ID, QR code, status, check-in time |
| `promo_codes` | Discount rules and how many times each code was used |
| `customers` | Name, phone, email, city, marketing consent, events attended |
| `check_ins` | Every scan: ticket, staff member, time, result |
| `staff` | Team members and their roles |
| `page_visits` | Event page visits and where they came from, used for conversion numbers |
| `activity_log` | Who did what, and when |

**Storage:** event posters and gallery photos.

**Server functions:** create an order and hold seats, check a payment, receive Razorpay's payment confirmation, refund, send the ticket email, check a ticket in, invite a team member.

**Security:** every table has access rules. Visitors can only read published events and their own tickets. Each staff member only sees what their role allows. Payment keys stay on the server.

## Marketing and SEO

- Every event page has its own title, description, share image and event details in Google's format. Links shared on WhatsApp or Instagram show a proper preview, and Google can list the event.
- Event pages are generated ahead of time so previews and Google work without JavaScript. Once we deploy, publishing an event will rebuild the site automatically.
- The sitemap lists every published event.
- Campaign links such as `?utm_source=instagram&utm_campaign=dance_launch` are saved with each booking. The dashboard can then show which campaign sold the tickets.
- Google Analytics and Meta Pixel switch on once their IDs are added.

## Build order (today)

Each step ends with something you can click and try.

1. **Setup.** Supabase running in Docker, the admin app skeleton, and both apps connected to the database.
2. **Database.** The tables and access rules, with sample events, orders and staff loaded.
3. **Events on the website.** `/events` and the event pages read from the database, and so does the home page.
4. **Booking.** Checkout, seat hold, Razorpay test payment, confirmation, QR tickets, ticket email.
5. **My Tickets.** Email-code login and the ticket page.
6. **Admin basics.** Login, roles, dashboard; create, edit and publish events; ticket types; questions; promo codes.
7. **Admin operations.** Orders, attendees, CSV export, free tickets, resend, cancel, refund, gallery.
8. **Gate.** The scanner and the live check-in count.
9. **Content pages.** About, Past events, FAQs, Contact, Terms, Privacy, Refunds, plus SEO, analytics and UTM tracking.
10. **Final check.** One full test booking from a phone through to the gate scan. Light mode, dark mode and mobile checked. Lighthouse scores of 100, and 90+ for mobile performance.

## Not in this version

These are left out on purpose, following the PRD: an organiser marketplace, native apps, a wallet, loyalty points, ticket resale, seat maps, chat, AI recommendations.

These come after launch because each needs an outside service:

- Automatic WhatsApp messages need the WhatsApp Business API.
- Phone-number login needs an SMS provider.
- Reminder messages before an event.

## What I need from you

1. **Razorpay keys.** Test keys let us try a real Razorpay payment; live keys are for launch. Until then, local checkout uses the "Test checkout" sheet.
2. **The email of the first Super Admin** for production. Locally, the seeded `admin@echoversehub.com` is used.
3. **Before launch:** real events and photos, the legal text, the real contact email and Instagram handle, the Google Analytics and Meta Pixel IDs, an email-sending service (for example Resend) and a hosting choice.

While we work locally, every email (login codes and tickets) goes to the Supabase test inbox at `localhost:54324`. Nothing reaches a real inbox.

## Where things live

```
app/        website (same place as today)
admin/      admin panel, a separate app (React Router + Tailwind, same theme)
supabase/   settings, database tables and rules, sample data, server functions
docs/       this plan, the PRD, the rulebooks
```
