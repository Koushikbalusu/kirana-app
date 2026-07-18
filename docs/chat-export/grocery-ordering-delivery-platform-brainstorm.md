<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# \# Grocery Ordering \& Delivery Management Platform (Kirana Commerce System)

## Core Goal

Digitize the existing WhatsApp/manual kirana store ordering and delivery workflow into a multilingual web app without changing the actual business operations.

---

# User Roles

## 1. Superadmin

- Full system access
- All admin capabilities
- Global configurations
- App settings
- Delivery rule templates
- Upload limits
- Language configurations
- Image handling configurations
- System-wide monitoring
- Store management
- Admin management

---

## 2. Admin (Store Owner/Store Staff)

- Product management
- Category/subcategory management
- Variant management
- Unit management
- Order management
- Delivery management
- Delivery partner management
- Delivery area configuration
- Payment proof verification
- Billing \& discounts
- Analytics
- Search/filtering
- Customer management
- Manual order creation

---

## 3. Delivery Partner

- Assigned deliveries only
- Delivery map view
- Customer details
- Google Maps navigation
- Payment collection
- Payment proof upload
- Delivery status updates
- COD status updates

---

## 4. Customer

- Browse products
- Search products
- Cart system
- Quantity selection
- Delivery/pickup selection
- Address management
- Customer notes
- Order placement
- Order history
- Multilingual experience

---

# Authentication System

## Customer Authentication

- No forced OTP
- No password system initially
- Guest-style ordering
- Phone number based customer identification
- Silent customer account creation
- Existing customer autofill using phone number


## Admin/Superadmin/Delivery Partner Authentication

- Standard secure login system

---

# Product System

## Product Types

### Packaged Products

Examples:

- Biscuits
- Soap
- Oil packets


### Loose Products

Examples:

- Rice
- Flour
- Dal
- Cereals

---

# Product Fields

## Product Naming

- English Name
- Telugu Transliteration
- Telugu Script

Example:

- Toor Dal
- Kandi Pappu
- కందిపప్పు

---

# Product Variants (Optional)

Examples:

- 250g
- 500g
- 1kg
- 5kg

Applicable for:

- packaged products
- loose products

---

# Quantity System

- Configurable units
- Min quantity
- Step size
- Optional max quantity


## Supported Units

- KG
- Gram
- Liter
- ml
- Piece
- Packet
- Sack
- Dozen
- Custom units

---

# Product Pricing

- Editable anytime
- Variant-wise pricing
- Loose quantity pricing
- Admin override support

---

# Product Availability Status

- In Stock
- Out of Stock
- Hidden

---

# Product Notes

Optional per-item customer notes.

Examples:

- Fine grind
- Small onions only
- Fresh stock

---

# Category System

## Features

- Categories
- Subcategories
- Product grouping
- Search filters

---

# Search System

## Features

- Multilingual search
- English search
- Telugu transliteration search
- Telugu script search
- Typo tolerance
- Fuzzy search
- Fast search indexing

---

# Cart System

## Features

- Add/remove items
- Quantity updates
- Variant selection
- Loose quantity input
- Item notes
- Price calculation
- Delivery/pickup selection

---

# Address System

## Address Input Methods

- Current GPS location
- Select location from map
- Manual address entry


## Manual Address Fields

- House number
- Area
- Landmark
- Notes

Examples:

- Near temple
- Opposite water tank

---

# Delivery Area System

## Delivery Restriction Modes

### City Based

- Allowed cities
- Allowed pincodes
- Mandal/city filtering


### Radius Based

- Configurable KM limit

Examples:

- 70km
- 100km

---

# Order System

## Order Types

- Home Delivery
- Store Pickup

---

# Pickup Order Statuses

- Placed
- Ready for Pickup
- Picked Up
- Cancelled

---

# Delivery Order Statuses

- Placed
- In Transit
- Delivered
- Cancelled

---

# Order Features

- Order filters
- Order search
- Order history
- Status management
- Delivery assignment
- Manual order creation
- Billing adjustments
- Customer instructions

---

# Delivery Management System

## Admin Delivery View

- All pending deliveries map
- Delivery location points
- Manual grouping support
- Delivery assignment

---

# Delivery Partner Features

- Assigned deliveries only
- Map locations
- Google Maps navigation
- Delivery updates
- Payment collection updates

---

# Navigation

- Google Maps deep linking support

---

# Billing System

## Features

- Automatic total calculation
- Delivery charges
- Optional bag charges
- Item-wise discount
- Total order discount
- Manual price override
- Billing notes

---

# Payment System

## Payment Modes

- Cash
- UPI
- Bank Transfer

---

# Payment Status

- Pending
- Paid

---

# Payment Proof System

## Features

- Multiple image upload
- Camera upload support
- Payment screenshot upload
- Cash proof image upload
- Configurable upload limits
- Admin verification

---

# Delivery Charges

## Configurable Logic

- Distance based
- Bag count based
- Manual configurable rules

---

# Bag System (Planned/Configurable)

- Bag type
- Bag pricing
- Free above order value
- Configurable rules

---

# Analytics Dashboard

## Features

- Total orders
- Pending deliveries
- Delivery vs pickup statistics
- Payment mode statistics
- Filters
- Search
- Order pages

---

# Multilingual System

## Supported Languages

- English
- Telugu


## Applies To

- Customer app
- Admin panel
- Delivery partner app

---

# Image Management System

## Features

- Image compression
- Image resizing
- WebP conversion
- Thumbnail generation
- Optimized mobile loading
- Storage optimization

---

# Customer Experience Goals

- Simple ordering flow
- Rural-friendly UX
- Low-friction usage
- No complex login process
- WhatsApp-like simplicity
- Multilingual accessibility

---

# Excluded Features (Currently Avoided)

- Real-time delivery tracking
- AI recommendations
- Wallet system
- Instant delivery logic
- Automated route optimization
- Live vehicle tracking
- Complex inventory automation
- Advanced ERP features

---

# Overall App Type

A multilingual kirana commerce and delivery management platform designed for Indian grocery stores transitioning from WhatsApp/manual ordering to structured digital ordering and delivery operations.

i want to make a working  mvp (web site,web app) just for demo  but should contain all the things mentioned   but it should not be css less,it should be minimalistic for now (basically what i am saying is it should not be clumsy as betting apps and all)

now i want to decide the tech stack(both for website and web app)  (both for demo and the original) including database,cdn(best) etc etc
may be neon db postgress sql along with prisma and  bunny net for cdn and images and all

This is a well-thought-out product spec. Here's a comprehensive tech stack recommendation for both your **MVP demo** and **production-ready** versions, covering every layer you need.

***

## Stack Philosophy

Your system has three distinct apps (Customer storefront, Admin panel, Delivery partner app) sharing one backend. The goal is **one monorepo, one deployment, zero infrastructure headaches** — especially for the demo stage.

***

## Framework — Next.js 15 (App Router)

**Next.js is the right call for this system.** Your app needs SSR for the customer-facing product catalog (SEO, fast first paint on mobile), API routes for the backend logic, and server actions for forms — all in one framework. SvelteKit is faster on raw metrics, but Next.js wins here because of its ecosystem maturity, better support for complex role-based auth, and the wealth of Indian startup devs who know it.[^1_1][^1_2]

- **App Router** for layouts, server components, and nested routing per role (`/admin`, `/delivery`, `/store`)
- **Server Actions** for order placement, cart mutations, and payment proof uploads — no separate API layer needed for most operations
- **API Routes** for webhook-style operations (delivery status updates from partner app)

***

## Database — Neon (PostgreSQL) + Drizzle ORM

Your Neon + PostgreSQL instinct is correct. Use **Drizzle** instead of Prisma — it has better TypeScript inference, generates lighter queries, and the schema lives directly in your codebase which is cleaner for a solo/small team.[^1_3]

Neon's key advantages for this project:[^1_4][^1_5]

- **Database branching** — spin up a branch for each demo client without duplicating infrastructure
- **Scale to zero** — the MVP demo costs nearly nothing when idle
- **Instant provisioning** — a new store gets a branch in seconds during demos
- **Serverless-compatible** connection pooling via `@neondatabase/serverless`

**Schema highlights for your system:**

- `stores` table (multi-tenant, Superadmin manages this)
- `products` with `name_en`, `name_te_transliteration`, `name_te_script` columns (your trilingual naming)
- `product_variants` with pricing per variant
- `orders` with a `type` enum (`DELIVERY | PICKUP`) and `status` machine
- `delivery_partners` linked to `orders` via assignment table
- `payment_proofs` storing BunnyCDN image URLs

***

## CDN \& Image Storage — BunnyCDN + Bunny Storage

Your BunnyCDN instinct is also correct. This is the best value CDN for an Indian startup.[^1_6][^1_7]


| Layer | Service | Cost |
| :-- | :-- | :-- |
| Image storage | Bunny Storage | \$0.01/GB/month |
| CDN delivery | BunnyCDN | From \$0.002/GB (Asia PoPs are cheap) |
| Image optimization | Bunny Optimizer | \$9.50/month flat, unlimited transforms [^1_8] |

For your use case, Bunny Optimizer handles the **WebP conversion, resizing, thumbnail generation, and mobile compression** you listed — all at one fixed price regardless of traffic. Payment proof images, product photos, and category thumbnails all go through this pipeline. Upload directly to Bunny Storage from the server (Next.js API route), then serve via CDN URL.

***

## Authentication — Better Auth

Use **Better Auth** (not NextAuth/Auth.js). It's newer, has first-class support for multi-role sessions, and handles your split auth requirements cleanly:

- **Customer flow**: Phone number → silent account creation, no password — implement as a "magic link by SMS" or just phone-number lookup with autofill (using Twilio/MSG91 for Indian SMS OTP when you're ready, skippable for MVP demo)
- **Admin/Delivery Partner flow**: Email + password with role-based session tokens
- Session stored in **cookies** (not localStorage — avoid for your web app's iframe-safe needs)

***

## Search — Meilisearch (Self-hosted or Meilisearch Cloud)

Your multilingual search requirement (English + Telugu transliteration + Telugu script + typo tolerance + fuzzy search) **cannot be done well with PostgreSQL full-text search alone**. Meilisearch handles all of this natively:

- Configure Telugu as a custom language tokenizer
- Typo tolerance and fuzzy search are built-in
- Sync product catalog to Meilisearch index on every product save via a Drizzle after-hook
- For MVP demo: use **Meilisearch Cloud free tier** (100k documents, enough for any kirana store)

***

## Deployment — Vercel

Vercel is the natural home for Next.js. For demo: free tier is sufficient. For production: Pro plan (~\$20/month) gives you edge functions in Mumbai (`ap-south-1`), which pairs directly with Neon's Asia region for low-latency queries.[^1_9]

***

## Maps — Google Maps JS API

For the delivery map view (admin sees all pending delivery points, delivery partner navigates), use:

- **Google Maps JavaScript API** for the admin cluster map view
- **Google Maps deep links** (`https://maps.google.com/?q=lat,lng`) for the delivery partner navigation button — no SDK needed, just a link
- Store coordinates as `POINT` geometry in PostgreSQL using PostGIS extension (Neon supports this)

***

## Full Stack at a Glance

| Layer | MVP Demo | Production |
| :-- | :-- | :-- |
| **Framework** | Next.js 15 App Router | Same |
| **Database** | Neon Free Tier (branching for demos) | Neon Pro |
| **ORM** | Drizzle ORM | Same |
| **Auth** | Better Auth | Same + SMS OTP (MSG91) |
| **CDN/Images** | BunnyCDN + Bunny Storage | Same + Bunny Optimizer (\$9.50/mo) |
| **Search** | Meilisearch Cloud (free) | Meilisearch Cloud (paid) or self-hosted |
| **Deployment** | Vercel Hobby | Vercel Pro (Mumbai edge) |
| **Maps** | Google Maps JS API | Same |
| **UI** | Tailwind CSS v4 + Radix UI primitives | Same |
| **State** | Zustand (cart, UI state) | Same |
| **Forms** | React Hook Form + Zod | Same |
| **Email/SMS** | — | MSG91 (India, cheap) |
| **Monorepo** | Single Next.js app, route groups per role | Same |


***

## Route Architecture (Single App, Multi-Role)

```
app/
├── (customer)/           → Public storefront, product browse, cart, checkout
├── (admin)/              → Store owner dashboard, products, orders, delivery mgmt
├── (delivery)/           → Delivery partner mobile-first view
├── (superadmin)/         → Global config, store management
└── api/                  → Webhooks, image upload handlers
```

Route groups keep each role's UI isolated while sharing the same database, auth, and CDN infrastructure. This is what makes Next.js the right choice over a separate frontend + backend split for your MVP stage.

***

## What to Skip for the MVP Demo

- **MSG91 SMS** — mock the OTP, use phone number as identifier silently
- **Bunny Optimizer** (\$9.50/mo) — skip until you have real image volume; just serve raw uploaded images
- **PostGIS geometry** — store lat/lng as two `DECIMAL` columns initially; migrate to PostGIS for production radius-based delivery filtering
- **Meilisearch Cloud** — use PostgreSQL `ILIKE` search for the MVP, swap to Meilisearch before production

This gives you a clean, shippable demo without paying for anything beyond Neon's free tier and Vercel's hobby plan.
<span style="display:none">[^1_10][^1_11][^1_12][^1_13][^1_14][^1_15]</span>

<div align="center">⁂</div>

[^1_1]: https://www.linkedin.com/posts/vishal-prajapat-1b5625256_nextjs-vs-sveltekit-in-2025-which-framework-activity-7363264788874899457-_jjL

[^1_2]: https://dev.to/paulthedev/sveltekit-vs-nextjs-in-2026-why-the-underdog-is-winning-a-developers-deep-dive-155b

[^1_3]: https://www.reddit.com/r/nextjs/comments/1lupqdk/supabase_or_neon_for_next_js_project/

[^1_4]: https://dev.to/showcase/neon/nextjs-tutorial-2025

[^1_5]: https://railway.com/deploy/nextjs-with-neon-postgres

[^1_6]: https://theimagecdn.com/docs/image-cdns-for-startups

[^1_7]: https://www.cdnhandbook.com/providers/bunnycdn/

[^1_8]: https://bunny.net/pricing/optimizer/

[^1_9]: https://seenode.com/blog/top-managed-postgresql-services-compared

[^1_10]: https://neon.com

[^1_11]: https://community.vercel.com/t/how-to-choose-between-supabase-planetscale-and-neon-for-vercel-projects/36413

[^1_12]: https://tymonglobal.com/blogs/next-js-vs-sveltekit-vs-qwik-best-framework-in-2025/

[^1_13]: https://www.wolk.work/blog/posts/rapid-development-with-next-js-fastapi-vercel-neon-postgres

[^1_14]: https://dev.to/dataformathub/neon-postgres-2025-why-the-new-instant-compute-changes-everything-2jog

[^1_15]: https://bunny.net/optimizer/


---

# ok how can we convert this into an working android app  (not building the entire app from scratch but putting the website in the app itself but with all the permissions)

The cleanest approach for your use case is **Capacitor** — it wraps your existing Next.js web app into a native Android shell, gives you real device APIs (camera, GPS, storage), and produces a proper APK you can install or publish to the Play Store — without rewriting a single line of your app logic.[^2_1][^2_2]

***

## Two Modes: Which One to Use

| Mode | How it works | Best for |
| :-- | :-- | :-- |
| **Embedded build** | Bundles your `next build` static export inside the APK | Offline-capable demo, no server needed, works in airplane mode |
| **Remote server mode** | App shell loads your live Vercel URL inside a WebView | Always up-to-date, no re-deploy needed for content changes |

For your **MVP demo**, use **Remote server mode** — point Capacitor at your Vercel URL. The app loads your live web app but has native Android permissions layered on top. For **production**, switch to embedded or a hybrid (shell loads remote, with local fallback).

***

## Step-by-Step: Next.js → Android APK

### 1. Install Capacitor into your Next.js project

```bash
npm install @capacitor/core @capacitor/android
npm install -D @capacitor/cli
npx cap init "Kirana Commerce" com.yourstore.app --web-dir out
```


### 2. Configure `capacitor.config.ts` for remote mode (MVP demo)

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourstore.app',
  appName: 'Kirana Commerce',
  webDir: 'out',
  server: {
    url: 'https://your-app.vercel.app',  // your live Vercel URL
    cleartext: false,
  },
};
export default config;
```

When you're ready to embed the build locally, remove the `server.url` line and run `next build && next export` (static export).[^2_3]

### 3. Add Android platform

```bash
npx cap add android
npx cap sync
```

This creates the `android/` folder — a standard Android Studio project.[^2_2]

***

## All Permissions Your App Needs

Open `android/app/src/main/AndroidManifest.xml` and add these inside `<manifest>`:[^2_4]

```xml
<!-- Internet (mandatory for remote mode) -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- GPS / Location (customer address, delivery map) -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />

<!-- Camera (payment proof upload, delivery partner photos) -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" android:required="false" />

<!-- Storage (saving/reading uploaded payment screenshots) -->
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"
    android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
    android:maxSdkVersion="29" />

<!-- Vibration (order confirmation feedback) -->
<uses-permission android:name="android.permission.VIBRATE" />
```


***

## Capacitor Plugins to Install (Bridge Web → Native)

These replace browser API calls with real native functionality:[^2_5]

```bash
npm install @capacitor/geolocation    # GPS current position + map pin
npm install @capacitor/camera         # Payment proof photos, camera upload
npm install @capacitor/filesystem     # Save images to device
npm install @capacitor/app            # Back button handling (Android back nav)
npm install @capacitor/haptics        # Vibration on order placement
npm install @capacitor/network        # Detect offline → show graceful error
npm install @capacitor/status-bar     # Match status bar color to your UI theme
npm install @capacitor/splash-screen  # Branded launch screen
```

After any plugin install: `npx cap sync`

***

## Using the Plugins in Your Next.js Code

You call these in your existing Next.js components — Capacitor detects whether it's running in a browser or native Android and routes accordingly:[^2_6]

```ts
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';

// Customer address: get current GPS location
const getLocation = async () => {
  const pos = await Geolocation.getCurrentPosition();
  return { lat: pos.coords.latitude, lng: pos.coords.longitude };
};

// Delivery partner / payment proof: capture photo
const uploadProof = async () => {
  const photo = await Camera.getPhoto({
    quality: 80,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
  });
  // upload photo.dataUrl to BunnyCDN via your API route
};
```

Wrap these in a platform check so the same code works in the browser too:

```ts
import { Capacitor } from '@capacitor/core';
if (Capacitor.isNativePlatform()) {
  // use native plugin
} else {
  // use browser API (navigator.geolocation, <input type="file">)
}
```


***

## Build \& Generate APK

```bash
# Open Android Studio with the project
npx cap open android
```

Inside Android Studio:

- **Debug APK** (for demo installs): `Build → Build Bundle(s)/APK(s) → Build APK(s)` → outputs `app-debug.apk`
- **Release APK** (for Play Store): `Build → Generate Signed Bundle/APK` → requires a keystore

For the demo, send the `app-debug.apk` directly — recipients enable "Install from unknown sources" and install it like any APK.[^2_5]

***

## Key Considerations for Your App

- **Back button** — Install `@capacitor/app` and handle `App.addListener('backButton', ...)` to prevent accidental exits from the order flow; Android's hardware back button will try to close the WebView by default
- **Safe areas** — Add `<meta name="viewport" content="viewport-fit=cover">` and use CSS `env(safe-area-inset-*)` to avoid content hiding behind the Android status bar/notch
- **Delivery partner app** — Since that role is mobile-first and needs GPS + camera most, consider a separate Capacitor config/build flavor with a different `appId` (`com.yourstore.delivery`) so you can distribute it separately without publishing to the Play Store
- **Google Maps deep link** — No plugin needed; your existing `https://maps.google.com/?q=lat,lng` links open the native Google Maps app automatically from within the WebView
<span style="display:none">[^2_10][^2_11][^2_12][^2_13][^2_14][^2_15][^2_7][^2_8][^2_9]</span>

<div align="center">⁂</div>

[^2_1]: https://www.youtube.com/watch?v=jz2uBBzFMBA

[^2_2]: https://capgo.app/blog/transform-pwa-to-native-app-with-capacitor/

[^2_3]: https://malcmind.com/ProgrammingBlogs/build-progressive-web-app-nextjs

[^2_4]: https://capacitorjs.com/docs/android/configuration

[^2_5]: https://duranirving.com/articles/integrating-capacitor-nextjs-mobile-app-guide

[^2_6]: https://stackoverflow.com/questions/57040213/request-gps-permission-using-capacitor-ionic

[^2_7]: https://capacitorjs.com/docs/web/progressive-web-apps

[^2_8]: https://nextnative.dev/comparisons/pwa-vs-native-app

[^2_9]: https://stackoverflow.com/questions/63775273/capacitorjs-for-pwa-twa

[^2_10]: https://www.reddit.com/r/reactjs/comments/1m8dxuu/tauri_v2_vs_capacitor_which_is_better_for/

[^2_11]: https://www.scribd.com/document/896727766/Convert-Next-js-to-Android

[^2_12]: https://capacitorjs.com/docs/apis/geolocation

[^2_13]: https://nextnative.dev/blog/capacitor-mobile-app

[^2_14]: https://nextnative.dev/blog/react-js-for-mobile

[^2_15]: https://without.systems/progressive-web-to-native-mobile-with-capacitor


---

# this is the final stack right , isnt google maps expensive arent there any alternatives

Yes, your stack is confirmed and solid. And you're right to question Google Maps — **it can get expensive fast** once you go beyond the free tier. Here's the full picture:

***

## Google Maps True Cost (2025 Pricing)

Google replaced its old \$200/month blanket credit with **per-API free allowances**.  Each API has only 10,000 free requests/month — after that you pay:[^3_1]


| API | Free/month | Cost after free cap |
| :-- | :-- | :-- |
| Dynamic Maps (JS) | 10,000 | \$7.00 / 1,000 requests |
| Geocoding (address → coords) | 10,000 | \$5.00 / 1,000 requests |
| Directions API | 10,000 | ₹740 / 1,000 requests |
| Places Autocomplete | 10,000 | \$2.83 / 1,000 requests |

For a kirana store with multiple customers and delivery partners loading maps, checking addresses, and getting directions daily, you can hit 10,000 geocoding calls fast.  A store doing 100 deliveries/day = ~3,000 map loads/month minimum — fine for one store, but multiply by 10 stores in the demo and you're paying.[^3_2]

***

## Best Alternatives for Your Stack

### For the Map Display (Admin delivery view + customer address pin)

**Leaflet.js + OpenStreetMap tiles** — completely free, no API key, no usage limits.  Leaflet is the most mature open-source map library and works perfectly for showing delivery location pins and a cluster view of pending orders. This replaces Google Maps JS API for **all visual map rendering**.[^3_3]

```bash
npm install leaflet react-leaflet
```


### For Navigation Deep Links (Delivery partner "Open in Maps")

**No library needed.** Just use a plain deep link — Google Maps opens natively on Android if installed, falls back to browser:

```ts
const navigate = (lat: number, lng: number) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
```

This is **always free** — it's just a URL, not an API call.[^3_4]

### For Geocoding (Address → Coordinates)

**Nominatim (OpenStreetMap's geocoder)** — free, no key required, usage policy is 1 req/sec which is fine for a kirana store. For production with higher volume, use **Geoapify** (free tier: 3,000 requests/day) or **Positionstack** (free tier: 25,000/month).

### For Address Autocomplete (Customer address input)

**Geoapify Places API** — free tier gives 3,000 requests/day, covers address autocomplete with good India coverage. Much cheaper than Google Places (\$2.83/1,000 requests after 10k free).[^3_1]

***

## Revised Maps Stack (Zero Cost for MVP)

| Need | Old Stack | New Stack | Cost |
| :-- | :-- | :-- | :-- |
| Map display (admin/customer) | Google Maps JS API | **Leaflet + OSM tiles** | Free forever |
| Delivery navigation | Google Maps deep link | **Same deep link** | Free forever |
| Geocoding (lat/lng lookup) | Google Geocoding API | **Nominatim** (dev) / **Geoapify** (prod) | Free / freemium |
| Address autocomplete | Google Places API | **Geoapify Places** | Free up to 3k/day |
| GPS (current location) | Browser `navigator.geolocation` / Capacitor | **Same — `@capacitor/geolocation`** | Free |


***

## Updated Final Stack

Your screenshot stack is correct with just **one change** — replace Google Maps JS API:

- **Maps**: ~~Google Maps JS API~~ → **Leaflet.js + OpenStreetMap** (display) + **Google Maps deep link** (navigation, free)

Everything else in your stack stands exactly as shown. The only time you'd go back to Google Maps is if you need Places Autocomplete with very high accuracy for Indian pin codes — in that case, Google Maps is genuinely better, but Geoapify covers it for your scale.
<span style="display:none">[^3_10][^3_11][^3_12][^3_13][^3_14][^3_15][^3_16][^3_5][^3_6][^3_7][^3_8][^3_9]</span>

<div align="center">⁂</div>

[^3_1]: https://nicolalazzari.ai/articles/understanding-google-maps-apis-a-comprehensive-guide-to-uses-and-costs

[^3_2]: https://radar.com/blog/google-maps-api-cost

[^3_3]: https://leafletjs.com

[^3_4]: https://www.livechennai.com/detailnews.asp?newsid=67363

[^3_5]: image.jpg

[^3_6]: https://developers.google.com/maps/billing-and-pricing/pricing-india

[^3_7]: https://developers.google.com/maps/billing-and-pricing/india

[^3_8]: https://www.promaticsindia.com/blog/google-maps-api-pricing-and-options

[^3_9]: https://blog.containerize.com/top-5-open-source-google-maps-alternatives-in-2022/

[^3_10]: https://shyft.ai/tools/mapbox

[^3_11]: https://www.livechennai.com/detailnews.asp?catid=122\&newsid=67363\&nav=n

[^3_12]: https://www.geopostcodes.com/blog/open-street-map-alternative/

[^3_13]: https://www.oreateai.com/blog/navigating-mapbox-pricing-in-2025-understanding-your-free-tier-for-map-loads/b4b5715a6f878c80f01b219e876dddb3

[^3_14]: https://www.wpgmaps.com/google-maps-pricing-calculator/

[^3_15]: https://www.g2.com/products/mapbox/pricing

[^3_16]: https://dev.to/camptocamp-geo/the-3-best-open-source-web-mapping-libraries-57o7


---

# what about for location selection for customer

For customer location selection, you have **three input methods** in your spec (GPS, map pin, manual entry) — here's exactly how to build each one, all free:

***

## The Complete Flow (All 3 Methods Together)

The best UX is a **bottom sheet / modal with three tabs** — this is exactly how Swiggy/Blinkit does it, and it maps 1:1 to your spec:

```
┌──────────────────────────────────┐
│  📍 Use Current Location         │  ← GPS auto-detect
│  🗺  Pick on Map                  │  ← Drag pin on Leaflet
│  ✏️  Enter Manually               │  ← House no, area, landmark
└──────────────────────────────────┘
```


***

## Method 1: Current GPS Location (Free — No API Needed)

Use `@capacitor/geolocation` on Android (native GPS) and `navigator.geolocation` on browser — same code path via the platform check:[^4_1]

```ts
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

const getCurrentLocation = async () => {
  let coords;

  if (Capacitor.isNativePlatform()) {
    const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
  } else {
    coords = await new Promise((res, rej) =>
      navigator.geolocation.getCurrentPosition(
        p => res({ lat: p.coords.latitude, lng: p.coords.longitude }),
        rej, { enableHighAccuracy: true }
      )
    );
  }

  // Reverse geocode coords → human address using Nominatim (free)
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`
  );
  const data = await res.json();
  return { coords, label: data.display_name };
};
```

**Reverse geocoding** (coords → readable address like "Near Hanuman Temple, Kukatpally") uses **Nominatim** — completely free, no key.[^4_2]

***

## Method 2: Pick on Map — Draggable Pin (Free — Leaflet + OSM)

The pattern is: open map centered on GPS location → customer drags/taps to drop pin → lat/lng saved. Build it with `react-leaflet` and `useMapEvents`:[^4_3][^4_4]

```tsx
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

