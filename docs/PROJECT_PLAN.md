# Project Plan — Kirana Commerce System

## 1. App Description & Purpose

**Kirana Commerce System** — a multilingual (English + Telugu) web app (with
a later Android wrapper) that digitizes the existing WhatsApp/manual ordering
workflow used by Indian kirana (neighborhood grocery) stores, **without
changing the underlying business operations**. It is explicitly not a
hyperlocal instant-delivery clone (no live tracking, no route optimization)
— it's a structured, low-friction digital front-end over a manual/semi-manual
fulfillment process.

Target users:
- **Customers** — existing kirana store customers, rural/semi-urban,
  comfortable with WhatsApp-simple UX, mixed English/Telugu literacy, low
  tolerance for login friction.
- **Store owner/staff (Admin)** — runs day-to-day catalog, orders, delivery
  assignment, billing.
- **Delivery partner** — mobile-first, assigned-deliveries-only view, needs
  GPS/camera.
- **Superadmin** — platform operator managing multiple stores (multi-tenant),
  global config.

## 2. Feature List & Scope

Deferred (not MVP):
- **Search backend**: MVP ships with PostgreSQL `pg_trgm`/`ILIKE`;
  self-hosted Meilisearch is a post-MVP upgrade once a paying store justifies
  the cost.
- **Mobile**: MVP/validation ships as a PWA; native Android via Capacitor is
  Phase 2, after real users validate the web/PWA UX.

Everything else below is in scope for the MVP: "should contain all the
things mentioned... should not be clumsy... minimalistic."

**Explicitly excluded (any phase):** real-time delivery tracking, AI
recommendations, wallet system, instant/quick-commerce delivery logic,
automated route optimization, live vehicle tracking, complex inventory
automation / advanced ERP features.

### Core features by role

**Superadmin** — full system access, all admin capabilities, global config,
delivery rule templates, upload limits, language config, image handling
config, system-wide monitoring, store management, admin management
(multi-tenant: manages `stores`).

**Admin (store owner/staff)** — product/category/subcategory/variant/unit
management; order management; delivery management, delivery-partner
management, delivery-area configuration; payment proof verification;
billing & discounts; analytics; search/filtering; customer management;
manual order creation.

**Delivery Partner** — sees only assigned deliveries, map view of them,
customer details, Google Maps deep-link navigation, payment collection +
proof upload, delivery status updates, COD status updates.

**Customer** — browse/search products, cart with quantity selection,
delivery-or-pickup choice, address management (GPS / map-pin / manual),
per-item notes, order placement, order history, full multilingual UI.

### Cross-cutting systems

- **Auth**: customers get frictionless phone-number identification (no OTP,
  no password, silent account creation/autofill); admin/delivery/superadmin
  get standard secure login.
- **Products**: two types — Packaged (biscuits, soap, oil) and Loose (rice,
  flour, dal, cereals); trilingual naming (English name, Telugu
  transliteration, Telugu script — e.g. "Toor Dal" / "Kandi Pappu" /
  "కందిపప్పు"); optional variants (250g/500g/1kg/5kg); configurable quantity
  system (unit, min qty, step size, optional max qty; supported units: KG,
  Gram, Liter, ml, Piece, Packet, Sack, Dozen, custom); editable pricing
  (variant-wise, loose-quantity, admin override); availability status (In
  Stock / Out of Stock / Hidden); optional per-item customer notes (e.g.
  "fine grind," "small onions only").
- **Categories**: categories + subcategories, used for grouping and search
  filters.
- **Search**: multilingual (English, Telugu transliteration, Telugu script),
  typo-tolerant, fuzzy, fast — see docs/TECH_STACK.md for MVP vs production.
- **Cart**: add/remove, quantity updates, variant selection, loose-quantity
  input, item notes, price calc, delivery/pickup choice.
- **Address**: three input methods — current GPS, pick-on-map (drag pin),
  manual entry (house number, area, landmark, notes e.g. "near temple,"
  "opposite water tank"). Target UX: instant-commerce style — type a query,
  get a dropdown, tap a suggestion, pin drops on map, drag to fine-tune,
  fill house number/landmark manually.
- **Delivery area**: city-based (allowed cities/pincodes/mandal filtering) or
  radius-based (configurable km, e.g. 70/100km).
- **Orders**: two types — Home Delivery, Store Pickup, each with its own
  status machine:
  - Pickup: Placed → Ready for Pickup → Picked Up → Cancelled
  - Delivery: Placed → In Transit → Delivered → Cancelled
  - Features: filters, search, history, status management, delivery
    assignment, manual order creation, billing adjustments, customer
    instructions.
- **Delivery management**: admin sees a map of all pending delivery points
  with manual grouping/assignment support; delivery partner sees only their
  assigned deliveries with map + Google Maps deep-link navigation.
- **Billing**: automatic total calc, delivery charges, optional bag charges,
  item-wise discount, total-order discount, manual price override, billing
  notes.
- **Payment**: modes = Cash, UPI, Bank Transfer; status = Pending, Paid;
  proof system = multi-image upload (camera or file), configurable upload
  limits, admin verification.
- **Delivery charges / bag system**: distance-based and/or bag-count-based,
  admin-configurable; bag system supports free-above-order-value logic.
- **Analytics dashboard**: total orders, pending deliveries,
  delivery-vs-pickup stats, payment-mode stats, filters, search, paginated
  order views.
