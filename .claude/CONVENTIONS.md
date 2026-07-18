# Coding Conventions

- TypeScript everywhere; Zod schemas shared between React Hook Form and
  Drizzle inserts — define once, reuse both places.
- Route groups per role: `(customer)`, `(admin)`, `(delivery)`, `(superadmin)`
  — do not mix role-specific UI outside its group.
- Server Actions (`src/actions/`) for mutations; API routes (`src/app/api/`)
  only for webhooks/auth/upload/search proxy.
- Components: `src/components/ui` = unstyled Radix-based primitives only;
  role folders (`customer/`, `admin/`, `delivery/`) hold feature components;
  `shared/` only for things genuinely used across 2+ roles.
- Product name fields are always a trio: `name_en`, `name_te_transliteration`,
  `name_te_script` — never add a product-facing text field without
  considering whether it needs the same trio.
- Money values: store as integers (paise) or `numeric`, never floats.
- Keep `src/lib/search/*` behind an interface that no-ops gracefully if
  Meilisearch env vars are absent — MVP runs on Postgres pg_trgm only.
- Visual style: greyscale only (Tailwind gray scale + black/white), no color
  accents. Fully responsive — verify sm/md/lg/xl breakpoints, not just
  mobile.
- Every external integration (DB, Redis, Bunny, Ola Maps, Sentry) must
  degrade gracefully when unconfigured — check for the env var, fall back,
  never throw an unhandled error that takes down the whole app.