function DraggablePin({ onPinMove }) {
  const [position, setPosition] = useState({ lat: 17.385, lng: 78.4867 }); // default: Hyderabad

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onPinMove(e.latlng); // save to form state
    }
  });

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const latlng = e.target.getLatLng();
          setPosition(latlng);
          onPinMove(latlng);
        }
      }}
    />
  );
}

// In your location picker modal:
<MapContainer
  center={[17.385, 78.4867]}
  zoom={16}
  style={{ height: '300px', width: '100%', borderRadius: '12px' }}
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <DraggablePin onPinMove={({ lat, lng }) => {
    setCoords({ lat, lng });
    // reverse geocode to update address label
  }} />
</MapContainer>
```

Tap anywhere = pin moves there. Drag pin = pin follows. On every pin movement, hit Nominatim reverse geocode to update the displayed address label below the map.[^4_5]

***

## Method 3: Address Autocomplete Search (Geoapify — 3k free/day)

For the typed search inside the map picker ("search for your area"), use **Geoapify Geocoder Autocomplete** — it has a React-ready npm package:[^4_6][^4_7]

```bash
npm install @geoapify/geocoder-autocomplete @geoapify/react-geocoder-autocomplete
```

```tsx
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';

<GeoapifyContext apiKey="YOUR_FREE_GEOAPIFY_KEY">
  <GeoapifyGeocoderAutocomplete
    placeholder="Search area, landmark..."
    lang="en"
    countryCodes={['in']}          // restrict to India
    type="amenity"
    onPlaceSelect={(place) => {
      const [lng, lat] = place.geometry.coordinates;
      setCoords({ lat, lng });
      mapRef.current?.flyTo([lat, lng], 17);
    }}
  />
</GeoapifyContext>
```

Free tier: **3,000 requests/day** — more than enough for a kirana store. Geoapify has good coverage for Hyderabad and Telangana specifically.[^4_8]

***

## What Gets Saved to Your DB

After any of the three methods, you store the same shape:

```ts
type CustomerAddress = {
  label: string;          // "Near Hanuman Temple, Kukatpally"
  house_number: string;   // from manual input
  area: string;
  landmark: string;
  notes: string;          // "opposite water tank"
  lat: number;            // from GPS or pin
  lng: number;
}
```

The lat/lng is what your admin delivery map (Leaflet cluster view) reads — no Google Maps dependency anywhere in the entire flow.

***

## Summary: Zero Cost for the Entire Location Stack

| Feature | Tool | Cost |
| :-- | :-- | :-- |
| Current GPS | `@capacitor/geolocation` + `navigator.geolocation` | Free |
| Map display + drag pin | Leaflet + OpenStreetMap tiles | Free |
| Reverse geocode (coords → address) | Nominatim | Free |
| Address search autocomplete | Geoapify (free tier) | Free up to 3k/day |
| Delivery navigation | Google Maps deep link URL | Free |

<span style="display:none">[^4_10][^4_11][^4_12][^4_13][^4_14][^4_15][^4_9]</span>

<div align="center">⁂</div>

[^4_1]: https://stackoverflow.com/questions/65979955/how-to-set-the-map-to-a-geolocation-on-map-load-with-react-leaflet-v3

[^4_2]: https://apidocs.geoapify.com/docs/geocoding/address-autocomplete/

[^4_3]: https://react-leaflet.js.org

[^4_4]: https://react-leaflet.js.org/docs/example-events/

[^4_5]: https://stackoverflow.com/questions/71537233/location-me-in-map-from-react-leaflet

[^4_6]: https://geoapify.github.io/geocoder-autocomplete/

[^4_7]: https://github.com/geoapify/geocoder-autocomplete

[^4_8]: https://www.geoapify.com/address-autocomplete/

[^4_9]: https://github.com/Ben-Bourne/react-leaflet-location-picker

[^4_10]: https://leafletjs.com/reference.html

[^4_11]: https://codesandbox.io/s/react-leaflet-location-picker-demo-f6gol

[^4_12]: https://whatibroke.com/2019/08/24/simple-react-leaflet-location-picker-setup/

[^4_13]: https://github.com/Ben-Bourne/react-leaflet-location-picker/blob/master/README.md

[^4_14]: https://www.npmjs.com/package/leaflet-locationpicker

[^4_15]: https://www.youtube.com/watch?v=bJ8jp9CCWmU


---

# no i want it exactly like current instamt commerce apps like entering building name and the list of location comes

**Use Ola Maps — it's the perfect fit for this.**

Ola Maps (by Krutrim) just announced **5 million free API calls/month** for Indian developers, including Autocomplete, Reverse Geocoding, and Directions.  It has the same "type → dropdown suggestions" UX you want from Swiggy/Blinkit, with India-first data quality. And it's specifically built for Indian addresses, pin codes, and landmarks — far better coverage than Geoapify for Telugu-region localities.[^5_1]

***

## Why Ola Maps Wins Here

|  | Google Places | Geoapify | **Ola Maps** |
| :-- | :-- | :-- | :-- |
| Free tier | ~10,000/month | 3,000/day | **5M/month** [^5_2] |
| India address quality | ✅ Best | ⚠️ Decent | ✅ India-first |
| Telugu region coverage | ✅ | ⚠️ | ✅ |
| Autocomplete API | ✅ | ✅ | ✅ [^5_3] |
| Reverse geocode | ✅ | ✅ | ✅ |
| Cost after free tier | Expensive | Cheap | Very cheap |
| India startup deal | ❌ | ❌ | **3 years free on ONDC** [^5_1] |


***

## The Exact UX Flow (Like Blinkit/Swiggy)

```
Customer types "SR Nagar" →
  Ola Maps Autocomplete API returns list →
    Dropdown shows 5 suggestions →
      Tap one → Pin drops on Leaflet map →
        Reverse geocode confirms address →
          Customer adds house number + landmark manually
```

**Ola Maps handles the smart search. Leaflet handles the map display.** They work together — Ola Maps is just an API (returns JSON), you render everything yourself.

***

## Implementation

```bash
npm install @olamaps/js-sdk
```

```ts
// Autocomplete: fires on every keystroke (debounced)
const searchPlaces = async (input: string) => {
  const res = await fetch(
    `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(input)}&api_key=YOUR_OLA_KEY`
  );
  const data = await res.json();
  return data.predictions; // → [{description: "SR Nagar, Hyderabad", place_id: "..."}]
};

// Once user taps a suggestion → get coordinates
const getPlaceDetails = async (placeId: string) => {
  const res = await fetch(
    `https://api.olamaps.io/places/v1/details?place_id=${placeId}&api_key=YOUR_OLA_KEY`
  );
  const data = await res.json();
  const { lat, lng } = data.result.geometry.location;
  return { lat, lng };
  // → flyTo this on your Leaflet map + drop pin
};
```

Then the Leaflet map shows the pinned location, customer can **drag to fine-tune**, and finally fills in house number + landmark manually.[^5_3]

***

## Revised Final Location Stack

| Need | Tool | Cost |
| :-- | :-- | :-- |
| Address search autocomplete | **Ola Maps Autocomplete** | Free (5M/month) |
| Place → coordinates | **Ola Maps Place Details** | Free |
| Coordinates → address label | **Ola Maps Reverse Geocode** | Free |
| Map display + drag pin | **Leaflet + OSM tiles** | Free forever |
| GPS current location | **`@capacitor/geolocation`** | Free |
| Delivery navigation | **Google Maps deep link** | Free |

Sign up at [maps.olakrutrim.com](https://maps.olakrutrim.com) — you get 1 year free instantly, no credit card needed for the free tier.[^5_2]
<span style="display:none">[^5_10][^5_11][^5_12][^5_13][^5_14][^5_15][^5_4][^5_5][^5_6][^5_7][^5_8][^5_9]</span>

<div align="center">⁂</div>

[^5_1]: https://www.motorindiaonline.in/krutrim-announces-new-pricing-and-strategic-future-roadmap-for-ola-maps/

[^5_2]: https://maps.olakrutrim.com/pricing

[^5_3]: https://maps.olakrutrim.com/docs/places-apis/autocomplete-api

[^5_4]: https://developers.google.com/maps/documentation/places/web-service/usage-and-billing

[^5_5]: https://developers.google.com/maps/documentation/places/web-service/session-pricing

[^5_6]: https://developers.google.cn/maps/documentation/places/web-service/usage-and-billing?hl=en

[^5_7]: https://nicolalazzari.ai/articles/understanding-google-maps-apis-a-comprehensive-guide-to-uses-and-costs

[^5_8]: https://stackoverflow.com/questions/56320025/new-google-places-autocomplete-and-its-pricing

[^5_9]: https://www.mapmyindia.com/api/maps-api-free/

[^5_10]: https://www.oreateai.com/blog/navigating-the-new-pricing-landscape-for-google-maps-platforms-places-api/49763ee64b686e555d9a67d22799f650

[^5_11]: https://www.olakrutrim.com/ola-maps

[^5_12]: https://www.tatvic.com/blog/mapmyindia-vs-googlemaps-vs-openstreetmap-indepth-comparison/

[^5_13]: https://www.scribd.com/document/966475766/Google-Places-API-Pricing-Autocomplete-Place-Search

[^5_14]: https://developers.google.com/maps/billing-and-pricing/pricing-india

[^5_15]: https://github.com/FaridSafi/react-native-google-places-autocomplete/issues/710


---

# ok now give me the final techstack with some addtions for logging and error monitorin sentry,for img processing sharp,and for Rate Limiting

Upstash Redis
Use for:
spam protection
API rate limits
cart/session caching
Customer Identity:
frictionless phone-number flow(no otp and all)

Here's your complete, definitive final stack — everything locked in:

***

## 🏗️ Final Tech Stack — Kirana Commerce System

### Core Framework

| Layer | Choice | Notes |
| :-- | :-- | :-- |
| **Framework** | Next.js 15 (App Router) | SSR + Server Actions + API Routes |
| **Language** | TypeScript | Full stack |
| **Monorepo structure** | Single Next.js app, route groups per role | `/customer` `/admin` `/delivery` `/superadmin` |


***

### Database \& ORM

| Layer | Choice | Notes |
| :-- | :-- | :-- |
| **Database** | Neon PostgreSQL | Serverless, branching for demos, scale-to-zero |
| **ORM** | Drizzle ORM | Lighter than Prisma, better TS inference |


***

### Auth \& Identity

| Layer | Choice | Notes |
| :-- | :-- | :-- |
| **Admin / Delivery / Superadmin** | Better Auth | Secure email+password, role-based sessions |
| **Customer Identity** | Phone number → silent DB lookup | No OTP, no password — explained below |

**Customer frictionless flow:**

```
Customer enters phone number →
  Check Drizzle: does this phone exist?
    YES → autofill their name + saved addresses → proceed
    NO  → create a new customer record silently → proceed
```

Zero friction. No OTP. No password. Phone number is the identity key — stored in a cookie/session after first entry so they don't re-type on return visits.  Identical to how many Indian hyperlocal apps handle guest-style ordering.[^6_1]

***

### Caching, Rate Limiting \& Session

| Layer | Choice | Notes |
| :-- | :-- | :-- |
| **Redis** | Upstash Redis | HTTP-based, serverless-native, no TCP connection issues on Vercel |
| **Rate limiting** | `@upstash/ratelimit` in `middleware.ts` | Runs at the Edge before any API route is hit [^6_2] |
| **Cart caching** | Upstash Redis | Cart stored server-side by phone/session key |
| **Customer session** | Upstash Redis | Phone-verified session token TTL 30 days |

**Rate limit rules via sliding window:**[^6_3]

```ts
// Spam protection on order placement
Ratelimit.slidingWindow(10, '1 m')   // 10 orders/min per IP

// Strict limit on phone lookup (prevent enumeration)
Ratelimit.fixedWindow(5, '1 m')      // 5 attempts/min per IP

// Payment proof upload
Ratelimit.slidingWindow(20, '1 h')   // 20 uploads/hour per user
```


***

### Image Processing \& Storage

| Layer | Choice | Notes |
| :-- | :-- | :-- |
| **Server-side processing** | `sharp` | Resize, compress, WebP conversion before upload to Bunny [^6_4] |
| **Storage** | Bunny Storage | \$0.01/GB/month |
| **CDN delivery** | BunnyCDN | Asia PoPs, fast in India |
| **Image optimization** | Bunny Optimizer (production) | \$9.50/month flat, skip for MVP |

**Sharp pipeline on upload:**

```ts
import sharp from 'sharp';

const processImage = async (buffer: Buffer) => {
  return await sharp(buffer)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  // then upload this buffer to Bunny Storage
};

// Thumbnail for product listings
const makeThumbnail = async (buffer: Buffer) => {
  return await sharp(buffer)
    .resize(300, 300, { fit: 'cover' })
    .webp({ quality: 70 })
    .toBuffer();
};
```


***

### Search

| Layer | Choice | Notes |
| :-- | :-- | :-- |
| **Search engine** | Meilisearch Cloud (free tier) | Typo tolerance, fuzzy, multilingual |
| **Telugu + English** | Custom tokenizer config | Transliteration + script search |


***

### Maps \& Location

| Layer | Choice | Notes |
| :-- | :-- | :-- |
| **Address autocomplete** | Ola Maps API | 5M free requests/month, India-first |
| **Map display + pin drop** | Leaflet.js + OpenStreetMap | Free forever |
| **Reverse geocode** | Ola Maps Reverse Geocoding | Included in free tier |
| **GPS** | `@capacitor/geolocation` (Android) / `navigator.geolocation` (browser) | Free |
| **Delivery navigation** | Google Maps deep link URL | Free, opens native app |


***

### Error Monitoring \& Logging

| Layer | Choice | Notes |
| :-- | :-- | :-- |
| **Error monitoring** | Sentry | One CLI wizard setup: `npx @sentry/wizard@latest -i nextjs` [^6_5] |
| **What it captures** | Client errors, Server errors, Edge middleware errors, API route failures | All three runtimes covered [^6_6] |
| **Session replay** | Sentry (free tier: 50 replays/month) | See exactly what a customer did before an error |
| **Tracing** | `tracesSampleRate: 0.2` for production | 20% sampling to stay in free tier |


***

### UI \& Frontend

| Layer | Choice | Notes |
| :-- | :-- | :-- |
| **Styling** | Tailwind CSS v4 |  |
| **UI Primitives** | Radix UI | Accessible, unstyled — you control the look |
| **State** | Zustand | Cart, UI state, delivery filters |
| **Forms** | React Hook Form + Zod | Validation schema shared with Drizzle |
| **Icons** | Lucide React |  |


***

### Deployment \& Infrastructure

| Layer | Choice | Notes |
| :-- | :-- | :-- |
| **Hosting** | Vercel Hobby → Pro | Mumbai edge (`ap-south-1`) on Pro |
| **CI/CD** | Vercel GitHub integration | Auto-deploy on push |
| **Android app** | Capacitor.js | Wraps Next.js, native GPS + camera permissions |


***

### Full Dependency Install (One Shot)

```bash
# Core
npm install next@latest react react-dom typescript drizzle-orm @neondatabase/serverless

# Auth
npm install better-auth

# Redis + Rate Limiting
npm install @upstash/redis @upstash/ratelimit

# Maps
npm install leaflet react-leaflet @olamaps/js-sdk

# Search
npm install meilisearch

# Image processing
npm install sharp

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# State
npm install zustand

# UI
npm install @radix-ui/react-dialog @radix-ui/react-select lucide-react

# Error monitoring
npx @sentry/wizard@latest -i nextjs

