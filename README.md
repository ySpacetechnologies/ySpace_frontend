# ySpace Website

The external, user-facing ySpace platform — drone delivery for consumers and route intelligence for businesses. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `pnpm dev`          | Start the dev server                  |
| `pnpm build`        | Production build                      |
| `pnpm lint`         | Run ESLint                            |
| `pnpm typecheck`    | Generate route types + `tsc --noEmit` |
| `pnpm format`       | Format all files with Prettier        |
| `pnpm format:check` | Check formatting without writing      |

## Structure

```
src/
├── app/
│   ├── (site)/            Marketing pages: home, technology, company, vendors,
│   │                      crowdfunding, career, blog, contact + account routes
│   ├── (marketplace)/     Marketplace listing + /marketplace/[slug] product details
│   ├── (send-package)/    Consumer delivery booking flow
│   ├── layout.tsx         Root layout (Manrope via next/font, metadata)
│   ├── globals.css        ySpace design tokens (brand colors, type scale, radii, semantic roles)
│   └── not-found.tsx
├── components/
│   ├── home/              Homepage sections, one file each + index barrel
│   ├── site-header.tsx    Floating rounded header (nav dropdowns, scroll-spy, Sign in + CTA)
│   ├── site-footer.tsx    Dark starfield footer (link columns, socials)
│   ├── logo.tsx           Logo image mark (white on dark, inverted on light)
│   ├── starfield.tsx      Framer-motion starfield (drifting/twinkling stars + nebula)
│   ├── page-placeholder.tsx
│   └── ui/                Button, Container + index barrel
├── config/nav.ts          homeSectionNav (in-page anchors) + marketNav (routes)
└── lib/utils.ts           cn() class-merging helper
```

Every folder has an `index.ts` barrel; app code imports via `@/components`, `@/config`, `@/lib`, `@public/index`. Images are static imports from `public/index.ts` (never raw URLs).

## Homepage

Composed purely from `components/home/` section components, following the Logistics Platform PRD:

`MissionBriefing → LaunchTicker → MissionsLog → CargoManifest → FlightSequence → CommsLog → DeepSpaceProgram`

- **MissionBriefing** — full-viewport space hero: deep-space gradient + starfield, animated orbit system (drone satellite, relay blips, floating delivery chips), staggered PRD headline ("Move what matters, faster.") with Send a Package + For Businesses CTAs
- **LaunchTicker** — infinite marquee of capability phrases (`--animate-marquee`, `motion-reduce` safe)
- **MissionsLog** — the two PRD use cases + marketplace as soft cards with scroll-reveal animations
- **CargoManifest** — payloads as a rounded manifest table (`PLD-0x`) with clearance chips
- **FlightSequence** — four booking/delivery phases mirroring the PRD delivery states (Created → Pickup → In transit → Delivered)
- **CommsLog** — FAQ as rounded accordion items
- **DeepSpaceProgram** — vision-only roadmap (badge: "not bookable today") on a dark starfield band, per the PRD's critical content rule

Header links target these sections via `/#section-id` anchors on the homepage; scroll-spy highlights the section in view. Sections carry `scroll-mt-24` to clear the floating header; smooth scroll is on `html`.

## Design system

Defined in `src/app/globals.css` under `@theme`, following the **ySpace style guide**:

- **Type** — **Manrope** everywhere (loaded via `next/font`). Scale tokens match the style guide: `text-h1` 64/50 Bold, `text-h2` 42/50 Bold, `text-h3` 32/42 SemiBold, `text-h4` 24/32, `text-body-lg` 18/22, `text-body` 16/26, `text-button` 16/22 SemiBold, `text-caption` 14/20 — plus mobile `-m` variants. Pair as `text-h2-m md:text-h2`.
- **Colors** — brand **purple ramp** (`primary-600 #9900E8` brand color), teal `secondary` for accents, full `neutral` text ramp + `nv` soft-white surface ramp, feedback colors (`success/warning/error`). Legacy `--color-accent` aliases to `primary-600`.
- **Semantic roles** — `bg-page`, `bg-surface`, `bg-elevated`, `text-content`, `text-content-secondary`, `text-content-brand`, `bg-action`, `border-edge`… Use semantic tokens in components; raw ramps are for `globals.css` and one-off accents.
- **Geometry** — soft radii (`rounded-2xl/3xl` cards, `rounded-full` pill buttons/chips), 1px `border-edge` borders, ambient shadows (`shadow-sm/md/lg`, purple `shadow-brand` for CTAs).
- **Motion** — Framer Motion for the starfield (`components/starfield.tsx`: drifting/twinkling star layers over a nebula glow), hero entrance/orbit animations, and scroll reveals (`whileInView`). CSS keyframes cover marquee, orbit, float, pulse-soft. Everything respects `prefers-reduced-motion`.

Formatting is Prettier + `prettier-plugin-tailwindcss`, so class order is auto-sorted — never hand-sort classes. Icons: `lucide-react` for UI chrome, `react-icons` for brand/account glyphs.

## Header & footer

`SiteHeader` takes a `variant` prop:

- `market` (default) — floating rounded white card (~80% width) with backdrop blur; nav dropdowns, scroll-spy active sections (purple pill highlight), ghost **Sign in** + primary **Send a Package** CTA
- `checkout` — minimal flow header for Send a Package

`SiteFooter` renders on the dark starfield: logo + tagline, link columns (Product, Company, Support, Legal), system-status line, and social chips.
