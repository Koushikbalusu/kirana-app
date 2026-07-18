# Current State

_Last updated: 2026-07-18_

## Done
- Full brainstorm/spec captured and structured into docs/ + CLAUDE.md +
  .claude/.
- Next.js 15 App Router + TypeScript + Tailwind v4 scaffold created.
- Original chat-export transcript archived as-is into docs/chat-export/
  (contains old plaintext secrets from a prior, unrelated setup attempt —
  do NOT reuse any of those values; user manages rotation independently).
- Core dependencies installed: Drizzle, Neon serverless driver, Better Auth,
  Upstash Redis + ratelimit, Zustand, React Hook Form + Zod, Leaflet/
  react-leaflet, Sentry, Sharp, Lucide.
- Greyscale Tailwind theme + base UI primitives.
- All four role route groups built with working flows against mock/
  in-memory data (customer catalog/cart/checkout, admin product/order/
  delivery views, delivery partner dashboard, superadmin store list).
- Android APK download entry point present on the site (placeholder until
  the real Capacitor build is produced — see below).
- `npm run build` and `npx tsc --noEmit` both pass clean; local dev-server
  smoke test confirmed 200 OK on `/`, `/admin`, `/delivery`, `/superadmin`,
  `/download-app`.
- Git repo initialized locally with all 4 branches (`main`, `dev` [default,
  checked out], `prod`, `prod-dev`), one commit reachable from all of them.

## Not started / deferred
- **Vercel deployment is blocked on user login** — `vercel` CLI requires an
  interactive browser OAuth flow that can't be completed by the agent. Run
  `vercel login` yourself, then the deploy can proceed.
- GitHub repo creation, SSH remote, branch protection rules, CI status
  checks, GitHub secrets.
- All 5 external platforms (Neon, Upstash, Ola Maps, Bunny, Sentry): code
  is wired to read their env vars and degrades gracefully without them, but
  none are actually provisioned yet — see @PLATFORM_SETUP.md, user-run.
- Real Drizzle migration against a live Neon database (schema files exist,
  no live DB to migrate against yet).
- Meilisearch — intentionally deferred, MVP uses Postgres `pg_trgm` (and
  even that needs a live DB; mock data path is in place meanwhile).
- Real Capacitor/Android APK build — the site has a download section, but
  the actual `.apk` asset is a placeholder until Phase 2.

## Next (in order)
1. Provision the 5 platforms via @PLATFORM_SETUP.md, one at a time
   (Neon → Upstash → Ola Maps → Bunny → Sentry), filling `.env.local` as
   you go.
2. Run the first Drizzle migration once `DATABASE_URL` is live.
3. Wire Better Auth against the live DB; replace mock admin/delivery/
   superadmin login with real sessions.
4. Replace the in-memory product/order data path with real Drizzle queries.
5. Wire Upstash rate-limiting middleware, Bunny+Sharp upload pipeline, Ola
   Maps+Leaflet location picker, Sentry init as each service comes online.
6. `git init` + create the 4 branches, then create the GitHub repo and push
   (see @.claude/GIT_WORKFLOW.md).
7. Deploy to Vercel; get the live URL.
8. Build the real Capacitor APK (remote mode against the deployed URL) and
   replace the placeholder download link.
9. i18n (EN/Telugu) pass across customer + delivery UI.

**Update this file at the end of every work session.**
