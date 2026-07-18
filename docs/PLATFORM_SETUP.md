# Platform Setup Guide

Run these yourself, one at a time, and paste the resulting values into
`.env.local` (never into any doc, chat, or commit). See @TECH_STACK.md for
the full list of expected variable names.

## 1. Neon (PostgreSQL)
1. Sign up at neon.tech.
2. New project, Postgres **17**, region **AWS ap-southeast-1 (Singapore)**.
3. Create branches `dev`, `prod`, `prod-dev` off the default `production`
   branch (keep `production` named as-is — Neon ties "always warm" compute
   to that specific name).
4. Copy the pooled connection string → `DATABASE_URL`; toggle pooling off,
   copy again → `DATABASE_URL_UNPOOLED`.

## 2. Upstash (Redis)
1. Sign up at upstash.com.
2. Create a Redis database, region **ap-southeast-1**, eviction **OFF**.
3. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from the
   REST API section.

## 3. Ola Maps
1. Credentials are created at **cloud.olakrutrim.com** (not a separate "Ola
   Maps" site).
2. Sign up / log in, go to Credentials / KMS section, create a new API key.
3. In **Allowed Domains**, enter **bare domains only** — no `https://`
   prefix, no trailing slash (their own placeholder shows the expected
   format: `example.com, *.example.com`). e.g.
   `localhost,localhost:3000,kirana-app-eight.vercel.app`. **Click Save** —
   typing into the field alone doesn't persist it.
4. Copy the key → `NEXT_PUBLIC_OLA_MAPS_API_KEY` (also `OLA_MAPS_API_KEY` if
   calling Ola Maps server-side too).
5. Server-side calls (ours run through `/api/maps/*` Next.js routes, not
   the browser) don't send a browser `Origin` header naturally, so
   `src/lib/maps/ola.ts` sends a fixed one matching the whitelisted domain.
   If the production domain ever changes, update `OLA_MAPS_ALLOWED_ORIGIN`
   env var (or the fallback default in that file) to match.

## 4. Bunny (Storage + CDN)
1. Sign up at bunny.net.
2. Create a **Storage Zone**, main region **Singapore only** — do not add
   extra replication regions, they're irreversible once added and
   unnecessary for India-only traffic.
3. Copy the Storage Zone name → `BUNNY_STORAGE_ZONE`; copy the Access
   Key/password → `BUNNY_STORAGE_API_KEY`; note the endpoint →
   `BUNNY_STORAGE_ENDPOINT` (e.g. `https://sg.storage.bunnycdn.com/<zone>`).
4. Create a **Pull Zone** linked to that storage zone, pricing zone **Asia &
   Oceania only**. Copy the hostname → `BUNNY_CDN_URL`.

## 5. Sentry
1. Sign up at sentry.io, choose **EU** data region.
2. Create a new project, platform **Next.js**, name it `kirana-app` for
   clarity.
3. Copy the DSN → `SENTRY_DSN` and `NEXT_PUBLIC_SENTRY_DSN`.
4. Note the org slug → `SENTRY_ORG`, project slug → `SENTRY_PROJECT`.
5. (Later, for CI source maps) Settings → Auth Tokens → create one with
   `project:releases` + `org:read` scopes → `SENTRY_AUTH_TOKEN`.
6. Do not run the `@sentry/wizard` install command until the Next.js
   scaffold is stable — running it against an empty/fresh project can mutate
   files awkwardly.

## Better Auth secret (no signup needed)
```bash
openssl rand -base64 32
```
→ `BETTER_AUTH_SECRET`

## Meilisearch — skip for now
Not part of MVP. When you reach production scale, self-host on Railway
(~$5/mo) or Fly.io and set `MEILI_HOST` / `MEILI_MASTER_KEY` then.

---

**Reminder:** `.env.local` is gitignored. Only `.env.example` (empty
placeholders) is ever committed.