# Android
npm install @capacitor/core @capacitor/android @capacitor/geolocation @capacitor/camera @capacitor/app @capacitor/haptics @capacitor/network
```


***

### MVP vs Production Cost

| Service | MVP (Demo) | Production |
| :-- | :-- | :-- |
| Neon DB | Free | ~\$19/month |
| Upstash Redis | Free (10k req/day) | ~\$10/month |
| BunnyCDN + Storage | ~\$1/month | ~\$5–15/month |
| Bunny Optimizer | Skip | \$9.50/month |
| Sentry | Free (5k errors/month) | Free or \$26/month |
| Ola Maps | Free (5M/month) | Free |
| Meilisearch Cloud | Free (100k docs) | \$30/month |
| Vercel | Free | \$20/month |
| **Total** | **~\$1/month** | **~\$95–115/month** |

<span style="display:none">[^6_10][^6_11][^6_12][^6_13][^6_14][^6_15][^6_7][^6_8][^6_9]</span>

<div align="center">⁂</div>

[^6_1]: https://upstash.com/docs/redis/tutorials/nextjs_with_redis

[^6_2]: https://oneuptime.com/blog/post/2026-03-31-redis-nextjs-edge-rate-limiting/view

[^6_3]: https://upstash.com/docs/redis/sdks/ratelimit-ts/overview

[^6_4]: https://www.reddit.com/r/nextjs/comments/16ofhkg/next_js_serverside_image_processing/

[^6_5]: https://www.youtube.com/watch?v=cirvSu1RSDc

[^6_6]: https://dev-docs.moodybeard.com/en/sentry-nextjs/manual-setup/pages-router/

[^6_7]: https://upstash.com/blog/nextjs-ratelimiting

[^6_8]: https://dev.to/whoffagents/rate-limiting-nextjs-api-routes-in-memory-redis-and-plan-based-limits-5coo

[^6_9]: https://upstash.com/blog/dynamic-rate-limits

[^6_10]: https://akadenia.com/posts/error-reporting-sentry-nextjs

[^6_11]: https://stackoverflow.com/questions/71993246/next-js-how-to-apply-sharp-lib-in-next-js

[^6_12]: https://vercel.com/templates/next.js/ratelimit-with-upstash-redis

[^6_13]: https://www.reddit.com/r/webdev/comments/1ll0hdv/optimizing_serverside_image_processing_workflow/

[^6_14]: https://www.youtube.com/watch?v=8CBCrIh_qlc

[^6_15]: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/


---

# now just give me a table containing every tech stack and its notes/why

Here's the complete table — and the full document is attached above as a downloadable markdown file.

***

## Framework \& Language

| Layer | Choice | Why |
| :-- | :-- | :-- |
| **Framework** | Next.js 15 App Router | SSR for product catalog, Server Actions for mutations, API Routes for webhooks — one codebase, no separate backend |
| **Language** | TypeScript | Zod schemas shared between frontend forms and Drizzle DB — catch bugs at compile time |
| **Structure** | Single app, route groups per role | `/customer` `/admin` `/delivery` `/superadmin` — isolated UI, shared infrastructure |

## Database \& ORM

| Layer | Choice | Why |
| :-- | :-- | :-- |
| **Database** | Neon PostgreSQL | Database branching for demo clones, scale-to-zero = near-zero idle cost, Asia region for India latency |
| **ORM** | Drizzle ORM | Lighter than Prisma, better TS inference, no binary engine, cleaner Vercel deploys |

## Auth \& Identity

| Layer | Choice | Why |
| :-- | :-- | :-- |
| **Admin/Delivery/Superadmin** | Better Auth | Multi-role sessions, cleaner API than NextAuth |
| **Customer** | Phone → silent DB lookup | No OTP, no password — enter phone, autofill if existing, silently create if new. Cookie session via Upstash Redis |

## Caching, Rate Limiting \& Session

| Layer | Choice | Why |
| :-- | :-- | :-- |
| **Redis** | Upstash Redis | HTTP-based, no persistent TCP — works on Vercel serverless/edge natively |
| **Rate limiting** | `@upstash/ratelimit` in `middleware.ts` | Runs at Edge before any DB hit. Sliding window for orders (10/min), phone lookup (5/min), uploads (20/hr) |
| **Cart** | Upstash Redis | Server-side cart survives reloads without localStorage (blocked in WebViews) |
| **Customer session** | Upstash Redis | 30-day TTL token — no repeat phone entry on return visits |

## Image Processing \& Storage

| Layer | Choice | Why |
| :-- | :-- | :-- |
| **Processing** | `sharp` | Fastest Node.js image lib — resize, WebP convert, thumbnail generation server-side before upload |
| **Storage** | Bunny Storage | \$0.01/GB/month, uploads go through Next.js server after Sharp processing |
| **CDN** | BunnyCDN | Mumbai/Singapore/Chennai PoPs, ~\$0.002/GB — cheapest fast CDN for India |
| **Optimizer** | Bunny Optimizer (prod only) | \$9.50/month flat for on-the-fly responsive variants — skip for MVP |

## Search

| Layer | Choice | Why |
| :-- | :-- | :-- |
| **Engine** | Meilisearch Cloud | Typo tolerance + fuzzy + multilingual — `ILIKE` can't do any of this |
| **Multilingual** | Custom tokenizer | English + Telugu transliteration + Telugu script all indexed, same product found from any language input |

## Maps \& Location

| Layer | Choice | Why |
| :-- | :-- | :-- |
| **Autocomplete** | Ola Maps API | 5M free req/month, India-first data, best coverage for Telugu region localities |
| **Map display** | Leaflet + OpenStreetMap | Free forever, no key, no limits — renders admin delivery cluster view + customer pin picker |
| **Reverse geocode** | Ola Maps | Included in free tier — coords → human address after pin drop |
| **GPS** | `@capacitor/geolocation` | Free, same code path on Android and browser |
| **Navigation** | Google Maps deep link | A plain URL, not an API call — opens native Maps app on Android, zero cost |

## Error Monitoring

| Layer | Choice | Why |
| :-- | :-- | :-- |
| **Sentry** | `@sentry/nextjs` | Covers all 3 runtimes: browser, Node.js server, Edge middleware. One wizard command to set up |
| **Session replay** | Sentry (50 free/month) | See exactly what the customer did before an error in the ordering flow |
| **Tracing** | 20% sample rate | Catches slow DB queries without blowing free tier limits |

## UI, Deployment \& Android

| Layer | Choice | Why |
| :-- | :-- | :-- |
| **Styling** | Tailwind CSS v4 | Utility-first, CSS-native in v4, no PostCSS config |
| **UI Primitives** | Radix UI | Accessible, unstyled — you style everything, no visual bloat |
| **State** | Zustand | Lightweight cart + UI state, no Redux boilerplate |
| **Forms** | React Hook Form + Zod | Performant forms, same Zod schema shared with Drizzle |
| **Hosting** | Vercel | Native Next.js, auto-deploy on push, Mumbai edge on Pro |
| **Android** | Capacitor.js | Wraps the web app in native Android shell, adds GPS + Camera + Storage permissions, produces `.apk` |


---

# Things I Would Slightly Modify

1. Meilisearch Syncing
You wrote:
sync product catalog on every save via Drizzle hook
Good initially.
BUT later:
use queue-based indexing.
Because:
real-time indexing can slow writes later.
2. Capacitor Timing
Do NOT start with APK immediately.
First:
build responsive PWA
validate UX
test with real customers/store
THEN wrap using Capacitor.
This will save huge time.
what do you thikn about this

Both modifications are correct and show good product instincts. Here's why each one is right:

***

## 1. Meilisearch Sync — Queue-Based is the Right Graduation

Your two-phase approach is exactly how production search indexing should evolve:

**Phase 1 (MVP): Sync on every save**
Direct Drizzle hook calling Meilisearch after a product update is fine when you have one store, ~200–500 products, and low write frequency. A kirana store doesn't update 100 products simultaneously. Keep it simple.

**Phase 2 (Production): Queue-based indexing**
Once you have multiple stores and admins doing bulk price edits or category restructures, synchronous indexing blocks the DB write response. The right pattern is:

```
Admin saves product →
  DB write completes immediately (fast) →
    Push indexing job to queue →
      Worker picks it up async →
        Meilisearch updated in background
