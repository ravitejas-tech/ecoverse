# Echoverse Hub — Website & Ticketing Platform

## Product Vision & Business Requirements Document

A first-party event discovery, booking, ticketing and operations platform built exclusively for Echoverse Hub events.

| | |
|---|---|
| **Product Type** | First-Party Event Platform |
| **Document Date** | 06 October 2026 |

> **Core positioning**
>
> This is not an open marketplace for outside organizers. It is the official digital home, transaction layer and event operating system for Echoverse Hub.

---

## Executive Summary

Echoverse Hub should own the complete event journey: discovery, storytelling, booking, payment, ticket delivery, attendee communication, check-in, analytics and repeat attendance. The platform should make Echoverse the default destination for every official Echoverse event instead of forcing customers across disconnected third-party tools.

> **Product principle**
>
> Do not build "another BookMyShow." Build Echoverse Hub's own event operating system - focused on one brand, one community and one growing portfolio of experiences.

### The intended journey

**Discover Echoverse > Understand the experience > Find an event > Book tickets > Receive ticket > Attend > Stay connected > Discover the next event**

### Platform components

- **Brand website** - storytelling, trust, discovery and SEO.
- **Ticketing engine** - pricing, inventory, orders, payment and QR tickets.
- **Customer system** - profiles, ticket history, consent and repeat-attendance data.
- **Event operations** - admin workflows, attendee management, check-in and refunds.
- **Marketing & analytics** - attribution, conversion, retention and performance reporting.

---

## Contents

