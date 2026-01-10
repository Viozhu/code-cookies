import { Link } from '@tanstack/react-router'
import { Cookie } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  isScrolled?: boolean
  isProgressPage?: boolean
  shouldUseDarkText?: boolean
}

export function Logo({ className, isScrolled = false, isProgressPage = false, shouldUseDarkText = false }: LogoProps) {
  const useDarkText = shouldUseDarkText ?? (isProgressPage || isScrolled)
  
  return (
    <Link
      to="/"
      className={cn(
        'flex items-center gap-2 transition-transform duration-normal ease-out',
        'hover:scale-105 active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg',
        className
      )}
      aria-label="CodeCookies Home"
    >
      <Cookie 
        className="w-8 h-8 text-primary" 
        aria-hidden="true"
      />
      <span className={cn(
        'text-xl font-bold transition-colors duration-normal ease-out',
        useDarkText ? 'text-gray-900' : 'text-white'
      )}>
        CodeCookies
      </span>
    </Link>
  )
}