```

For the queue, **Upstash QStash** is the natural fit here — you're already using Upstash Redis, QStash is their HTTP-based job queue, serverless-compatible, and has a free tier. No extra infrastructure. One `POST` to QStash triggers a `/api/index-products` webhook asynchronously.

***

## 2. Capacitor Timing — Absolutely Right

This is a classic mistake teams make — jumping to native packaging before the product is even validated. Your phased approach is the correct engineering sequence:


| Phase | What you do | Why |
| :-- | :-- | :-- |
| **1. Responsive web** | Build Next.js app, mobile-first CSS, test in Chrome DevTools at 375px | Zero setup cost, instant iteration, share a Vercel URL for feedback |
| **2. PWA** | Add `next-pwa`, `manifest.json`, service worker, install prompt | Customers can "Add to Home Screen" on Android — looks and feels like an app, no APK needed |
| **3. Real user validation** | Share PWA link with 1–2 actual kirana stores and their customers | Discover UX problems in the ordering flow, address picker, cart before you freeze the architecture |
| **4. Capacitor wrap** | Only after UX is validated — add Capacitor, native permissions, build APK | Now you're wrapping a *proven* UX, not experimenting inside Android Studio |

The PWA step is especially valuable for your use case — Indian Android users are very comfortable with "Add to Home Screen" prompts. Many hyperlocal apps ran as PWAs for months before going native. You get 90% of the app experience (offline support, home screen icon, full screen) with zero APK distribution friction during the validation phase.

The only things you genuinely *need* Capacitor for are:

- Background GPS tracking (you've excluded real-time tracking anyway)
- Camera access without browser permission prompts (payment proofs)
- Play Store distribution for the delivery partner app

None of those are needed until the product is validated — so your instinct to delay Capacitor is exactly right. Build → PWA → validate → wrap.

---

# now give me the fianl table just simple table

| Layer | Choice |
| :-- | :-- |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Database** | Neon PostgreSQL |
| **ORM** | Drizzle ORM |
| **Admin/Staff/Delivery Auth** | Better Auth |
| **Customer Identity** | Phone number → silent DB lookup (no OTP) |
| **Redis / Rate Limiting / Session** | Upstash Redis + `@upstash/ratelimit` |
| **Search Indexing (MVP)** | Meilisearch Cloud — sync on save |
| **Search Indexing (Production)** | Meilisearch Cloud — queue via Upstash QStash |
| **Image Processing** | Sharp (server-side before upload) |
| **Image Storage** | Bunny Storage |
| **CDN** | BunnyCDN |
| **Image Optimization (prod)** | Bunny Optimizer |
| **Address Autocomplete** | Ola Maps API |
| **Map Display + Pin Drop** | Leaflet.js + OpenStreetMap |
| **Reverse Geocoding** | Ola Maps |
| **GPS** | `@capacitor/geolocation` / `navigator.geolocation` |
| **Delivery Navigation** | Google Maps deep link (free URL) |
| **Error Monitoring** | Sentry |
| **Styling** | Tailwind CSS v4 |
| **UI Primitives** | Radix UI |
| **State Management** | Zustand |
| **Forms + Validation** | React Hook Form + Zod |
| **Icons** | Lucide React |
| **Deployment** | Vercel |
| **Phase 1 Mobile** | Responsive PWA (`next-pwa`) |
| **Phase 2 Mobile** | Capacitor.js → Android APK |
| **Job Queue (prod)** | Upstash QStash |


---

# now lets proceed with building ,where to start i want step by step,i am completely building this with AI,codex in copilot pro

i also want what i should do like setting up all the platforms for dbs,searchs,maps and all
i dont want a all in one prompt  but step by step prompt but before that i dont want to create the folder structure using the codex  so now give me the fulland perfect folder structure  folder structure,app/website name is not sure for now , all ways give the prompths with where to add what functionality,don not give the code  in the prompts at all just what to do thats it

First, the complete folder structure. Then the step-by-step build order with prompts.

***

## Folder Structure

```
kirana-app/
├── .env.local
├── .env.example
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── drizzle.config.ts
├── capacitor.config.ts
├── package.json
│
├── public/
│   ├── manifest.json                  # PWA manifest
│   ├── sw.js                          # Service worker (next-pwa generates)
│   ├── icons/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── images/
│       └── placeholder.webp
│
├── src/
│   │
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx                 # Root layout (fonts, Sentry, theme)
│   │   ├── globals.css                # Tailwind base + CSS variables
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   │
│   │   ├── (customer)/                # Customer storefront
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               # Home / product catalog
│   │   │   ├── search/
│   │   │   │   └── page.tsx
│   │   │   ├── product/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx           # Order history
│   │   │   │   └── [orderId]/
│   │   │   │       └── page.tsx       # Order detail
│   │   │   └── address/
│   │   │       └── page.tsx           # Address manager
│   │   │
│   │   ├── (admin)/                   # Store owner + staff
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx           # Analytics overview
│   │   │   ├── products/
│   │   │   │   ├── page.tsx           # Product list
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [productId]/
│   │   │   │       └── page.tsx       # Edit product
│   │   │   ├── categories/
│   │   │   │   └── page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx           # All orders
│   │   │   │   └── [orderId]/
│   │   │   │       └── page.tsx
│   │   │   ├── delivery/
│   │   │   │   ├── page.tsx           # Delivery map view
│   │   │   │   └── partners/
│   │   │   │       └── page.tsx       # Manage delivery partners
│   │   │   ├── customers/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       ├── page.tsx           # Store settings
│   │   │       ├── billing/
│   │   │       │   └── page.tsx
│   │   │       └── delivery-rules/
│   │   │           └── page.tsx
│   │   │
│   │   ├── (delivery)/                # Delivery partner app
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx           # Assigned deliveries list
│   │   │   └── delivery/
│   │   │       └── [deliveryId]/
│   │   │           └── page.tsx       # Single delivery detail + map
│   │   │
│   │   ├── (superadmin)/              # Platform-level admin
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── stores/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [storeId]/
│   │   │   │       └── page.tsx
│   │   │   ├── admins/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx           # Global config, upload limits, languages
│   │   │
│   │   └── api/                       # API Routes
│   │       ├── auth/
│   │       │   └── [...all]/
│   │       │       └── route.ts       # Better Auth handler
│   │       ├── customer/
│   │       │   └── identify/
│   │       │       └── route.ts       # Phone → silent account lookup/create
│   │       ├── upload/
│   │       │   └── route.ts           # Sharp processing → Bunny Storage
│   │       ├── search/
│   │       │   └── route.ts           # Meilisearch proxy
│   │       ├── webhooks/
│   │       │   └── qstash/
│   │       │       └── route.ts       # QStash job receiver (search indexing)
│   │       └── delivery/
│   │           └── status/
│   │               └── route.ts       # Delivery partner status updates
│   │
│   ├── components/
│   │   ├── ui/                        # Base design system components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── select.tsx
│   │   │   ├── sheet.tsx              # Bottom sheet / side panel
│   │   │   ├── skeleton.tsx
│   │   │   └── toast.tsx
│   │   │
│   │   ├── customer/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── CategoryBar.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   ├── QuantitySelector.tsx
│   │   │   ├── VariantPicker.tsx
│   │   │   ├── ItemNoteInput.tsx
│   │   │   ├── LocationPicker.tsx     # Ola Maps autocomplete + Leaflet map
│   │   │   ├── AddressCard.tsx
│   │   │   ├── OrderCard.tsx
│   │   │   └── PhoneEntry.tsx         # Frictionless phone identification
│   │   │
│   │   ├── admin/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   ├── OrderTable.tsx
│   │   │   ├── OrderFilters.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── VariantManager.tsx
│   │   │   ├── CategoryTree.tsx
│   │   │   ├── DeliveryMap.tsx        # Leaflet cluster view of pending deliveries
│   │   │   ├── DeliveryAssign.tsx
│   │   │   ├── PaymentProofViewer.tsx
│   │   │   ├── BillingEditor.tsx
│   │   │   └── AnalyticsCards.tsx
│   │   │
│   │   ├── delivery/
│   │   │   ├── DeliveryList.tsx
│   │   │   ├── DeliveryCard.tsx
│   │   │   ├── NavigateButton.tsx     # Google Maps deep link
│   │   │   ├── StatusUpdater.tsx
│   │   │   ├── ProofUpload.tsx        # Camera capture + upload
│   │   │   └── CODCollect.tsx
│   │   │
│   │   └── shared/
│   │       ├── LanguageSwitcher.tsx   # EN / TE toggle
│   │       ├── ImageUpload.tsx        # Shared upload with Sharp pipeline
│   │       ├── MapPicker.tsx          # Reusable Leaflet map component
│   │       ├── EmptyState.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── LoadingSpinner.tsx
│   │
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts               # Neon + Drizzle client
│   │   │   ├── schema/
│   │   │   │   ├── stores.ts
│   │   │   │   ├── users.ts           # Admin, delivery partner, superadmin
│   │   │   │   ├── customers.ts       # Phone-based customer records
│   │   │   │   ├── products.ts        # name_en, name_te_transliteration, name_te_script
│   │   │   │   ├── variants.ts
│   │   │   │   ├── categories.ts
│   │   │   │   ├── orders.ts
│   │   │   │   ├── order-items.ts
│   │   │   │   ├── deliveries.ts
│   │   │   │   ├── addresses.ts
│   │   │   │   └── payment-proofs.ts
│   │   │   └── migrations/            # Drizzle generated migrations
│   │   │
│   │   ├── auth/
│   │   │   └── index.ts               # Better Auth config + roles
│   │   │
│   │   ├── redis/
│   │   │   ├── client.ts              # Upstash Redis client
│   │   │   ├── ratelimit.ts           # Rate limit rules per route
│   │   │   └── session.ts             # Customer session helpers
│   │   │
│   │   ├── search/
│   │   │   ├── client.ts              # Meilisearch client
│   │   │   └── sync.ts                # Index sync helpers
│   │   │
│   │   ├── storage/
│   │   │   ├── bunny.ts               # Bunny Storage upload helpers
│   │   │   └── sharp.ts               # Image processing pipeline
│   │   │
│   │   ├── maps/
│   │   │   └── ola.ts                 # Ola Maps API helpers
│   │   │
│   │   └── utils/
│   │       ├── cn.ts                  # Tailwind className merger
│   │       ├── format.ts              # Price, date, weight formatters
│   │       └── platform.ts            # Capacitor platform detection
│   │
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useCustomer.ts
│   │   ├── useGeolocation.ts
│   │   ├── useSearch.ts
│   │   └── useDeliveryStatus.ts
│   │
│   ├── stores/                        # Zustand stores
│   │   ├── cartStore.ts
│   │   ├── uiStore.ts
│   │   └── customerStore.ts
│   │
│   ├── actions/                       # Next.js Server Actions
│   │   ├── products.ts
│   │   ├── orders.ts
│   │   ├── cart.ts
│   │   ├── customers.ts
│   │   ├── delivery.ts
│   │   └── upload.ts
│   │
│   ├── middleware.ts                  # Upstash rate limiting + auth guards
│   │
│   └── i18n/                          # Multilingual
│       ├── index.ts
│       ├── en.ts
│       └── te.ts                      # Telugu translations
│
└── android/                           # Capacitor (generated later, Phase 2)
```


***

## Build Order \& Prompts

Work through these in sequence. Each prompt is for one focused Codex session.

***

### Phase 0 — Platform Setup (Do this manually before any code)

Do these yourself before opening Codex:

1. **Neon** — Create account at `neon.tech`, create a project, copy the `DATABASE_URL` connection string
2. **Upstash** — Create account at `upstash.com`, create a Redis database (region: `ap-southeast-1`), copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
3. **Meilisearch Cloud** — Create account at `cloud.meilisearch.com`, create a project, copy `MEILI_HOST` and `MEILI_MASTER_KEY`
4. **Ola Maps** — Create account at `maps.olakrutrim.com`, create an API key, copy `OLA_MAPS_API_KEY`
5. **BunnyCDN** — Create account at `bunny.net`, create a Storage Zone, create a Pull Zone linked to it, copy `BUNNY_STORAGE_API_KEY`, `BUNNY_STORAGE_ZONE`, `BUNNY_CDN_URL`
6. **Sentry** — Create account at `sentry.io`, create a Next.js project, copy `SENTRY_DSN`
7. **Better Auth** — No signup needed, just generate a `BETTER_AUTH_SECRET` (any 32+ char random string)
8. **Vercel** — Connect your GitHub repo, add all env variables from above into Vercel dashboard

Fill all keys into `.env.local` before starting Step 1.

***

### Step 1 — Project Init \& Config

> Initialize a Next.js 15 project with TypeScript, Tailwind CSS v4, and App Router inside the `kirana-app` folder. Install all dependencies: `drizzle-orm`, `@neondatabase/serverless`, `drizzle-kit`, `better-auth`, `@upstash/redis`, `@upstash/ratelimit`, `meilisearch`, `sharp`, `leaflet`, `react-leaflet`, `@types/leaflet`, `zustand`, `react-hook-form`, `zod`, `@hookform/resolvers`, `lucide-react`, `@radix-ui/react-dialog`, `@radix-ui/react-select`, `@radix-ui/react-sheet`, `next-pwa`. Set up `drizzle.config.ts` pointing to `DATABASE_URL` from `.env.local`. Set up `next.config.ts` with image domains for BunnyCDN and PWA config from next-pwa. Create the complete folder structure exactly as provided. Create `.env.example` with all required variable names (no values). Do not write any feature logic yet.

***

### Step 2 — Database Schema

> In `src/lib/db/schema/`, create all Drizzle schema files. `stores.ts`: store id, name, slug, settings JSON, active flag, created_at. `customers.ts`: id, phone (unique), name, created_at. `addresses.ts`: id, customer_id (FK), label, house_number, area, landmark, notes, lat, lng, is_default. `users.ts`: id, store_id (FK), email, role enum (ADMIN, STAFF, DELIVERY_PARTNER, SUPERADMIN), name, created_at. `categories.ts`: id, store_id, name_en, name_te, parent_id (self-referencing FK for subcategories), sort_order. `products.ts`: id, store_id, category_id (FK), name_en, name_te_transliteration, name_te_script, description, type enum (PACKAGED, LOOSE), unit, min_qty, step_size, max_qty (nullable), base_price, status enum (IN_STOCK, OUT_OF_STOCK, HIDDEN), image_url, thumbnail_url, created_at. `variants.ts`: id, product_id (FK), label, price, stock_status. `orders.ts`: id, store_id, customer_id (FK), type enum (DELIVERY, PICKUP), status enum (PLACED, IN_TRANSIT, DELIVERED, READY_FOR_PICKUP, PICKED_UP, CANCELLED), address_id (FK nullable), subtotal, delivery_charge, bag_charge, discount, total, payment_mode enum (CASH, UPI, BANK_TRANSFER), payment_status enum (PENDING, PAID), customer_notes, billing_notes, created_at. `order_items.ts`: id, order_id (FK), product_id (FK), variant_id (FK nullable), quantity, unit_price, item_discount, item_notes. `deliveries.ts`: id, order_id (FK), partner_id (FK), assigned_at, status, delivered_at. `payment_proofs.ts`: id, order_id (FK), image_url, uploaded_by_role, verified, created_at. Export all tables from `src/lib/db/index.ts` and run `drizzle-kit generate` to create migrations.

***

### Step 3 — Auth Setup

> In `src/lib/auth/index.ts`, configure Better Auth with the Neon database client. Define four roles: SUPERADMIN, ADMIN, STAFF, DELIVERY_PARTNER. Set session cookie options (httpOnly, secure, 30-day maxAge). In `src/app/api/auth/[...all]/route.ts`, export the Better Auth handler for GET and POST. Create login pages at `src/app/(admin)/login/page.tsx`, `src/app/(delivery)/login/page.tsx`, and `src/app/(superadmin)/login/page.tsx` — each with an email and password form using React Hook Form and Zod validation, calling Better Auth sign-in. In `src/middleware.ts`, protect all `/admin/*`, `/delivery/*`, and `/superadmin/*` routes by checking the Better Auth session cookie — redirect to the respective login page if no valid session exists. Do not add rate limiting to middleware yet.

***

### Step 4 — Rate Limiting \& Customer Identity

> In `src/lib/redis/client.ts`, initialise the Upstash Redis client using `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. In `src/lib/redis/ratelimit.ts`, define three rate limiters using `@upstash/ratelimit`: one sliding window for order placement (10 requests per minute per IP), one fixed window for phone identification (5 requests per minute per IP), one sliding window for file uploads (20 requests per hour per identifier). Update `src/middleware.ts` to apply the phone identification rate limiter on `POST /api/customer/identify` and the upload rate limiter on `POST /api/upload` — return a 429 response with a clear message if the limit is exceeded. In `src/app/api/customer/identify/route.ts`, implement the frictionless phone flow: accept a phone number, check the customers table, create a new record silently if not found, store a session token in Upstash Redis with 30-day TTL, return customer data. In `src/lib/redis/session.ts`, write helpers to set, get, and delete customer session tokens.

***

### Step 5 — Image Upload Pipeline

> In `src/lib/storage/sharp.ts`, write two functions: `processProductImage` that takes a Buffer, resizes to max 1200×1200 (preserve aspect ratio), converts to WebP at quality 82, and returns a Buffer; and `generateThumbnail` that takes a Buffer, crops/resizes to 300×300, converts to WebP at quality 70, and returns a Buffer. In `src/lib/storage/bunny.ts`, write an `uploadToBunny` function that accepts a Buffer, a filename, and a folder path, uploads to Bunny Storage via their HTTP API using `BUNNY_STORAGE_API_KEY`, and returns the public CDN URL using `BUNNY_CDN_URL`. In `src/app/api/upload/route.ts`, accept a multipart form POST with an image file and a `type` field (product, category, payment_proof), run it through the appropriate Sharp pipeline, upload both the main image and thumbnail (for product/category types) to Bunny Storage, apply the upload rate limiter, and return the CDN URLs. Do not write the frontend upload component yet.

***

### Step 6 — Search Setup

> In `src/lib/search/client.ts`, initialise the Meilisearch client using `MEILI_HOST` and `MEILI_MASTER_KEY`. In `src/lib/search/sync.ts`, write a `syncProduct` function that takes a product object (with all name fields: name_en, name_te_transliteration, name_te_script) and upserts it into a Meilisearch index called `products`. Configure the index settings: set `filterableAttributes` to `store_id`, `category_id`, `status`; set `searchableAttributes` to `name_en`, `name_te_transliteration`, `name_te_script`; enable typo tolerance with `minWordSizeForTypos` set to 4. Write a `deleteProductFromIndex` function for when products are deleted or hidden. In `src/app/api/search/route.ts`, accept a GET request with `q` (query), `store_id`, and optional `category_id` params, query Meilisearch filtering by store_id and status not HIDDEN, return results. Call `syncProduct` directly from the product save server action for now (queue-based indexing comes later).

***

### Step 7 — Maps \& Location

> In `src/lib/maps/ola.ts`, write two functions: `autocompleteAddress` that accepts a search string and calls the Ola Maps Autocomplete API with `OLA_MAPS_API_KEY`, restricted to India, and returns an array of suggestions with description and place_id; and `getPlaceCoordinates` that accepts a place_id, calls the Ola Maps Place Details API, and returns lat and lng. In `src/components/shared/MapPicker.tsx`, create a client component using react-leaflet that renders a MapContainer with OpenStreetMap tiles, a draggable Marker, and fires an `onLocationChange` callback with lat/lng whenever the pin is moved or clicked on the map. Ensure the Leaflet CSS is imported correctly for Next.js (dynamic import with `ssr: false`). In `src/components/customer/LocationPicker.tsx`, build the full location picker using three modes: a "Use Current Location" button that calls the Geolocation API, an address search input that calls `/api/search` proxying `ola.ts` autocomplete showing a dropdown of suggestions, and the `MapPicker` component for pin drop. All three modes update the same lat/lng + address state and fire an `onAddressConfirmed` callback.

***

### Step 8 — Customer Storefront

> Build the customer-facing storefront. In `src/app/(customer)/page.tsx`, fetch all visible categories and in-stock products for the store (identify store by subdomain or a default store for now), render the `CategoryBar` and `ProductGrid` components. In `src/components/customer/ProductCard.tsx`, display product image (thumbnail from BunnyCDN), name in English, Telugu transliteration below it, price, availability badge, and an Add to Cart button — if the product has variants show a variant selector first. In `src/components/customer/QuantitySelector.tsx`, build a +/- stepper that respects `min_qty`, `step_size`, and `max_qty` from the product schema. In `src/stores/cartStore.ts`, create a Zustand store with actions: addItem, removeItem, updateQuantity, setItemNote, clearCart — cart state includes product id, variant id, quantity, unit_price, and item_notes. In `src/components/customer/CartDrawer.tsx`, build a slide-up drawer showing all cart items with quantity controls, item notes input, subtotal, and a Proceed to Checkout button. In `src/app/(customer)/search/page.tsx`, wire the search input to the Meilisearch API route and display results as a `ProductGrid`.

***

### Step 9 — Checkout \& Order Placement

> In `src/app/(customer)/checkout/page.tsx`, build the checkout flow in steps: Step 1 — phone entry using `PhoneEntry` component that calls `/api/customer/identify`, autofills name if returning customer; Step 2 — delivery or pickup selection; Step 3 — if delivery, show saved addresses or open `LocationPicker` to add a new one, save address to `addresses` table via server action; Step 4 — order summary with cart items, delivery charge, total; Step 5 — payment mode selection (Cash, UPI, Bank Transfer). In `src/actions/orders.ts`, write a `placeOrder` server action that validates the cart, creates an order record, creates order_item records, sets payment_status to PENDING, clears the cart, and returns the order id. Apply the order placement rate limiter (from Upstash) inside this server action. After successful order placement, redirect to `src/app/(customer)/orders/[orderId]/page.tsx` showing the order confirmation with status.

***

### Step 10 — Admin: Products \& Categories

> Build the admin product and category management. In `src/app/(admin)/products/page.tsx`, fetch and display all products for the store in a table with columns: image thumbnail, name (English), category, status badge, price, actions (edit/hide/delete). Add filter controls for category and status. In `src/app/(admin)/products/new/page.tsx` and `[productId]/page.tsx`, build the product form using React Hook Form and Zod: fields for name_en, name_te_transliteration, name_te_script, category, type (PACKAGED/LOOSE), unit, min_qty, step_size, max_qty, base_price, status, and an image upload section using the `ImageUpload` shared component that calls `/api/upload`. Add a variants section that allows adding multiple label+price rows. On submit, call the `createProduct` or `updateProduct` server action in `src/actions/products.ts` which saves to DB and calls `syncProduct` for Meilisearch. In `src/app/(admin)/categories/page.tsx`, build a tree view of categories and subcategories with add/edit/reorder controls.

***

### Step 11 — Admin: Orders \& Delivery

> In `src/app/(admin)/orders/page.tsx`, build the orders management view with filters for status, type (delivery/pickup), payment status, and date range — display as a table with order id, customer name, phone, total, status, payment mode, and actions. In `src/app/(admin)/orders/[orderId]/page.tsx`, show full order detail: all items with quantities and notes, customer address on a small `MapPicker` (read-only), billing editor to adjust delivery charge, discount, bag charge, manual price overrides, billing notes, payment proof images, and status update controls. In `src/app/(admin)/delivery/page.tsx`, build the delivery map view using `DeliveryMap` component — fetch all orders with status PLACED and DELIVERY type, render a Leaflet map with a marker for each delivery address, clicking a marker shows the customer name and an "Assign Partner" button. In `src/components/admin/DeliveryAssign.tsx`, build a dropdown of available delivery partners and a confirm button that calls the `assignDelivery` server action creating a record in the `deliveries` table.

***

### Step 12 — Delivery Partner App

> Build the delivery partner interface (mobile-first layout). In `src/app/(delivery)/dashboard/page.tsx`, fetch all deliveries assigned to the logged-in partner with status not DELIVERED or CANCELLED, display as a list of `DeliveryCard` components showing customer name, area, order total, and payment mode. In `src/app/(delivery)/delivery/[deliveryId]/page.tsx`, show full delivery detail: customer name, phone (tap to call), address text, a `MapPicker` in read-only mode showing the pin, a `NavigateButton` that constructs a Google Maps deep link (`https://www.google.com/maps/dir/?api=1&destination=LAT,LNG`) and opens it, a status update section with buttons for "Mark In Transit" and "Mark Delivered", a `ProofUpload` component using the device camera (via the upload API route) to capture and upload payment proof images, and a COD collection confirmation if payment mode is Cash.

***

### Step 13 — Multilingual (EN/TE)

> In `src/i18n/en.ts` and `src/i18n/te.ts`, create translation objects covering all UI strings: navigation labels, button text, status labels, form field labels, error messages, empty state messages, and order status descriptions. In `src/i18n/index.ts`, write a `useTranslation` hook that reads the current language from `uiStore` (Zustand) and returns the correct string object. In `src/components/shared/LanguageSwitcher.tsx`, build a toggle button that switches between EN and TE in the Zustand `uiStore`. Apply translations to all customer-facing components: `ProductCard` (show Telugu name when TE is active), `CategoryBar`, `CartDrawer`, `CheckoutPage`, `OrderCard`. Apply to delivery partner app UI as well. Admin panel can remain English-only for now.

***

### Step 14 — Sentry \& Error Handling

> Run `npx @sentry/wizard@latest -i nextjs` and follow the prompts to connect to your Sentry project using `SENTRY_DSN`. After setup, in `src/app/error.tsx`, build a user-friendly error page that shows a friendly message in English and Telugu with a "Try Again" button — do not expose raw error details to the customer. In `src/components/shared/ErrorBoundary.tsx`, create a React error boundary component wrapping major sections. Set `tracesSampleRate` to `0.1` for development and `0.2` for production in the Sentry config. Verify that a test error appears in the Sentry dashboard.

***

### Step 15 — PWA Setup

> Configure `next-pwa` in `next.config.ts` to generate a service worker. In `public/manifest.json`, create the PWA manifest with app name, short name, start URL `/`, display `standalone`, background colour and theme colour matching the app's design, and icon paths pointing to `public/icons/icon-192.png` and `public/icons/icon-512.png` (generate simple placeholder icons for now). Add the manifest link and PWA meta tags to `src/app/layout.tsx`. In `src/components/shared/` create an `InstallPrompt.tsx` component that listens for the `beforeinstallprompt` browser event and shows a bottom banner saying "Add to Home Screen" — dismiss stores the preference in a Zustand flag so it doesn't reappear. Test that the app is installable on Android Chrome.

***

### Phase 2 (After UX Validation) — Capacitor

> Only run this after real user testing confirms the UX is solid. Install `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`, `@capacitor/geolocation`, `@capacitor/camera`, `@capacitor/app`, `@capacitor/haptics`, `@capacitor/network`. Configure `capacitor.config.ts` with your app id and point `webDir` to `out`. Update `next.config.ts` to enable static export (`output: 'export'`). In `src/lib/utils/platform.ts`, write a `isNativePlatform` helper using `Capacitor.isNativePlatform()`. Update `src/hooks/useGeolocation.ts` to use `@capacitor/geolocation` when on native and `navigator.geolocation` on browser. Update `src/components/delivery/ProofUpload.tsx` to use `@capacitor/camera` when on native. Add all required permissions to `android/app/src/main/AndroidManifest.xml`: INTERNET, ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION, CAMERA, READ_MEDIA_IMAGES, VIBRATE. Run `npx cap add android`, `npx cap sync`, then `npx cap open android` to build the APK in Android Studio.

---

# before starting i want a perfect github workflow and branches for both like 2 branche for demo(main and dev) and 2 branches for prod, a perfect repo, not through https but through ssh and all  ,perfect repo visibility , settings

Here's the complete GitHub setup — SSH, repo config, branch strategy, protection rules, and CI/CD workflow all in one place.

***

## Part 1 — SSH Setup (Do This First)

Run these commands in your terminal (Windows: Git Bash or PowerShell):[^11_1][^11_2]

```bash
# 1. Generate SSH key (use your GitHub email)
ssh-keygen -t ed25519 -C "your@email.com" -f ~/.ssh/github_kirana

# 2. Start SSH agent and add the key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/github_kirana

# 3. Copy your public key
cat ~/.ssh/github_kirana.pub
# → Copy the entire output
```

Then on GitHub:

- Go to **Settings → SSH and GPG keys → New SSH key**
- Title: `Kirana Dev Machine`
- Paste the public key → **Add SSH key**

Add this to `~/.ssh/config` so Git always uses the right key:

```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/github_kirana
  IdentitiesOnly yes
```

Test it:

```bash
ssh -T git@github.com
# → Hi yourusername! You've successfully authenticated
```


***

## Part 2 — Create the Repository

On GitHub:

- **New repository**
- Name: `kirana-app` (or whatever you decide later)
- Visibility: **Private** — this contains your env structure, business logic, and delivery partner flows. Keep it private until you decide to open source
- ❌ Do NOT initialize with README, .gitignore, or license — you'll push your own
- Create repository

Then locally:

```bash
cd kirana-app
git init
git remote add origin git@github.com:YOURUSERNAME/kirana-app.git
```


***

## Part 3 — Branch Strategy

You have **4 branches** total — 2 for demo, 2 for production:

```
kirana-app/
├── main          ← DEMO production (what demo clients see, live on demo Vercel)
├── dev           ← DEMO development (your active building branch)
├── prod          ← REAL production (what real store customers use)
└── prod-dev      ← REAL development (features for production, tested before going live)
```

**Flow for demo:**

```
dev → PR → main → auto-deploys to demo Vercel URL
```

**Flow for production:**

```
prod-dev → PR → prod → auto-deploys to production Vercel URL
```

Create all branches:

```bash
# First commit so branches have a base
echo "# Kirana App" > README.md
git add .
git commit -m "init"
git push -u origin main

# Create remaining branches from main
git checkout -b dev
git push -u origin dev

git checkout main
git checkout -b prod
git push -u origin prod

git checkout -b prod-dev
git push -u origin prod-dev

# Go back to dev — this is your working branch
git checkout dev
```


***

## Part 4 — Branch Protection Rules

Set these up in **GitHub → Settings → Branches → Add rule** for each protected branch:[^11_3][^11_4]

### `main` (Demo production)

| Setting | Value |
| :-- | :-- |
| Require pull request before merging | ✅ ON |
| Required approvals | 1 (yourself for solo, or teammate) |
| Dismiss stale reviews on new commits | ✅ ON |
| Require status checks to pass | ✅ ON — add `ci` check (from GitHub Actions) |
| Require branches to be up to date | ✅ ON |
| Block force pushes | ✅ ON |
| Allow deletions | ❌ OFF |

### `prod` (Real production)

| Setting | Value |
| :-- | :-- |
| Require pull request before merging | ✅ ON |
| Required approvals | 1 |
| Dismiss stale reviews | ✅ ON |
| Require status checks to pass | ✅ ON — add `ci` check |
| Require linear history | ✅ ON (clean git log) |
| Block force pushes | ✅ ON |
| Allow deletions | ❌ OFF |
| Include administrators | ✅ ON (protects even you from accidents) |

### `dev` and `prod-dev`

Leave unprotected — you push directly to these while building.

***

## Part 5 — GitHub Actions CI Workflow

Create this file in your repo — it runs on every push/PR and blocks merging if TypeScript or build fails:[^11_5][^11_6]

```
.github/
└── workflows/
    └── ci.yml
```

```yaml
name: CI

on:
  push:
    branches: [dev, prod-dev]
  pull_request:
    branches: [main, prod]

jobs:
  ci:
    name: Type Check & Build
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: TypeScript check
        run: npx tsc --noEmit

      - name: Lint
        run: npx eslint . --ext .ts,.tsx --max-warnings 0

      - name: Build check
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          BETTER_AUTH_SECRET: ${{ secrets.BETTER_AUTH_SECRET }}
          UPSTASH_REDIS_REST_URL: ${{ secrets.UPSTASH_REDIS_REST_URL }}
          UPSTASH_REDIS_REST_TOKEN: ${{ secrets.UPSTASH_REDIS_REST_TOKEN }}
          NEXT_PUBLIC_OLA_MAPS_API_KEY: ${{ secrets.OLA_MAPS_API_KEY }}
```


***

## Part 6 — Vercel Project Setup (Two Separate Projects)

Create **two separate Vercel projects** pointing to the same repo:[^11_6]

**Project 1 — Demo**

- Vercel project name: `kirana-demo`
- Production branch: `main`
- Preview branch: `dev` (auto-preview deployments on every push)
- Env variables: your demo Neon branch URL, demo keys

**Project 2 — Production**

- Vercel project name: `kirana-prod`
- Production branch: `prod`
- Preview branch: `prod-dev`
- Env variables: your production Neon DB, real keys

In Vercel settings for **both projects**, go to **Git → Ignored Build Step** and set it so each project only builds its own branches — prevents the demo project from trying to build `prod` pushes.

***

## Part 7 — GitHub Repository Settings Checklist

Go to **Settings** on your GitHub repo and configure:


| Setting | Value |
| :-- | :-- |
| **Visibility** | Private |
| **Default branch** | `dev` (so new PRs default to dev, not main) |
| **Merge button** | Allow Squash merging only — keeps git history clean |
| **Automatically delete head branches** | ✅ ON — cleans up feature branches after merge |
| **Allow auto-merge** | ✅ ON — useful for solo dev when CI passes |
| **Wikis** | ❌ OFF |
| **Projects** | Optional — turn on if you want a Kanban board |
| **Issues** | ✅ ON — use for tracking bugs and features |
| **Discussions** | ❌ OFF |


***

## Part 8 — GitHub Secrets

Go to **Settings → Secrets and variables → Actions → New repository secret** and add all of these:[^11_7]

```
DATABASE_URL
BETTER_AUTH_SECRET
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
MEILI_HOST
MEILI_MASTER_KEY
OLA_MAPS_API_KEY
BUNNY_STORAGE_API_KEY
BUNNY_STORAGE_ZONE
BUNNY_CDN_URL
SENTRY_DSN
SENTRY_AUTH_TOKEN
```


***

## Daily Workflow (How You Actually Work)

```bash
# Start a new feature
git checkout dev
git pull origin dev
# → write code with Codex

# Push to dev (triggers CI + Vercel preview)
git add .
git commit -m "feat: add product form with variant manager"
git push origin dev

# When feature is ready for demo
# → Open PR: dev → main on GitHub
# → CI must pass
# → Merge → Vercel auto-deploys demo URL

# When demo is validated and ready for real users
# → Cherry-pick or merge main → prod-dev
# → Test on prod-dev Vercel preview
# → Open PR: prod-dev → prod
# → Merge → Vercel auto-deploys production
```

<span style="display:none">[^11_10][^11_11][^11_12][^11_13][^11_14][^11_15][^11_8][^11_9]</span>

<div align="center">⁂</div>

[^11_1]: https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/GitHub-SSH-Windows-Example

[^11_2]: https://www.youtube.com/watch?v=HQfprk40gMc

[^11_3]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule

[^11_4]: https://github.nih.gov/about/features/protected-branches

[^11_5]: https://rexavtech.com/nextjs-ci-cd-github-vercel/

[^11_6]: https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel

[^11_7]: https://www.youtube.com/watch?v=Zt9svt97OwY

[^11_8]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches

[^11_9]: https://www.youtube.com/watch?v=RM_avvE3L-g

[^11_10]: https://www.arnica.io/blog/what-every-developer-needs-to-know-about-github-branch-protection

[^11_11]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches

[^11_12]: https://github.blog/changelog/2025-11-07-actions-pull_request_target-and-environment-branch-protections-changes/

[^11_13]: https://blog.kenrick95.org/2023/07/setting-up-git-ssh-key-on-windows/

[^11_14]: https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule

[^11_15]: https://stackoverflow.com/questions/51023197/how-to-configure-git-with-ssh-keys-on-windows-10


---

# now the github repo creation is done, also koushik@koushik:~/Shared/shared/new/kirana-app\$ git init

hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint:
hint:   git config --global init.defaultBranch <name>
hint:
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint:
hint:   git branch -m <name>
Initialized empty Git repository in /home/koushik/Shared/shared/new/kirana-app/.git/
koushik@koushik:~/Shared/shared/new/kirana-app\$ git remote add origin [git@github.com](mailto:git@github.com)
koushik@koushik:~/Shared/shared/new/kirana-app\$ \# First commit so branches have a base
koushik@koushik:~/Shared/shared/new/kirana-app\$ \# First commit so branches have a base
echo "\# Kirana App" > README.md
git add .t -m "init"
git commit -m "init"ain
git push -u origin main

# Create remaining branches from main

# Create remaining branches from main

git checkout -b devdev
git push -u origin dev
git checkout main
git checkout mainrod
git checkout -b prodrod
git push -u origin prod
git checkout -b prod-dev
git checkout -b prod-devdev
git push -u origin prod-dev

# Go back to dev — this is your working branch

# Go back to dev — this is your working branch

git checkout dev
[main (root-commit) 58042d8] init
1 file changed, 1 insertion(+)
create mode 100644 README.md
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 228 bytes | 228.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To github.com:Koushikbalusu/kirana-app.git

* [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
Switched to a new branch 'dev'
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote:
remote: Create a pull request for 'dev' on GitHub by visiting:
remote:      [https://github.com/Koushikbalusu/kirana-app/pull/new/dev](https://github.com/Koushikbalusu/kirana-app/pull/new/dev)
remote:
To github.com:Koushikbalusu/kirana-app.git
* [new branch]      dev -> dev
branch 'dev' set up to track 'origin/dev'.
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
Switched to a new branch 'prod'
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote:
remote: Create a pull request for 'prod' on GitHub by visiting:
remote:      [https://github.com/Koushikbalusu/kirana-app/pull/new/prod](https://github.com/Koushikbalusu/kirana-app/pull/new/prod)
remote:
To github.com:Koushikbalusu/kirana-app.git
* [new branch]      prod -> prod
branch 'prod' set up to track 'origin/prod'.
Switched to a new branch 'prod-dev'
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote:
remote: Create a pull request for 'prod-dev' on GitHub by visiting:
remote:      [https://github.com/Koushikbalusu/kirana-app/pull/new/prod-dev](https://github.com/Koushikbalusu/kirana-app/pull/new/prod-dev)
remote:
To github.com:Koushikbalusu/kirana-app.git
* [new branch]      prod-dev -> prod-dev
branch 'prod-dev' set up to track 'origin/prod-dev'.
Switched to branch 'dev'
koushik@koushik:~/Shared/shared/new/kirana-app\$
are done  now the git hub branch protection rules and all we shoud need to congigure in github website

All 4 branches are live. Now configure everything on the GitHub website in this exact order:

***

## Step 1 — Change Default Branch to `dev`

**Settings → General → scroll to "Default branch"**

- Click the ↔ switch icon next to `main`
- Select `dev` from the dropdown
- Click **Update** → confirm

This ensures all new PRs and Codex pushes target `dev` by default, not `main`.

***

## Step 2 — Branch Protection Rules

You're already on the right page (Settings → Branches). Click **"Add classic branch protection rule"** — do this **twice**, once for `main` and once for `prod`.

***

### Rule 1 — `main` (Demo production)

**Branch name pattern:** `main`


| Setting | Action |
| :-- | :-- |
| Require a pull request before merging | ✅ Check |
| — Require approvals | Set to **1** |
| — Dismiss stale pull request approvals when new commits are pushed | ✅ Check |
| Require status checks to pass before merging | ✅ Check |
| — Require branches to be up to date before merging | ✅ Check |
| — Search and add status check | Type `ci` → add it (appears after first GitHub Actions run) |
| Do not allow bypassing the above settings | ✅ Check (protects even you) |
| Restrict who can push to matching branches | Leave unchecked for now (solo dev) |
| Allow force pushes | ❌ Leave unchecked |
| Allow deletions | ❌ Leave unchecked |

Click **Create** at the bottom.

***

### Rule 2 — `prod` (Real production)

**Branch name pattern:** `prod`


| Setting | Action |
| :-- | :-- |
| Require a pull request before merging | ✅ Check |
| — Require approvals | Set to **1** |
| — Dismiss stale pull request approvals when new commits are pushed | ✅ Check |
| Require status checks to pass before merging | ✅ Check |
| — Require branches to be up to date before merging | ✅ Check |
| Require linear history | ✅ Check (keeps `prod` git log clean) |
| Do not allow bypassing the above settings | ✅ Check |
| Allow force pushes | ❌ Leave unchecked |
| Allow deletions | ❌ Leave unchecked |

Click **Create**.

***

## Step 3 — General Repository Settings

**Settings → General → scroll down to "Pull Requests"**


| Setting | Action |
| :-- | :-- |
| Allow merge commits | ❌ Uncheck |
| Allow squash merging | ✅ Check only this one |
| Allow rebase merging | ❌ Uncheck |
| Default commit message for squash | Select **Pull request title** |
| Automatically delete head branches | ✅ Check |
| Allow auto-merge | ✅ Check |

Click **Save** at the bottom of Pull Requests section.

***

## Step 4 — Add Repository Secrets

**Settings → Secrets and variables → Actions → New repository secret**

Add each one individually:

```
DATABASE_URL
BETTER_AUTH_SECRET
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
MEILI_HOST
MEILI_MASTER_KEY
OLA_MAPS_API_KEY
BUNNY_STORAGE_API_KEY
BUNNY_STORAGE_ZONE
BUNNY_CDN_URL
SENTRY_DSN
SENTRY_AUTH_TOKEN
```

You don't need real values yet — add placeholder strings like `placeholder` for now and update them when you set up each platform. The CI workflow needs these to exist or the build step will error.

***

## Step 5 — Create the CI Workflow File Locally

Before the status check `ci` appears in GitHub's protection rule dropdown, you need at least one Actions run. Do this now from your terminal:

```bash
# You should be on dev branch already
mkdir -p .github/workflows
```

Create `.github/workflows/ci.yml` with the content from the previous message (the yaml file with TypeScript check + build). Then:

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add GitHub Actions CI workflow"
git push origin dev
```

Go to **Actions tab** on GitHub — you'll see the workflow run. Once it completes (even if it fails on build for now), the `ci` status check name becomes available to select in the branch protection rule search box for `main` and `prod`. Go back to both rules and add it.

***

## Step 6 — Environments (Optional but Recommended)

**Settings → Environments → New environment**

Create two:

- Name: `demo` → link to `main` branch
- Name: `production` → link to `prod` branch → add **Required reviewers** (yourself) for an extra confirmation gate before production deploys

This adds a manual approval step on Vercel production deployments.

***

## What It Looks Like When Done

```
Branches:
  main      → Protected (PR required, CI must pass, no force push)
  prod      → Protected (PR required, CI must pass, linear history, no force push)
  dev       → Open (you push directly here while building)
  prod-dev  → Open (staging for production features)

Default branch: dev
Merge strategy: Squash only (clean history)
Head branches: Auto-deleted after merge
Secrets: All platform keys stored, not in code
```

You're now fully set up. Next step is running **Step 1 of the build prompts** — initializing the Next.js project inside `kirana-app/` on the `dev` branch.
<span style="display:none">[^12_1]</span>

<div align="center">⁂</div>

[^12_1]: image.jpg


---

# ok how to do that step 6 and hwts next

Good news — Step 6 (Environments) is **optional for a solo developer** and has a limitation worth knowing before you spend time on it. Here's the full picture:

***

## Step 6 — GitHub Environments (Quick Setup)

**Important:** Required Reviewers on environments only works fully on **GitHub Team plan or above**.  On a free private repo, the environment is created but the "Required reviewers" gate may not block deploys. For a solo dev building an MVP, **skip the reviewer gate entirely** — the branch protection rules on `prod` already protect you.[^13_1]

Here's what to actually do:

### On GitHub — Settings → Environments

**Click "New environment"** twice:

**Environment 1:**

- Name: `demo`
- Deployment branches: select **Selected branches** → add `main`
- No reviewers needed
- Click **Save protection rules**

**Environment 2:**

- Name: `production`
- Deployment branches: select **Selected branches** → add `prod`
- No reviewers needed (free plan limitation anyway)
- Click **Save protection rules**

That's it for GitHub. The real production protection comes from Vercel, not GitHub environments.

***

## Step 6b — Vercel Projects Setup (More Important)

This is what actually controls your deployments. Do this now.

### On Vercel — Create Two Projects

Go to [vercel.com](https://vercel.com) → **Add New Project** → Import `kirana-app` from GitHub

**Project 1 — Demo**

- Project name: `kirana-demo`
- Framework preset: **Next.js** (auto-detected)
- Root directory: `/` (leave default)
- Under **"Production Branch"** → change to `main`
- Click **Deploy**

After it deploys, go to **Settings → Git**:

- Production branch: `main` ✅
- Preview branches: `dev` ✅ (auto previews on every push to dev)

**Project 2 — Production**
Go back to dashboard → **Add New Project** → Import the **same** `kirana-app` repo again

- Project name: `kirana-prod`
- Production branch: `prod`
- Click **Deploy**

After it deploys, go to **Settings → Git**:

- Production branch: `prod` ✅
- Preview branches: `prod-dev` ✅


### On Both Vercel Projects — Add Environment Variables

**Settings → Environment Variables** → add all your secrets:

```
DATABASE_URL
BETTER_AUTH_SECRET
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
MEILI_HOST
MEILI_MASTER_KEY
OLA_MAPS_API_KEY
BUNNY_STORAGE_API_KEY
BUNNY_STORAGE_ZONE
BUNNY_CDN_URL
SENTRY_DSN
```

For each variable, set the environment to **Production + Preview + Development** so all branch deploys can access them.[^13_2]

***

## What's Done vs What's Next

| Item | Status |
| :-- | :-- |
| SSH key setup | ✅ Done |
| GitHub repo created (private) | ✅ Done |
| 4 branches created | ✅ Done |
| Default branch set to `dev` | ✅ Done |
| Branch protection on `main` + `prod` | ✅ Done |
| General settings (squash merge, auto-delete) | ✅ Done |
| GitHub Secrets added | ✅ Done |
| CI workflow file pushed | ✅ Done |
| GitHub Environments | ✅ Done (just now) |
| Vercel two projects setup | ✅ Do this now |
| **Start building — Step 1 prompt** | ⬅️ Next |


***

## What's Actually Next — Start Building

Once Vercel is connected, go to your terminal, make sure you're on `dev`, and run the **Step 1 prompt** from the build plan in Codex (GitHub Copilot):

```bash
# Confirm you're on dev
git branch
# → * dev

# Open your project folder in VS Code / Copilot
code .
```

Then paste **Step 1 prompt** into Codex — it initializes the Next.js 15 project, installs all dependencies, creates the full folder structure, and sets up config files. That's the first real coding session.
<span style="display:none">[^13_10][^13_11][^13_12][^13_13][^13_14][^13_15][^13_3][^13_4][^13_5][^13_6][^13_7][^13_8][^13_9]</span>

<div align="center">⁂</div>

[^13_1]: https://github.com/orgs/community/discussions/170307

[^13_2]: https://www.fromdev.com/2025/05/how-to-implement-continuous-deployment-using-github-and-vercel.html

[^13_3]: https://docs.github.com/actions/deployment/targeting-different-environments/using-environments-for-deployment

[^13_4]: https://github.com/github/branch-deploy/issues/352

[^13_5]: https://thefridaydeploy.substack.com/p/approving-deployments-with-github

[^13_6]: https://github.com/orgs/community/discussions/30156

[^13_7]: https://www.checklyhq.com/docs/integrations/ci-cd/vercel/deployment-protection/

[^13_8]: https://docs.github.com/actions/managing-workflow-runs/reviewing-deployments

[^13_9]: https://app.daily.dev/posts/trusted-sources-for-deployment-protection-jia8ynrzb

[^13_10]: https://github.blog/changelog/2025-11-03-required-review-by-specific-teams-now-available-in-rulesets/

[^13_11]: https://github.com/marketplace/actions/required-review

[^13_12]: https://www.simplefrontend.dev/guides/how-to-deploy-safely-with-vercel/

[^13_13]: https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments

[^13_14]: https://github.com/vercel/community/discussions/5420

[^13_15]: https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/managing-environments-for-deployment


---

# no folder structure is not yet done , and the  platform setup isnt done yet , we are doing this slowly as i dont want to encounter any errors

Smart approach. Let's go one platform at a time. Here's the exact order to set up all platforms **before touching any code**:

***

## Platform Setup Order

Do these one by one, collect each key, and paste it into a local `.env.local` file as you go.

***

### 1. Neon (Database) — Do This First

1. Go to **neon.tech** → Sign up with GitHub
2. Click **New Project**
3. Name: `kirana-app`
4. Region: **AWS ap-southeast-1 (Singapore)** — closest to Hyderabad
5. PostgreSQL version: **16** (latest)
6. Click **Create Project**
7. On the dashboard you'll see a connection string — click **"Connection string"** tab
8. Select connection type: **Node.js**
9. Copy the `DATABASE_URL` — looks like:

```
postgresql://username:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```


✅ Paste into `.env.local` as `DATABASE_URL=...`

***

### 2. Upstash (Redis) — Second

1. Go to **upstash.com** → Sign up with GitHub
2. Click **Create Database**
3. Name: `kirana-redis`
4. Type: **Regional**
5. Region: **AWS ap-southeast-1 (Singapore)**
6. Click **Create**
7. On the database page, scroll to **REST API** section
8. Copy both:
    - `UPSTASH_REDIS_REST_URL`
    - `UPSTASH_REDIS_REST_TOKEN`

✅ Paste both into `.env.local`

***

### 3. Meilisearch Cloud — Third

1. Go to **cloud.meilisearch.com** → Sign up
2. Click **New project**
3. Project name: `kirana-search`
4. Region: **GCP Asia Southeast** (Singapore)
5. Plan: **Free** (Build plan)
6. Click **Create**
7. Wait ~1 minute for it to provision
8. On project page, copy:
    - **Host URL** → `MEILI_HOST` (looks like `https://ms-xxx.meilisearch.io`)
    - **Master Key** → `MEILI_MASTER_KEY`

✅ Paste both into `.env.local`

***

### 4. Ola Maps — Fourth

1. Go to **maps.olakrutrim.com** → Sign up
2. Verify your phone number (Indian number required)
3. Go to **API Keys** section
4. Click **Create API Key**
5. Name: `kirana-app`
6. Copy the key → `OLA_MAPS_API_KEY`

✅ Paste into `.env.local`

***

### 5. BunnyCDN — Fifth

1. Go to **bunny.net** → Sign up
2. First create a **Storage Zone**:
    - Click **Storage** in left sidebar → **Add Storage Zone**
    - Name: `kirana-storage`
    - Main storage region: **Singapore (SG)**
    - Replication: none for now
    - Click **Add Storage Zone**
    - On the storage zone page, copy the **API Key** → `BUNNY_STORAGE_API_KEY`
    - Copy the **Storage Zone Name** → `BUNNY_STORAGE_ZONE` (it's `kirana-storage`)
3. Now create a **Pull Zone** (CDN):
    - Click **CDN** in left sidebar → **Add Pull Zone**
    - Name: `kirana-cdn`
    - Origin type: **Storage Zone**
    - Select your `kirana-storage` zone
    - Click **Add Pull Zone**
    - Copy the **Hostname** (looks like `kirana-cdn.b-cdn.net`) → `BUNNY_CDN_URL`

✅ Paste all three into `.env.local`

***

### 6. Sentry — Sixth

1. Go to **sentry.io** → Sign up with GitHub
2. Click **Create Project**
3. Platform: **Next.js**
4. Alert frequency: **On every new issue**
5. Project name: `kirana-app`
6. Click **Create Project**
7. Sentry will show you a DSN — copy it → `SENTRY_DSN`
(looks like `https://xxx@o123.ingest.sentry.io/456`)
8. Go to **Settings → Account → API → Auth Tokens → Create New Token**
9. Scopes: select `project:releases` and `org:read`
10. Copy the token → `SENTRY_AUTH_TOKEN`

✅ Paste both into `.env.local`

***

### 7. Better Auth Secret — Seventh (No signup needed)

Just generate a random secret in your terminal:

```bash
openssl rand -base64 32
```

Copy the output → `BETTER_AUTH_SECRET`

✅ Paste into `.env.local`

***

## Your `.env.local` Should Now Look Like This

```bash
# Database
DATABASE_URL=postgresql://...

# Redis
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Search
MEILI_HOST=https://ms-xxx.meilisearch.io
MEILI_MASTER_KEY=...

# Maps
OLA_MAPS_API_KEY=...
NEXT_PUBLIC_OLA_MAPS_API_KEY=...   # same value, needed on client side

# Storage & CDN
BUNNY_STORAGE_API_KEY=...
BUNNY_STORAGE_ZONE=kirana-storage
BUNNY_CDN_URL=https://kirana-cdn.b-cdn.net

# Auth
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000

# Sentry
SENTRY_DSN=https://...
SENTRY_AUTH_TOKEN=...
```


***

Once all 7 are done and `.env.local` is filled, come back here and we'll move to **creating the folder structure** — every folder and file manually, before Codex writes a single line of code.

---

# The latest stable major version of PostgreSQL is PostgreSQL 18. The latest minor release as of today is PostgreSQL 18.4, released on May 14, 2026.

I can see you're on the Neon create project screen with the version dropdown open. Here's what to pick:

***

**Select PostgreSQL 17** — not 18.

Here's why:


| Version | Status | Recommendation |
| :-- | :-- | :-- |
| **18** | Just released May 14, 2026 — brand new | ❌ Too fresh — Drizzle ORM, Neon internals, and some extensions may not be fully tested against it yet |
| **17** | Stable since Oct 2024, widely battle-tested | ✅ **Pick this** |
| 16 | Still supported but older | Skip — no reason to go backwards |

PostgreSQL 18 released literally yesterday — **never use a database version that's less than a few months old** in any project, even a demo. Driver compatibility issues and unexpected behavior are common in the first few weeks of a major release.

***

## What to Do Right Now

1. **Postgres version** → select **17** (currently selected as 17 ✅ — you're good, keep it)
2. **Region** → AWS Asia Pacific 1 (Singapore) ✅ already correct
3. **Enable Neon Auth** → leave the toggle **OFF** — you're using Better Auth, not Neon Auth
4. Click **Create**

After it creates, copy the `DATABASE_URL` connection string and move to the next platform (Upstash).
<span style="display:none">[^15_1]</span>

<div align="center">⁂</div>

[^15_1]: image.jpg


---

# ?

Neon is done! I can see the connection string is ready. Here's exactly what to do:

***

## Neon — Copy the Right String

You can see the connection string in the dialog. Two important things before copying:

**1. Make sure "Connection pooling" toggle is ON** (it's already green/ON in your screenshot ✅) — this is the pooled connection, which works correctly with Drizzle on Vercel serverless.

**2. Click "Show password"** first, then **"Copy snippet"** — so the password is revealed in the copied string, not masked with `***`.

The string will look like:

```
postgresql://neondb_owner:ACTUALPASSWORD@ep-mute-smoke-aozwgxtj-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

✅ Paste this as `DATABASE_URL` in your `.env.local`

***

## One Extra Thing — Also Get the Direct (Non-Pooled) URL

You need **two** Neon URLs in `.env.local`:

- `DATABASE_URL` → **pooled** (what you just copied, with `-pooler` in the hostname) — used by Drizzle at runtime on Vercel
- `DATABASE_URL_UNPOOLED` → **direct** (without pooler) — used only by `drizzle-kit` for migrations

To get the direct URL:

1. Toggle **Connection pooling OFF** in the same dialog
2. Copy the string → paste as `DATABASE_URL_UNPOOLED`
3. Toggle pooling back ON

Your `.env.local` will have:

```bash
DATABASE_URL=postgresql://...pooler...aws.neon.tech/neondb?sslmode=require&channel_binding=require
DATABASE_URL_UNPOOLED=postgresql://...direct...aws.neon.tech/neondb?sslmode=require
```


***

Neon ✅ done. Close this dialog and move to **Upstash** (you already have that tab open — Redis tab is visible in your browser).
<span style="display:none">[^16_1]</span>

<div align="center">⁂</div>

[^16_1]: image.jpg


---

## Upstash — Everything Looks Correct ✅

- Name: `kirana-redis` ✅
- Region: **Singapore (ap-southeast-1)** ✅ — matches your Neon region, perfect
- **Eviction: OFF** ✅ — leave it off, you don't want Redis randomly deleting cart/session data
- Read Regions: leave empty (paid feature, not needed)

Click **Next** → on the plan page select **Free** → **Create**.

***

## Neon DB Branches — Yes, Set Them Up Now

Good catch. Neon gives you **10 branches free** — you should create them now to match your Git branch strategy. Here's how:

### Go to Neon → your `kirana-app` project → **Branches** (left sidebar)

You already have `production` (the default branch). Create 3 more:

**Branch 1 — `dev`**

- Click **Create Branch**
- Name: `dev`
- Branch from: `production` (head)
- This will be used by your Vercel demo preview deployments

**Branch 2 — `prod`**

- Click **Create Branch**
- Name: `prod`
- Branch from: `production` (head)
- This will be your actual production DB

**Branch 3 — `prod-dev`**

- Click **Create Branch**
- Name: `prod-dev`
- Branch from: `prod`
- This will be used for production feature testing

***

## How Each Branch Maps to Everything

| Git Branch | Vercel Project | Neon DB Branch | Purpose |
| :-- | :-- | :-- | :-- |
| `dev` | kirana-demo (preview) | `dev` | Active building |
| `main` | kirana-demo (production) | `production` | Demo for clients |
| `prod-dev` | kirana-prod (preview) | `prod-dev` | Pre-production testing |
| `prod` | kirana-prod (production) | `prod` | Real customers |


***

## Get All 4 Connection Strings

For each Neon branch, click on it → **Connect** → copy both the pooled and unpooled URL. You'll have these in `.env.local`:

```bash
# Active development (what you use locally on dev branch)
DATABASE_URL=postgresql://...pooler...dev branch URL
DATABASE_URL_UNPOOLED=postgresql://...direct...dev branch URL
```

The other branch URLs go into **Vercel environment variables** per project — not in your local `.env.local`. You only need the `dev` branch URLs locally.

***

Once Neon branches are created, finish Upstash setup and move to the next platform.
<span style="display:none">[^17_1][^17_2]</span>

<div align="center">⁂</div>

[^17_1]: image.jpg

[^17_2]: image-2.jpg


---

# image.jpg

I can see the "Create new branch" dialog for the `dev` branch. Here's exactly what to select:

***

## For the `dev` branch

| Setting | Choice | Why |
| :-- | :-- | :-- |
| **Parent branch** | `production` ✅ already set | Correct |
| **Branch name** | `dev` ✅ already typed | Correct |
| **Automatically delete branch after** | ❌ Leave unchecked | You need this permanently |
| **Data option** | **Schema only** | You have no data yet — no point copying empty data. Schema only is cleaner and uses the least storage |

Click **Create**.

***

## Then Repeat for the Other 2 Branches

**Branch 2 — `prod`**

- Parent branch: `production`
- Name: `prod`
- Auto-delete: ❌ off
- Data: **Schema only**

**Branch 3 — `prod-dev`**

- Parent branch: `prod` ← change this one
- Name: `prod-dev`
- Auto-delete: ❌ off
- Data: **Schema only**

***

After all 3 are created, go into each branch, click **Connect**, and copy the **pooled** connection string. You'll have 4 total URLs (one per branch including the original `production` branch).

For now you only need the **`dev` branch URL** in your local `.env.local`. The other 3 go into Vercel environment variables later.
<span style="display:none">[^18_1]</span>

<div align="center">⁂</div>

[^18_1]: image.jpg


---

## Current Data vs Schema Only

**Yes, you can use Current data** — you're right, right now both options are effectively identical since there's no data. Either works fine. The distinction only matters later when branches have actual data in them.

**However** — notice the warning on the right side of your screenshot: *"A schema-only branch is a root branch. This project allows 2 more root branches."* This means Neon treats Schema-only branches differently (as root branches) and you're limited to 2 more on the free plan. **Current data** branches don't count as root branches — they're child branches and don't eat into that limit.

So actually **Current data is the better choice here for all your branches** — it saves your root branch quota. ✅

***

## Renaming `production` to `main`

**Don't rename it.** Here's why:

- Neon's default branch is always called `production` internally and it has special status — it's the **primary compute** that never scales to zero, always stays warm
- Renaming it to `main` is just cosmetic and can cause confusion when Neon support docs, integrations, and the Vercel Neon integration all refer to the `production` branch by name
- Your Git branch named `main` maps to Neon's `production` branch — they don't need to have the same name, that's just a mapping in your `.env` files

Keep it as `production` in Neon. The naming table stays:


| Git Branch | Neon Branch |
| :-- | :-- |
| `main` | `production` |
| `dev` | `dev` |
| `prod` | `prod` |
| `prod-dev` | `prod-dev` |


***

**So right now:** Select **Current data** ✅, name is `dev` ✅, auto-delete off ✅ → click **Create**.
<span style="display:none">[^19_1]</span>

<div align="center">⁂</div>

[^19_1]: image.jpg


---

# ok all the branches are created which one to place in the current working folder

**Use the `dev` branch connection string** in your local `.env.local`.

You're going to be working on the `dev` Git branch, so your local environment should point to the `dev` Neon branch. They always match.

***

## Get the `dev` Branch URL

1. In Neon → left sidebar → **Branches** → click **`dev`**
2. Click **Connect** button (top right)
3. Make sure:
    - Branch: **dev** ✅
    - Connection pooling: **ON** (green toggle)
4. Click **Show password** → **Copy snippet**
5. Toggle pooling **OFF** → copy again for the unpooled URL

***

## What Goes in `.env.local`

```bash
# Neon - dev branch (local development)
DATABASE_URL=postgresql://...pooler...dev branch URL...?sslmode=require&channel_binding=require
DATABASE_URL_UNPOOLED=postgresql://...direct...dev branch URL...?sslmode=require
```


***

## Where All 4 Branch URLs Go (Full Picture)

| Neon Branch | Goes into |
| :-- | :-- |
| `dev` (pooled + unpooled) | Your local `.env.local` ← **this one now** |
| `production` (pooled + unpooled) | Vercel `kirana-demo` → Production env vars |
| `prod` (pooled + unpooled) | Vercel `kirana-prod` → Production env vars |
| `prod-dev` (pooled + unpooled) | Vercel `kirana-prod` → Preview env vars |

You only need the `dev` URL right now. The Vercel ones get added when you set up Vercel projects — which comes after all platform setups are done.

Go copy the `dev` URL and add it to `.env.local`, then move to **finishing Upstash** (which was mid-setup).

---

# isnt Meilisearch Cloud free

**Meilisearch Cloud is NOT free anymore.** Their free tier was removed — it now starts at **\$30/month** with only a 14-day free trial.  I was wrong about this earlier, apologies.[^21_1][^21_2]

***

## Your Options

### Option 1 — Self-Host Meilisearch on Railway (Free) ✅ Recommended

Railway has a free tier (\$5 credit/month, enough for Meilisearch at low traffic). Deploy Meilisearch as a Docker container, get a public URL, use it exactly the same way.

- Go to **railway.app** → New Project → Deploy from Docker image
- Image: `getmeili/meilisearch:latest`
- Add env var: `MEILI_MASTER_KEY=yourRandomKey`
- Railway gives you a public URL like `https://meilisearch-xxx.railway.app`


### Option 2 — Use Typesense Cloud (Free tier exists) ✅ Alternative

Typesense Cloud has a genuine free tier — 3 nodes, 1 GB RAM, enough for MVP. But the API is slightly different from Meilisearch.

### Option 3 — Skip Search for MVP, Use PostgreSQL `ILIKE`

For the demo, PostgreSQL full-text search with `ILIKE` is actually fine for a single kirana store with ~200–500 products. You can swap in Meilisearch/Typesense for production later. **This is the smartest move for MVP** — zero cost, zero setup, works now.

***

## Recommendation

**Go with Option 3 for MVP** — use PostgreSQL search now, add Meilisearch self-hosted on Railway when you're ready for production. Don't pay \$30/month during the building phase.

So for now — **skip Meilisearch setup entirely** and move to the next platform: **Ola Maps**.
<span style="display:none">[^21_10][^21_11][^21_3][^21_4][^21_5][^21_6][^21_7][^21_8][^21_9]</span>

<div align="center">⁂</div>

[^21_1]: https://www.meilisearch.com/pricing

[^21_2]: https://www.buildmvpfast.com/tools/api-pricing-estimator/meilisearch

[^21_3]: image.jpg

[^21_4]: https://www.meilisearch.com/blog/typesense-pricing

[^21_5]: https://www.g2.com/products/meilisearch/pricing

[^21_6]: https://elest.io/open-source/meilisearch/resources/plans-and-pricing

[^21_7]: https://devtune.ai/verticals/search-vector-databases/meilisearch/pricing

[^21_8]: https://www.solomonsignal.com/launch-school/pricing/meilisearch

[^21_9]: https://xyzeo.com/product/meilisearch

[^21_10]: https://aws.amazon.com/marketplace/pp/prodview-7ougkqatzyr7i

[^21_11]: https://onehundrednights.com/nonprofit-ai-discounts/meilisearch-nonprofit-discount/


---

# why not typesense

Typesense Cloud also has **no free tier** — it starts at ~\$7/month, one-time 720-hour trial only.  But there's a bigger reason not to use it for your project specifically:[^22_1][^22_2]

***

## Why Not Typesense for This Project

|  | Typesense | Meilisearch |
| :-- | :-- | :-- |
| **Free cloud tier** | ❌ None | ❌ None (changed) |
| **License** | GPL-3.0 ⚠️ | MIT ✅ |
| **Telugu/Indic language support** | ⚠️ Weak | ⚠️ Weak (both need custom config) |
| **Self-host ease** | ✅ Good | ✅ Good |
| **Storage model** | RAM-only (entire index in memory) | Disk-based (LMDB) |
| **Railway self-host** | ✅ Works | ✅ Works |
| **Developer simplicity** | Good | Better for greenfield [^22_3] |

**The GPL-3.0 license is the real problem.** Typesense is GPL licensed — if you ever open-source this kirana platform or build a SaaS around it, GPL forces you to open-source your entire codebase. Meilisearch uses MIT license — no restrictions.  For a commercial kirana platform this matters.[^22_4]

***

## Actual Best Plan for Your Situation

**For MVP demo → PostgreSQL `ILIKE` search (free, already set up)**

**For production → Self-host Meilisearch on Railway** (~\$5/month)[^22_5]

Railway has a one-click Meilisearch deploy template. You get a public URL, full Meilisearch features, MIT licensed, no per-query charges ever. Way cheaper than Typesense Cloud (\$7+/month) for the same thing.

**So: skip both cloud options.** Use PostgreSQL now, Railway + Meilisearch later. Move on to **Ola Maps** setup next.
<span style="display:none">[^22_10][^22_11][^22_12][^22_13][^22_14][^22_15][^22_6][^22_7][^22_8][^22_9]</span>

<div align="center">⁂</div>

[^22_1]: https://typesense.helpscoutdocs.com/article/114-how-does-the-free-tier-work

[^22_2]: https://www.saasworthy.com/product/typesense-cloud/pricing

[^22_3]: https://gautamkhorana.com/search/compare/typesense-vs-meilisearch/

[^22_4]: https://www.linkedin.com/posts/meilisearch_algolia-vs-typesense-vs-meilisearch-which-activity-7389692915364728832-HeOA

[^22_5]: https://railway.com/deploy/typesense-latest

[^22_6]: https://cloud.typesense.org/support-plans

[^22_7]: https://cloud.typesense.org

[^22_8]: https://www.meilisearch.com/blog/typesense-pricing

[^22_9]: https://xyzeo.com/product/typesense

[^22_10]: https://www.youtube.com/watch?v=hFAhNcNLTus

[^22_11]: https://blog.elest.io/meilisearch-vs-typesense-which-search-engine-for-your-app/

[^22_12]: https://www.buildmvpfast.com/tools/api-pricing-estimator/typesense

[^22_13]: https://www.buildmvpfast.com/api-costs/search

[^22_14]: https://medium.com/@sohail_saifii/algolia-vs-typesense-vs-meilisearch-the-search-solution-showdown-287b6d82ba02

[^22_15]: https://www.meilisearch.com/blog/typesense-review


---

# ok does tyhe postgress search has telugu.indic language support

**No — PostgreSQL's built-in full-text search has no Telugu/Indic language support.** Here's the full picture:

***

## PostgreSQL Search — What It Can and Can't Do

### `ILIKE` (Pattern Matching)

```sql
WHERE name_en ILIKE '%dal%' OR name_te_transliteration ILIKE '%pappu%'
```

- ✅ Works for English
- ✅ Works for Telugu transliteration (it's just Latin characters)
- ✅ Works for Telugu script (`కందిపప్పు`) — matches substrings
- ❌ No typo tolerance (`dal` won't find `daal`)
- ❌ No fuzzy search
- ❌ Slow on large tables without trigram index


### `pg_trgm` (Trigram Index — Better)

```sql
CREATE INDEX products_name_trgm ON products USING GIN (name_en gin_trgm_ops, name_te_transliteration gin_trgm_ops);
```

- ✅ Fast `ILIKE` with index
- ✅ Fuzzy/similarity search (`similarity()` function)
- ✅ Works with Telugu script characters as raw text
- ❌ Still no linguistic understanding — `dal` ≠ `dals`
- ❌ Trigrams break differently on Telugu Unicode — less effective


### Built-in `tsvector` Full Text Search

- ❌ **Completely useless for Telugu** — only has dictionaries for European languages[^23_14]
- ❌ Telugu words get mangled by stemming

***

## What Actually Works for Your Case

Your search has **3 inputs per product** — English, Telugu transliteration, Telugu script. Here's the honest truth:


| Search Input | `ILIKE` + `pg_trgm` | Meilisearch |
| :-- | :-- | :-- |
| `"dal"` → finds Toor Dal | ✅ | ✅ |
| `"daal"` (typo) → finds Toor Dal | ⚠️ With similarity() | ✅ |
| `"pappu"` → finds కందిపప్పు | ✅ | ✅ |
| `"papu"` (typo) → finds కందిపప్పు | ⚠️ Partial | ✅ |
| `"కంది"` → finds కందిపప్పు | ✅ Substring match | ✅ |
| `"కండి"` (typo in script) → finds కందిపప్పు | ❌ | ✅ |


***

## Recommendation for Your Project

**For MVP demo → `pg_trgm` + `ILIKE`** across all three name columns. Enable the extension:

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

This covers 90% of search cases for a kirana store. A customer searching for `pappu`, `dal`, or `కంది` will find the right product.

**For production → Self-host Meilisearch on Railway.** The only case `pg_trgm` genuinely fails is Telugu script typos — which is rare since most customers will search in English or transliteration anyway.

So the plan stays the same — **skip Meilisearch for now, move to Ola Maps setup next.**
<span style="display:none">[^23_1][^23_10][^23_11][^23_12][^23_13][^23_15][^23_2][^23_3][^23_4][^23_5][^23_6][^23_7][^23_8][^23_9]</span>

<div align="center">⁂</div>

[^23_1]: https://www.youtube.com/playlist?list=PL2UfVCyiPs-3wJNiCLMRRiId6FSBiFXJL

[^23_2]: https://www.linkedin.com/posts/kiran-sagar-a00a761b2_sql-in-telugu-10-hours-zero-to-hero-by-activity-7373595785281781760-tuid

[^23_3]: https://www.postgresql.org/support/professional_support/asia/

[^23_4]: https://www.youtube.com/playlist?list=PLWt4Oz-9p1Vo60n6voSCPlHTUSGsmDtTu

[^23_5]: https://www.youtube.com/watch?v=JxUWWoGwpt4

[^23_6]: https://www.reddit.com/r/learnprogramming/comments/1j8rs0q/multilingual_support_for_full_text_searches_in/

[^23_7]: https://www.cuculus.com/postgresql/

[^23_8]: https://www.postgresql.org/about/news/pgroonga-400-multilingual-fast-full-text-search-3012/

[^23_9]: https://www.youtube.com/watch?v=9eAbSmLK_WE

[^23_10]: https://stackoverflow.com/questions/21288591/full-text-search-index-on-a-multilingual-column

[^23_11]: https://www.postgresql.org/docs/current/locale.html

[^23_12]: https://www.paradedb.com/blog/introducing-search

[^23_13]: https://www.youtube.com/watch?v=snWavkx5-Ys

[^23_14]: https://www.postgresql.org/docs/current/textsearch.html

[^23_15]: https://www.postgresql.org/docs/current/textsearch-controls.html


---

# ok what about railway free tier

**Railway has no real free tier anymore.** Here's the honest breakdown:[^24_1][^24_2][^24_3]

***

## Railway Pricing Reality (2026)

| Plan | Cost | What You Get |
| :-- | :-- | :-- |
| **Trial** | \$5 one-time credit, expires in 30 days | Good for testing only |
| **Free** | \$1/month credit after trial | Barely enough for anything |
| **Hobby** | \$5/month minimum + usage | Practical minimum for running a service |

**\$1/month credit** won't run a Meilisearch container — it idles at ~\$2–3/month just sitting there.  The trial \$5 lasts maybe 2 weeks for a Meilisearch instance.[^24_2]

***

## Revised Search Plan

So all the "free" self-hosting options have holes. Here's the updated picture for Meilisearch:


| Option | Cost | Verdict |
| :-- | :-- | :-- |
| Meilisearch Cloud | \$30/month | ❌ Too expensive |
| Railway self-host | ~\$5/month (Hobby plan) | 💰 Paid but cheap |
| Typesense Cloud | ~\$7/month | ❌ GPL license issue |
| Fly.io self-host | Free 3 VMs included | ✅ Actually free [^24_4] |
| **PostgreSQL `pg_trgm`** | **\$0 (already have it)** | **✅ Best for now** |

**Fly.io** actually has a genuine free tier (3 shared VMs permanently free) — you could self-host Meilisearch there for free. But that's complexity you don't need right now.

***

## Conclusion

**Stick with the plan: `pg_trgm` for MVP.** When you're ready for production search, deploy Meilisearch on **Fly.io** (free) or pay the **\$5/month Railway Hobby** plan — both are fine. For a kirana store demo with a few hundred products, `pg_trgm` is completely sufficient and costs nothing.

Move on — **Ola Maps setup next.**
<span style="display:none">[^24_10][^24_11][^24_12][^24_13][^24_14][^24_15][^24_5][^24_6][^24_7][^24_8][^24_9]</span>

<div align="center">⁂</div>

[^24_1]: https://railway.com/pricing

[^24_2]: https://kuberns.com/blogs/railway-free-tier/

[^24_3]: https://www.srvrlss.io/provider/railway/

[^24_4]: https://northflank.com/blog/railway-alternatives

[^24_5]: https://www.saaspricepulse.com/tools/railway

[^24_6]: https://encore.dev/articles/render-vs-railway

[^24_7]: https://checkthat.ai/brands/indian-railways/pricing

[^24_8]: https://www.buildmvpfast.com/tools/api-pricing-estimator/railway

[^24_9]: https://www.reddit.com/r/webdev/comments/1nv5vqi/need_clarification_about_railway_free_plan/

[^24_10]: https://host.promo/hosts/railway

[^24_11]: https://render.com/articles/render-vs-railway

[^24_12]: https://scribehow.com/page/Railway_Coupon_2026__Free_Credits_Best_Deals_to_Deploy_Smarter_for_Less__-iPNg_z3Rx-KFlm2D43-3g

[^24_13]: https://thesoftwarescout.com/railway-vs-render-2026-best-platform-for-deploying-apps/

[^24_14]: https://render.com/articles/platforms-with-a-real-free-tier-for-developers-in-2026

[^24_15]: https://docs.railway.com/pricing/plans


---

# no we have to do Meilisearch in fly.io give me step by step process clearly , this needs to be perfect

**Stop — Fly.io also has no real free tier anymore.**  The 3 free VMs were a legacy allowance for old accounts only. New accounts get a \$5 trial credit that expires.[^25_1][^25_2]

Worse — Meilisearch **requires a persistent volume** for its data, and Fly.io volumes are billed hourly even when the machine is stopped.  So even if the compute is "free", the volume storage costs money.[^25_3][^25_4]

***

## Let's Settle This Once and For All

Here's the **complete honest picture** of all options:


| Option | Actual Cost | Persistent Storage | Verdict |
| :-- | :-- | :-- | :-- |
| Meilisearch Cloud | \$30/month | ✅ | ❌ Too expensive |
| Railway | \$5/month min | ✅ | 💰 Cheapest paid option |
| Fly.io | ~\$3-4/month (VM + volume) | ✅ needs volume | 💰 Similar to Railway |
| Typesense Cloud | ~\$7/month | ✅ | ❌ GPL license |
| Algolia | Free 10k req/month | ✅ | ⚠️ Limited free tier |
| **PostgreSQL `pg_trgm`** | **\$0** | ✅ Already in Neon | **✅ MVP choice** |


***

## The Real Answer

There is **no genuinely free hosted Meilisearch option in 2026.** Every platform that used to offer it has cut their free tier.

**Here's what I recommend:**

**Phase 1 (MVP + Demo):** Use `pg_trgm` — it's already in your Neon DB, costs \$0, and handles English + Telugu transliteration + Telugu script search perfectly for a kirana store. Enable it with one SQL command.

**Phase 2 (Production, when you have paying stores):** Pay **\$5/month on Railway** for Meilisearch — by then the business justifies it. One store paying ₹500/month covers it.

**Don't spend money before you have a single paying customer.** `pg_trgm` is not a compromise — Swiggy started with simpler search too.

**Move on to Ola Maps setup.** Search is solved for now.
<span style="display:none">[^25_10][^25_11][^25_12][^25_13][^25_14][^25_15][^25_5][^25_6][^25_7][^25_8][^25_9]</span>

<div align="center">⁂</div>

[^25_1]: https://fly.io/docs/about/cost-management/

[^25_2]: https://www.saaspricepulse.com/tools/flyio

[^25_3]: https://community.fly.io/t/is-there-some-amount-of-free-storage-given/23322

[^25_4]: https://fly.io/docs/volumes/overview/

[^25_5]: https://phiilu.com/deploy-meilisearch-to-fly-io-in-5-minutes

[^25_6]: https://dev.to/jakovglavac/deploy-meilisearch-on-flyio-p89

[^25_7]: https://geeknote.net/Rei/posts/2226

[^25_8]: https://github.com/rajshekardev/meilisearch

[^25_9]: https://github.com/davlet61/meilisearch

[^25_10]: https://github.com/nhsiciliano/meilisearch-store

[^25_11]: https://community.fly.io/t/deploying-meilisearch/4046

[^25_12]: https://fly.io/docs/about/pricing/

[^25_13]: https://ithelp.ithome.com.tw/articles/10308449?sc=rss.iron

[^25_14]: https://render.com/articles/platforms-with-a-real-free-tier-for-developers-in-2026

[^25_15]: https://fly.io/docs/about/free-trial/


---

# ok lets move on to ola what  now

I can see you're on `cloud.olakrutrim.com` — but that's **Krutrim Cloud** (their AI/cloud platform), not Ola Maps. These are two separate products. You need to go to the Maps platform specifically.

***

## Ola Maps — Correct URL

Go to: **`maps.olakrutrim.com`**

Not `cloud.olakrutrim.com`

***

## Step by Step

**1. Go to `maps.olakrutrim.com`**

**2. Click "Get Started" or "Sign Up"**

- Sign up with your email
- Verify your email

**3. After login → go to "API Keys" section**

- Usually in the dashboard or developer console
- Click **"Create API Key"**
- Name it: `kirana-app-dev`
- No restrictions for now (add domain restrictions later in production)
- Click **Create** → **Copy the API key immediately** (it's shown only once on some platforms)

**4. Add to `.env.local`:**

```bash
NEXT_PUBLIC_OLA_MAPS_API_KEY=your_key_here
```

Note the `NEXT_PUBLIC_` prefix — this key is used client-side in the browser for the map/autocomplete UI, so it needs to be exposed to the frontend. This is fine for map APIs (all map API keys are public-facing by design, like Google Maps).

***

**Go to `maps.olakrutrim.com` and share what you see — I'll guide you from there.**
<span style="display:none">[^26_1]</span>

<div align="center">⁂</div>

[^26_1]: image.jpg


---

# [https://maps.olakrutrim.com/docs](https://maps.olakrutrim.com/docs) read this fully and tell me the process

The docs confirm the process clearly.  You were already on the right website — **Krutrim Cloud IS where you create Ola Maps credentials**. The Ola Maps API keys are managed through `cloud.olakrutrim.com`.[^27_1]

***

## Ola Maps API Key Setup — Step by Step

### Step 1 — Log into Krutrim Cloud

You're already on `cloud.olakrutrim.com` ✅ — log in with your credentials.

***

### Step 2 — Navigate to Credentials

After login:

- Look in the **left sidebar** for **"Credentials"** or **"KMS"** (Key Management System)
- Click on it

***

### Step 3 — Create New Credentials

- Click **"New Credentials"** button (top right corner)[^27_1]
- Fill in:
    - **Name**: `kirana-app-dev`
    - **Description**: `Ola Maps API key for kirana app development`
- Click **Create**

***

### Step 4 — View Your Credentials

- After creation, it appears in the table
- Click on the **credential name** to open details
- You will see two things:
    - **API Key** ← copy this, this is what you need
    - OAuth2 client credentials (ignore for now — API key is enough)

***

### Step 5 — Whitelist Your Domain (Important)

On the credentials detail page:

- Find the **domain whitelist** field
- For development, add: `localhost` and `localhost:3000`
- For production later, add your Vercel domain
- Click **Add**[^27_1]

***

### Step 6 — Add to `.env.local`

```bash
NEXT_PUBLIC_OLA_MAPS_API_KEY=your_api_key_here
```


***

### What You Get for Free[^27_2]

Krutrim is currently offering **1 year free access** for developers building on Krutrim Cloud for:

- ✅ Autocomplete API
- ✅ Reverse Geocoding
- ✅ Vector Tiles
- ✅ Directions API

This covers everything your kirana app needs for location.

***

Go ahead and log in — it's the same Krutrim Cloud account you already have open. Let me know what you see after login.
<span style="display:none">[^27_10][^27_11][^27_12][^27_13][^27_14][^27_3][^27_4][^27_5][^27_6][^27_7][^27_8][^27_9]</span>

<div align="center">⁂</div>

[^27_1]: https://maps.olakrutrim.com/docs/auth

[^27_2]: https://www.motorindiaonline.in/krutrim-announces-new-pricing-and-strategic-future-roadmap-for-ola-maps/

[^27_3]: https://www.olakrutrim.com/ola-maps

[^27_4]: https://docs.cloud.olakrutrim.com/basics/key-management-system/model-api-keys

[^27_5]: https://developers.google.com/maps/documentation/javascript/get-api-key

[^27_6]: https://github.com/ola-krutrim/ai-cloud

[^27_7]: https://maps.olakrutrim.com/docs/sdks/navigation-sdks/ios

[^27_8]: https://github.com/iSanjayAchar/ola-maps-node-sdk

[^27_9]: https://maps.olakrutrim.com/docs/places-apis/autocomplete-api

[^27_10]: https://maps.olakrutrim.com/pricing

[^27_11]: https://maps.olakrutrim.com/docs/places-apis/placedetails-advanced

[^27_12]: https://maps.olakrutrim.com/apidocs

[^27_13]: https://maps.olakrutrim.com/products

[^27_14]: https://swadeshiapps.com/utilities/ola-maps


---

# ok whats next

Perfect — Ola Maps is done. I can see:

- credential created: `kirana-app-dev`
- API key visible
- domain section available

So now do these small finishing steps for Ola, then move to the next platform.

***

## Finish Ola Setup

### 1. Add local domains

In the **Add Domains** field, add these:

```text
localhost, localhost:3000, 127.0.0.1, 127.0.0.1:3000
```

If it accepts comma-separated values, paste them together.
If it accepts one by one, add each separately.

This makes your local Next.js app able to call Ola Maps from the browser.

***

### 2. Copy the API key

Copy the **API Key** value and put it in your local `.env.local` as:

```bash
NEXT_PUBLIC_OLA_MAPS_API_KEY=your_actual_ola_key
```


***

## What’s Next

Next platform: **Bunny.net** for storage + CDN. This is the next important one because your app needs:

- product images
- category images
- payment proof uploads
- thumbnails
- CDN delivery

***

## Bunny Setup Order

Go to **bunny.net** and do this in order:

### Step 1 — Create account

- Sign up / log in


### Step 2 — Create Storage Zone

- Go to **Storage**
- Click **Add Storage Zone**
- Name: `kirana-app-storage`
- Region: choose **Singapore** if available, otherwise closest Asia option
- Create it


### Step 3 — Create Pull Zone

- Go to **CDN**
- Click **Add Pull Zone**
- Name: `kirana-app-cdn`
- Origin: connect it to the storage zone you just created
- Create it


### Step 4 — Get these 3 values

You need:

- **Storage API Key**
- **Storage Zone Name**
- **CDN hostname / pull zone URL**

Put them in `.env.local` like this:

```bash
BUNNY_STORAGE_API_KEY=
BUNNY_STORAGE_ZONE=
BUNNY_CDN_URL=
```


***

## Current `.env.local` Keys You Should Have So Far

By now, locally you should have at least these:

```bash
DATABASE_URL=
DATABASE_URL_UNPOOLED=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

NEXT_PUBLIC_OLA_MAPS_API_KEY=
```

After Bunny, we’ll add:

```bash
BUNNY_STORAGE_API_KEY=
BUNNY_STORAGE_ZONE=
BUNNY_CDN_URL=
```

Then next after Bunny is **Sentry**.

Go to Bunny and send the next screenshot when you’re at Storage Zone creation.
<span style="display:none">[^28_1]</span>

<div align="center">⁂</div>

[^28_1]: image.jpg


---

# ?

You're on the final Bunny storage step. One thing to fix before clicking:

## Remove the extra replication regions

Right now I can see:

- **Singapore (SG)** marked as **Main** ✅
- **Los Angeles (LA)** selected ❌
- **New York (NY)** selected ❌

For your app, you do **not** want those extra regions right now.

### Why

- Your users are in India, and Singapore is the right primary region for low latency.
- Extra replication regions increase complexity and can increase cost later.
- For MVP/demo, one main region is enough.

***

## What to do now

Click the selected extra regions to unselect them:

- **Los Angeles (LA)** → remove
- **New York (NY)** → remove

Final selection should be:


| Region | Status |
| :-- | :-- |
| **Singapore (SG)** | ✅ Main |
| Everything else | ❌ Unselected |

Then click **Add Storage Zone**.

***

## After that

Do these immediately:

### 1. Get Storage Zone name

The name you created for the zone becomes:

```bash
BUNNY_STORAGE_ZONE=your_zone_name
```


### 2. Get Storage API key

Go to:
**Bunny dashboard → Account / API Keys / Storage API access**

Copy the **Storage API Key** and save as:

```bash
BUNNY_STORAGE_API_KEY=your_storage_api_key
```


### 3. Create Pull Zone (CDN)

After storage zone is done:

- Go to **CDN**
- Click **Add Pull Zone**
- Name: `kirana-app-cdn`
- Origin type: **Bunny Storage**
- Select the storage zone you just created
- Create it

Then copy the Pull Zone hostname, something like:

```bash
BUNNY_CDN_URL=https://your-pull-zone.b-cdn.net
```


***

## So right now, your immediate next action

1. Uncheck **LA**
2. Uncheck **NY**
3. Leave only **Singapore**
4. Click **Add Storage Zone**

After that, send the next screen or tell me storage zone created.
<span style="display:none">[^29_1]</span>

<div align="center">⁂</div>

[^29_1]: image.jpg


---

# selecting all isnt costing anything its 0\$per gb

Yes — **right now** Bunny is showing `$0.00/GB` under your trial credits, so selecting more regions may not immediately charge you. But I still recommend **not selecting all regions**.

## Why not select all anyway

- Replication regions **cannot be removed later** — Bunny says that on the page itself.
- You do **not** need global replicated storage for this app right now.
- Your app is India-first, so **Singapore main region is enough** for MVP and likely enough for production too.
- More replicated regions can complicate future storage layout and billing once trial credits end.

So this is not mainly about today's `$0`; it is about **keeping the architecture clean and reversible**.

***

## Best choice now

### Keep:

- **Singapore (SG)** as Main ✅


### Optional:

- Add **one** backup replication region only if you really want redundancy, preferably:
    - **Frankfurt** or **Sydney**


### Do not do:

- Select all regions

***

## My recommendation

For your current stage:

**Only Singapore** → simplest and correct.

Then click **Add Storage Zone**.

***

## After creating the storage zone

Immediately do these next steps:

### 1. Get Storage Zone name

Save as:

```bash
BUNNY_STORAGE_ZONE=your_storage_zone_name
```


### 2. Get Storage API key

From Bunny dashboard, copy the storage/API key and save:

```bash
BUNNY_STORAGE_API_KEY=your_key
```


### 3. Create Pull Zone

Then create CDN Pull Zone linked to this storage zone.

Save the final CDN hostname as:

```bash
BUNNY_CDN_URL=https://yourpullzone.b-cdn.net
```

So yes, you *can* select more, but you **shouldn't**. Keep only Singapore and continue.
<span style="display:none">[^30_1]</span>

<div align="center">⁂</div>

[^30_1]: image.jpg


---

# ?

You're on the **Pull Zone** pricing step. Here’s the correct setup:

## What to select here

### Pricing zones

For the kirana app, keep only:

- **Asia \& Oceania** ✅

Turn OFF:

- Europe ❌
- North America ❌
- Middle East \& Africa ❌
- South America ❌


### Why

Your users are India-based, and Bunny routes traffic efficiently from the nearest enabled region. Keeping only Asia \& Oceania keeps the setup simple and cheapest for now.

***

### Bunny Shield

From your screenshots:

- one image shows **Bunny Shield Included**
- another shows **Enable Bunny Shield**

If it is **optional**, leave it **OFF** for now.
You do not need Bunny Shield during MVP/demo.

If it is included automatically and cannot be disabled, that's fine.

***

## So final choice on this screen

| Setting | Choice |
| :-- | :-- |
| Tier | Standard Tier |
| Pricing zones | **Asia \& Oceania only** |
| Bunny Shield | OFF if optional |

Then click **Add Pull Zone**.

***

## After Pull Zone is created

You need to collect these three values:

### 1. Storage Zone name

```bash
BUNNY_STORAGE_ZONE=...
```


### 2. Storage API key

```bash
BUNNY_STORAGE_API_KEY=...
```


### 3. Pull Zone hostname

It will look like:

```bash
BUNNY_CDN_URL=https://yourpullzone.b-cdn.net
```


***

## What’s next after Bunny

After Bunny is fully done, next platform is:

**Sentry** — error monitoring

So right now:

1. Enable only **Asia \& Oceania**
2. Leave Bunny Shield off if possible
3. Click **Add Pull Zone**
4. Then send the created Pull Zone page or tell me it’s done
<span style="display:none">[^31_1][^31_2]</span>

<div align="center">⁂</div>

[^31_1]: image.jpg

[^31_2]: image-2.jpg


---

# ? and where to get cnd credentials

Yes — you're on the correct page for the **storage credentials**. Bunny is a little confusing because storage credentials and CDN hostname come from two different places.

## What to copy from this page

From your current screen:

### 1. Storage Zone Name

You already have it:

```bash
BUNNY_STORAGE_ZONE=kirana-app-storage
```


### 2. Storage API key

On this page, under **Access Key → Password**, click the **eye icon** and copy that value.

Save it as:

```bash
BUNNY_STORAGE_API_KEY=the_password_value_here
```


### 3. Storage endpoint

You can also keep this for reference:

```bash
BUNNY_STORAGE_ENDPOINT=https://sg.storage.bunnycdn.com/kirana-app-storage
```

This is optional for your env, but useful.

***

## Where to get the CDN URL

The **CDN URL does NOT come from this page**.

You need to go to the **Pull Zone** page.

### Do this:

1. Click **CDN** in the left sidebar
2. Open your created pull zone (`kirana-app-cdn` or whatever you named it)
3. On the pull zone overview/settings page, copy the hostname — it will look like:
```bash
https://yourpullzone.b-cdn.net
```

Save it as:

```bash
BUNNY_CDN_URL=https://yourpullzone.b-cdn.net
```


***

## Final Bunny env values

You should end up with:

```bash
BUNNY_STORAGE_ZONE=kirana-app-storage
BUNNY_STORAGE_API_KEY=...
BUNNY_CDN_URL=https://yourpullzone.b-cdn.net
```

Optional:

```bash
BUNNY_STORAGE_ENDPOINT=https://sg.storage.bunnycdn.com/kirana-app-storage
```


***

## What’s next after Bunny

Once you have the CDN hostname too, Bunny is fully done.

Then next platform is:

## Sentry

You’ll:

1. create a Sentry account/project
2. choose **Next.js**
3. copy the DSN
4. save:
```bash
SENTRY_DSN=...
```

So right now:

- copy the password from this storage page
- go to CDN pull zone page
- copy the `.b-cdn.net` hostname

Then send that screen or say Bunny done.
<span style="display:none">[^32_1]</span>

<div align="center">⁂</div>

[^32_1]: image.jpg


---

# ?

Perfect — Bunny is done. I can see the CDN hostname clearly.

## Copy this into `.env.local`

```bash
BUNNY_STORAGE_ZONE=kirana-app-storage
BUNNY_CDN_URL=https://kirana-app-cdn.b-cdn.net
```

And from the previous storage access page, copy the revealed **Access Key / Password** as:

```bash
BUNNY_STORAGE_API_KEY=your_storage_access_key
```

Optional:

```bash
BUNNY_STORAGE_ENDPOINT=https://sg.storage.bunnycdn.com/kirana-app-storage
```


***

## Bunny setup status

You now have:

- storage zone ✅
- storage credentials ✅
- pull zone / CDN hostname ✅

So Bunny is fully complete.

***

## Next Platform: Sentry

Now set up **Sentry** for error monitoring.

### Step 1

Go to: **sentry.io**

### Step 2

- Sign up / log in
- Create organization if needed


### Step 3

Create a new project:

- Platform: **Next.js**
- Project name: `kirana-app`


### Step 4

After project creation, copy the **DSN**

Add this to `.env.local`:

```bash
SENTRY_DSN=your_dsn_here
```

You may also later need:

```bash
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=kirana-app
```

But for now, the most important one is:

```bash
SENTRY_DSN=
```


***

## Current env keys you should have now

By this point, your `.env.local` should roughly contain:

```bash
DATABASE_URL=
DATABASE_URL_UNPOOLED=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

NEXT_PUBLIC_OLA_MAPS_API_KEY=

BUNNY_STORAGE_ZONE=kirana-app-storage
BUNNY_STORAGE_API_KEY=
BUNNY_CDN_URL=https://kirana-app-cdn.b-cdn.net
```

Next we add:

```bash
SENTRY_DSN=
```

Go to Sentry and send the next screen once the project creation page opens.
<span style="display:none">[^33_1]</span>

<div align="center">⁂</div>

[^33_1]: image.jpg


---

# ?

You're on the correct Sentry signup step.

## What to choose here

### Data Storage Location

Choose:

- **European Union (EU)** ✅


### Why

- Better default for privacy/compliance
- No downside for your use case
- Error monitoring latency is not critical like app DB latency


### Email updates

Choose:

- **No, I'd prefer not to receive these updates** ✅

Then click **Continue**.

***

## What happens next

After this, Sentry will usually ask:

1. **What are you monitoring?**
    - choose **Application**
2. **Platform/framework**
    - choose **Next.js**
3. **Project name**
    - use: `kirana-app`

Then Sentry will create the project and show you the **DSN**.

***

## What to save

Once the project is created, copy:

```bash
SENTRY_DSN=...
```

If shown, also save these for later CI/release integration:

```bash
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=kirana-app
```

But the minimum you need right now is:

```bash
SENTRY_DSN=
```

Continue with **EU** and **No email updates**.
<span style="display:none">[^34_1]</span>

<div align="center">⁂</div>

[^34_1]: image.jpg


---

# ?

Perfect. Click **Begin setup**.

## Then choose these exact options

### 1. What are you monitoring?

Choose:

- **Application**


### 2. Platform

Choose:

- **Next.js**


### 3. Project name

Use:

- `kirana-app`

Then continue until Sentry creates the project.

***

## What you need from Sentry after project creation

Copy these values:

### Required now

```bash
SENTRY_DSN=
```


### Useful later

```bash
SENTRY_ORG=exptech
SENTRY_PROJECT=kirana-app
SENTRY_AUTH_TOKEN=
```

The **DSN** is the most important one right now.

The **Auth Token** is only needed later for source maps / releases in CI.

***

## After Sentry

Once Sentry is done, all the major platform setup is basically complete.

Then we do:

## Final pre-code setup checklist

We will verify you have:

- Neon ✅
- Upstash Redis ✅
- Ola Maps ✅
- Bunny ✅
- Sentry ✅

Then I’ll give you:

1. the exact **`.env.local` template**
2. the exact **`.env.example` template**
3. then **Step 1 prompt** for Codex
4. then after that the **folder structure creation prompt**

So now click:
**Begin setup → Application → Next.js → project name kirana-app**
Then send the next screen where DSN/project details appear.
<span style="display:none">[^35_1]</span>

<div align="center">⁂</div>

[^35_1]: image.jpg


---

# image.jpg

Choose **NEXT.JS** on this screen.

That is the correct Sentry project type for your app because your app uses Next.js App Router and Sentry will set up browser + server instrumentation accordingly.

***

## What to do now

1. Click **NEXT.JS**
2. Continue
3. Name the project:
    - `kirana-app`

Then proceed until Sentry creates the project and shows either:

- **DSN**
- or **project settings / install page**

***

## What we need from the next screen

We want these values:

```bash
SENTRY_DSN=
SENTRY_ORG=exptech
SENTRY_PROJECT=kirana-app
```

Optional later:

```bash
SENTRY_AUTH_TOKEN=
```


***

## After Sentry

Once Sentry is done, I’ll give you:

1. the final platform checklist
2. the exact `.env.local` template
3. the exact `.env.example`
4. then the first safe Codex prompt to start project init without errors.
<span style="display:none">[^36_1]</span>

<div align="center">⁂</div>

[^36_1]: image.jpg


---

# ?

Perfect — Sentry project is created.[^37_1]

## What to do on this screen

### 1. Click **Copy DSN**

Copy it and save it in your `.env.local` as:

```bash
NEXT_PUBLIC_SENTRY_DSN=your_dsn_here
```

For Next.js client + server setup, you will usually also use:

```bash
SENTRY_DSN=your_dsn_here
```

So safest for now is to keep both:

```bash
SENTRY_DSN=...
NEXT_PUBLIC_SENTRY_DSN=...
```


### 2. Note these values from the page

From the wizard command shown, your Sentry org is clearly:

```bash
SENTRY_ORG=exptech
```

And the project appears to be:

```bash
SENTRY_PROJECT=javascript-nextjs
```

That is what the Sentry wizard generated on this page.[^37_1]

***

## Do not do this now

Do **not** run the Sentry wizard yet. We should first initialize the app cleanly, then integrate Sentry after the base project is ready. The wizard can otherwise mutate files too early.[^37_1]

***

## Your env should now include

```bash
DATABASE_URL=
DATABASE_URL_UNPOOLED=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

NEXT_PUBLIC_OLA_MAPS_API_KEY=

BUNNY_STORAGE_ZONE=kirana-app-storage
BUNNY_STORAGE_API_KEY=
BUNNY_CDN_URL=https://kirana-app-cdn.b-cdn.net

SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=exptech
SENTRY_PROJECT=javascript-nextjs
```


***

## Platform status

You now have the core platform stack ready:


| Platform | Status |
| :-- | :-- |
| Neon PostgreSQL | Done |
| Upstash Redis | Done |
| Ola Maps | Done |
| Bunny Storage + CDN | Done |
| Sentry | Done |


***

## What’s next

Next I’ll give you the **exact `.env.local` template** and **`.env.example` template** you should create first, so your project starts cleanly.

<div align="center">⁂</div>

[^37_1]: image.jpg


---

# \# Database

DATABASE_URL=postgresql://neondb_owner:npg_HG7MDNRsqf4n@ep-gentle-cake-aoyin43d-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require\&channel_binding=require
DATABASE_URL_UNPOOLED=postgresql://neondb_owner:npg_HG7MDNRsqf4n@ep-gentle-cake-aoyin43d.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require\&channel_binding=require

# Redis

UPSTASH_REDIS_REST_URL="https://dynamic-stork-124876.upstash.io"
UPSTASH_REDIS_REST_TOKEN="gQAAAAAAAefMAAIgcDFiNTg4ZmEyZGY2MjU0Y2MxYWY2NzBkMjk5YTJjNjIyZA"

# Search

MEILI_HOST=https://ms-xxx.meilisearch.io
MEILI_MASTER_KEY=...

# Maps

OLA_MAPS_API_KEY=...WxLxELDlx6i3097wo3g6rURaxiLxX04j6izkx25d
NEXT_PUBLIC_OLA_MAPS_API_KEY=WxLxELDlx6i3097wo3g6rURaxiLxX04j6izkx25d

# Storage \& CDN

BUNNY_STORAGE_API_KEY=618b0c0b-3f4a-4157-b67600748c05-a98f-4ffb
BUNNY_STORAGE_ZONE=kirana-app-storage
BUNNY_STORAGE_ENDPOINT=https://sg.storage.bunnycdn.com/kirana-app-storage
BUNNY_CDN_URL=https://kirana-app-cdn.b-cdn.net

# Auth

BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000

# Sentry

SENTRY_DSN=https://1325edfcc08c78fdec1475477029c332@o4511393577041920.ingest.de.sentry.io/4511393582743632
SENTRY_AUTH_TOKEN=915fd71e504e11f18c5966b7f70b21ab
NEXT_PUBLIC_SENTRY_DSN=https://1325edfcc08c78fdec1475477029c332@o4511393577041920.ingest.de.sentry.io/4511393582743632
my sample env.local

This is a good start, but **do not keep these real secrets exposed in chat or commit them anywhere**. Your sample has live credentials for Neon, Upstash, Bunny, and Sentry, so you should rotate any key you pasted publicly.[^38_1][^38_2]

## Fixes

Use `NEXT_PUBLIC_OLA_MAPS_API_KEY` on the frontend; keep `OLA_MAPS_API_KEY` only if you also call Ola APIs from the server.  Better Auth commonly uses `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`, and the secret should be a long random value.  Sentry SDKs read `SENTRY_DSN`, while browser-side setup needs a public value such as `NEXT_PUBLIC_SENTRY_DSN`.[^38_3][^38_2][^38_4][^38_1]

## Recommended `.env.local`

```env
# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://...
DATABASE_URL_UNPOOLED=postgresql://...

# Redis
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Search
MEILI_HOST=
MEILI_MASTER_KEY=

# Maps
NEXT_PUBLIC_OLA_MAPS_API_KEY=...
OLA_MAPS_API_KEY=...

# Storage & CDN
BUNNY_STORAGE_API_KEY=...
BUNNY_STORAGE_ZONE=kirana-app-storage
BUNNY_STORAGE_ENDPOINT=https://sg.storage.bunnycdn.com/kirana-app-storage
BUNNY_CDN_URL=https://kirana-app-cdn.b-cdn.net

# Auth
BETTER_AUTH_SECRET=generate-a-32-byte-plus-random-secret
BETTER_AUTH_URL=http://localhost:3000

# Sentry
SENTRY_DSN=...
NEXT_PUBLIC_SENTRY_DSN=...
SENTRY_ORG=exptech
SENTRY_PROJECT=javascript-nextjs
SENTRY_AUTH_TOKEN=
```


## Notes

For your current plan, leave `MEILI_HOST` and `MEILI_MASTER_KEY` blank unless you actually deploy Meilisearch; otherwise they create confusion during setup. `DATABASE_URL` should be used by the app/runtime, while `DATABASE_URL_UNPOOLED` is useful for migrations or tools that need a direct connection. Keep `.env.local` out of git and only commit an `.env.example` with empty placeholders.[^38_2][^38_3]

## Recommended `.env.example`

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

DATABASE_URL=
DATABASE_URL_UNPOOLED=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

MEILI_HOST=
MEILI_MASTER_KEY=

NEXT_PUBLIC_OLA_MAPS_API_KEY=
OLA_MAPS_API_KEY=

BUNNY_STORAGE_API_KEY=
BUNNY_STORAGE_ZONE=
BUNNY_STORAGE_ENDPOINT=
BUNNY_CDN_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
```

Most important immediate action: **rotate the secrets you pasted here**, especially Neon DB, Upstash token, Bunny storage key, and Sentry auth token.[^38_1][^38_2]
<span style="display:none">[^38_10][^38_11][^38_12][^38_13][^38_14][^38_15][^38_5][^38_6][^38_7][^38_8][^38_9]</span>

<div align="center">⁂</div>

[^38_1]: https://better-auth.com/docs/reference/options

[^38_2]: https://docs.sentry.io/concepts/key-terms/dsn-explainer/

[^38_3]: https://better-auth-ui.desishub.com/docs/environment-variables

[^38_4]: https://saynaesmailzadeh.medium.com/️-a-complete-guide-to-using-sentry-in-react-js-and-next-js-projects-0316fad41447

[^38_5]: https://www.better-auth.com/docs/reference/options

[^38_6]: https://github.com/better-auth/better-auth/blob/main/docs/content/docs/reference/options.mdx

[^38_7]: https://skills-rank.com/fr/skill/connorads/dotfiles/better-auth-best-practices

[^38_8]: https://github.com/better-auth/better-auth/blob/main/packages/better-auth/src/types/options.ts

[^38_9]: https://github.com/getsentry/sentry-javascript/discussions/8343

[^38_10]: https://www.mintlify.com/zotodev/orpc-betterauth/guides/environment-variables

[^38_11]: https://stackoverflow.com/questions/77940213/how-to-set-sentry-environment-in-next-js-for-different-stages

[^38_12]: https://skills.sh/better-auth/skills/better-auth-best-practices

[^38_13]: https://mastra.ai/docs/server/auth/better-auth

[^38_14]: https://github.com/getsentry/sentry-javascript/issues/4070

[^38_15]: https://deepwiki.com/better-auth/better-auth/2.1-configuration-and-betterauth-options


---

# ok now whats next

Next is to **initialize the actual codebase cleanly** — first the app shell, then database wiring, then auth, then the role-based UI. Next.js App Router is the right base, and Drizzle + Neon is a standard supported path.[^39_1][^39_2]

## Step 1

Create the project with **Next.js + TypeScript + App Router + Tailwind + ESLint** using `create-next-app`.[^39_3][^39_1]

```bash
npx create-next-app@latest kirana-commerce
```

Choose:

- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- `src/` directory: **Yes**
- App Router: **Yes**
- Turbopack: **Yes**
- Import alias: **Yes** (`@/*`)

Then:

```bash
cd kirana-commerce
```


## Step 2

Create these files immediately:

- `.env.local` with your real secrets
- `.env.example` with empty placeholders
- `.gitignore` should already exclude `.env*`, but verify that it does.[^39_1]

Then install the first core packages:

```bash
npm install drizzle-orm @neondatabase/serverless zod react-hook-form @hookform/resolvers zustand
npm install better-auth @upstash/redis @upstash/ratelimit
npm install @sentry/nextjs
npm install sharp
npm install -D drizzle-kit dotenv tsx
```


## Step 3

Set up Drizzle and Neon next: create `drizzle.config.ts`, `src/db/schema`, and a `src/db/index.ts` connection file, then run a first migration or `drizzle-kit push` against Neon. Drizzle’s Neon setup is directly documented and works with a `DATABASE_URL` environment variable.[^39_2][^39_4]

## Recommended order

Build in this sequence so you don’t fight the stack:


| Order | What to build |
| :-- | :-- |
| 1 | Next.js app scaffold |
| 2 | Env files |
| 3 | Drizzle + Neon connection |
| 4 | Base schema: users, customers, addresses, products, categories, orders |
| 5 | Better Auth setup |
| 6 | Admin seed user |
| 7 | Bunny upload utility |
| 8 | Ola Maps utilities |
| 9 | Customer storefront UI |
| 10 | Admin panel |
| 11 | Delivery partner panel |
| 12 | Sentry integration |

## First safe prompt

Use this as your **first Codex prompt**:

> Create a new production-ready Next.js App Router project named `kirana-commerce` with TypeScript, Tailwind CSS, ESLint, `src/` directory, and import alias `@/*`. Do not add business logic yet. Then install these dependencies: `drizzle-orm`, `@neondatabase/serverless`, `drizzle-kit`, `dotenv`, `zod`, `react-hook-form`, `@hookform/resolvers`, `zustand`, `better-auth`, `@upstash/redis`, `@upstash/ratelimit`, `@sentry/nextjs`, `sharp`, and `tsx`. After setup, show the final folder structure and package.json dependencies only.[^39_2][^39_1]

After that, the next step is the **database schema foundation prompt**.
<span style="display:none">[^39_10][^39_11][^39_12][^39_13][^39_14][^39_15][^39_5][^39_6][^39_7][^39_8][^39_9]</span>

<div align="center">⁂</div>

[^39_1]: https://nextjs.org/docs/app/getting-started

[^39_2]: https://orm.drizzle.team/docs/tutorials/drizzle-nextjs-neon

[^39_3]: https://nextjs.org/docs/app/api-reference/cli/create-next-app

[^39_4]: https://orm.drizzle.team/docs/tutorials/drizzle-with-neon

[^39_5]: https://www.youtube.com/watch?v=vCIsrOGNhas

[^39_6]: https://codershandbook.com/nextjs-a-to-z-complete-mastery-series-for-2026-part-1-app-router-nextjs-architecture

[^39_7]: https://www.tutorialspoint.com/nextjs/nextjs_app_router_setup.htm

[^39_8]: https://dev-docs.moodybeard.com/en/nextjs/app/

[^39_9]: https://medium.com/@npguapo/installation-of-next-js-app-router-app-7bc1a66d9476

[^39_10]: https://konabos.com/blog/building-a-full-stack-app-with-next-js-trpc-drizzle-orm-neon-database

[^39_11]: https://dev.to/ottoaria/nextjs-app-router-in-2026-the-complete-guide-for-full-stack-developers-5bjl

[^39_12]: https://dev.to/osiris8/build-and-deploy-a-full-backend-api-with-nextjs-drizzle-orm-and-neon-postgresql-todofy-app-39gb

[^39_13]: https://ai-sdk.dev/v4/docs/getting-started/nextjs-app-router

[^39_14]: https://neon.com/guides/read-replica-drizzle

[^39_15]: https://www.devpulse.works/article/getting-started-nextjs-14-app-router


---

# now give me a copiyable prompt upto this step is done configuring all the serices/platforms(not millieseach) is done now creating the folder structure  and then prompts but this accounts limit is 99% over so you must give the complete explanation of what the app is ,what have been done , also give the folder structure , and the instructions and step of giving the prompts step by step , so that i can transfer this chat to another perplexity with limit

kirana-app/
├── .env.local
├── .env.example
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── drizzle.config.ts
├── capacitor.config.ts
├── package.json
│
├── public/
│   ├── manifest.json                  \# PWA manifest
│   ├── sw.js                          \# Service worker (next-pwa generates)
│   ├── icons/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── images/
│       └── placeholder.webp
│
├── src/
│   │
│   ├── app/                           \# Next.js App Router
│   │   ├── layout.tsx                 \# Root layout (fonts, Sentry, theme)
│   │   ├── globals.css                \# Tailwind base + CSS variables
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   │
│   │   ├── (customer)/                \# Customer storefront
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               \# Home / product catalog
│   │   │   ├── search/
│   │   │   │   └── page.tsx
│   │   │   ├── product/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx           \# Order history
│   │   │   │   └── [orderId]/
│   │   │   │       └── page.tsx       \# Order detail
│   │   │   └── address/
│   │   │       └── page.tsx           \# Address manager
│   │   │
│   │   ├── (admin)/                   \# Store owner + staff
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx           \# Analytics overview
│   │   │   ├── products/
│   │   │   │   ├── page.tsx           \# Product list
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [productId]/
│   │   │   │       └── page.tsx       \# Edit product
│   │   │   ├── categories/
│   │   │   │   └── page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx           \# All orders
│   │   │   │   └── [orderId]/
│   │   │   │       └── page.tsx
│   │   │   ├── delivery/
│   │   │   │   ├── page.tsx           \# Delivery map view
│   │   │   │   └── partners/
│   │   │   │       └── page.tsx       \# Manage delivery partners
│   │   │   ├── customers/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       ├── page.tsx           \# Store settings
│   │   │       ├── billing/
│   │   │       │   └── page.tsx
│   │   │       └── delivery-rules/
│   │   │           └── page.tsx
│   │   │
│   │   ├── (delivery)/                \# Delivery partner app
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx           \# Assigned deliveries list
│   │   │   └── delivery/
│   │   │       └── [deliveryId]/
│   │   │           └── page.tsx       \# Single delivery detail + map
│   │   │
│   │   ├── (superadmin)/              \# Platform-level admin
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── stores/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [storeId]/
│   │   │   │       └── page.tsx
│   │   │   ├── admins/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx           \# Global config, upload limits, languages
│   │   │
│   │   └── api/                       \# API Routes
│   │       ├── auth/
│   │       │   └── [...all]/
│   │       │       └── route.ts       \# Better Auth handler
│   │       ├── customer/
│   │       │   └── identify/
│   │       │       └── route.ts       \# Phone → silent account lookup/create
│   │       ├── upload/
│   │       │   └── route.ts           \# Sharp processing → Bunny Storage
│   │       ├── search/
│   │       │   └── route.ts           \# Meilisearch proxy
│   │       ├── webhooks/
│   │       │   └── qstash/
│   │       │       └── route.ts       \# QStash job receiver (search indexing)
│   │       └── delivery/
│   │           └── status/
│   │               └── route.ts       \# Delivery partner status updates
│   │
│   ├── components/
│   │   ├── ui/                        \# Base design system components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── select.tsx
│   │   │   ├── sheet.tsx              \# Bottom sheet / side panel
│   │   │   ├── skeleton.tsx
│   │   │   └── toast.tsx
│   │   │
│   │   ├── customer/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── CategoryBar.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   ├── QuantitySelector.tsx
│   │   │   ├── VariantPicker.tsx
│   │   │   ├── ItemNoteInput.tsx
│   │   │   ├── LocationPicker.tsx     \# Ola Maps autocomplete + Leaflet map
│   │   │   ├── AddressCard.tsx
│   │   │   ├── OrderCard.tsx
│   │   │   └── PhoneEntry.tsx         \# Frictionless phone identification
│   │   │
│   │   ├── admin/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   ├── OrderTable.tsx
│   │   │   ├── OrderFilters.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── VariantManager.tsx
│   │   │   ├── CategoryTree.tsx
│   │   │   ├── DeliveryMap.tsx        \# Leaflet cluster view of pending deliveries
│   │   │   ├── DeliveryAssign.tsx
│   │   │   ├── PaymentProofViewer.tsx
│   │   │   ├── BillingEditor.tsx
│   │   │   └── AnalyticsCards.tsx
│   │   │
│   │   ├── delivery/
│   │   │   ├── DeliveryList.tsx
│   │   │   ├── DeliveryCard.tsx
│   │   │   ├── NavigateButton.tsx     \# Google Maps deep link
│   │   │   ├── StatusUpdater.tsx
│   │   │   ├── ProofUpload.tsx        \# Camera capture + upload
│   │   │   └── CODCollect.tsx
│   │   │
│   │   └── shared/
│   │       ├── LanguageSwitcher.tsx   \# EN / TE toggle
│   │       ├── ImageUpload.tsx        \# Shared upload with Sharp pipeline
│   │       ├── MapPicker.tsx          \# Reusable Leaflet map component
│   │       ├── EmptyState.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── LoadingSpinner.tsx
│   │
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts               \# Neon + Drizzle client
│   │   │   ├── schema/
│   │   │   │   ├── stores.ts
│   │   │   │   ├── users.ts           \# Admin, delivery partner, superadmin
│   │   │   │   ├── customers.ts       \# Phone-based customer records
│   │   │   │   ├── products.ts        \# name_en, name_te_transliteration, name_te_script
│   │   │   │   ├── variants.ts
│   │   │   │   ├── categories.ts
│   │   │   │   ├── orders.ts
│   │   │   │   ├── order-items.ts
│   │   │   │   ├── deliveries.ts
│   │   │   │   ├── addresses.ts
│   │   │   │   └── payment-proofs.ts
│   │   │   └── migrations/            \# Drizzle generated migrations
│   │   │
│   │   ├── auth/
│   │   │   └── index.ts               \# Better Auth config + roles
│   │   │
│   │   ├── redis/
│   │   │   ├── client.ts              \# Upstash Redis client
│   │   │   ├── ratelimit.ts           \# Rate limit rules per route
│   │   │   └── session.ts             \# Customer session helpers
│   │   │
│   │   ├── search/
│   │   │   ├── client.ts              \# Meilisearch client
│   │   │   └── sync.ts                \# Index sync helpers
│   │   │
│   │   ├── storage/
│   │   │   ├── bunny.ts               \# Bunny Storage upload helpers
│   │   │   └── sharp.ts               \# Image processing pipeline
│   │   │
│   │   ├── maps/
│   │   │   └── ola.ts                 \# Ola Maps API helpers
│   │   │
│   │   └── utils/
│   │       ├── cn.ts                  \# Tailwind className merger
│   │       ├── format.ts              \# Price, date, weight formatters
│   │       └── platform.ts            \# Capacitor platform detection
│   │
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useCustomer.ts
│   │   ├── useGeolocation.ts
│   │   ├── useSearch.ts
│   │   └── useDeliveryStatus.ts
│   │
│   ├── stores/                        \# Zustand stores
│   │   ├── cartStore.ts
│   │   ├── uiStore.ts
│   │   └── customerStore.ts
│   │
│   ├── actions/                       \# Next.js Server Actions
│   │   ├── products.ts
│   │   ├── orders.ts
│   │   ├── cart.ts
│   │   ├── customers.ts
│   │   ├── delivery.ts
│   │   └── upload.ts
│   │
│   ├── middleware.ts                  \# Upstash rate limiting + auth guards
│   │
│   └── i18n/                          \# Multilingual
│       ├── index.ts
│       ├── en.ts
│       └── te.ts                      \# Telugu translations
│
└── android/                           \# Capacitor (generated later, Phase 2)

Copy this whole block into the new chat.

***

## Transfer note

This project is a **multilingual kirana commerce system** for Indian grocery stores moving from WhatsApp/manual ordering to a structured digital workflow. It must support **customer storefront, admin/store staff panel, delivery partner app, and superadmin platform controls** in a single Next.js web app, with minimal clean UI and no clumsy betting-app style visuals. It includes multilingual product names (English, Telugu transliteration, Telugu script), packaged and loose products, variants, configurable units, cart, addresses, delivery/pickup, delivery area logic, billing adjustments, payment proofs, analytics, and role-based dashboards.

### Business/UX intent

- Keep the **business operations unchanged**
- Digitize the workflow cleanly
- Customer auth is **phone-based low-friction**, no forced OTP/password initially
- Admin, superadmin, delivery partner use proper secure login
- Customer experience should feel **WhatsApp-simple**, rural-friendly, multilingual, and mobile-first

***

## What has already been done

### Git/GitHub

- GitHub repo already created: `kirana-app`
- SSH setup already done
- Branches already created:
    - `main`
    - `dev`
    - `prod`
    - `prod-dev`
- GitHub Actions CI workflow already added and pushed
- Working branch is currently **`dev`**


### Platforms/services already configured

These are already set up:

- **Neon PostgreSQL**
    - main/default branch: `production`
    - additional branches created: `dev`, `prod`, `prod-dev`
- **Upstash Redis**
- **Ola Maps / Krutrim**
- **Bunny Storage + Bunny CDN**
- **Sentry**
- **Meilisearch is NOT configured yet**
    - intentionally skipped for now
    - MVP should proceed without it


### Important architectural decision

For MVP:

- Do **not** implement Meilisearch yet
- Search should initially work using PostgreSQL-based search/fallback
- Keep Meilisearch-related files modular so it can be added later without refactor pain

***

## Current app/infra stack

- **Framework**: Next.js App Router + TypeScript
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Redis / rate limits / session helpers**: Upstash Redis
- **Auth**: Better Auth
- **Maps**: Ola Maps
- **Storage / image delivery**: Bunny Storage + Bunny CDN
- **Error monitoring**: Sentry
- **Image processing**: Sharp
- **State**: Zustand
- **Forms/validation**: React Hook Form + Zod
- **Styling**: Tailwind CSS
- **Phase 2 mobile wrapper**: Capacitor
- **No Meilisearch yet**

***

## Folder structure to create

Use this exact structure as the target scaffold:

```text
kirana-app/
├── .env.local
├── .env.example
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── drizzle.config.ts
├── capacitor.config.ts
├── package.json
│
├── public/
│   ├── manifest.json
│   ├── sw.js
│   ├── icons/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── images/
│       └── placeholder.webp
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── (customer)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── search/page.tsx
│   │   │   ├── product/[slug]/page.tsx
│   │   │   ├── cart/page.tsx
│   │   │   ├── checkout/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── orders/[orderId]/page.tsx
│   │   │   └── address/page.tsx
│   │   ├── (admin)/
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── products/page.tsx
│   │   │   ├── products/new/page.tsx
│   │   │   ├── products/[productId]/page.tsx
│   │   │   ├── categories/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── orders/[orderId]/page.tsx
│   │   │   ├── delivery/page.tsx
│   │   │   ├── delivery/partners/page.tsx
│   │   │   ├── customers/page.tsx
│   │   │   └── settings/
│   │   │       ├── page.tsx
│   │   │       ├── billing/page.tsx
│   │   │       └── delivery-rules/page.tsx
│   │   ├── (delivery)/
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   └── delivery/[deliveryId]/page.tsx
│   │   ├── (superadmin)/
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── stores/page.tsx
│   │   │   ├── stores/[storeId]/page.tsx
│   │   │   ├── admins/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── api/
│   │       ├── auth/[...all]/route.ts
│   │       ├── customer/identify/route.ts
│   │       ├── upload/route.ts
│   │       ├── search/route.ts
│   │       ├── webhooks/qstash/route.ts
│   │       └── delivery/status/route.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── customer/
│   │   ├── admin/
│   │   ├── delivery/
│   │   └── shared/
│   │
│   ├── lib/
│   │   ├── db/
│   │   │   ├── index.ts
│   │   │   ├── schema/
│   │   │   │   ├── stores.ts
│   │   │   │   ├── users.ts
│   │   │   │   ├── customers.ts
│   │   │   │   ├── products.ts
│   │   │   │   ├── variants.ts
│   │   │   │   ├── categories.ts
│   │   │   │   ├── orders.ts
│   │   │   │   ├── order-items.ts
│   │   │   │   ├── deliveries.ts
│   │   │   │   ├── addresses.ts
│   │   │   │   └── payment-proofs.ts
│   │   │   └── migrations/
│   │   ├── auth/index.ts
│   │   ├── redis/
│   │   │   ├── client.ts
│   │   │   ├── ratelimit.ts
│   │   │   └── session.ts
│   │   ├── search/
│   │   │   ├── client.ts
│   │   │   └── sync.ts
│   │   ├── storage/
│   │   │   ├── bunny.ts
│   │   │   └── sharp.ts
│   │   ├── maps/ola.ts
│   │   └── utils/
│   │       ├── cn.ts
│   │       ├── format.ts
│   │       └── platform.ts
│   │
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useCustomer.ts
│   │   ├── useGeolocation.ts
│   │   ├── useSearch.ts
│   │   └── useDeliveryStatus.ts
│   │
│   ├── stores/
│   │   ├── cartStore.ts
│   │   ├── uiStore.ts
│   │   └── customerStore.ts
│   │
│   ├── actions/
│   │   ├── products.ts
│   │   ├── orders.ts
│   │   ├── cart.ts
│   │   ├── customers.ts
│   │   ├── delivery.ts
│   │   └── upload.ts
│   │
│   ├── middleware.ts
│   │
│   └── i18n/
│       ├── index.ts
│       ├── en.ts
│       └── te.ts
│
└── android/
```


***

## Important corrections before coding

1. **Do not fully wire Meilisearch yet**

- Keep `src/lib/search/` and `src/app/api/search/route.ts` as placeholders/interfaces
- They should not break build if env vars are absent
- Search implementation should gracefully fall back to PostgreSQL/simple search

2. **Do not create full Capacitor/Android implementation now**

- Keep `capacitor.config.ts` placeholder-ready
- `android/` can be phase 2 or omitted until web MVP is stable

3. **Do not run Sentry wizard yet**

- Sentry project exists, but integration should happen after the project scaffold is stable

4. **Secrets must never be committed**

- `.env.local` exists locally only
- `.env.example` must contain placeholders only

***

## What the new assistant should do

The new assistant should help me continue **from this exact point**, without repeating platform setup.

The immediate task is:

### Phase 1

Initialize the project in the current `kirana-app` repo on the `dev` branch and create the **correct scaffold/folder structure** safely.

### Phase 2

Then provide **step-by-step prompts for Codex**, one phase at a time, not all at once, so errors can be controlled.

### Phase 3

Guide the build in a safe order:

1. base app init
2. env/example files
3. folder scaffold
4. dependencies
5. db connection + drizzle config
6. schema foundation
7. auth foundation
8. redis/ratelimit/session foundation
9. storage/maps/sentry utility setup
10. UI shell per role
11. customer flow
12. admin flow
13. delivery flow
14. superadmin flow
15. polish + testing

***

## Exact request to the next assistant

Please continue from here.

Do **not** redo GitHub or platform setup.

I need:

1. a **safe step-by-step implementation plan from this point onward**
2. the **exact first prompt for Codex** to initialize the project in the existing `kirana-app` repo
3. then the **second prompt** to create the folder structure and placeholder files
4. then the prompts in sequence, one stage at a time

Constraints:

- Next.js App Router
- TypeScript
- Tailwind
- Drizzle + Neon
- Better Auth
- Upstash Redis
- Bunny
- Ola Maps
- Sentry
- No Meilisearch implementation yet
- Clean minimal UI
- Must preserve the folder structure above, with practical adjustments only if necessary
- The assistant should explain **why each prompt is next**, and what I should verify before moving to the next one

Also note:

- This is being done carefully to avoid errors
- We should not jump too far ahead
- Each prompt should be copyable and focused

***

## First prompt you should give me in the new chat

Use this as the initial continuation request:

> Continue from an existing `kirana-app` GitHub repo on the `dev` branch. GitHub and external platform setup are already done: Neon, Upstash Redis, Ola Maps, Bunny Storage/CDN, and Sentry are configured. Meilisearch is intentionally not configured yet. I need a safe, staged implementation plan and copyable Codex prompts starting from project initialization and scaffold creation only. Use Next.js App Router + TypeScript + Tailwind + Drizzle + Better Auth + Upstash + Bunny + Ola Maps + Sentry. Do not skip steps, do not redo platform setup, and do not jump ahead to full business logic yet. Start with the exact first Codex prompt for project initialization inside the existing repo, then the second prompt for creating the agreed folder structure and placeholder files.
<span style="display:none">[^40_1]</span>

<div align="center">⁂</div>

[^40_1]: image.jpg

