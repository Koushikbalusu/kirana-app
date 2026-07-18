# Hackathon Submission — Answers

Copy-paste these directly into the submission form. (Git and PPT links are
intentionally excluded — fill those in yourself: GitHub repo is
https://github.com/Koushikbalusu/kirana-app, and the PPT prompt is in
`docs/GAMMA_PROMPT.md`.)

---

## Theme Chosen
Theme 1: Business Digitization

---

## Problem Statement

Neighborhood kirana (grocery) stores across India still run their entire
ordering and delivery process manually over WhatsApp and phone calls —
customers message a photo or a list, the shopkeeper manually notes it down,
calculates the bill by hand, and coordinates delivery informally with no
tracking, no order history, and no structured record of payments. This
breaks down as order volume grows: mistakes in orders, disputes over
pricing, lost delivery instructions, and no way for the store owner to see
which orders are pending, which are out for delivery, or who owes what.
Existing digital solutions (Swiggy Instamart, Blinkit, etc.) are built for
large-scale quick-commerce and don't fit a single neighborhood store's
actual workflow — nor do they support the bilingual (English + Telugu)
reality of how these stores' customers actually communicate.

---

## Solution

**Kirana Commerce** is a multilingual web app that digitizes the exact
WhatsApp-based workflow kirana stores already use — without changing how
the business actually operates. Customers get a WhatsApp-simple ordering
experience (no forced login, no OTP — just a phone number) with full
English/Telugu support, live map-based address selection, and delivery or
pickup choice. Store owners get a real admin panel: product and category
management (with one-click English→Telugu auto-translation for product
names), order management, delivery assignment on a live map, and analytics
— replacing manual bookkeeping entirely. Delivery partners get a
purpose-built mobile view showing only their assigned deliveries with
one-tap navigation and payment confirmation. A superadmin layer supports
running the platform across multiple stores. The entire system is built on
a real, production-grade stack (Postgres, Redis, CDN image pipeline, error
monitoring, live maps) — not a mocked demo — and is deployed and usable
right now.

---

## Working Features

- Customer storefront: browse and search products by category (English,
  Telugu transliteration, and Telugu script search)
- Cart with per-product quantity steppers, variant selection (e.g. 500g/1kg),
  and item notes
- Frictionless phone-based customer identification at checkout — no OTP, no
  password — silently creates/recognizes the customer in a live PostgreSQL
  database and autofills their name on return visits
- Checkout with Delivery/Pickup selection and live address picker: current
  GPS location, address autocomplete (Ola Maps), and a draggable pin on an
  interactive OpenStreetMap/Leaflet map
- Payment mode selection (Cash / UPI / Bank Transfer) and order confirmation
  with full order history
- Admin dashboard with live analytics: total orders, pending deliveries,
  delivery-vs-pickup split, revenue
- Admin product management: create/edit products and variants, image
  upload (processed and served via a real CDN pipeline), and a one-click
  "Auto-translate to Telugu" button that fills both the Telugu script and
  transliteration fields from the English name
- Admin category management
- Admin order management and delivery assignment, with a live map showing
  all pending delivery addresses as pins
- Admin delivery-partner management (add/remove delivery staff)
- Delivery partner app: assigned-deliveries list, one-tap Google Maps
  navigation, in-transit/delivered status updates, and cash-on-delivery
  confirmation
- Superadmin dashboard for platform/store oversight (multi-tenant ready)
- Role-based, session-based authentication for Admin/Staff/Delivery/
  Superadmin, with rate-limited login to prevent brute-force attempts
- Fully responsive, minimalistic greyscale UI (mobile-first, verified on
  tablet/desktop breakpoints too)
- Real error monitoring in production (Sentry) and a graceful-degradation
  design throughout — every external integration falls back safely if a
  service is ever unavailable
- Android app download entry point on the site (native wrapper build is
  the next milestone — the underlying web app is fully functional as a
  responsive/installable experience today)

---

## Project Published Link (Deployed/MVP Link)
https://kirana-app-eight.vercel.app

Demo logins (no signup needed):
- Admin: `admin@kirana.app` / `kirana123`
- Delivery Partner: `delivery@kirana.app` / `kirana123`
- Superadmin: `super@kirana.app` / `kirana123`
- Customer flow: just enter any 10-digit phone number at checkout — no
  password needed.

---

## Upload Video Explanation Recording Drive Link
_(Not filled in — record a ≤5 min walkthrough yourself: home page →
add to cart → checkout with phone/address → confirm order → switch to
admin login → show dashboard/products/orders/delivery map → switch to
delivery partner login → show assigned delivery + navigate + mark
delivered. Upload to Drive with "Anyone with the link can view" and paste
the link here.)_

---

## Confirmation that all the required hackathon criteria have been achieved
_(Answer this yourself based on the criteria list you were given — the
features above cover the full spec's role/feature set for the MVP.)_
