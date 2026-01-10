# Style Guide

**Single Source of Truth** for design system and visual standards.

> **Note:** This is a LIVING DOCUMENT. As we build sections and learn what works (or doesn't), we will update this guide to reflect our learnings.

---

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Component Patterns](#component-patterns)
4. [Visual Effects](#visual-effects)
5. [Spacing & Layout](#spacing--layout)
6. [Animation & Transitions](#animation--transitions)
7. [Responsive Design](#responsive-design)
8. [Changelog](#changelog)

---

## Color Palette

### CSS Variables

```css
:root {
  /* Primary Colors - Deep Navy Blue */
  --color-primary: #5D5FEF;
  --color-primary-light: #7C7EF5;
  --color-primary-dark: #4A4BC7;
  --color-primary-subtle: #E8E9FF;
  
  /* Secondary Colors - Bright Green */
  --color-secondary: #A5F344;
  --color-secondary-light: #B8FF6B;
  --color-secondary-dark: #8FE030;
  --color-secondary-subtle: #F5FFE0;
  
  /* Background Colors */
  --color-bg-soft-blue: #F0F9FF;
  --color-bg-soft-green: #F0FDF4;
  --color-bg-dark-navy: #1E293B;
  
  /* Neutrals - Light Mode */
  --color-bg-light: #FFFFFF;
  --color-text-light: #1F1F1F;
  --color-border-light: #E5E7EB;
  
  /* Neutrals - Dark Mode */
  --color-bg-dark: #0F0A1F;
  --color-text-dark: #F9FAFB;
  --color-border-dark: #374151;
  
  /* Semantic Colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
}
```

### Color Usage Guidelines

#### Primary Colors
- **`--color-primary`**: Main brand color, primary CTAs, active states, key UI elements
- **`--color-primary-light`**: Hover states, lighter backgrounds, interactive elements
- **`--color-primary-dark`**: Darker shade for contrast, pressed states
- **`--color-primary-subtle`**: Very light backgrounds, subtle highlights

#### Secondary Colors
- **`--color-secondary`**: Accent color, highlights, secondary actions, energy indicators
- **`--color-secondary-light`**: Lighter backgrounds, subtle accents
- **`--color-secondary-dark`**: Text on secondary backgrounds, contrast needs
- **`--color-secondary-subtle`**: Very light backgrounds, subtle energy

#### Neutrals
- **Light Mode**: Use `--color-bg-light`, `--color-text-light`, `--color-border-light`
- **Dark Mode**: Use `--color-bg-dark`, `--color-text-dark`, `--color-border-dark`

### Color Contrast Requirements
- Text on backgrounds: Minimum WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Interactive elements: Minimum 3:1 contrast ratio
- Primary buttons: Ensure sufficient contrast with text

---

## Typography

### Font Families

```css
:root {
  --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 
                  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
                  sans-serif;
  --font-display: var(--font-primary); /* Can be customized for hero text */
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 
               'Courier New', monospace;
}
```

**Recommendation**: Consider adding a playful, child-friendly display font for hero sections (e.g., Poppins, Nunito, or a custom font).

### Type Scale

```css
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 4rem;      /* 64px */
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}
```

### Typography Patterns

#### Headings

```css
/* H1 - Hero */
.hero-heading {
  font-size: var(--text-5xl);        /* 48px */
  font-weight: var(--font-bold);     /* 700 */
  line-height: var(--leading-tight); /* 1.25 */
  letter-spacing: -0.02em;
}

@media (min-width: 1024px) {
  .hero-heading {
    font-size: var(--text-6xl);      /* 64px */
  }
}

/* H2 - Section Headers */
.section-heading {
  font-size: var(--text-4xl);        /* 36px */
  font-weight: var(--font-bold);     /* 700 */
  line-height: var(--leading-tight); /* 1.25 */
}

@media (min-width: 1024px) {
  .section-heading {
    font-size: var(--text-5xl);      /* 48px */
  }
}

/* H3 - Subsection */
.subsection-heading {
  font-size: var(--text-2xl);        /* 24px */
  font-weight: var(--font-semibold); /* 600 */
  line-height: var(--leading-snug); /* 1.375 */
}

@media (min-width: 1024px) {
  .subsection-heading {
    font-size: var(--text-3xl);      /* 30px */
  }
}
```

#### Body Text

```css
/* Body */
.body-text {
  font-size: var(--text-base);       /* 16px */
  font-weight: var(--font-normal);   /* 400 */
  line-height: var(--leading-relaxed); /* 1.625 */
}

/* Small Text */
.small-text {
  font-size: var(--text-sm);         /* 14px */
  font-weight: var(--font-normal);   /* 400 */
  line-height: var(--leading-normal); /* 1.5 */
}
```

#### Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Component Patterns

### Buttons

#### Primary Button

```css
.btn-primary {
  /* Base */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px; /* Touch target minimum */
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* Colors */
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: var(--color-bg-light);
  
  /* Effects */
  box-shadow: 0 4px 12px rgba(75, 25, 174, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 16px rgba(75, 25, 174, 0.4);
}

.btn-primary:active {
  transform: translateY(0) scale(0.98);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

#### Secondary Button

```css
.btn-secondary {
  /* Base */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 12px 24px;
  border-radius: 12px;
  border: 2px solid var(--color-primary);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* Colors */
  background: transparent;
  color: var(--color-primary);
}

.btn-secondary:hover {
  background: var(--color-primary-subtle);
  border-color: var(--color-primary-light);
}

.btn-secondary:active {
  background: var(--color-primary-light);
  color: var(--color-bg-light);
}
```

#### Accent Button

```css
.btn-accent {
  /* Base */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* Colors */
  background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%);
  color: var(--color-text-light);
}

.btn-accent:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 16px rgba(196, 255, 62, 0.4);
}
```

### Cards

#### Standard Card

```css
.card {
  background: var(--color-bg-light);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-border-light);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}
```

#### Elevated Card

```css
.card-elevated {
  background: var(--color-bg-light);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(75, 25, 174, 0.15);
  border: 1px solid var(--color-border-light);
}
```

#### Gradient Card

```css
.card-gradient {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 50%, var(--color-secondary) 100%);
  border-radius: 16px;
  padding: 32px;
  color: var(--color-bg-light);
  box-shadow: 0 8px 32px rgba(75, 25, 174, 0.3);
}
```

### Input Fields

```css
.input {
  width: 100%;
  min-height: 44px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid var(--color-border-light);
  font-size: var(--text-base);
  font-family: var(--font-primary);
  background: var(--color-bg-light);
  color: var(--color-text-light);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}

.input::placeholder {
  color: var(--color-border-dark);
  opacity: 0.6;
}
```

### Badges & Tags

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
}

.badge-primary {
  background: var(--color-primary-subtle);
  color: var(--color-primary-dark);
}

.badge-secondary {
  background: var(--color-secondary-subtle);
  color: var(--color-secondary-dark);
}
```

---

## Visual Effects

### Gradients

```css
:root {
  /* Hero Gradient */
  --gradient-hero: linear-gradient(135deg, #5D5FEF 0%, #7C7EF5 50%, #A5F344 100%);
  
  /* CTA Gradient */
  --gradient-cta: linear-gradient(135deg, #5D5FEF 0%, #7C7EF5 100%);
  
  /* Accent Gradient */
  --gradient-accent: linear-gradient(135deg, #A5F344 0%, #B8FF6B 100%);
  
  /* Primary Gradient */
  --gradient-primary: linear-gradient(135deg, #5D5FEF 0%, #7C7EF5 100%);
  
  /* Icon Gradient */
  --gradient-icon: linear-gradient(135deg, #5D5FEF 0%, #A5F344 100%);
}
```

### Glows & Shadows

```css
:root {
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.15);
  
  /* Colored Glows */
  --glow-primary: 0 0 20px rgba(75, 25, 174, 0.4);
  --glow-secondary: 0 0 20px rgba(196, 255, 62, 0.4);
  --glow-primary-lg: 0 0 40px rgba(75, 25, 174, 0.3);
  --glow-secondary-lg: 0 0 40px rgba(196, 255, 62, 0.3);
}
```

### Blur Effects

```css
:root {
  --blur-sm: blur(4px);
  --blur-md: blur(8px);
  --blur-lg: blur(16px);
  --blur-xl: blur(24px);
}

.backdrop-blur {
  backdrop-filter: var(--blur-md);
  -webkit-backdrop-filter: var(--blur-md);
}
```

### Usage Examples

```css
/* Glowing Button */
.btn-glow {
  box-shadow: var(--glow-primary);
}

.btn-glow:hover {
  box-shadow: var(--glow-primary-lg);
}

/* Glassmorphism Card */
.card-glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: var(--blur-md);
  -webkit-backdrop-filter: var(--blur-md);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

---

## Spacing & Layout

### Spacing Scale

```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */
  --space-24: 6rem;    /* 96px */
}
```

### Container & Grid

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: var(--space-12);
    padding-right: var(--space-12);
  }
}
```

### Grid System

```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

### Section Spacing

```css
.section {
  padding-top: var(--space-20);  /* 5rem / 80px */
  padding-bottom: var(--space-20);  /* 5rem / 80px */
}

@media (min-width: 768px) {
  .section {
    padding-top: var(--space-24);  /* 6rem / 96px */
    padding-bottom: var(--space-24);  /* 6rem / 96px */
  }
}
```

**Usage Notes:**
- Mobile (< 768px): `pt-20 pb-20` (5rem / 80px)
- Desktop (≥ 768px): `pt-24 pb-24` (6rem / 96px)
- This spacing provides comfortable breathing room between sections while maintaining visual flow

---

## Animation & Transitions

### Timing Functions

```css
:root {
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Duration

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  --duration-slowest: 800ms;
}
```

### Common Animations

```css
/* Button Hover Scale */
@keyframes scale-up {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

/* Cookie Bounce */
@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Fade In */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide Up */
@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### Usage

```css
.btn-animated {
  transition: transform var(--duration-normal) var(--ease-bounce);
}

.btn-animated:hover {
  animation: scale-up var(--duration-normal) var(--ease-bounce);
}

.fade-in {
  animation: fade-in var(--duration-slower) var(--ease-out);
}

.slide-up {
  animation: slide-up var(--duration-slower) var(--ease-out);
}
```

---

## Responsive Design

### Breakpoints

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### Media Query Pattern

```css
/* Mobile First Approach */
.component {
  /* Mobile styles (320px+) */
}

@media (min-width: 768px) {
  .component {
    /* Tablet styles */
  }
}

@media (min-width: 1024px) {
  .component {
    /* Desktop styles */
  }
}
```

### Touch Targets

- **Minimum size**: 44x44px (iOS/Android standard)
- **Recommended spacing**: 8px minimum between touch targets
- **Button padding**: Minimum 12px vertical, 24px horizontal

---

## Changelog

### [Unreleased]

- **Color Palette Refined**: Updated primary color from purple (#4B19AE) to Deep Navy Blue (#5D5FEF) and secondary color to Bright Green (#A5F344). Added soft background colors (#F0F9FF for blue tint, #F0FDF4 for green tint, #1E293B for dark navy). This creates better visual cohesion and energy flow throughout the site.
- **Section Backgrounds - Z-Pattern**: Implemented alternating background colors for visual flow: Features (light blue #F0F9FF), How It Works (pure white), Benefits (light green #F0FDF4), FAQ (dark navy #1E293B). This creates a natural "Z-pattern" that guides the eye down the page.
- **Glassmorphic Cards**: Updated Features section cards to use glassmorphism (semi-transparent with backdrop blur) allowing background colors to peek through, connecting cards to the overall environment.
- **Gradient Icons**: Icons now use blue-to-green gradients (from #5D5FEF to #A5F344) creating visual consistency and brand cohesion.
- **Typography Color Updates**: Section headings now use Deep Navy Blue (#5D5FEF) instead of pure black. Keywords highlighted with Bright Green (#A5F344) for emphasis.
- **How It Works Improvements**: Added subtle blob shape behind steps for visual grouping. Replaced purple arrows with dashed gradient path (blue to green) for smoother flow.
- **Section Spacing Updated**: Changed standard section padding from `var(--space-16)` (64px) to `var(--space-20)` (80px) on mobile, maintaining `var(--space-24)` (96px) on desktop. Breakpoint changed from 1024px to 768px to match implementation. This provides better visual breathing room and seamless flow between sections.
- Initial style guide created from design moodboard
- Established color palette with CSS variables
- Defined typography scale and patterns
- Created component patterns (buttons, cards, inputs)
- Added visual effects (gradients, glows, shadows, blur)
- Documented spacing and layout guidelines
- Added animation and transition specifications
- Included responsive design breakpoints

---

## Notes

- **Accessibility**: All components should meet WCAG AA standards
- **Performance**: Use CSS transforms for animations (GPU accelerated)
- **Consistency**: Stick to the spacing scale and color palette
- **Testing**: Test components across all breakpoints and devices
- **Updates**: When making changes, document them in the changelog

---

**Last Updated**: [Date will be updated as changes are made]

