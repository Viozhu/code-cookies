import { motion } from 'framer-motion'
import { Puzzle, Cookie, Code, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { SectionDivider } from './SectionDivider'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  visual: React.ReactNode
  delay?: number
}

function FeatureCard({
  title,
  description,
  icon,
  visual,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="h-full"
    >
      <Card
        className={cn(
          'h-full p-6 md:p-8',
          'hover:shadow-2xl',
          'transition-all duration-300 ease-out',
          'backdrop-blur-[12px]',
          'border border-white/50 dark:border-white/25',
          'shadow-xl',
          'hover:border-primary/40 dark:hover:border-primary/30',
          'hover:-translate-y-2',
          'flex flex-col',
          'group',
          'h-[520px] md:h-[540px]'
        )}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        {/* Icon */}
        <motion.div
          className="mb-6 flex justify-center flex-shrink-0"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className={cn(
              'w-16 h-16 md:w-20 md:h-20 rounded-2xl',
              'flex items-center justify-center',
              'bg-gradient-to-br from-primary to-secondary',
              'text-white',
              'shadow-lg',
              'group-hover:shadow-xl group-hover:shadow-primary/30',
              'transition-shadow duration-300'
            )}
            style={{
              background: 'linear-gradient(135deg, #5D5FEF 0%, #A5F344 100%)',
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        </motion.div>

        {/* Title */}
        <h3
          className={cn(
            'subsection-heading',
            'text-2xl md:text-3xl',
            'font-bold mb-4',
            'text-[#5D5FEF] dark:text-[#7C7EF5]',
            'flex-shrink-0',
            'group-hover:text-[#4A4BC7] dark:group-hover:text-[#8B8DFF]',
            'transition-colors duration-300'
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            'body-text',
            'text-gray-600 dark:text-gray-400',
            'mb-6 flex-grow',
            'min-h-0',
            'leading-relaxed'
          )}
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Visual Example */}
        <div className="mt-auto flex-shrink-0 h-[130px] flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/30 rounded-lg border border-gray-200/50 dark:border-gray-700/50 group-hover:bg-gray-50/70 dark:group-hover:bg-gray-800/40 transition-colors duration-300">
          {visual}
        </div>
      </Card>
    </motion.div>
  )
}

function LogicPuzzlesVisual() {
  const puzzleBlocks = Array.from({ length: 9 }, (_, i) => i)

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="grid grid-cols-3 gap-2 w-full max-w-[110px]">
        {puzzleBlocks.map((_block, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, duration: 0.4, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            className={cn(
              'aspect-square rounded-lg',
              'shadow-md',
              'transition-shadow duration-200',
              i % 3 === 0
                ? 'bg-primary shadow-primary/30'
                : i % 3 === 1
                  ? 'bg-primary-light shadow-primary-light/30'
                  : 'bg-secondary shadow-secondary/30'
            )}
          />
        ))}
      </div>
    </div>
  )
}

function CookieRewardsVisual() {
  const [earned, setEarned] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setEarned(5)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
      <div className="flex items-center gap-2.5">
        {[1, 2, 3, 4, 5].map((count) => (
          <motion.div
            key={count}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{
              opacity: count <= earned ? 1 : 0.25,
              scale: count <= earned ? 1 : 0.7,
              rotate: 0,
            }}
            transition={{
              delay: count * 0.12,
              duration: 0.4,
              type: 'spring',
              stiffness: 200,
            }}
            whileHover={count <= earned ? { scale: 1.2, rotate: 10 } : {}}
          >
            <Cookie
              className={cn(
                'w-8 h-8 md:w-9 md:h-9',
                'transition-all duration-200',
                count <= earned
                  ? 'text-secondary fill-secondary drop-shadow-sm'
                  : 'text-gray-300 dark:text-gray-600 fill-gray-300 dark:fill-gray-600'
              )}
            />
          </motion.div>
        ))}
      </div>
      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
        1-5 cookies per puzzle
      </span>
    </div>
  )
}

function PythonBridgeVisual() {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-5 w-full h-full">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, x: -20, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shadow-sm border border-primary/20 dark:border-primary/30">
          <Puzzle className="w-6 h-6 md:w-7 md:h-7 text-primary" />
        </div>
        <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-semibold">
          Puzzles
        </span>
      </motion.div>

      <motion.div
        animate={{
          x: [0, 6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ArrowRight className="w-6 h-6 md:w-7 md:h-7 text-primary drop-shadow-sm" />
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, x: 20, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 rounded-xl bg-secondary/20 dark:bg-secondary/10 flex items-center justify-center shadow-sm border border-secondary/30 dark:border-secondary/20">
          <Code className="w-6 h-6 md:w-7 md:h-7 text-secondary" />
        </div>
        <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-semibold">
          Python
        </span>
      </motion.div>
    </div>
  )
}

export function Features() {
  const features = [
    {
      title: 'Logic Puzzles',
      description:
        'Master programming fundamentals through visual, <span class="text-[#A5F344] font-semibold">logic</span>-based puzzles. Break down complex problems into simple steps and build your problem-solving skills.',
      icon: <Puzzle className="w-8 h-8 md:w-10 md:h-10" />,
      visual: <LogicPuzzlesVisual />,
      delay: 0,
    },
    {
      title: 'Cookie Rewards',
      description:
        'Earn delicious cookies as you solve puzzles! Get 1-5 cookies per task based on your performance. Collect <span class="text-[#A5F344] font-semibold">Rewards</span> in your cookie jar.',
      icon: <Cookie className="w-8 h-8 md:w-10 md:h-10" />,
      visual: <CookieRewardsVisual />,
      delay: 0.1,
    },
    {
      title: 'Python Bridge',
      description:
        'Seamlessly transition from visual puzzles to real <span class="text-[#A5F344] font-semibold">Python</span> code. Build on your logic skills and start writing actual programs.',
      icon: <Code className="w-8 h-8 md:w-10 md:h-10" />,
      visual: <PythonBridgeVisual />,
      delay: 0.2,
    },
  ]

  return (
    <>
      <section
        className={cn(
          'section',
          'bg-gradient-to-b from-emerald-50 to-sky-100 dark:from-emerald-900 dark:to-sky-900',
          'py-16 md:py-20 lg:py-24',
          'relative'
        )}
        id="features"
      >
        {/* Subtle background accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-teal-50/30 to-sky-50/40 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-sky-900/20 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className={cn(
              'section-heading',
              'text-4xl md:text-5xl',
              'font-bold mb-4',
              'text-[#5D5FEF] dark:text-[#7C7EF5]'
            )}
          >
            Features
          </h2>
          <p
            className={cn(
              'body-text',
              'text-lg md:text-xl',
              'text-gray-600 dark:text-gray-400',
              'max-w-2xl mx-auto'
            )}
          >
            Everything you need to learn programming logic in a fun, engaging
            way
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              visual={feature.visual}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
      
      </section>
      <SectionDivider variant="content-to-content" />
    </>
  )
}

