# Vendor product/hero images locally — plan (option 3)

## Goal

Remove runtime dependency on `images.unsplash.com` so product cards, the homepage hero, and category banners render correctly in environments with restricted egress (the Cursor cloud agent VM, locked-down CI, offline demos). After this change the site has zero external image dependencies, with a clear license/attribution trail and drift prevention so the URL doesn't sneak back in.

## Branch and base

- Branch: `cursor/vendor-product-images-507e` (already created from `origin/main`).
- Base: `main`.
- Independent of the Salesforce theming PR (#10) on `cursor/sf-branding-fec0`.

## Inventory (verified by grep + reading data files)

- **15 product photos** — one per item in `src/data/products.ts`, addressed by Unsplash photo ID.
- **1 hero photo** — hardcoded URL in `src/pages/HomePage.tsx` line 65 (`1764622737791-5d1d914a366c`).
- **6 category banners** — `src/data/categories.ts`. Today they reuse product photo IDs, but per devil's-advocate review the categories will get their **own** files (see decisions).
- `Product.images?: string[]` (alternate-angle thumbnails) is unused in current data — no extra vendoring needed.

## Decisions (from devil's-advocate review)

The following questions came up and have explicit answers; the plan implements them.

### License / attribution (P0)

- **Ship `IMAGE_CREDITS.md`** at the repo root with one row per vendored image: `id, slug, filename, unsplash_photo_id, unsplash_url, photographer, photographer_url, license`. This preserves every breadcrumb the current `img(id)` helper provides today (and adds attribution we don't currently have).
- **Update `README.md`** "Imagery" section to describe the new vendored layout, the credits file, and how to swap a photo (drop a JPG with the matching `id`).
- The repo has been carrying these images via hot-link with only an inline comment for license. Vendoring is a deliberate redistribution decision; ship the credits file so the trail is explicit, not weakened.

### Filenames (P1)

- **Filenames keyed by product `id`, not `slug`.** Slugs are part of the URL contract and may change for SEO/rename reasons. IDs are stable. So:
  - `public/images/products/p_001.jpg` (etc.)
  - `public/images/categories/<categoryId>.jpg` (`outerwear.jpg`, `tops.jpg`, …)
  - `public/images/heroes/home.jpg`
- Categories get their **own** 6 files (even if currently byte-identical to lead product photos) so categories don't depend on a product's existence to render their banner. Total assets: **15 + 6 + 1 = 22**, ~4.5MB.

### Sizes (P1)

- **One 1400w JPG per asset.** Vite's `public/` doesn't auto-resize, so we lose Unsplash's `auto=format` AVIF/WebP path. We accept this as a "demo, not production" tradeoff and document it in the PR (one-liner). No `<picture>`, no responsive variants, no Vite asset pipeline migration.
- Bandwidth cost on product cards (which render ~300–500px) is real but acceptable for an in-room/internal demo with no CDN.

### Sourcing fallback (P0)

The cloud agent VM cannot currently reach `images.unsplash.com`. The plan attempts the network path first and **stops before shipping degraded visuals**:

1. **Preferred:** whitelist `images.unsplash.com` for this run via Cursor Dashboard → Cloud Agents → Network Access; fetch each ID at `?w=1400&q=80&auto=format&fit=crop` once with `curl`.
2. **If whitelisting denied:** stop and surface the choice to the user. Acceptable alternatives ranked: license-clean swaps from Pexels / Wikimedia Commons / Openverse (re-audit license per image), AI-generated stock, or user-supplied photos.
3. **Solid-color JPG placeholders are an abort signal**, not a deliverable. The demo's whole purpose is visual.

### Drift prevention (P1)

- Add an npm script `"check:no-unsplash": "! grep -rn 'images.unsplash.com' src public README.md 2>/dev/null"` so a future contributor (human or agent) reintroducing the URL fails locally and in CI.

### Out of scope (acknowledged, not done in this PR)

- Image optimization pipeline / responsive variants / `<picture>` tags.
- Alt-text audit (today's `alt={product.name}` etc. are borderline but separate concern). Mention in PR description.
- Type tightening on `Product.image`.
- LFS — overkill at ~4.5MB one-time addition.
- Theming change (lives on PR #10).

## File changes

1. **Add 22 binary assets** under `public/images/`:
   - `public/images/products/p_001.jpg` … `p_015.jpg` (15)
   - `public/images/categories/{outerwear,tops,bottoms,footwear,accessories,home}.jpg` (6)
   - `public/images/heroes/home.jpg` (1)
2. **`src/data/products.ts`** — Drop the `img(id, w)` helper. Each product's `image` becomes a literal `/images/products/<id>.jpg`. Keep the original Unsplash photo ID as a trailing line comment per row so it's still grep-able from source (e.g. `image: "/images/products/p_001.jpg", // unsplash:1559022488-570ad0c1e43c`).
3. **`src/data/categories.ts`** — Drop the `banner(id)` helper. Each category's `image` becomes `/images/categories/<categoryId>.jpg`. No more cross-file coupling to product slugs.
4. **`src/pages/HomePage.tsx`** — Replace the hardcoded Unsplash URL on line 65 with `/images/heroes/home.jpg`.
5. **`IMAGE_CREDITS.md`** — New file at repo root. Markdown table with the columns above.
6. **`README.md`** — Update the imagery section (around line 85) to describe the local vendored layout, point at `IMAGE_CREDITS.md`, and document the "drop a JPG keyed by id" swap workflow.
7. **`package.json`** — Add `"check:no-unsplash"` script (drift guard).

## Verification

- `npm run check:no-unsplash` — must pass (no `images.unsplash.com` substring anywhere in `src/`, `public/`, or README).
- `npm run build` — Vite copies `public/images/**` into `dist/`; bundle compiles.
- `npm run dev` + manual smoke test of `/`, `/products`, a product detail page, `/cart` (after adding an item) with **DevTools Network filtered to images**:
  - Zero requests to `images.unsplash.com` (or any external host).
  - Every `/images/...` request returns 200.
- Capture before/after screenshots inside the cloud agent VM (where Unsplash is blocked, so before = broken thumbnails, after = real images).
- Record a short walkthrough video for the PR.

## Git workflow

- Commit 1: vendor the binary assets (22 files) + `IMAGE_CREDITS.md` — `Vendor product, category, and hero images with credits`.
- Commit 2: code + script — `Reference vendored image paths and add no-unsplash drift guard` (covers `src/data/*`, `HomePage.tsx`, `README.md`, `package.json`).
- `git push -u origin cursor/vendor-product-images-507e`.
- Open a draft PR against `main`. Title: `Vendor product/hero images locally`. Body explains the cloud-VM motivation, the license/credits posture, the categories-get-their-own-files decision, the deliberately-not-doing list (responsive variants, alt audit), and embeds before/after screenshots + walkthrough video.

## Todos

- [ ] Confirm Unsplash CDN whitelist (or stop and ask before placeholders/license-clean swap)
- [ ] Download 22 source JPGs (15 products + 6 categories + 1 hero) into `public/images/{products,categories,heroes}/` keyed by id
- [ ] Write `IMAGE_CREDITS.md` (slug ↔ photo id ↔ photographer ↔ URL ↔ license)
- [ ] Update `src/data/products.ts` (literals, retain photo-id trailing comments)
- [ ] Update `src/data/categories.ts` (own filenames in `/images/categories/`)
- [ ] Update `src/pages/HomePage.tsx` (hero src)
- [ ] Update `README.md` "Imagery" section
- [ ] Add `check:no-unsplash` npm script
- [ ] `npm run check:no-unsplash` and `npm run build` pass
- [ ] Dev-server smoke test with Network panel filtered to images (zero external)
- [ ] Capture before/after screenshots and walkthrough video
- [ ] Commit (2 commits), push, open draft PR with embedded artifacts
