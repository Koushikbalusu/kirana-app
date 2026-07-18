# Current State

_Last updated: 2026-07-18_

## Done
- Full brainstorm/spec captured and structured into docs/ + CLAUDE.md +
  .claude/.
- Next.js 15 App Router + TypeScript + Tailwind v4 scaffold created.
- Original chat-export transcript archived as-is into docs/chat-export/
  (contains old plaintext secrets from a prior, unrelated setup attempt —
  do NOT reuse any of those values; user manages rotation independently).
- Greyscale Tailwind theme + base UI primitives, fully responsive. Light/
  dark theme toggle (default light) — see "Theme system" below.
- All four role route groups built with working flows: customer catalog/
  cart/checkout, admin product/category/order/delivery/customer management,
  delivery partner dashboard, superadmin (now with full admin access).
- **Auth is fully DB-backed** (Neon `users` table with `password_hash`,
  `phone`, and `username` columns) — no more hardcoded account list. Demo
  accounts seeded via `scripts/seed-users.mjs`, password `kirana123` for
  all three:
  - Admin: username `admin` / `admin@kirana.app`
  - Delivery: username `ramesh` / `delivery@kirana.app`
  - Superadmin: username `superadmin` / `super@kirana.app`
  - **Login can use either email or username** (`getUserByIdentifier` in
    `src/actions/users.ts`, `or()` query over both columns).
  - **Unified login page** at `/login` for Admin and Delivery, with a
    role-toggle (`src/components/shared/UnifiedLoginClient.tsx`) — no more
    separate `/admin/login` and `/delivery/login` pages. **Superadmin is
    intentionally kept on its own separate page** (`/superadmin/login`),
    per explicit request, not merged into the toggle.
  - `src/proxy.ts`'s redirect targets for the admin/delivery prefixes now
    point to `/login?role=admin` / `/login?role=delivery` (query param
    only pre-selects the toggle, doesn't gate anything).
  - Admin/staff/superadmin can add real delivery partner accounts (name/
    phone/email/**username**/password) via `/admin/delivery/partners` —
    these are real logins, not placeholder data. Partners and admins can
    change their own password at `/{role}/settings`; admin/superadmin can
    reset any delivery partner's password from the partners list.
- **Superadmin has full admin capability**, not just a read-only dashboard
  — `src/proxy.ts` now allows the `SUPERADMIN` role on every `/admin/*`
  route, and the superadmin nav links directly into `/admin`. This is
  single-store scoped for now (see Deferred below for true multi-store
  switching).
- Frictionless customer phone identify (no OTP/password) at checkout,
  writing to the live `customers` table and autofilling name on return
  visits (see `src/actions/customer.ts`).
- Products and categories are fully DB-backed (Drizzle + Neon) — see
  `src/actions/products.ts`, `src/actions/categories.ts`,
  `src/actions/stores.ts`. Homepage, admin product list/create/edit, admin
  categories, and superadmin dashboard/stores all read live from Postgres.
  Live DB seeded with 1 store, 4 categories, 10 products (8 with variants)
  via `scripts/seed.mjs` (idempotent — safe to re-run). All 10 products now
  have real `image_url`/`thumbnail_url` set via `scripts/seed-images.mjs` —
  generates a category-colored placeholder image per product (no product
  photography available), processes it through the actual Sharp resize/
  WebP pipeline, and uploads through the actual Bunny Storage pipeline
  (same code path a real admin upload uses) rather than just hot-linking
  an external placeholder URL. Skips products that already have an image,
  so it's safe to re-run after adding new products.
- **All product/category-mutating Server Actions and the image upload
  route now check the caller's session role** (`requireStaffSession()` in
  `src/lib/auth/authorize.ts`) — this closes a real hole where anyone who
  discovered the Server Action could call it directly, bypassing the
  page-level login gate entirely (UI gating alone never protected these).
- Admin: delivery partner management with real accounts (see above),
  product create/edit forms with variant manager + image upload (now shows
  the existing image when editing — was previously blank until a new file
  was chosen, even though the image was correctly saved) + tri-directional
  Telugu translate, category management with the same translate button.
- Tri-directional "fill all name fields" translate/transliterate (English /
  Telugu script / Telugu transliteration — enter any one, fills the other
  two) for both products and categories: curated grocery glossary first,
  then generic MT, then (new) a best-effort Latin→Telugu phonetic
  reconstruction for unlisted items via the transliteration field — flagged
  in the UI as approximate rather than presented as ground truth. See
  `src/lib/i18n/grocery-glossary.ts`, `src/lib/i18n/latin-to-telugu.ts`,
  `src/lib/i18n/telugu-transliterate.ts`.
- Leaflet + Ola Maps location picker (GPS/autocomplete/pin-drop) in
  checkout; admin delivery cluster map; read-only map on delivery partner
  view. Google Maps deep link for navigation.
- **All 5 external platforms fully live and verified end-to-end**: Neon
  Postgres, Upstash Redis (rate limiting), Bunny Storage/CDN + Sharp image
  pipeline (fixed a double-slash bug in the generated CDN URL caused by a
  trailing slash on `BUNNY_CDN_URL`/`BUNNY_STORAGE_ENDPOINT`), Sentry
  (errors + source maps), Ola Maps (autocomplete + reverse geocode).
