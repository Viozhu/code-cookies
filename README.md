# CodeCookies

Interactive educational platform teaching children (ages 7-12) programming logic through puzzles and gamified challenges, with seamless transition to Python coding.

## Tech Stack

- **React** + **TypeScript** - UI framework
- **Vite** - Build tool and dev server
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **React Three Fiber** - 3D character animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Install missing dev dependencies (if needed):
```bash
pnpm add -D @tanstack/router-plugin globals
```

3. After installing `@tanstack/router-plugin`, uncomment the router plugin in `vite.config.ts`:
```typescript
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
// ... and in plugins array:
TanStackRouterVite(),
```

### Development

Start the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Building

Build for production:
```bash
pnpm build
```

Preview production build:
```bash
pnpm preview
```

## Project Structure

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
│   ├── styles/
│   │   └── globals.css    # Global styles + CSS variables
│   └── main.tsx           # App entry point
├── public/
│   └── images/            # Static assets
└── website-guidelines/   # Project documentation
```

## Documentation

- [`PROJECT_REQUIREMENTS.md`](./website-guidelines/PROJECT_REQUIREMENTS.md) - Technical specifications
- [`STYLE_GUIDE.md`](./website-guidelines/STYLE_GUIDE.md) - Design system and visual standards
- [`tasks.md`](./website-guidelines/tasks.md) - Development progress tracking
- [`website-sections/`](./website-guidelines/website-sections/) - Section-specific specifications

## Next Steps

See [`tasks.md`](./website-guidelines/tasks.md) for the complete development roadmap. Phase 1 (Project Setup) is complete. Next: Phase 2 (Build Sections).







# code-cookies