- **Multilingual system**: English + Telugu across customer app, admin
  panel, delivery partner app (admin panel may stay English-only for MVP —
  customer + delivery UI need translation first).
- **Image management**: compression, resizing, WebP conversion, thumbnail
  generation, optimized mobile loading, storage optimization (Sharp
  pipeline before upload to Bunny).

## 3. User Flows

**Customer checkout:** phone entry (silent identify/autofill) → delivery-or-
pickup choice → if delivery: pick saved address or open the 3-mode Location
Picker and save it → order summary (items, delivery charge, total) →
payment mode selection → order placed (status PLACED, payment PENDING) →
redirect to order confirmation/detail page.

**Admin:** log in → dashboard (analytics) → manage products/categories
(image upload + variants) → view/filter orders → open an order to adjust
billing, view payment proof, update status → view delivery map of pending
deliveries → assign a delivery partner.

**Delivery partner:** log in → dashboard lists only assigned,
not-yet-delivered orders → open one → customer name/phone/address/map pin →
"Navigate" (Google Maps deep link) → mark In Transit → collect payment
(camera proof upload if needed) → mark Delivered / confirm COD.

**Superadmin:** log in → manage stores (multi-tenant) → manage admins →
global settings (upload limits, language config, delivery rule templates).

## 4. System Architecture

See @ARCHITECTURE.md.

## 5. Tech Stack

See @TECH_STACK.md.

## 6. Data Models

- **`stores`**: id, name, slug, settings (JSON), active flag, created_at
  *(multi-tenant root — Superadmin scope)*
- **`users`**: id, store_id (FK), email, role enum (`ADMIN`, `STAFF`,
  `DELIVERY_PARTNER`, `SUPERADMIN`), name, created_at
- **`customers`**: id, phone (unique), name, created_at
- **`addresses`**: id, customer_id (FK), label, house_number, area,
  landmark, notes, lat, lng, is_default
- **`categories`**: id, store_id, name_en, name_te, parent_id (self-FK for
  subcategories), sort_order
- **`products`**: id, store_id, category_id (FK), name_en,
  name_te_transliteration, name_te_script, description, type enum
  (`PACKAGED`, `LOOSE`), unit, min_qty, step_size, max_qty (nullable),
  base_price, status enum (`IN_STOCK`, `OUT_OF_STOCK`, `HIDDEN`), image_url,
  thumbnail_url, created_at
- **`variants`**: id, product_id (FK), label, price, stock_status
- **`orders`**: id, store_id, customer_id (FK), type enum (`DELIVERY`,
  `PICKUP`), status enum (`PLACED`, `IN_TRANSIT`, `DELIVERED`,
  `READY_FOR_PICKUP`, `PICKED_UP`, `CANCELLED`), address_id (FK, nullable),
  subtotal, delivery_charge, bag_charge, discount, total, payment_mode enum
  (`CASH`, `UPI`, `BANK_TRANSFER`), payment_status enum (`PENDING`, `PAID`),
  customer_notes, billing_notes, created_at
- **`order_items`**: id, order_id (FK), product_id (FK), variant_id (FK,
  nullable), quantity, unit_price, item_discount, item_notes
- **`deliveries`**: id, order_id (FK), partner_id (FK), assigned_at, status,
  delivered_at
- **`payment_proofs`**: id, order_id (FK), image_url, uploaded_by_role,
  verified, created_at

*(The Pickup vs Delivery status enums are merged into one shared `status`
enum on `orders`; application logic exposes only the subset relevant to the
order's `type`.)*

## 7. Non-Functional Requirements

- **Scalability**: Neon scale-to-zero + serverless connection pooling;
  Redis is HTTP-based (no persistent TCP) for Vercel serverless/edge.
- **Security**: secrets never committed; branch protection on `main`/`prod`;
  edge rate limiting on order placement, phone lookup, uploads.
- **Multilingual**: English + Telugu (transliteration and native script) is
  first-class across product data, search, and UI.
- **Rural-friendly UX**: "WhatsApp-like simplicity," no forced OTP/password
  for customers, minimal/clean visual design (not "clumsy like betting
  apps").
- **Offline/PWA**: service worker + installable manifest for Phase 1 mobile.
- **Cost discipline**: every service choice re-evaluated against genuine
  free tiers before committing spend.

## 8. Explicit Constraints/Assumptions

- Working MVP web app usable for demos, containing all spec'd features,
  minimalistic (not CSS-less, not clumsy).
- Multi-tenant from day one (`stores` table) even though initial rollout is
  one store.
- Admin panel can remain English-only for MVP.
- Do not implement Meilisearch yet — keep `src/lib/search/` swappable and
  gracefully degrading.
- Do not build Capacitor/Android for real yet — validate the PWA first.
- Do not run the Sentry install wizard until the Next.js scaffold is stable.
- 4-branch git strategy: `main` (demo prod) / `dev` (demo dev, default) /
  `prod` (real prod) / `prod-dev` (real dev), mapped 1:1 to Neon branches of
  the same name (except `main` ↔ Neon's `production`, kept unrenamed).
- Squash-merge only, auto-delete head branches, auto-merge allowed.

## 9. Open Questions

1. **Sentry project naming** — decide at provisioning time (`kirana-app`
   recommended).
2. **App/site name** — `kirana-app` used as working slug throughout; confirm
   as permanent or replace with a real product name later.
3. **Meilisearch self-host provider** — Railway (~$5/mo) vs Fly.io; decide
   only when that phase is actually reached.
