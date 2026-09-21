# ySpace Website

The external, user-facing ySpace platform — drone delivery for consumers and route intelligence for businesses. Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

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
│   ├── layout.tsx         Root layout (Manrope, metadata)
│   ├── globals.css        Style-guide tokens (colors, type, radii, semantic roles)
│   └── not-found.tsx
├── components/
│   ├── home/              Homepage sections, one file each + index barrel
│   ├── site-header.tsx    Floating header (hero-aware, nav dropdowns, cart menu)
│   ├── site-footer.tsx    Footer (link columns, socials) — carries external links
│   ├── logo.tsx           Logo (chip variant for light backgrounds)
│   ├── page-placeholder.tsx
│   └── ui/                Button, Container + index barrel
├── config/nav.ts          homeSectionNav (in-page anchors) + marketNav (routes)
└── lib/utils.ts           cn() class-merging helper
```

Every folder has an `index.ts` barrel; app code imports via `@/components`, `@/config`, `@/lib`, `@public/index`. Images are static imports from `public/index.ts` (never raw URLs).

## Homepage

Composed purely from `components/home/` section components:

`Hero → BannerMarquee → TopNotchSection → CategoriesSection → HowItWorks → FaqsSection → FuturePlans`

- **Hero** — `homebg` photo, orbit-highlighted headline, Google Play / App Store buttons
- **BannerMarquee** — 12-copy infinite scroll strip (`--animate-marquee`, `motion-reduce` safe)
- **HowItWorks** — zigzag timeline with center rail; scroll-driven fill + dots via CSS `animation-timeline: view()` (falls back to static on unsupported browsers)
- **FaqsSection** — accordion (grid-rows animation, `aria-expanded`/`aria-controls`)
- **FuturePlans** — full-bleed banner with decorative grid guides (desktop only)

Header links target these sections via `/#section-id` anchors on the homepage; all other pages get route-based nav. Sections carry `scroll-mt-20` to clear the floating header; smooth scroll is on `html`.

## Design system

Tokens come from the ySpace style guide (`docs/style guide for ySpace project.pdf`) and live in `src/app/globals.css` under `@theme`:

- **Colors** — primary (purple ramp, CTA `#9900E8`), secondary (teal), success/warning/error, neutral and neutral-variant (`nv`) ramps.
- **Semantic roles** — `bg-page`, `bg-surface`, `bg-elevated`, `text-content`, `text-content-secondary`, `text-content-brand`, `bg-action`, `border-edge`… Use semantic tokens in components; use raw ramps only inside `globals.css`.
- **Type** — desktop tokens `text-h1`…`text-h4`, `text-body-lg`, `text-body`, `text-button`, `text-caption` and mobile tokens `text-h1-m`…`text-h3-m`, `text-body-lg-m`, `text-body-m`, `text-button-m`, `text-caption-m`, each with the guide's line-height, tracking, and weight. Pair them as `text-h2-m md:text-h2` etc.
- **Radius** — `rounded-xs` (4px) through `rounded-2xl` (32px), `rounded-full` (pill).
- **Grid** — `container` (1598px) with 16/40/64px gutters via `Container`.

Formatting is Prettier + `prettier-plugin-tailwindcss`, so class order is auto-sorted — never hand-sort classes. Icons: `lucide-react` for UI chrome, `react-icons` for brand/account glyphs.

## Header & footer

`SiteHeader` takes a `variant` prop:

- `market` (default) — nav pill (dropdowns on first/last item) + cart dropdown with Sign In and account links; renders transparent over the homepage hero (white chrome), bordered on light pages
- `checkout` — minimal flow header for Send a Package

`SiteFooter` carries the external/page links (Services, Technology, Vendors, Careers, Blog, Legal) — the header is reserved for in-page navigation on the homepage.