- GitHub repo public at https://github.com/Koushikbalusu/kirana-app, all 4
  branches pushed, `main` (default branch) kept fast-forwarded to `dev`.
- Deployed to Vercel production: **https://kirana-app-eight.vercel.app**
- `npm run build` and `npx tsc --noEmit` pass clean.

## Theme system
Class-based dark mode (`@custom-variant dark (&:where(.dark, .dark *));` in
`globals.css`) instead of following `prefers-color-scheme` automatically.
Default is light. Toggle button in both the customer header and the
admin/delivery/superadmin `RoleShell`. Persisted via the `kirana-ui`
Zustand store; applied before hydration via an inline script in
`src/app/layout.tsx` to avoid a flash of the wrong theme.

## Resolved gotchas (kept here so they don't get rediscovered)
- **Ola Maps domain whitelist**: Krutrim Cloud's "Allowed Domains" field
  expects **bare domains** (`kirana-app-eight.vercel.app`), not full origins
  with `https://` or a trailing slash. Also: typing into the field isn't
  enough, the **Save** button must be clicked.
- **Stale Zustand-persist cache**: browsers that visited before certain
  seed-data fields existed keep the old cached shape in `localStorage`
  forever unless a `merge` function reconciles it — see
  `src/stores/orderStore.ts`. Products/categories/users no longer have
  this problem since they moved off Zustand entirely.
- **Generic MT mistranslates colloquial grocery names**: fixed with a
  curated glossary checked before MT — see
  `src/lib/i18n/grocery-glossary.ts`.
- **Next.js static-caches server-fetched pages by default**: any new page
  doing a DB fetch needs `export const dynamic = "force-dynamic"` unless
  its layout already forces dynamic rendering via `getSession()`/`cookies()`
  (true for everything under `(admin)`/`(delivery)`/`(superadmin)`).
- **Server Actions are directly callable regardless of which page renders
  them** — page-level route gating (`src/proxy.ts`) does NOT protect a
  Server Action from being invoked directly by someone who knows it
  exists. Every mutating action needs its own `requireStaffSession()` (or
  equivalent) check. Audited and fixed for products/categories/upload in
  this pass — **any new mutating Server Action must include this check**,
  it will not be caught by anything else.

## Known deferred items / accepted risk (flagged, not fixed — time-boxed)
- **Order integrity**: order placement is still entirely client-side
  (Zustand, not a DB-backed Server Action) and trusts whatever price the
  browser sends — nothing recomputes totals server-side against actual
  product prices. Not exploitable for real money yet since orders aren't
  persisted anywhere authoritative, but this must be fixed when orders
  move to the DB (recompute price/total server-side from the live product
  row, never trust the client's number).
- **Maps/translate API routes have no auth** (`/api/maps/*`,
  `/api/translate`) — intentionally public since customers need them
  pre-login, but that also means anyone can hit them to burn through the
  Ola Maps/Google Translate free quota. Rate limiting exists on upload and
  login/identify but not on these. Low risk at current scale, worth adding
  if usage grows.
- **`STAFF` role is defined but has no creation path** — only
  `DELIVERY_PARTNER` accounts can currently be created via the admin UI;
  there's no UI to create additional `ADMIN`/`STAFF`/`SUPERADMIN` accounts
  (only the 3 seeded demo ones exist for those roles). Worth adding a
  general "manage staff accounts" page if more than one admin is needed.
- **True multi-store switching** isn't built — superadmin has full admin
  capability but it's scoped to the single seeded store (`DEFAULT_STORE_ID`
  in `src/lib/constants.ts`). Multi-tenant would need a store-context
  selector plumbed through every product/category/order query, which is a
  bigger refactor than this pass covered.
- Orders and delivery-assignment state still live in Zustand
  (client-side, localStorage-persisted), not the DB. Schema exists in
  `src/lib/db/schema/orders.ts`, `order-items.ts`, `deliveries.ts` for
  whenever this gets migrated.
- GitHub Actions CI, branch protection rules — not configured yet.
- Meilisearch — intentionally deferred, MVP uses client-side substring
  filtering over the fetched product list (not even Postgres `pg_trgm` yet
  — that's also still pending).
- Real Capacitor/Android APK build — the site has a download section, but
  the actual `.apk` asset is a placeholder until Phase 2.
- i18n (EN/Telugu) pass across customer + delivery UI (currently EN/TE
  toggle exists but translation coverage is partial).

## Next (in order)
1. Migrate orders to real Drizzle Server Actions with server-side price
   recomputation (closes the order-integrity gap above).
2. Add rate limiting to `/api/maps/*` and `/api/translate`.
3. Build a general staff-account management page (create ADMIN/STAFF
   accounts, not just delivery partners).
4. Wire GitHub Actions CI + branch protection rules.
5. Build the real Capacitor APK and replace the placeholder download link.
6. Finish the i18n pass across customer + delivery UI.

**Update this file at the end of every work session.**
