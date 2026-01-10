import { Link, useLocation } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Cookie } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { cn } from '@/lib/utils'
import { useCookieStore } from '@/application/stores/cookieStore'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
  isScrolled?: boolean
}

function NavLink({ href, children, onClick, shouldUseDarkText = false }: NavLinkProps & { shouldUseDarkText?: boolean }) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        'text-lg font-medium',
        shouldUseDarkText ? 'text-gray-900 hover:text-primary' : 'text-white hover:text-primary',
        'transition-colors duration-normal ease-out',
        'min-h-[44px] flex items-center justify-center',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
      )}
    >
      {children}
    </Link>
  )
}

interface CookieJarLinkProps {
  cookieCount?: number
  onClick?: () => void
  isScrolled?: boolean
}

function CookieJarLink({ cookieCount, onClick, shouldUseDarkText = false }: CookieJarLinkProps & { shouldUseDarkText?: boolean }) {
  return (
    <Link
      to="/cookies"
      onClick={onClick}
      className={cn(
        'text-lg font-medium',
        shouldUseDarkText ? 'text-gray-900 hover:text-primary' : 'text-white hover:text-primary',
        'transition-colors duration-normal ease-out',
        'min-h-[44px] flex items-center justify-center gap-2',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'relative'
      )}
    >
      <Cookie className="w-5 h-5" aria-hidden="true" />
      <span>Cookie Jar</span>
      {cookieCount !== undefined && cookieCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.3 }}
          className={cn(
            'absolute -top-1 -right-1',
            'bg-secondary text-gray-900',
            'rounded-full min-w-[20px] h-5 px-1.5',
            'flex items-center justify-center',
            'text-xs font-bold',
            'shadow-md'
          )}
          aria-label={`${cookieCount} cookies`}
        >
          {cookieCount}
        </motion.span>
      )}
    </Link>
  )
}

export function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const totalCookies = useCookieStore((state) => state.totalCookies)
  const location = useLocation()
  const isProgressPage = location.pathname === '/progress'
  const isLegalPage = ['/terms', '/privacy', '/coppa', '/gdpr'].includes(location.pathname)
  const shouldUseDarkText = isProgressPage || isLegalPage || isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50',
        'transition-all duration-300 ease-out',
        shouldUseDarkText
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-md'
          : 'bg-transparent',
        'border-b border-transparent'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between min-h-[64px] py-3">
          {/* Logo */}
          <Logo isScrolled={isScrolled} shouldUseDarkText={shouldUseDarkText} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/progress" shouldUseDarkText={shouldUseDarkText}>My Progress</NavLink>
            <CookieJarLink cookieCount={totalCookies} shouldUseDarkText={shouldUseDarkText} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={cn(
              'md:hidden',
              'p-2 rounded-md',
              shouldUseDarkText ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/20',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'min-h-[44px] min-w-[44px] flex items-center justify-center',
              'transition-colors duration-normal ease-out'
            )}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={cn(
                'md:hidden',
                'pb-4',
                'flex flex-col gap-4'
              )}
            >
              <NavLink href="/progress" onClick={closeMobileMenu} shouldUseDarkText={shouldUseDarkText}>
                My Progress
              </NavLink>
              <CookieJarLink cookieCount={totalCookies} onClick={closeMobileMenu} shouldUseDarkText={shouldUseDarkText} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

