# Cascade Goods

A small, fully-frontend e-commerce storefront you can spin up locally in under a minute. It sells fictional considered apparel, footwear, and home goods, and runs entirely in the browser with mock data — no backend, no database, no API keys.

It's intended as a starter / sandbox for prototyping storefront ideas: drop in your own products, re-skin it for a brand, or extend it with new pages and features.

## Stack

- **Vite 8** — instant dev server and hot reload
- **React 19** + **TypeScript**
- **Tailwind CSS v4** — entire theme driven by CSS custom properties for easy re-skinning
- **React Router 7** — client-side routing
- **Zustand** — cart state, persisted to `localStorage`
- **Lucide React** — icons

## Requirements

- **Node.js 20.19+** (required by Vite 8)
- npm (ships with Node)

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build       # type-check + production build to dist/
npm run preview     # preview the production build locally
npm run lint        # run ESLint
```

## Project structure

```
src/
  pages/            # Route components (Home, Products, ProductDetail, Cart, About)
  components/
    layout/         # Header, Footer, CartDrawer (used app-wide)
    products/       # ProductCard, ProductGrid
    ui/             # Generic primitives (Button, Badge, Container, StarRating)
  data/             # Mock data (products, categories, reviews) + selectors
  store/            # Zustand stores (cart)
  lib/              # Types and utilities
  index.css         # Tailwind import + theme tokens
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — hero, categories, bestsellers, new arrivals |
| `/products` | Product listing with category filter (`?category=outerwear`) and sort |
| `/products/:slug` | Product detail with gallery, color/size, reviews, related products |
| `/cart` | Cart with quantity controls and order summary |
| `/about` | Brand story, sustainability, warranty, shipping, contact |

## Customizing

### Re-skin the storefront

The entire visual identity — colors, accent, surfaces, typography, radii — is driven by CSS custom properties inside the `@theme { ... }` block in `src/index.css`. Changing brand colors should never require touching component files; if it does, the missing color belongs as a new token.

### Add or edit products

Mock data lives in `src/data/`:

- `products.ts` — the product catalog. Append a new entry to the `products` array, mirroring the existing fields. The `slug` becomes the URL (`/products/<slug>`).
- `categories.ts` — category list (also drives the sidebar on `/products` and the footer).
- `reviews.ts` — product reviews keyed by product id.

Shared types (`Product`, `Category`, `Review`) live in `src/lib/types.ts`. If you add a new field to a product, update the type first.

### Imagery

Product, category, and hero photos are hosted on the Unsplash CDN (`images.unsplash.com`) and used under the [Unsplash License](https://unsplash.com/license). Photo IDs are baked into `src/data/products.ts` and `src/data/categories.ts` via a small `img(id)` / `banner(id)` helper, so swapping a photo is a one-line change per product.

To use your own images, either replace the photo IDs (any Unsplash photo URL contains the ID after `photo-`) or change the helper to point at a different host or local `src/assets/` folder.

### Add a new page

1. Create a new component in `src/pages/`.
2. Register it in `src/App.tsx` inside the `<Routes>` block.
3. Link to it from `Header.tsx` or `Footer.tsx` if it should appear in navigation.

## Notes

- There is no checkout backend — the cart page is a UI-only flow.
- The cart persists across reloads via `localStorage` under the key `cascade-cart`. Clear it with `localStorage.removeItem('cascade-cart')` if you need a clean slate.
