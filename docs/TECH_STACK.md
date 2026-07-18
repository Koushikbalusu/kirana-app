# Tech Stack — Kirana Commerce System

Final stack, reflecting the *last* stated decision on each item (some items
flip-flopped during the original brainstorm before landing here).

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 App Router | SSR for catalog SEO/speed, Server Actions for mutations, API routes for webhooks — one codebase, no separate backend |
| Language | TypeScript | Zod schemas shared between forms and Drizzle |
| Structure | Single app, route groups per role | `(customer)` `(admin)` `(delivery)` `(superadmin)` — isolated UI, shared infra |
| Database | Neon PostgreSQL 17 | Serverless, database branching (mirrors git branches), scale-to-zero, `ap-southeast-1` (Singapore) region for India latency. Not v18 — too freshly released when decided. |
| ORM | Drizzle ORM | Lighter than Prisma, better TS inference, no binary engine, cleaner Vercel deploys |
| Admin/Staff/Delivery/Superadmin auth | Better Auth | Multi-role sessions, cleaner API than NextAuth |
| Customer identity | Phone number → silent DB lookup, no OTP/password | Zero-friction guest-style ordering; session token cached in Upstash Redis, 30-day TTL |
| Redis | Upstash Redis | HTTP-based, no persistent TCP — correct fit for Vercel serverless/edge |
| Rate limiting | `@upstash/ratelimit` in `middleware.ts` | Orders 10/min/IP, phone-identify 5/min/IP, uploads 20/hr/identifier |
| **Search (MVP)** | **PostgreSQL `pg_trgm` + `ILIKE`** across `name_en`/`name_te_transliteration`/`name_te_script` | Meilisearch Cloud's free tier was removed ($30/mo now); self-host options (Railway/Fly.io) cost real money once trial credit runs out; Typesense rejected for its GPL-3.0 license. `pg_trgm` is $0, already in Neon, covers English + transliteration + most Telugu-script substring search. |
| **Search (production, later)** | Self-hosted Meilisearch (e.g. Railway ~$5/mo), synced via Upstash QStash queue | Only once a paying store exists; queue avoids blocking writes on bulk edits |
| Image processing | Sharp (server-side) | Resize to 1200×1200 + WebP q82 (main), 300×300 + WebP q70 (thumbnail), before upload |
| Image storage | Bunny Storage | $0.01/GB/month |
| CDN | BunnyCDN | Asia & Oceania pricing zone only, Singapore-only storage region (no multi-region replication — irreversible once added, and unnecessary for India-only traffic) |
| Image optimization (prod only) | Bunny Optimizer | $9.50/mo flat — skipped for MVP |
| **Maps — autocomplete** | Ola Maps API (Krutrim Cloud credentials at `cloud.olakrutrim.com`, docs at `maps.olakrutrim.com/docs`) | 5M free requests/month, India-first data, better Telugu-region coverage than Geoapify/Google Places |
| **Maps — display** | Leaflet.js + OpenStreetMap tiles | Free forever, no key, no limits — replaces Google Maps JS API entirely |
| **Maps — reverse geocoding** | Ola Maps Reverse Geocoding | Included in the same free tier |
| **Maps — navigation** | Plain Google Maps deep link (`https://www.google.com/maps/dir/?api=1&destination=lat,lng`) | Not an API call — free forever, opens the native app |
| GPS | `@capacitor/geolocation` (native) / `navigator.geolocation` (browser) | Same code path via a platform check, free |
| Error monitoring | Sentry (`@sentry/nextjs`), EU data region | Covers browser + Node server + Edge middleware runtimes |
| Styling | Tailwind CSS v4, **greyscale palette only** (white/grays/black) | Minimalistic, avoids "clumsy betting-app" visual bloat |
| UI primitives | Radix UI | Accessible, unstyled |
| State | Zustand | Cart, UI state (language toggle) |
| Forms/validation | React Hook Form + Zod | Zod schema shared with Drizzle inserts |
| Icons | Lucide React | — |
| **Mobile — Phase 1** | Responsive PWA (`next-pwa`, manifest, service worker) | Validate UX before native packaging |
| **Mobile — Phase 2** | Capacitor.js → Android APK, after PWA validation | Wraps proven UX; permissions: INTERNET, ACCESS_FINE/COARSE_LOCATION, CAMERA, READ_MEDIA_IMAGES, VIBRATE; plugins: geolocation, camera, filesystem, app, haptics, network, status-bar, splash-screen |
| Deployment | Vercel — two projects: `kirana-demo` (branch `main`, preview `dev`), `kirana-prod` (branch `prod`, preview `prod-dev`) | Mumbai/`ap-south-1` edge on Pro |
| CI | GitHub Actions: `tsc --noEmit`, `eslint --max-warnings 0`, `next build` | Required status check on protected branches |

**Approximate cost:** MVP/demo ≈ $1/month (free tiers); production ≈
$60–95/month once Meilisearch (self-hosted), Bunny Optimizer, Neon Pro, and
Vercel Pro are added.

## Env vars this stack expects

```
DATABASE_URL=
DATABASE_URL_UNPOOLED=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_OLA_MAPS_API_KEY=
OLA_MAPS_API_KEY=
BUNNY_STORAGE_API_KEY=
BUNNY_STORAGE_ZONE=
BUNNY_STORAGE_ENDPOINT=
BUNNY_CDN_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
MEILI_HOST=
MEILI_MASTER_KEY=
```

See @PLATFORM_SETUP.md for how to obtain each value.
