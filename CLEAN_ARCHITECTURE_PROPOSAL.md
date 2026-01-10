# Clean Architecture Refactoring Proposal

## Proposed Folder Structure

```
src/
├── core/                          # Domain Layer - Pure TypeScript
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── Puzzle.ts          # Puzzle entity with validation
│   │   │   └── Cookie.ts          # Cookie entity
│   │   ├── services/
│   │   │   ├── PuzzleValidator.ts # Puzzle answer validation logic
│   │   │   ├── PatternMatcher.ts  # Pattern matching algorithms
│   │   │   └── CookieCalculator.ts # Cookie reward calculations
│   │   └── types/
│   │       └── index.ts           # Domain type definitions
│   └── utils/
│       └── math.ts                # Pure math utilities (no React)
│
├── application/                   # Application Layer - State Management
│   ├── stores/                    # Zustand stores (moved from /stores)
│   │   ├── cookieStore.ts
│   │   └── puzzleStore.ts
│   └── hooks/                     # Custom hooks for business logic
│       ├── usePuzzleLogic.ts      # Extracted from progress.tsx
│       ├── useGameEngine.ts      # Game flow orchestration
│       └── useCookieRewards.ts   # Cookie reward logic
│
├── infrastructure/                # Infrastructure Layer
│   ├── api/                       # Future: API clients (TanStack Query)
│   │   └── puzzleApi.ts
│   └── storage/                   # LocalStorage, IndexedDB, etc.
│       └── persistence.ts
│
├── presentation/                  # Presentation Layer
│   ├── components/
│   │   ├── canvas/                # React Three Fiber components
│   │   │   ├── CookieJar3D.tsx
│   │   │   ├── Character3D.tsx
│   │   │   └── Scene.tsx
│   │   ├── ui/                    # DOM overlay components (existing)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── sections/              # Page sections (existing)
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   └── ...
│   │   └── shared/                # Shared components
│   │       └── Logo.tsx
│   ├── hooks/                     # UI-specific hooks
│   │   ├── useKeyboard.ts
│   │   ├── useAnimation.ts
│   │   └── useThreeScene.ts      # Three.js scene management
│   └── styles/
│       └── globals.css
│
├── features/                      # Feature-based organization (optional)
│   └── puzzles/
│       ├── components/
│       │   ├── PuzzleCard.tsx
│       │   └── PuzzleOptions.tsx
│       └── hooks/
│           └── usePuzzle.ts
│
├── data/                          # Data layer (temporary - will move to infrastructure)
│   └── puzzles.tsx                # Puzzle definitions (will become PuzzleRepository)
│
├── routes/                        # TanStack Router routes
│   ├── __root.tsx
│   ├── index.tsx
│   ├── cookies.tsx
│   └── progress.tsx
│
├── lib/                           # Shared utilities
│   └── utils.ts                   # cn() and other helpers
│
└── main.tsx
```

## Layer Responsibilities

### 1. Core (Domain Layer)
- **Pure TypeScript** - No React, no dependencies on UI
- **Entities**: Puzzle, Cookie - Core business objects
- **Services**: Validation logic, pattern matching, calculations
- **Testable**: Can be unit tested without rendering

### 2. Application (State Layer)
- **Zustand Stores**: Global state management
- **Custom Hooks**: Business logic orchestration
- **Decoupled from UI**: Hooks can be used by any component

### 3. Infrastructure
- **API Clients**: TanStack Query hooks for data fetching
- **Storage**: Persistence abstractions
- **External Services**: Third-party integrations

### 4. Presentation
- **Canvas Components**: React Three Fiber (3D scenes)
- **UI Components**: DOM overlays (buttons, cards, etc.)
- **Hooks**: UI-specific logic (animations, keyboard, etc.)

## Refactoring Plan

### Phase 1: Extract Domain Logic
1. Create `core/domain/entities/Puzzle.ts` - Extract puzzle structure
2. Create `core/domain/services/PuzzleValidator.ts` - Answer validation
3. Move puzzle data to domain entities

### Phase 2: Extract Application Logic
1. Create `application/hooks/usePuzzleLogic.ts` - Extract from progress.tsx
2. Create `application/hooks/useGameEngine.ts` - Game flow
3. Keep Zustand stores in `application/stores/`

### Phase 3: Separate 3D from UI
1. Convert `CharacterArt.tsx` to React Three Fiber
2. Convert `CookieJar3D` to React Three Fiber
3. Create `presentation/components/canvas/` structure
4. Extract Three.js logic to `presentation/hooks/useThreeScene.ts`

### Phase 4: Optimize & Clean
1. Extract complex useEffect logic to custom hooks
2. Break large components into smaller sub-components
3. Optimize Three.js performance (memoization, useFrame)
4. Clean up Tailwind class strings with clsx patterns

## Benefits

1. **Testability**: Domain logic can be tested without React
2. **Maintainability**: Clear separation of concerns
3. **Performance**: Better memoization and selective re-renders
4. **Scalability**: Easy to add new features
5. **Type Safety**: Strong TypeScript types throughout

