# Kirana Commerce System

Multilingual (EN/Telugu) web app + Android wrapper that digitizes WhatsApp/manual
kirana store ordering into structured digital ordering & delivery management —
without changing the underlying business operations. Four roles: Superadmin,
Admin (store owner/staff), Delivery Partner, Customer.

## Tech stack (summary — full rationale in @docs/TECH_STACK.md)

Next.js 15 App Router + TypeScript · Neon PostgreSQL 17 + Drizzle ORM ·
Better Auth (admin/staff/delivery/superadmin) + phone-based silent identify
(customers) · Upstash Redis (rate limits, cart, sessions) · Sharp + Bunny
Storage/CDN (images) · Ola Maps (autocomplete/geocoding) + Leaflet/OSM (map
display) + Google Maps deep link (nav only) · Sentry (errors) · Tailwind v4 +
Radix UI + Zustand + React Hook Form/Zod · PWA now, Capacitor/Android later ·
Search: Postgres `pg_trgm` now, self-hosted Meilisearch later.

## Visual style

Minimalistic **greyscale only** — white/grays/black, no color accents — for
now. Fully responsive: mobile-first, but verified correct at tablet and
desktop breakpoints too, never mobile-only.

## Coding conventions

See @.claude/CONVENTIONS.md for naming, structure, and style rules.

## Git workflow

See @.claude/GIT_WORKFLOW.md for the 4-branch strategy, commit format, and
branch protection rules. **Default branch is `dev`**, not `main`.

## Docs (read these before making changes)

- @docs/PROJECT_PLAN.md — full feature list, user flows, data models, NFRs
- @docs/ARCHITECTURE.md — system architecture and data flow
- @docs/TECH_STACK.md — every stack choice with the "why," including decisions
  that were reversed mid-brainstorm (e.g. Google Maps → Leaflet, Meilisearch
  Cloud → Postgres pg_trgm)
- @docs/PLATFORM_SETUP.md — step-by-step signup guide for the 5 external
  services (Neon, Upstash, Ola Maps, Bunny, Sentry) — user-run, not automatable
- @docs/CURRENT_STATE.md — **update this after every work session**: what's
  built, in progress, and next
- @docs/DECISIONS.md — append-only ADR log for architectural decisions

## Rules for this repo

- Do not implement Meilisearch yet — keep `src/lib/search/` swappable and
  degrade gracefully without it configured.
- Do not build the Capacitor/Android wrapper's real native build yet — a
  download-link placeholder on the site is fine until Phase 2.
- Never commit `.env.local`; only `.env.example` with empty placeholders.
- Admin panel UI can stay English-only for now; customer + delivery partner
  UI need EN/Telugu from the start.
- Every backend integration (DB, Redis, Bunny, Ola Maps, Sentry) must degrade
  gracefully when its env vars are absent — never crash the whole app.
