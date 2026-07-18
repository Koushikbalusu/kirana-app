# Current State

_Last updated: 2026-07-18_

## Done
- Full brainstorm/spec captured and structured into docs/ + CLAUDE.md +
  .claude/.
- Next.js 15 App Router + TypeScript + Tailwind v4 scaffold created.
- Original chat-export transcript archived as-is into docs/chat-export/
  (contains old plaintext secrets from a prior, unrelated setup attempt —
  do NOT reuse any of those values; user manages rotation independently).
- Greyscale Tailwind theme + base UI primitives, fully responsive.
- All four role route groups built with working flows: customer catalog/
  cart/checkout, admin product/category/order/delivery/customer management,
  delivery partner dashboard, superadmin store list.
- Cookie-session auth (login/logout) for admin/staff/delivery/superadmin,
  route-protected via `src/proxy.ts`, rate-limited login via Upstash.
  Demo accounts: admin@kirana.app / delivery@kirana.app / super@kirana.app,
  password `kirana123` for all three (see src/lib/auth/users.ts).
- Frictionless customer phone identify (no OTP/password) at checkout,
  writing to the live `customers` table and autofilling name on return
  visits (see `src/actions/customer.ts`).
- Admin: delivery partner add/list, product create/edit forms with variant
  manager + image upload, category management.
- Leaflet + Ola Maps location picker (GPS/autocomplete/pin-drop) in
  checkout; admin delivery cluster map; read-only map on delivery partner
  view. Google Maps deep link for navigation.
- **All 5 external platforms fully live and verified end-to-end**: Neon
  Postgres (11 tables migrated), Upstash Redis (rate limiting), Bunny
  Storage/CDN + Sharp image pipeline, Sentry (errors + source maps), Ola
  Maps (autocomplete + reverse geocode) — env vars synced to Vercel
  production/preview/development.
- Git repo initialized locally with all 4 branches (`main`, `dev` [default,
  checked out], `prod`, `prod-dev`).
- Deployed to Vercel production: **https://kirana-app-eight.vercel.app**
- `npm run build` and `npx tsc --noEmit` pass clean; full auth flow
  (login → session → role-gated access → cross-role block) verified against
  the live production deployment; Ola Maps autocomplete/geocode verified
  live via `/api/maps/*`.

## Resolved gotchas (kept here so they don't get rediscovered)
- **Ola Maps domain whitelist**: Krutrim Cloud's "Allowed Domains" field
  expects **bare domains** (`kirana-app-eight.vercel.app`), not full origins
  with `https://` or a trailing slash — their own placeholder
  (`example.com, *.example.com`) shows the expected format. Also: typing
  into the field isn't enough, the **Save** button must be clicked. Our
  server-side calls send a matching `Origin` header (see
  `src/lib/maps/ola.ts`, `OLA_MAPS_ALLOWED_ORIGIN` env override available
  if the production domain ever changes).
- **Stale Zustand-persist cache**: browsers that visited before certain
  seed-data fields existed (e.g. order `lat`/`lng`) keep the old cached
  shape in `localStorage` forever unless a `merge` function reconciles it —
  see `src/stores/orderStore.ts` for the pattern. Apply the same pattern to
  other persisted stores if their seed shape changes again.

## Not started / deferred
- GitHub repo creation, SSH remote, branch protection rules, CI status
  checks, GitHub secrets — repo is local-only so far.
- Meilisearch — intentionally deferred, MVP uses Postgres `pg_trgm`.
- Real Capacitor/Android APK build — the site has a download section, but
  the actual `.apk` asset is a placeholder until Phase 2.
- Order/product/category/delivery-partner data still lives in Zustand
  (client-side, localStorage-persisted) rather than the live Neon DB via
  Drizzle — only the `customers` table is actually written to on the
  server side so far. Schema for the rest already exists in
  `src/lib/db/schema/`.

## Next (in order)
1. Migrate the order/product/category/delivery-partner data path from
   Zustand mock stores to real Drizzle queries + Server Actions against
   the live Neon DB.
2. Create the GitHub repo, push branches, wire branch protection + CI.
3. Build the real Capacitor APK (remote mode against the deployed URL) and
   replace the placeholder download link.
4. i18n (EN/Telugu) pass across customer + delivery UI (currently EN/TE
   toggle exists but translation coverage is partial).
5. Wire the Upstash `orderPlacementLimiter` into actual order placement
   once it's a Server Action (currently only the login and upload routes
   are rate-limited).

**Update this file at the end of every work session.**
