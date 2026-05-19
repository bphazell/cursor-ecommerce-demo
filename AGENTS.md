# Cascade Goods

Frontend-only e-commerce demo app (Vite + React 19 + TypeScript + Tailwind v4).

## Cursor Cloud specific instructions

- **Dev server**: `npm run dev` starts on port 5173. No backend or database required.
- **Lint**: `npm run lint` — there is one pre-existing lint error in `CheckoutSuccessPage.tsx` (setState in effect). This is expected and not a regression.
- **Build**: `npm run build` runs `tsc -b && vite build`. Outputs to `dist/`.
- **No env vars or secrets needed** — all data is mocked in `src/data/`.
- Standard commands are documented in [README.md](README.md) and `package.json` scripts.
