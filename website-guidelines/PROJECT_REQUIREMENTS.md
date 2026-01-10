# Project Requirements

**Single Source of Truth** for technical specifications and project structure.

---

## 1. Project Overview

**What:** CodeCookies - Interactive educational platform teaching children (ages 7-12) programming logic through puzzles and gamified challenges, with seamless transition to Python coding.

**Who:** Children (7-12), parents/homeschoolers, schools/educators.

**Goal:** Users sign up and complete their first logic challenge. Success measured by progression from basic reasoning games to first executed Python script, driven by cookie reward system.

---

## 2. Tech Stack

| Technology | Purpose |
|------------|---------|
| **TanStack Router** | Type-safe routing for React applications |
| **TanStack Query** | Data fetching, caching, and synchronization |
| **React** | UI component library |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **shadcn/ui** | Component library (buttons, cards, accordions) |
| **Framer Motion** | Animation library for interactions and transitions |
| **Three.js / React Three Fiber** | 3D character animations in hero section |
| **CSS Variables** | Design system tokens (colors, spacing, typography) |

---

## 3. Dependencies

**Package Manager:** `pnpm` (use `pnpm install` for all package management)

### Core
- `react`, `react-dom`
- `@tanstack/react-router` (routing)
- `@tanstack/react-query` (data fetching)
- `typescript`, `@types/react`, `@types/node`
- `vite`, `@vitejs/plugin-react` (build tool)

### Styling
- `tailwindcss`, `postcss`, `autoprefixer`
- `clsx`, `tailwind-merge` (utility functions)

### Components & UI
- `@radix-ui/react-accordion` (FAQ section)
- `@radix-ui/react-slot` (shadcn components)
- `lucide-react` (icons)

### Animation
- `framer-motion`
- `@react-three/fiber`, `@react-three/drei` (3D character)

### Utilities
- `class-variance-authority` (component variants)

---

## 4. Design System

**Reference:** See [`STYLE_GUIDE.md`](./STYLE_GUIDE.md) for complete design system specifications including:
- Color palette (CSS variables)
- Typography scale and patterns
- Component patterns (buttons, cards, inputs)
- Visual effects (gradients, glows, shadows)
- Spacing & layout system
- Animation & transition specifications

---

## 5. Page Sections

| Section | Description | Spec File |
|---------|-------------|-----------|
| **Navigation Bar** | Fixed top nav with logo, "My Progress", "Cookie Jar" links | [`1.navigation-bar.md`](./website-sections/1.navigation-bar.md) |
| **Hero Section** | Headline, CTA, 2D/3D character art | [`2.hero-section.md`](./website-sections/2.hero-section.md) |
| **Features** | Three feature cards: Logic Puzzles, Cookie Rewards, Python Bridge | [`3.features.md`](./website-sections/3.features.md) |
| **How It Works** | 3-step flow: Solve Puzzles → Earn Cookies → Unlock Python | [`4.how-it-works.md`](./website-sections/4.how-it-works.md) |
| **Benefits** | 4-benefit grid: Logic First, Gamified Rewards, Python Ready, Track Progress | [`5.benefits.md`](./website-sections/5.benefits.md) |
| **FAQ** | Accordion-style FAQ with age, progress, safety questions | [`6.faq.md`](./website-sections/6.faq.md) |
| **Footer** | Legal links, contact info, COPPA/GDPR compliance | [`7.footer.md`](./website-sections/7.footer.md) |

**Design Reference:** [`0.design-moodboard.md`](./website-sections/0.design-moodboard.md)

---

## 6. File Structure

```
/
├── src/
│   ├── routes/            # TanStack Router routes
│   │   ├── __root.tsx     # Root route with layout
│   │   └── index.tsx      # Home page route
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   ├── sections/      # Section components (Hero, Features, etc.)
│   │   └── shared/        # Shared components (Logo, NavLink, etc.)
│   ├── lib/               # Utilities and helpers
│   ├── main.tsx           # App entry point
│   └── styles/
│       └── globals.css    # Global styles + CSS variables
├── public/
│   └── images/            # Static assets
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── pnpm-lock.yaml         # pnpm lockfile
└── package.json           # Package dependencies
```

---

## 7. Responsive Requirements

**Breakpoints** (from `STYLE_GUIDE.md`):
- **Mobile:** 320px - 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px+

**Touch Targets:** Minimum 44x44px for all interactive elements.

**Approach:** Mobile-first CSS with progressive enhancement.

---

**Last Updated:** [Date will be updated as changes are made]

