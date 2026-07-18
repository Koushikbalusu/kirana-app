# Architecture Decision Log

Append-only. Newest at the bottom.

## ADR-001: Drizzle ORM over Prisma
Drizzle chosen for lighter TS inference, no binary engine, schema-in-code —
cleaner on Vercel serverless deploys.

## ADR-002: Leaflet + OpenStreetMap over Google Maps JS API
Google Maps per-API free tier (10k/mo) gets expensive fast at multi-store
scale. Leaflet+OSM is free forever for map display; Google Maps is kept only
as a plain deep-link URL for delivery navigation (not a billed API call).

## ADR-003: Ola Maps over Geoapify/Google Places for autocomplete
Ola Maps (Krutrim) offers 5M free requests/month with better India/Telugu-
region address coverage than Geoapify (3k/day) or Google Places (paid after
10k/mo). Credentials are created at cloud.olakrutrim.com, not a separate
"Ola Maps" portal.

## ADR-004: Postgres pg_trgm over Meilisearch for MVP search
Meilisearch Cloud's free tier was discontinued ($30/mo now, 14-day trial).
Self-hosting alternatives (Railway, Fly.io) were investigated and all cost
real money once idle-credit trials expire; Typesense was also rejected for
its GPL-3.0 license (risk for a future commercial SaaS version). Postgres
`pg_trgm` + `ILIKE` costs $0, already lives in Neon, and covers English +
Telugu transliteration + most Telugu-script substring search. Revisit with
self-hosted Meilisearch (queued via Upstash QStash) once a paying store
justifies ~$5/mo.

## ADR-005: PWA before Capacitor/Android
Native app packaging deferred until the responsive web/PWA UX is validated
with a real kirana store and its customers, to avoid freezing architecture
around unvalidated UX. For the initial MVP demo submission, a download-link
placeholder stands in for the real native build.

## ADR-006: 4-branch git strategy mirrored 1:1 onto Neon DB branches
`main`(demo prod)/`dev`(demo dev, default)/`prod`(real prod)/`prod-dev`(real
dev), each backed by an identically-named Neon branch except `main`, which
maps to Neon's built-in `production` branch (kept unrenamed since Neon ties
"always-warm" compute status to that specific name).

## ADR-007: Greyscale-only visual palette for MVP
No color accents — white/grays/black only — to keep the UI minimalistic and
avoid a "clumsy betting-app" feel. Revisit once a brand identity is set.

## ADR-008: MVP built against mock/in-memory data first, real services wired incrementally
Given a hard submission deadline, the app is coded against the full
production architecture (Drizzle schema, Better Auth, Upstash client, Bunny
helpers, Ola Maps integration) but every integration point degrades
gracefully if its env vars aren't filled in yet, so the site stays fully
functional on mock data while the user provisions the 5 external platforms
in parallel via docs/PLATFORM_SETUP.md.
