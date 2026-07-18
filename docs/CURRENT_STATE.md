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
- **Products and categories are now fully DB-backed** (Drizzle + Neon), not
  Zustand mock data — see `src/actions/products.ts`, `src/actions/categories.ts`,
  `src/actions/stores.ts`. Homepage, admin product list/create/edit, admin
  categories, and superadmin dashboard/stores all read live from Postgres.
  Live DB seeded with 1 store, 4 categories, 10 products (8 with variants)
  via `scripts/seed.mjs` (idempotent — safe to re-run).
- Admin: delivery partner add/list (still Zustand — see deferred below),
  product create/edit forms with variant manager + image upload +
  tri-directional Telugu translate, category management with the same
  translate button.
- Tri-directional "fill all name fields" translate/transliterate (English /
  Telugu script / Telugu transliteration — enter any one, fills the other
  two) for both products and categories, backed by a curated grocery
  glossary (~40 common kirana items) with generic MT as fallback for
  unlisted items. See `src/lib/i18n/grocery-glossary.ts` and
  `src/app/api/translate/route.ts`.
- Leaflet + Ola Maps location picker (GPS/autocomplete/pin-drop) in
  checkout; admin delivery cluster map; read-only map on delivery partner
  view. Google Maps deep link for navigation.
- **All 5 external platforms fully live and verified end-to-end**: Neon
  Postgres (11 tables), Upstash Redis (rate limiting), Bunny Storage/CDN +
  Sharp image pipeline, Sentry (errors + source maps), Ola Maps (autocomplete
  + reverse geocode) — env vars synced to Vercel production/preview/development.
- GitHub repo public at https://github.com/Koushikbalusu/kirana-app, all 4
  branches pushed, `main` (default branch) kept fast-forwarded to `dev`.
- Deployed to Vercel production: **https://kirana-app-eight.vercel.app**
- `npm run build` and `npx tsc --noEmit` pass clean.

## Resolved gotchas (kept here so they don't get rediscovered)
- **Ola Maps domain whitelist**: Krutrim Cloud's "Allowed Domains" field
  expects **bare domains** (`kirana-app-eight.vercel.app`), not full origins
  with `https://` or a trailing slash. Also: typing into the field isn't
  enough, the **Save** button must be clicked. Our server-side calls send a
  matching `Origin` header (see `src/lib/maps/ola.ts`).
- **Stale Zustand-persist cache**: browsers that visited before certain
  seed-data fields existed keep the old cached shape in `localStorage`
  forever unless a `merge` function reconciles it — see
  `src/stores/orderStore.ts`. Products/categories no longer have this
  problem since they moved off Zustand entirely.
- **Generic MT mistranslates colloquial grocery names**: Google's free
  translate endpoint phonetically transliterates regional food/ingredient
  names instead of giving the real native word (e.g. "Toor Dal" →
  "టూర్ దాల్" instead of "కందిపప్పు"), and cannot reverse-translate
  romanized text at all. Fixed with a curated glossary checked before MT —
  see `src/lib/i18n/grocery-glossary.ts`.
- **Next.js static-caches server-fetched pages by default**: the customer
  homepage was building as a static page (`○`), snapshotting the DB at
  build time — meaning newly added products wouldn't appear without a
  redeploy. Fixed with `export const dynamic = "force-dynamic"` — check
  any new page that does a DB fetch for the same issue (pages under
  `(admin)`/`(delivery)`/`(superadmin)` are already dynamic because their
  layouts call `getSession()`/`cookies()`).

## Not started / deferred
- Orders and delivery partners still live in Zustand (client-side,
  localStorage-persisted), not the DB — seed/demo content for these was
  cleared (empty on first load) per explicit request, but the actual order
  placement and delivery-partner-add flows are not yet Server Actions.
  Schema exists in `src/lib/db/schema/orders.ts`, `order-items.ts`,
  `deliveries.ts`, `users.ts` (delivery partners would live there as
  `role = DELIVERY_PARTNER`) for whenever this gets migrated too.
- GitHub Actions CI, branch protection rules — not configured yet.
- Meilisearch — intentionally deferred, MVP uses Postgres `pg_trgm`
  (not yet wired for the live product search either — homepage search is
  still client-side substring filtering over the fetched product list).
- Real Capacitor/Android APK build — the site has a download section, but
  the actual `.apk` asset is a placeholder until Phase 2.
- i18n (EN/Telugu) pass across customer + delivery UI (currently EN/TE
  toggle exists but translation coverage is partial).
- Upstash `orderPlacementLimiter` not yet wired into order placement
  (still client-side, not a Server Action).

## Next (in order)
1. Migrate orders and delivery partners from Zustand to real Drizzle
   Server Actions against the live Neon DB, matching the pattern already
   used for products/categories.
2. Wire GitHub Actions CI + branch protection rules.
3. Build the real Capacitor APK (remote mode against the deployed URL) and
   replace the placeholder download link.
4. Finish the i18n pass across customer + delivery UI.
5. Wire order-placement rate limiting once it's a Server Action.

**Update this file at the end of every work session.**
