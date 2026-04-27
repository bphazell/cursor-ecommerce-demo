---
name: start-demo
description: Start the Cascade Goods demo app locally using Vite. Use when the user asks to start, launch, run, or demo the app locally, or wants to open the development server.
---

# Start Demo

## Steps

1. Check the terminals folder to see if `npm run dev` is already running. If a Vite dev server is active on port 5173, skip to step 3.
2. Run the dev server in the background from the project root:
   ```
   npm run dev
   ```
   Wait for the `VITE ... ready` line to appear in output before continuing.
3. Open `http://localhost:5173` in the browser using the `open_resource` MCP tool from the `cursor-app-control` server.
4. Confirm to the user that the app is running at `http://localhost:5173`.
