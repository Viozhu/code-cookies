/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
          subtle: 'var(--color-primary-subtle)',
        },
        // Secondary Colors
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          light: 'var(--color-secondary-light)',
          dark: 'var(--color-secondary-dark)',
          subtle: 'var(--color-secondary-subtle)',
        },
        // Neutrals
        bg: {
          light: 'var(--color-bg-light)',
          dark: 'var(--color-bg-dark)',
        },
        text: {
          light: 'var(--color-text-light)',
          dark: 'var(--color-text-dark)',
        },
        border: {
          light: 'var(--color-border-light)',
          dark: 'var(--color-border-dark)',
        },
        // Semantic Colors
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      fontFamily: {
        primary: 'var(--font-primary)',
        display: 'var(--font-display)',
        mono: 'var(--font-mono)',
        playful: ['Fredoka One', 'cursive'],
        rounded: ['Quicksand', 'sans-serif'],
      },
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '16px',
        xl: '20px',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        'glow-primary': 'var(--glow-primary)',
        'glow-secondary': 'var(--glow-secondary)',
        'glow-primary-lg': 'var(--glow-primary-lg)',
        'glow-secondary-lg': 'var(--glow-secondary-lg)',
      },
      backdropBlur: {
        sm: 'var(--blur-sm)',
        md: 'var(--blur-md)',
        lg: 'var(--blur-lg)',
        xl: 'var(--blur-xl)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
        slowest: 'var(--duration-slowest)',
      },
      transitionTimingFunction: {
        'ease-in': 'var(--ease-in)',
        'ease-out': 'var(--ease-out)',
        'ease-in-out': 'var(--ease-in-out)',
        'ease-bounce': 'var(--ease-bounce)',
      },
      animation: {
        sparkle: 'sparkle 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        aurora: 'aurora 60s linear infinite',
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
      },
    },
  },
  plugins: [
    addVariablesForColors,
  ],
}

// Flatten color palette utility function
function flattenColorPalette(colors) {
  const flattened = {}
  
  function flatten(obj, prefix = '') {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      const newKey = prefix ? `${prefix}-${key}` : key
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // If it has a DEFAULT key, use that as the main value
        if ('DEFAULT' in value) {
          flattened[newKey] = value.DEFAULT
          // Also add nested colors
          Object.keys(value).forEach(subKey => {
            if (subKey !== 'DEFAULT') {
              flattened[`${newKey}-${subKey}`] = value[subKey]
            }
          })
        } else {
          // Recursively flatten nested objects
          flatten(value, newKey)
        }
      } else {
        flattened[newKey] = value
      }
    })
  }
  
  flatten(colors)
  return flattened
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ":root": newVars,
  })
}

