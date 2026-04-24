# Cascade Goods

A small, fully-frontend e-commerce demo storefront. Built as a sandbox for demoing Cursor capabilities to Salesforce Solution Engineers.

The store sells fictional considered apparel, footwear, and home goods. It runs entirely in the browser with mock data — no backend, no database, no API keys.

## Stack

- **Vite 8** — instant dev server, hot reload that won't stutter during a live demo
- **React 19** + **TypeScript**
- **Tailwind CSS v4** — entire theme driven by CSS custom properties for easy re-theming
- **React Router 7** — client-side routing
- **Zustand** — cart state, persisted to localStorage
- **Lucide React** — icons

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build       # type-check + production build
npm run preview     # preview the production build
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
.cursor/
  rules/            # Cursor rules: project overview, conventions, theming, adding products
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — hero, categories, bestsellers, new arrivals |
| `/products` | Product listing with category filter (`?category=outerwear`) and sort |
| `/products/:slug` | Product detail with gallery, color/size, reviews, related products |
| `/cart` | Cart with quantity controls and order summary |
| `/about` | Brand story, sustainability, warranty, shipping, contact |

---

## Cursor demo ideas

This codebase is intentionally structured to make every major Cursor capability easy to demo live. Here are starter prompts mapped to the topics in the Cursor 101 agenda.

### Plan mode → Agent mode handoff

> *Switch to Plan mode and prompt:* "I want to add a wishlist feature to Cascade Goods. Users should be able to favorite products from the product card or product detail page, and view all favorited products on a new `/wishlist` page. Wishlist state should persist like the cart does. Write a plan covering data model, store, components, and routing changes."

Then switch to Agent mode and run the plan.

### Multi-file edits

> "Add a `weight` field (in pounds) to every product. Surface it on the product detail page under the Materials section."

Touches: `src/lib/types.ts`, `src/data/products.ts` (15 products), `src/pages/ProductDetailPage.tsx`. Great for showing Cursor handling structured edits across many files.

### Browser tool with element selector

Open the dev server, point Cursor's browser at `localhost:5173`, then select an element and prompt:

> "Make this button larger and use the accent color as its background."

Or:

> "The product cards feel cramped. Add more breathing room between the image and the text."

### Re-theming (great visual demo)

> "Re-theme this site to use Salesforce branding. Use Salesforce blue (#00A1E0) as the brand color and choose a coordinated accent. Only modify `src/index.css`."

The `theming.mdc` rule will guide Cursor to update only the tokens. Show the entire site re-skin in seconds.

### Skills / slash commands

Demo `/create-skill` to generate a custom skill for this codebase, for example:

> "/create-skill Generate a skill called `add-product` that walks through adding a new product to `src/data/products.ts` with all required fields, including picking an image seed."

### Rules

Open `.cursor/rules/conventions.mdc` and walk through how it shapes every prompt. Then ask Cursor to add a new component and point out how it follows the conventions automatically (named export, `cn()` helper, token-based styling).

### Review / Find Issues agent

After making a few changes (or before, on the existing code), spin up the review agent on a file like `src/store/cart.ts` or `src/pages/ProductDetailPage.tsx` to surface improvement opportunities.

### Other small, high-impact demo prompts

- "Add a search bar to the header that filters the products page in real time."
- "Add a 'Recently Viewed' section to the home page that uses localStorage to track the last 4 products the user looked at."
- "The cart page checkout button doesn't do anything. Add a checkout modal that collects shipping info and shows an order confirmation."
- "Add dark mode support. Toggle lives in the header. Persist the choice."
- "Add a `featured` boolean to categories and show only featured categories on the home page."
- "Refactor the cart drawer and cart page so they share a single `CartLineItem` component."
- "Add product image lightbox/zoom on the product detail page."

## Notes on imagery

Product, category, and hero photos are hosted on the Unsplash CDN (`images.unsplash.com`) and used under the [Unsplash License](https://unsplash.com/license). Photo IDs are baked into `src/data/products.ts` and `src/data/categories.ts` via a small `img(id)` / `banner(id)` helper, so swapping a photo is a one-line change per product.

## License

For internal demo use only.
