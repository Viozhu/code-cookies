import { useEffect, useState, useRef } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function FloatingScrollButtons() {
  const [showScrollDown, setShowScrollDown] = useState(true)
  const [showScrollUp, setShowScrollUp] = useState(false)
  const featuresRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Find the Features section on each scroll (in case it's not loaded initially)
      if (!featuresRef.current) {
        featuresRef.current = document.getElementById('features')
      }

      const scrollPosition = window.scrollY || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      
      // Show scroll down button when at the top or near top (within 150px)
      const shouldShowScrollDown = scrollPosition < 150
      setShowScrollDown(shouldShowScrollDown)

      // Show scroll up button when Features section is scrolled past
      if (featuresRef.current) {
        const rect = featuresRef.current.getBoundingClientRect()
        // If rect.top is negative, Features is scrolled past
        // Show scroll up when Features top is 100px above viewport
        setShowScrollUp(rect.top < -100)
      } else {
        // Fallback: show scroll up after scrolling past 1.5 viewport height
        setShowScrollUp(scrollPosition > windowHeight * 1.5)
      }
    }

    // Initial check
    handleScroll()

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Also check on resize in case layout changes
    window.addEventListener('resize', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const scrollToNext = () => {
    // Find the next section after Hero (Features)
    const featuresSection = document.getElementById('features')
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Fallback: scroll down by one viewport height
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll Down Button */}
      <AnimatePresence>
        {showScrollDown && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={scrollToNext}
            className={cn(
              'fixed bottom-8 right-8 z-50',
              'inline-flex items-center justify-center',
              'w-14 h-14 rounded-full',
              'bg-gradient-to-r from-primary to-primary-light',
              'text-white shadow-[0_4px_12px_rgba(75,25,174,0.3)]',
              'hover:shadow-[0_6px_16px_rgba(75,25,174,0.4)]',
              'hover:-translate-y-0.5 hover:scale-110',
              'active:translate-y-0 active:scale-100',
              'transition-all duration-200 ease-out',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-primary focus-visible:ring-offset-2',
              'backdrop-blur-sm',
              'md:bottom-12 md:right-12'
            )}
            aria-label="Scroll down to Features"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ChevronDown className="w-6 h-6" strokeWidth={2.5} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll Up Button */}
      <AnimatePresence>
        {showScrollUp && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={scrollToTop}
            className={cn(
              'fixed bottom-8 right-8 z-50',
              'inline-flex items-center justify-center',
              'w-14 h-14 rounded-full',
              'bg-gradient-to-r from-primary to-primary-light',
              'text-white shadow-[0_4px_12px_rgba(75,25,174,0.3)]',
              'hover:shadow-[0_6px_16px_rgba(75,25,174,0.4)]',
              'hover:-translate-y-0.5 hover:scale-110',
              'active:translate-y-0 active:scale-100',
              'transition-all duration-200 ease-out',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-primary focus-visible:ring-offset-2',
              'backdrop-blur-sm',
              'md:bottom-12 md:right-12'
            )}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
