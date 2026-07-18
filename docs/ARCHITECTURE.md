# Architecture — Kirana Commerce System

Single Next.js 15 (App Router, TypeScript) app serving four role-scoped
route groups against one shared Postgres database, one Redis instance, one
CDN, and one search backend — deliberately not split into separate
frontend/backend services, to minimize infra overhead for a solo/small-team
build.

```
Browser / Android WebView (Capacitor, Phase 2)
        │
        ▼
   Next.js 15 App Router  (Vercel, Mumbai/ap-south-1 edge on Pro)
   ├─ (customer) route group   — public storefront
   ├─ (admin) route group      — store owner/staff, Better Auth-gated
   ├─ (delivery) route group   — delivery partner, Better Auth-gated
   ├─ (superadmin) route group — platform ops, Better Auth-gated
   ├─ Server Actions           — cart/order/product mutations
   ├─ API Routes               — auth handler, webhooks, upload, search proxy
   └─ middleware.ts            — Upstash rate limiting (edge) + auth guards
        │
        ├──► Neon PostgreSQL (Drizzle ORM) — primary datastore, branched per git branch
        ├──► Upstash Redis — rate limits, cart cache, customer session (30-day TTL)
        ├──► Bunny Storage + BunnyCDN — product/category/payment-proof images (via Sharp pipeline)
        ├──► Ola Maps API — address autocomplete + reverse geocoding
        ├──► Leaflet.js + OpenStreetMap tiles — client-side map rendering (no API key)
        ├──► Google Maps deep-link URL — delivery-partner navigation only (not an API call)
        ├──► Sentry — error monitoring, all 3 runtimes (browser/server/edge)
        └──► [Phase 2] Postgres pg_trgm search → later, self-hosted Meilisearch (Railway) via Upstash QStash queue
```

## Data flow examples

**Order placement**: Customer builds cart (Zustand, client-only) → checkout
Server Action validates + rate-limits (Upstash) → writes `orders` +
`order_items` (Drizzle/Neon) → clears cart → redirects to order
confirmation.

**Delivery assignment**: Admin delivery map queries orders with
`status = PLACED, type = DELIVERY`, renders Leaflet markers from stored
`lat`/`lng`, admin assigns a partner → row in `deliveries` table → partner's
dashboard query picks it up.

## Graceful degradation principle

Every external integration must no-op or fall back cleanly if its env vars
are absent, rather than crashing the app:
- No `DATABASE_URL` → app should still boot (may need an in-memory/dev data
  path during early bring-up).
- No Ola Maps key → Location Picker shows manual-entry-only.
- No Bunny keys → image upload disabled with a clear message, rest of app
  unaffected.
- No Sentry DSN → error monitoring simply doesn't initialize.
- No Meilisearch config → search runs on Postgres `pg_trgm`/`ILIKE`.
