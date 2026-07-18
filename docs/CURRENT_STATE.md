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
- Admin: delivery partner add/list, product create/edit forms with variant
  manager + image upload, category management.
- Leaflet + Ola Maps location picker (GPS/autocomplete/pin-drop) in
  checkout; admin delivery cluster map; read-only map on delivery partner
  view. Google Maps deep link for navigation.
- Live Neon Postgres (11 tables migrated), Upstash Redis (rate limiting),
  Bunny Storage/CDN + Sharp image pipeline all provisioned and wired —
  env vars synced to Vercel production/preview/development.
- Sentry instrumentation files in place (`src/instrumentation.ts`,
  `src/instrumentation-client.ts`) — no-op until `SENTRY_DSN` is set.
- Git repo initialized locally with all 4 branches (`main`, `dev` [default,
  checked out], `prod`, `prod-dev`).
- Deployed to Vercel production: **https://kirana-app-eight.vercel.app**
- `npm run build` and `npx tsc --noEmit` pass clean; full auth flow
  (login → session → role-gated access → cross-role block) verified against
  the live production deployment.

## Known gap — action needed from user
- **Ola Maps calls are still blocked** ("Domain ... is not allowed"). Our
  server-side calls send a fixed `Origin: https://kirana-app-eight.vercel.app`
  header (see `src/lib/maps/ola.ts`), but that exact domain still needs to be
  added to the allowed-domains list on the Ola Maps credential at
  `cloud.olakrutrim.com` → Credentials/KMS → your key. No code change needed
  once that's done — just redeploy isn't even required, it's a live API call.

## Not started / deferred
- GitHub repo creation, SSH remote, branch protection rules, CI status
  checks, GitHub secrets — repo is local-only so far.
- Sentry DSN not yet provisioned (org/project/tokens all pending).
- Meilisearch — intentionally deferred, MVP uses Postgres `pg_trgm`.
- Real Capacitor/Android APK build — the site has a download section, but
  the actual `.apk` asset is a placeholder until Phase 2.
- Order placement is still client-side (Zustand store), not a Drizzle-backed
  Server Action — mock/local-storage data, not written to the live Neon DB
  yet. Same for products/categories/delivery partners (all Zustand, not DB).

## Next (in order)
1. Whitelist `https://kirana-app-eight.vercel.app` on the Ola Maps credential
   (see gap above) — unblocks live autocomplete/geocoding immediately.
2. Provision Sentry (see @PLATFORM_SETUP.md) — DSN, org, project, auth token.
3. Migrate the customer/order/product/category data path from Zustand mock
   stores to real Drizzle queries against the live Neon DB (schema already
   exists in `src/lib/db/schema/`).
4. Create the GitHub repo, push branches, wire branch protection + CI.
5. Build the real Capacitor APK (remote mode against the deployed URL) and
   replace the placeholder download link.
6. i18n (EN/Telugu) pass across customer + delivery UI (currently EN/TE
   toggle exists but translation coverage is partial).

**Update this file at the end of every work session.**
