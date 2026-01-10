import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface CookieNotificationProps {
  show: boolean
  cookieCount: number
  onClose: () => void
  autoHideDuration?: number
}

export function CookieNotification({
  show,
  cookieCount,
  onClose,
  autoHideDuration = 4000,
}: CookieNotificationProps) {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, autoHideDuration)
      return () => clearTimeout(timer)
    }
  }, [show, autoHideDuration, onClose])

  if (!show && !isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.5 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
          }}
          className="fixed top-20 right-10 -translate-x-1/4 z-50 w-full max-w-xs px-4 sm:px-0"
          style={{ zIndex: 9999 }}
        >
          {/* Confetti Animation Container */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50%',
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 150}%`,
                  y: 100,
                  opacity: 0,
                  scale: 0.5,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: ['#5D5FEF', '#A5F344', '#FFD700', '#FF6B6B', '#4ECDC4'][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            ))}
          </div>

          {/* Main Notification Card */}
          <motion.div
            className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl shadow-2xl p-3 sm:p-4 backdrop-blur-sm overflow-hidden"
            style={{
              boxShadow: '0 12px 40px rgba(255, 193, 7, 0.3), 0 0 24px rgba(255, 152, 0, 0.15)',
            }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-20 pointer-events-none"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.5) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(255, 165, 0, 0.5) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.5) 0%, transparent 50%)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Content wrapper - relative to card */}
            <div className="relative z-10">
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsVisible(false)
                  setTimeout(onClose, 300)
                }}
                className="absolute top-0 right-0 p-0.5 rounded-full hover:bg-orange-200 transition-colors duration-200 text-orange-600 z-20"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <div className="flex items-center gap-2 sm:gap-3 pr-6">
              {/* Animated Cookie Icon */}
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 15, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: 2,
                  ease: 'easeInOut',
                }}
                className="flex-shrink-0 relative"
              >
                {/* Sparkles around cookie */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: Math.cos((i * 90 * Math.PI) / 180) * 28,
                      y: Math.sin((i * 90 * Math.PI) / 180) * 28,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.3 + i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#A5F344'][i],
                    }}
                  />
                ))}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  className="sm:w-12 sm:h-12 drop-shadow-lg relative z-10"
                >
                  <circle cx="20" cy="20" r="18" fill="#D4A574" stroke="#C19A6B" strokeWidth="1" />
                  <circle cx="15" cy="15" r="2.5" fill="#5D4037" />
                  <circle cx="25" cy="15" r="2.5" fill="#5D4037" />
                  <circle cx="20" cy="20" r="2.5" fill="#5D4037" />
                  <circle cx="12" cy="22" r="2" fill="#5D4037" />
                  <circle cx="28" cy="22" r="2" fill="#5D4037" />
                  <circle cx="18" cy="26" r="2" fill="#5D4037" />
                  <circle cx="25" cy="26" r="2" fill="#5D4037" />
                </svg>
              </motion.div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm sm:text-base font-bold mb-0.5 bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent"
                  style={{
                    fontFamily: "'Inter', 'Montserrat', sans-serif",
                  }}
                >
                  🎉 Awesome Job!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs sm:text-sm text-orange-700 font-semibold"
                >
                  You earned{' '}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center gap-0.5 text-orange-900 font-extrabold"
                  >
                    <span className="text-base sm:text-lg">{cookieCount}</span>
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ delay: 0.6, duration: 0.5, repeat: 2 }}
                      className="text-sm sm:text-base"
                    >
                      🍪
                    </motion.span>
                  </motion.span>
                  {cookieCount === 1 ? ' cookie' : ' cookies'}!
                </motion.p>
              </div>
            </div>
            </div>

            {/* Progress Bar Animation */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: autoHideDuration / 1000, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 rounded-b-xl z-10"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
