# ySpace

Drone delivery and route intelligence for Lagos, Nigeria. Marketing site +
delivery estimator.

## Stack

- **TanStack Start** (React 19, Vite 8, file-based routing, SSR)
- **TypeScript** throughout
- **Tailwind CSS v4** — design tokens live in `src/styles.css` under `@theme`
- **Zustand**, **Zod**, **Radix UI** available in `package.json`

## Getting started

```bash
npm install
npm run dev        # http://localhost:8080
```

No database and no sign-in are required — the site runs standalone.

## Scripts

| Command               | What it does                                        |
| --------------------- | --------------------------------------------------- |
| `npm run dev`         | Dev server on `0.0.0.0:8080`                        |
| `npm run build`       | Production build (+ pending DB migrations, if any)  |
| `npm run preview`     | Serve the production build locally                  |
| `npm run typecheck`   | `tsc --noEmit`                                      |
| `npm run lint`        | ESLint                                               |
| `npm run format`      | Prettier                                             |
| `npm test`            | Node test runner over `scripts/` + `src/lib`         |

## Project structure

```
src/
  routes/            File-based pages (index, technology, contact, …)
  components/home/   Section components for the landing page
  lib/               Shared helpers (auth, db, utils, og metadata)
public/
  logo/              Wordmark + icon exports (favicon, apple-touch-icon)
  videos/            Hero + drop-sequence clips and their posters
  og.jpg             Share card (1200×630)
  __grok/            PWA install assets served by the platform
server/              Request middleware
scripts/             Build, preview, QA and migration tooling
migrations/          SQL migrations (applied at deploy when a DB is configured)
screenshots/         QA output only — regenerated, never committed
```

Everything else at the root is build configuration: `package.json`,
`vite.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc`,
`vercel.json`.

### What is intentionally not in the repo

See `.gitignore`. Notably `node_modules/`, `.vercel/`, `.tanstack/`,
`screenshots/*`, `AGENTS.md`, `startup.sh`, `*.log` and `.env*` are excluded,
while `.grok/app-env.json` is kept because it pins `VITE_AUTH_ENABLED` for both
`npm run dev` and `npm run build`.

### Landing page sections

`src/routes/index.tsx` composes the page in order:

`Nav → Hero → Products → DropReel → Send → RouteIntel → How → Fleet → Vision → FinalCta → Footer`

**`DropReel`** (`src/components/home/drop-reel.tsx`) is the scroll-driven
video block: it starts as an uncropped 16:9 frame sitting on the page and
opens to full-bleed as you scroll, so the footage is driven by the page
rather than dropped in as a cropped rectangle.

## Brand assets

| Asset                        | Path                              |
| ---------------------------- | --------------------------------- |
| Wordmark (nav / footer)      | `public/logo/yspace-wordmark.png` |
| Icon mark                    | `public/logo/yspace-mark.png`     |
| Favicon                      | `public/logo/favicon.png`         |
| Apple touch icon             | `public/logo/apple-touch-icon.png`|
| Share card                   | `public/og.jpg` (1200×630)        |

Icon PNGs are square exports of the mark on the site background (`#0a0a0a`),
so they stay legible in both light and dark browser chrome.

## Screenshots

`screenshots/` is **QA output, not source**. It is filled by:

```bash
npm run dev
node scripts/browser-smoke.mjs
```

That opens the site in headless Chromium at 1280×800 and 390×844, writes a
PNG per viewport plus a JSON verdict, and fails on a blank page, a broken
asset, console errors or horizontal overflow. The whole folder is gitignored —
delete it whenever you like, it regenerates.

## Deploying

The repo is set up for **Vercel**:

- `vercel.json` sets `installCommand: npm install --omit=dev --no-audit --no-fund`
- The build is `npm run build` (see `package.json`)
- Framework preset: **Vite**

Optional environment variables — neither is needed for the public site:

| Variable            | Effect                                             |
| ------------------- | -------------------------------------------------- |
| `VITE_AUTH_ENABLED` | Set to `false` to keep sign-in off                  |
| `DATABASE_URL`      | Postgres connection string; migrations run at build |
