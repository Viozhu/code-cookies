import { cn } from '@/lib/utils'

interface SectionDividerProps {
  variant?: 'hero-to-content' | 'content-to-content' | 'white-to-green' | 'green-to-dark' | 'content-to-dark'
  className?: string
}

export function SectionDivider({ variant = 'content-to-content', className }: SectionDividerProps) {
  const variants = {
    'hero-to-content': {
      // Hero ends with green-200, Features starts with emerald-100
      // Divider background should match Features start at bottom (emerald-100)
      topGradient: 'from-green-300/70 via-emerald-100 to-transparent',
      topGradientDark: 'dark:from-green-900 dark:via-emerald-900 dark:to-transparent',
      bottomGradient: 'from-emerald-600 via-teal-100 to-sky-400',
      bottomGradientDark: 'dark:from-emerald-900 dark:via-teal-900 dark:to-sky-900',
      waveFill: '#transparent', // emerald-100 - matches Features section start exactly
      waveFillDark: '#064e3b', // emerald-900
    },
    'content-to-content': {
      // Features ends with sky-100, How It Works starts with white
      // Divider background should match How It Works start at bottom (white)
      topGradient: 'from-sky-100 via-sky-50 to-white',
      topGradientDark: 'dark:from-sky-900 dark:via-gray-800 dark:to-gray-900',
      bottomGradient: 'from-white to-white',
      bottomGradientDark: 'dark:from-gray-900 dark:to-gray-900',
      waveFill: '#ffffff', // white - matches How It Works section start exactly
      waveFillDark: '#111827', // gray-900
    },
    'white-to-green': {
      // How It Works ends with white, Benefits starts with #F0FDF4
      topGradient: 'from-white via-emerald-50 to-[#F0FDF4]',
      topGradientDark: 'dark:from-gray-900 dark:via-emerald-950 dark:to-gray-900',
      bottomGradient: 'from-[#F0FDF4] to-[#F0FDF4]',
      bottomGradientDark: 'dark:from-gray-900 dark:to-gray-900',
      waveFill: '#F0FDF4',
      waveFillDark: '#111827', // gray-900
    },
    'green-to-dark': {
      // Benefits ends with #F0FDF4, FAQ starts with #1E293B
      topGradient: 'from-[#F0FDF4] via-emerald-100/50 to-[#1E293B]',
      topGradientDark: 'dark:from-gray-900 dark:via-gray-800 dark:to-[#1E293B]',
      bottomGradient: 'from-[#1E293B] to-[#1E293B]',
      bottomGradientDark: 'dark:from-[#1E293B] dark:to-[#1E293B]',
      waveFill: '#1E293B',
      waveFillDark: '#1E293B',
    },
    'content-to-dark': {
      // FAQ ends with gray-900, Footer starts with gray-900
      topGradient: 'from-gray-900 to-gray-900',
      topGradientDark: 'dark:from-gray-900 dark:to-gray-900',
      bottomGradient: 'from-gray-900 to-gray-900',
      bottomGradientDark: 'dark:from-gray-900 dark:to-gray-900',
      waveFill: '#111827', // gray-900
      waveFillDark: '#111827', // gray-900
    },
  }

  const config = variants[variant]

  return (
    <div className={cn('relative w-full h-24 -mt-0.5 md:h-32 overflow-hidden', className)}>
      {/* Gradient overlay */}
      <div
        className={cn(
          'absolute inset-0',
          `bg-gradient-to-b ${config.topGradient} ${config.topGradientDark}`
        )}
      />
      
      {/* Organic wave divider */}
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`wave-gradient-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Main wave */}
        { variant !== 'hero-to-content' && (
        <path
          d="M 0,80 Q 200,60 400,75 T 800,65 T 1200,80 L 1200,120 L 0,120 Z"
          fill={config.waveFill}
          className={cn(
            variant === 'content-to-content' && 'dark:fill-gray-900',
            variant === 'white-to-green' && 'dark:fill-gray-900',
            variant === 'green-to-dark' && 'dark:fill-[#1E293B]',
            variant === 'content-to-dark' && 'dark:fill-gray-900'
          )}
        />)
      }
        {/* Secondary wave layer for depth */}
        { variant !== 'hero-to-content' && (
        <path
          d="M 0,85 Q 250,70 500,80 T 1000,75 T 1200,85 L 1200,120 L 0,120 Z"
          fill={config.waveFill}
          className={cn(
            variant === 'content-to-content' && 'dark:fill-gray-900',
            variant === 'white-to-green' && 'dark:fill-gray-900',
            variant === 'green-to-dark' && 'dark:fill-[#1E293B]',
            variant === 'content-to-dark' && 'dark:fill-gray-900'
          )}
          opacity="0.7"
        />)
      }
        
        {/* Accent wave layers for depth */}
        {variant === 'hero-to-content' && (
          <path
            d="M 0,90 Q 150,75 300,85 T 600,80 T 900,85 T 1200,90 L 1200,120 L 0,120 Z"
            className="fill-emerald-100 dark:fill-emerald-900"
            opacity="0.4"
          />
        )}
        {variant === 'content-to-content' && (
          <path
            d="M 0,90 Q 150,75 300,85 T 600,80 T 900,85 T 1200,90 L 1200,120 L 0,120 Z"
            className="fill-white dark:fill-gray-900"
            opacity="0.3"
          />
        )}
        {variant === 'white-to-green' && (
          <path
            d="M 0,90 Q 150,75 300,85 T 600,80 T 900,85 T 1200,90 L 1200,120 L 0,120 Z"
            className="fill-[#F0FDF4] dark:fill-gray-900"
            opacity="0.3"
          />
        )}
      </svg>
    </div>
  )
}

