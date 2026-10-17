# Trying the Whole Flow Locally

A walk through the full journey on a laptop: book, get the email, sign in to My Tickets, manage the order in the admin, and scan at the gate.

Start everything first, one terminal each:

```bash
yarn db:start
yarn functions:serve
yarn dev
yarn dev:admin
```

`yarn db:reset` loads the sample data: 6 events, 23 orders and the 6 staff accounts.

| What | Open |
|---|---|
| Website | http://localhost:7300 |
| Admin panel | http://localhost:7301 |
| Test inbox (every email lands here) | http://127.0.0.1:54324 |
| Database viewer (Supabase Studio) | http://127.0.0.1:54323 |

Checkout uses the simulated "Test checkout" payment, so no money moves.

## A flow to try

1. **Book.** On the website, open Events, pick an event and tap Book Now. Choose tickets and try promo code `ECHO10`. Use any made-up email, since nothing leaves the laptop. Tap Pay, then pay in the test sheet. You land on your tickets with the QR codes.
2. **Email.** Open the test inbox to see the ticket email.
3. **My Tickets.** Sign in with the same email. The login code arrives in the test inbox.
4. **Admin.** Sign in as `admin@echoversehub.com` with password `Echoverse@2026`. The dashboard and Orders show your booking, where you can resend, cancel or refund it. Community lists everyone who has booked.
5. **Gate.** Sign in as `gate@echoversehub.com` with the same password. Open Check-in, choose the event and tap Start scanning. Hold a ticket QR up to the laptop camera, or type the ticket code. Scan it a second time to see "Already checked in".

The other staff logins (`events@`, `finance@`, `marketing@`, `viewer@`) show what each role sees.

## Notes

- The first time the admin opens, it can sit on a spinner for a few seconds while Vite prepares it. If it stays there, refresh once.
- Everything runs on the laptop only. Phones on the same Wi-Fi can't reach it, and the camera scanner needs HTTPS on a phone.
- Run `yarn db:reset` to go back to the sample data after testing, and `yarn db:stop` to stop the database.
