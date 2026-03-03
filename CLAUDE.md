# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `pnpm dev` (uses Next.js Turbo mode)
- **Build:** `pnpm build`
- **Lint:** `pnpm lint`
- **Package manager:** pnpm (do not use npm or yarn)

No test framework is configured.

## Architecture

Next.js 15 (App Router) marketing site with React 19 and TypeScript in strict mode.

### Routing

- `src/app/page.tsx` — Home page, composes section components
- `src/app/(marketing)/blog/` — Blog listing and `[slug]` dynamic routes
- `src/app/og/route.tsx` — Edge function for dynamic OpenGraph image generation
- `src/app/sitemap.ts` — Dynamic sitemap

### Components

- `src/components/sections/` — Full-page sections (hero, features, pricing, testimonials, etc.) composed on the home page
- `src/components/ui/` — Reusable primitives based on shadcn/ui (Radix UI + CVA variants). Config in `components.json` (new-york style, slate base)
- `src/components/` — Layout utilities (Section wrapper, ThemeProvider, icons, mobile drawer)

### Content & Data

- All site content (features, pricing tiers, testimonials, footer links) lives in `src/lib/config.tsx` as the `siteConfig` object
- Blog posts are MDX files in `content/` directory, processed by `src/lib/blog.ts` (unified/remark/rehype pipeline with Shiki syntax highlighting)
- No API layer or database — fully static/SSG

### Key Libraries

- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge), `absoluteUrl()`, `constructMetadata()`, `formatDate()`
- `src/lib/animation.ts` — Framer Motion easing curves
- `src/lib/fonts.ts` — Font configuration (Geist Sans/Mono)

## Conventions

- Path alias: `@/*` maps to `./src/*`
- Styling: Tailwind CSS v4 with CSS custom properties for theming (OKLch color space). Global styles in `src/app/globals.css`
- Component variants use Class Variance Authority (CVA)
- Interactive components require `"use client"` directive
- Theme: next-themes with dark mode default (`enableSystem: false`)
- Container max-width: 1000px (set via CSS variable `--container-max-width`)
- Icons: lucide-react for standard icons, custom SVGs in `src/components/icons.tsx`
- Images: Next.js Image with remote patterns for localhost and randomuser.me
