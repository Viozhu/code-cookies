import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { CharacterArt } from './CharacterArt'
import { FriendlyButton } from '@/components/ui/button-8'
import { SparklesText } from '@/components/ui/sparkles-text'
import { useNavigate } from '@tanstack/react-router'

export function Hero() {
  const navigate = useNavigate()
  return (
    <section
      className={cn(
        'relative h-[110vh]',
        'flex items-center justify-center',
        'bg-gradient-to-b from-sky-300 via-emerald-100 to-green-200',
        'dark:from-sky-900 dark:via-emerald-900 dark:to-green-900',
        'overflow-hidden'
      )}
    >
      {/* Animated Background Image */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: 'url(/background.jpg)',
            backgroundPosition: 'center bottom',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 92%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 92%, rgba(0,0,0,0) 100%)',
          }}
          animate={{
            scale: [1, 1.05, 1],
            x: [0, -10, 0],
            y: [0, 1, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Overlay for better text readability - reduced opacity to show background better */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/15 dark:from-black/20 dark:via-transparent dark:to-black/25" />
      </motion.div>

      {/* Sky Background with Clouds - Hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        {/* Animated Clouds */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-20 bg-white/70 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-32 right-20 w-40 h-24 bg-white/60 rounded-full blur-xl"
          animate={{
            x: [0, -40, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-16 left-1/3 w-28 h-18 bg-white/65 rounded-full blur-xl"
          animate={{
            x: [0, 25, 0],
            opacity: [0.55, 0.75, 0.55],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-40 right-1/4 w-36 h-22 bg-white/55 rounded-full blur-xl"
          animate={{
            x: [0, -35, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
        {/* Additional smaller clouds */}
        <motion.div
          className="absolute top-24 right-1/3 w-20 h-14 bg-white/50 rounded-full blur-lg"
          animate={{
            x: [0, 20, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-36 left-1/4 w-24 h-16 bg-white/55 rounded-full blur-lg"
          animate={{
            x: [0, -25, 0],
            opacity: [0.45, 0.65, 0.45],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2.5,
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center md:items-end">
          {/* Character Art Column - moved to left - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative w-full h-[400px] md:h-[500px] flex items-end justify-center order-2 md:order-1 hidden md:flex"
          >
            <motion.div 
              className="relative w-full h-full flex items-end justify-center"
              animate={{
                x: [0, -5, 0],
                y: [0, -3, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <CharacterArt />
            </motion.div>
          </motion.div>

          {/* Content Column - moved to right with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className={cn(
              'space-y-6 md:space-y-8 order-1 md:order-2',
              'relative',
              'bg-white/20 dark:bg-white/10',
              'backdrop-blur-lg',
              'rounded-3xl',
              'p-6 md:p-8 lg:p-10',
              'border border-white/30 dark:border-white/20',
              'shadow-2xl',
              'before:absolute before:inset-0 before:rounded-3xl',
              'before:bg-gradient-to-br before:from-white/20 before:to-transparent',
              'before:pointer-events-none',
              'w-full'
            )}
          >
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              className="relative z-10 mb-4"
            >
              <Badge variant="primary" size="default">
                Learn Programming Logic
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
              className={cn(
                'mb-4 md:mb-6',
                'relative z-10'
              )}
            >
              <SparklesText
                text="Let's play Together!"
                className={cn(
                  'hero-heading',
                  'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
                  'leading-tight'
                )}
                textClassName="gradient-text"
                colors={{
                  first: '#5D5FEF', // Primary color from style guide
                  second: '#A5F344'  // Secondary color from style guide
                }}
                sparklesCount={15}
              />
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
              className={cn(
                'body-text',
                'text-base sm:text-lg md:text-xl',
                'text-gray-800 dark:text-gray-200',
                'max-w-xl',
                'mb-6 md:mb-8',
                'relative z-10'
              )}
            >
              Learn programming logic through fun puzzles and gamified challenges.
              Earn cookies as you progress and unlock your Python journey!
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
              className="relative z-10"
            >
              <FriendlyButton
                onClick={() => {
                  navigate({ to: '/progress' })
                }}
                text="Let's Start Learning! 🍪"
                className="my-0 w-full sm:w-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