1. [What problem are we trying to solve?](#01-what-problem-are-we-trying-to-solve)
2. [Who is facing this problem?](#02-who-is-facing-this-problem)
3. [Why is this problem important?](#03-why-is-this-problem-important)
4. [Expected outcome and product goals](#04-expected-outcome-or-goal-of-the-product)
5. [Key business requirements and constraints](#05-key-business-requirements--constraints)
6. [References, similar products and competitors](#06-references-similar-products--competitors)
7. [What would define the product as successful?](#07-what-would-define-the-product-as-successful)
8. [Recommended platform architecture & next-stage roadmap](#08-recommended-platform-architecture--next-stage-roadmap)

---

## 01 What Problem Are We Trying to Solve?

*Create one official Echoverse destination instead of a fragmented event journey.*

Echoverse Hub needs a centralized digital platform for its events instead of depending entirely on third-party ticketing platforms, social media pages, forms, payment links, spreadsheets, WhatsApp conversations and other disconnected systems.

### Fragmented Customer Journey

A person may discover an Echoverse event on Instagram, move to another website for details, use another platform for payment, receive information somewhere else and finally communicate through WhatsApp. Every additional step creates friction and weakens the sense of one coherent Echoverse experience.

> **Target journey**
>
> Instagram / Google / Referral > Echoversehub.com > Event Page > Select Ticket > Pay > Receive QR Ticket > Attend

### Loss of Brand Experience

Third-party ticketing platforms are designed around their own marketplace and brand. Echoverse needs full control over how each experience is presented, including:

- Photography and video
- Event storytelling
- Artists and hosts
- Venue presentation
- FAQs and practical information
- Community highlights
- Previous-event content
- Reviews and testimonials
- Sponsors and partners
- Echoverse visual identity

The ticketing experience should therefore be part of the Echoverse brand rather than simply a transaction.

### Limited Ownership of Customer Relationships

A ticket purchase should become the beginning of an ongoing relationship, not the end of a transaction. With appropriate consent, Echoverse should be able to understand:

- Which events people attend
- First-time vs repeat attendees
- Ticket categories purchased
- City/location
- Source of booking
- Referral or marketing campaign
- Event interests
- Attendance/check-in status

This creates the foundation for long-term community building, retention and better event decisions.

### Operational Complexity

Event information, registrations, payments, ticket lists, refunds and check-ins should not need to be managed across multiple unrelated systems.

> **Internal operating loop**
>
> Create Event > Publish > Sell > Monitor > Communicate > Check-in > Analyze

### Dependency on Third Parties

Third-party marketplaces can remain useful as marketing or distribution channels when strategically appropriate. However, Echoverse should be able to run an event completely through its own infrastructure without depending on another event marketplace for the primary customer relationship.

---

## 02 Who Is Facing This Problem?

*Four primary user groups shape the product requirements.*

### A. Event Attendees

These are people interested in attending Echoverse experiences such as social events, workshops, meetups, dance experiences, trips, nightlife experiences, activities or future event formats.

Typical problems include:

- Not knowing where the official information is available
- Repeatedly searching Instagram for event details
- Complicated booking journeys
- Uncertainty after payment
- Difficulty finding tickets later
- Not knowing venue rules or instructions
- Missing event updates
- Difficulty discovering the next Echoverse event

> **Design goal**
>
> Make attending an Echoverse event extremely simple from the first tap to the gate.

### B. Returning Echoverse Community Members

People who have already attended Echoverse are especially valuable. The platform should eventually recognize returning users and make their experience easier instead of treating every booking as a completely new transaction.

- My Tickets
- Upcoming Events
- Previous Events
- Recommended Events

This turns event attendance into an ongoing relationship with Echoverse.

### C. Echoverse Hub Internal Team

The internal team needs a simple system to create and operate events without relying on developers for routine changes. They should be able to manage:

- Event information
- Images and videos
- Dates and timings
- Venues
- Ticket categories and prices
- Inventory and sales phases
- Early-bird tickets
- Promo codes
- Complimentary tickets
- Sales and payments
- Refunds
- Attendees
- Check-ins
- Marketing sources
- Reports

### D. Event-Day Staff / Volunteers

Gate staff need a fast, low-training interface focused on one job: scan a ticket and make an entry decision.

> **Gate workflow**
>
> Scan QR > Verify Ticket > Allow Entry

- Valid Ticket
- Already Checked In
- Cancelled / Refunded Ticket
- Invalid Ticket
- Wrong Event / Wrong Date

The check-in system should be optimized for speed, clarity and queue reduction.

---

## 03 Why Is This Problem Important?

*The platform supports a repeatable event brand, not only ticket sales.*

Echoverse Hub is building a repeatable event brand and community ecosystem. Owning the digital infrastructure becomes increasingly valuable as the number, frequency and scale of Echoverse experiences increase.

### Brand Ownership

Every event should become part of one recognizable Echoverse ecosystem. Instead of remembering the third-party ticketing platform, users should remember: "I booked this through Echoverse."

### Customer Ownership

Every legitimate, consented interaction can contribute to Echoverse's understanding of its audience. Over time, this becomes a strategic business asset that supports segmentation, retention and better event planning.

### Higher Repeat Attendance

The platform can intentionally connect one experience to another:

> **Retention loop**
>
> Dance Event Attendee > Upcoming Social Mixer > Weekend Experience > Festival / Large Event > Echoverse Community Member

Instead of repeatedly paying to reacquire the same person through advertising, Echoverse can build a direct relationship and encourage relevant repeat attendance.

### Better Decision Making

The system should eventually answer questions such as:

- Which events sell fastest?
- Which ticket price converts best?
- Which marketing campaign produces bookings?
- Which city has the strongest demand?
- How many attendees return?
- Which events attract first-time customers?
- When do customers usually purchase?
- Which promo codes work?
- What percentage of buyers actually attend?

### Reduced Operational Friction

One integrated system reduces dependency on spreadsheets, manual ticket confirmations, separate attendee lists and fragmented payment records.

---

## 04 Expected Outcome or Goal of the Product

*Create the official digital ecosystem for discovering, booking, attending and reconnecting with Echoverse events.*

> **Primary outcome**
>
> The official digital ecosystem for discovering, booking, attending and reconnecting with Echoverse Hub events.

### Outcome 1 - One Official Echoverse Destination

Users should recognize the Echoverse website as the default destination for:

- Upcoming events
- Event information
- Ticket purchases
- Official announcements
- Previous-event highlights
- FAQs
- Contact/support
- Their tickets

### Outcome 2 - Extremely Simple Ticket Booking

> **Typical booking flow**
>
> Event Page > Select Ticket > Enter Required Information > Pay > Booking Confirmed > QR Ticket Generated

The experience should be designed primarily for smartphones and should avoid unnecessary account or form friction.

### Outcome 3 - Complete Internal Event Management

Echoverse administrators should be able to create and operate an event without code changes. The dashboard should support the complete workflow from publishing to check-in.

### Outcome 4 - First-Party Community Database

With appropriate consent and privacy controls, every event can contribute to a structured Echoverse attendee database. This creates the foundation for:

- Repeat-event marketing
- Community segmentation
- Personalization
- Referral programs
- Loyalty systems
- Memberships
- Early-access programs

These capabilities can be introduced gradually rather than being required in Version 1.

### Outcome 5 - Infrastructure That Can Grow With Echoverse

The system should work for a 50-person workshop as well as significantly larger future events. Core architecture should not be designed around only one current event format.

---

## 05 Key Business Requirements & Constraints

*Detailed requirements for public experience, ticketing, operations, marketing and compliance.*

### A. Public Website

#### Home Page

The homepage should communicate what Echoverse is, what experiences it creates and what is happening next.

- Hero section
- Upcoming events
- Featured experience
- Event categories
- Why Echoverse
- Previous event highlights
- Photos/videos
- Community testimonials
- Instagram/social content
- Partners/sponsors
- Newsletter/community call-to-action
- Footer/navigation

### B. Events Directory

Users should be able to browse Upcoming Events and Past Events. Potential future filters include city, date, category, price and event type.

**Every event should have its own unique, search-friendly URL. Example: `echoversehub.com/events/bollywood-dance-night-pune`**

### C. Individual Event Page

Every event page should support:

- Event name
- Cover image/video
- Date
- Start/end time
- Venue
- Map/directions
- Event description
- Highlights
- Schedule
- Artists/hosts
- Age restrictions
- Language
- Dress code
- What is included
- What is not included
- Things to know
- FAQs
- Terms & conditions
- Refund/cancellation policy
- Organizer information
- Ticket categories
- Remaining/sold-out status where desired
- Book Now CTA
- Share event
- Related/upcoming events

The objective is to answer the majority of attendee questions before they contact the Echoverse team.

### Ticketing System Requirements

#### Ticket Categories

The ticket engine should support multiple ticket products and sales phases, for example:

- Early Bird - Rs. 399
- Phase 1 - Rs. 499
- Phase 2 - Rs. 599
- Couple Pass - Rs. 899
- Group of 4 - Rs. 1,599
- VIP - Rs. 999
- Female Pass / Male Pass where relevant and appropriate for the event structure

Each ticket should support:

- Price
- Quantity
- Sales start date
- Sales end date
- Minimum purchase quantity
- Maximum purchase quantity
- Description
- Visibility
- Sold-out status
- Automatic phase closure

#### Promo Codes

Administrators should be able to create percentage discounts, fixed discounts, limited-use coupons, influencer codes, partner codes, private codes, event-specific codes and expiring codes. Promo-code performance should be measurable.

> **Examples**
>
> `ECHO10` | `DANCE100` | `CREATORNAME`

#### Payment Gateway

The platform should integrate with a professional Indian payment gateway instead of processing sensitive card details itself. Payment options should ideally include UPI, credit cards, debit cards, net banking and other supported methods where appropriate.

The architecture should support changing payment providers later without redesigning the entire ticketing product.

#### Ticket Generation

After successful, server-verified payment, the platform should automatically generate:

- Booking ID (example: `ECH-PUN-261104-A82F4`)
- Unique Ticket ID for every individual attendee/ticket
- Unique QR code tied to the server-side ticket record

A QR code should never simply encode easily editable attendee information. Validation should be performed against the ticket record on the server.

#### Ticket Delivery

Tickets should automatically be available through email and, preferably, WhatsApp. Users should also eventually be able to access Account > My Tickets.

#### Customer Account

The platform should minimize mandatory account friction. Recommended login methods are mobile OTP and/or email OTP.

Potential profile area:

- **My Tickets** - Upcoming, Completed, Cancelled
- **Profile** - Name, Mobile, Email, City, Communication preferences

A customer should never need to search through old messages just to retrieve an upcoming ticket.

#### Registration Forms

Different events may require different information. The admin should be able to configure fields such as:

- Name
- Phone
- Email
- Age
- Gender where legitimately required
- City
- College/company
- Emergency contact
- T-shirt size
- Food preference
- Custom questions
- Terms acceptance

Only information actually required for the event should be collected.

### Event Admin Dashboard

#### Dashboard Overview

- Tickets Sold
- Gross Sales
- Checked In
- Remaining Inventory
- Ticket Type Breakdown
- Promo-Code Usage
- Traffic / Conversion
- Payment Status
- Refund Status

#### Event Management

Admins should be able to:

- Create event
- Save draft
- Preview
- Publish
- Unpublish
- Duplicate previous event
- Edit details
- Change poster
- Configure ticket types
- Set ticket limits
- Mark ticket category sold out
- Pause sales
- Configure promo codes
- View attendees
- Export attendee data
- Issue complimentary tickets
- Resend tickets
- Cancel ticket
- Process permitted refunds
- View payment records

### Team Roles & Permissions

| Role | Primary Access |
|---|---|
| **Super Admin** | Full platform permissions. |
| **Event Manager** | Create, edit and manage assigned events. |
| **Finance** | Payments, transactions, refunds and reports. |
| **Marketing** | Analytics, promo codes and campaign tracking. |
| **Gate Staff** | Ticket scanning and check-in only. |
| **Viewer** | Read-only reporting. |

### QR Check-In System

> **Check-in workflow**
>
> Open Event > Scan QR > Server Validates > Ticket Checked In

- VALID - Entry Approved
- ALREADY CHECKED IN
- INVALID TICKET
- CANCELLED
- WRONG EVENT

The system should record check-in timestamp, ticket ID, scanner/device/staff member where appropriate and entry status. A ticket must not be successfully checked in twice unless an authorized administrator explicitly overrides it.

### Search Engine & Social Requirements

Every event should be capable of being discovered through Google and shared attractively through social messaging platforms.

- SEO title
- Meta description
- Open Graph image
- Shareable URL
- Structured event information
- Optimized images
- Fast loading
- Sitemap
- Search-engine indexing controls

When someone shares an Echoverse event on WhatsApp, Instagram DM, Telegram or another platform, the link should generate an attractive event preview.

### Marketing Tracking

- Google Analytics
- Meta Pixel
- Google Ads
- UTMs
- Campaign source
- Referral source

**Example URL: `echoversehub.com/event/dance-night?utm_source=instagram&utm_campaign=dance_launch`**

This allows Echoverse to understand which campaigns actually generate revenue instead of measuring only likes and views.

### Communication System

The platform should be structured to automate important attendee communication, while respecting communication preferences and marketing consent.

| Trigger | Message |
|---|---|
| **Immediately after booking** | Your Echoverse ticket is confirmed. |
| **Event reminder** | Your event is tomorrow. |
| **Event-day reminder** | See you tonight. |
| **Venue update** | Important venue information. |
| **Post event** | Thank you for joining Echoverse. |
| **Next event** | Your next Echoverse experience is here. |

### Data & Analytics

#### Event Analytics

- Page views
- Unique visitors
- Bookings
- Conversion rate
- Revenue
- Average order value
- Ticket type
- Promo usage
- Refunds
- Check-ins
- No-shows

#### Customer Analytics

- New attendee
- Repeat attendee
- Number of events attended
- Last event
- Customer lifetime value
- City
- Event preferences where legitimately derived/collected
- Marketing consent

#### Marketing Analytics

- Instagram
- Organic Google
- Direct traffic
- Influencer
- WhatsApp
- Paid advertisements
- Referral links
- Partner campaigns

### Security, Privacy & Compliance

Because the platform handles payments and personal information, security cannot be treated as an optional feature.

- Use HTTPS everywhere
- Never directly store raw card details
- Use an appropriate authorized payment provider
- Encrypt sensitive information
- Use secure authentication
- Apply role-based admin permissions
- Maintain activity/audit logs for sensitive operations
- Protect APIs against abuse
- Back up critical data
- Have refund/cancellation policies
- Maintain Terms & Conditions
- Maintain a Privacy Policy
- Collect only necessary personal information
- Record appropriate consent
- Provide appropriate mechanisms for privacy-related requests

*India's data-protection requirements should be designed into the product from the beginning. Formal privacy, tax and legal language should be reviewed by appropriate professionals before launch.*

### Major Product Constraints

#### 1. Echoverse Events Only

This platform is not being designed as an open event marketplace. External organizers should not be able to freely sign up and publish events in the initial product.

This significantly simplifies:

- KYC
- Settlements
- Organizer disputes
- Marketplace moderation
- Commission management
- Multi-organizer accounting
- Fraud management

#### 2. Mobile First

Most marketing traffic is expected to arrive from smartphones and social platforms. Every major interaction should be designed for mobile before desktop: Discover > Event Page > Book > Pay > Ticket > Scan.

#### 3. Fast Checkout

The platform should request only information necessary for booking and should avoid unnecessary registration steps before payment.

#### 4. Reliability During Ticket Drops

Large campaigns can create sudden traffic spikes. Inventory and payment logic must prevent overselling, duplicate tickets, multiple payment confirmations and missing bookings after successful payment.

Payment confirmation should be handled server-side using appropriate gateway verification/webhooks rather than relying solely on what appears in the customer's browser.

#### 5. Simple Internal Operations

The Echoverse team should not need technical knowledge to operate ordinary events. If changing a ticket price requires contacting a developer every time, the product has failed operationally.

### MVP - Version 1

#### Public Experience

- Homepage
- Events directory
- Event detail pages
- About Echoverse
- Past-event gallery
- FAQs
- Contact/support
- Terms
- Privacy
- Refund/cancellation policies

#### Ticketing

- Multiple ticket types
- Ticket inventory
- Promo codes
- Registration details
- Payment gateway
- Booking confirmation
- QR generation
- Email ticket delivery
- WhatsApp integration if feasible
- My Tickets
- Refund/cancellation administration

#### Operations

- Admin login
- Event creation
- Ticket configuration
- Orders
- Attendee list
- CSV export
- Complimentary/manual tickets
- QR scanner
- Check-in dashboard
- Basic analytics

#### Marketing

- SEO
- Google Analytics
- Meta Pixel
- UTM attribution
- Social sharing

### What Should NOT Be in MVP

To avoid building an unnecessarily complicated product, Version 1 should generally not include:

- Open organizer marketplace
- External organizer onboarding
- Organizer KYC marketplace system
- Complex multi-party settlements
- Native iOS application
- Native Android application
- Cryptocurrency payments
- Large loyalty program
- Echoverse wallet
- Ticket resale marketplace
- Complex gamification
- Advanced AI recommendations
- Full social network
- Full community chat
- Complex reserved-seat mapping unless an immediate event requires it

These features can be considered only when business demand justifies them.

---

## 06 References, Similar Products & Competitors

*Use established expectations as reference points - without copying marketplace business models.*

The goal is not to copy competitors. The goal is to understand what users already expect and then create a more focused Echoverse experience.

### BookMyShow

Useful references:

- Large-scale event discovery
- Category filtering
- Event pages
- Mobile ticketing
- QR entry
- User ticket history
- Large-event infrastructure

**What Echoverse should learn:** Reliability and familiarity.

**What Echoverse should do differently:** Echoverse does not need to present thousands of unrelated events. It can create a richer branded experience around a smaller, curated event portfolio.

### District

Useful references:

- Mobile-first discovery
- Going-out and experience discovery
- Modern consumer UX

**What Echoverse should learn:** Mobile-first discovery and modern consumer UX.

**What Echoverse should do differently:** Keep every interaction centered around the Echoverse universe rather than becoming a general lifestyle marketplace.

### Townscript

Useful references:

- Organizer dashboards
- Physical/virtual events
- Public/private events
- Ticket types
- Ticket inventory
- Registration questions
- Payment handling
- Event management

**What Echoverse should learn:** Operational flexibility.

**What Echoverse should do differently:** Remove marketplace complexity and make the experience completely Echoverse-branded.

### AllEvents

Useful references:

- Ticket types
- Promo/discount codes
- Ticket scanning
- Custom registration
- Event analytics
- E-ticket delivery
- Event website tooling
- Community/follower concepts

**What Echoverse should learn:** Integrated event operations and marketing.

**What Echoverse should do differently:** Instead of helping thousands of organizers build audiences, every feature should strengthen one audience - the Echoverse community.

### Echoverse's Competitive Difference

The competitive advantage should not simply be: "You can buy tickets from our website."

> **Positioning**
>
> This is where the Echoverse experience begins.

The website can become more emotionally connected to events than marketplace platforms because Echoverse controls storytelling, content, community, ticketing, attendee experience and follow-up.

### Reference Links

- **Razorpay Payment Gateway** — <https://razorpay.com/payment-gateway/>
- **BookMyShow - Live Events Mobile Ticket Guide** — <https://in.bookmyshow.com/live-events-m-ticket-guide>
- **BookMyShow - Ticket Delivery Support** — <https://support.bookmyshow.com/support/solutions/articles/4000232423-how-will-i-receive-my-ticket->
- **Townscript - Organizer Feature Overview** — <https://support.townscript.com/support/solutions/articles/1000265263-how-townscript-work-for-organizers-in-india->
- **AllEvents - Organizer Features** — <https://allevents.in/pages/features>
- **BookMyShow - Events** — <https://in.bookmyshow.com/explore/events>
- **District - Terms / Platform Reference** — <https://www.district.in/policies/terms-of-service>
- **Digital Personal Data Protection Act, 2023 (MeitY)** — <https://www.meity.gov.in/static/uploads/2024/02/Digital-Personal-Data-Protection-Act-2023.pdf>

---

## 07 What Would Define the Product as Successful?

*Success means better customer experience, stronger operations, reliable ticketing and more repeat attendance.*

Success should not be measured only by whether the website works. The product succeeds when it meaningfully improves Echoverse's business and attendee experience.

### Customer Success

> **Ideal customer outcome**
>
> Discover > Understand > Trust > Purchase > Receive Ticket

- Low checkout abandonment
- High payment-completion rate
- Very few "Where is my ticket?" support requests
- Mobile booking works smoothly
- QR tickets are easy to access
- Event information answers common customer questions

### Operational Success

The Echoverse team should be able to launch and manage an ordinary event without developer involvement.

> **Target internal workflow**
>
> Create Event > Add Tickets > Publish | Goal: approximately 10 minutes once assets and event details are ready.

Administrators should have real-time visibility into sales and attendance.

### Ticketing Reliability

- No ticket overselling
- No duplicate successful check-ins
- Automatic ticket generation after verified payment
- QR verification in approximately 1-2 seconds under normal conditions
- Reliable payment reconciliation
- Complete transaction audit trail
- Extremely low rate of confirmed payments without generated tickets

### Website Performance

- Strong mobile performance
- Important pages load quickly on standard mobile networks
- Event pages are shareable and search-engine friendly
- Checkout is optimized for minimum friction
- Architecture remains stable during marketing spikes

### Business Success

One major long-term KPI should be **Direct Ticketing Share**: the percentage of total Echoverse ticket sales processed through Echoverse's own platform.

The objective should be for the Echoverse platform to become the primary transaction channel over time, while third-party marketplaces remain optional acquisition/distribution channels when useful.

### North-Star Metric

> **Repeat Echoverse Attendance Rate**
>
> What percentage of attendees return to another Echoverse experience?

A successful Echoverse platform does not simply convert Visitor > Ticket Buyer. It creates Visitor > Attendee > Returning Attendee > Community Member > Echoverse Advocate.

---

## 08 Recommended Platform Architecture & Next-Stage Roadmap

*Connect the public experience, ticketing engine, customer data, operations and analytics into one ecosystem.*

### Proposed Customer Journey

| # | Stage | Description |
|---|---|---|
| 01 | **Discovery** | Instagram / Google / Friend / Influencer / WhatsApp / Partner |
| 02 | **Echoverse Event Page** | Story + visuals + information + social proof |
| 03 | **Ticket Selection** | Ticket type + quantity |
| 04 | **Registration** | Minimal attendee information |
| 05 | **Payment** | UPI / Card / supported method |
| 06 | **Confirmation** | Booking confirmed instantly |
| 07 | **Ticket** | QR ticket + booking ID |
| 08 | **Pre-Event** | Reminder + venue information |
| 09 | **Event Day** | QR Scan > Entry |
| 10 | **Post Event** | Thank-you + photos/content |
| 11 | **Retention** | Next relevant Echoverse experience |
| 12 | **Repeat Attendance** | The cycle continues |

### Recommended Platform Architecture

| # | System | Responsibilities |
|---|---|---|
| 01 | **Echoverse Website** | Brand, storytelling, discovery and SEO. |
| 02 | **Ticketing Engine** | Tickets, inventory, orders, payments, promo codes and QR generation. |
| 03 | **Customer System** | Profiles, ticket history, attendee information and preferences. |
| 04 | **Event Operations** | Admin management, attendee lists, check-in, refunds and reporting. |
| 05 | **Marketing & Analytics** | Attribution, campaigns, retention and performance reporting. |

All five systems should share one underlying platform and data model so that the user and the Echoverse team experience one connected ecosystem.

### Suggested Main Navigation

> **Primary navigation**
>
> Home | Events | Experiences | Past Events | About | My Tickets

**Primary site CTA: Explore Events. Event-page CTA: Book Now.**

### Recommended Delivery Roadmap

**Phase 1 - Foundation**
Brand website, event directory, event pages, payment, QR tickets, admin event creation, attendee list and check-in.

**Phase 2 - Optimization**
My Tickets, WhatsApp automation, deeper analytics, UTM attribution, refund workflows and improved customer profiles.

**Phase 3 - Retention**
Segmentation, early access, referral systems, repeat-attendee insights, loyalty/membership experiments.

**Phase 4 - Scale**
Advanced event operations, high-volume infrastructure, specialized event formats, integrations and native apps only if justified by usage.

### Final Product Statement

**Echoverse Hub's website should not be designed merely as a corporate website with a payment button.**

It should be designed as the technological backbone of the Echoverse event ecosystem. The platform should allow Echoverse to own the entire relationship:

> **Owned customer relationship**
>
> Discovery > Storytelling > Booking > Payment > Ticketing > Communication > Entry > Data > Retention

Third-party ticketing platforms can remain optional distribution channels where they provide strategic value, but Echoverse should own its primary digital destination, customer experience and event data.

**The objective is ultimately to create an ecosystem where someone does not ask, "Where are Echoverse tickets available?" They instinctively know: "If it's Echoverse, I book it on Echoverse."**

---

## Build the experience before the event starts.

This document is intended to guide product strategy, UI/UX design, technical scoping and development estimates for the Echoverse Hub website and first-party ticketing platform.

> **Recommended next specification**
>
> Page-by-page UI/UX requirements + admin dashboard wireframe requirements + database entities + booking/payment state flow + QR check-in logic + technical architecture.

*Prepared for Echoverse Hub*
*Product Requirements Document | 06 October 2026*
