import { motion } from 'framer-motion'
import { Brain, Trophy, Code2, BarChart3, Cookie } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { SectionDivider } from './SectionDivider'

interface BenefitCardProps {
  title: string
  description: string
  icon: React.ReactNode
  visual: React.ReactNode
  delay?: number
}

function BenefitCard({
  title,
  description,
  icon,
  visual,
  delay = 0,
}: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card
        className={cn(
          'h-full p-6',
          'hover:shadow-xl',
          'transition-all duration-300 ease-out',
          'border-2 hover:border-primary/20',
          'min-h-[350px] flex flex-col'
        )}
      >
        {/* Icon */}
        <motion.div
          className="mb-6 flex justify-center"
          whileHover={{
            rotate: [0, -10, 10, -10, 0],
            scale: 1.1,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        >
          <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #5D5FEF 0%, #A5F344 100%)',
              }}
            />
            <div className="relative z-10 text-white">
              {icon}
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <h3
          className={cn(
            'subsection-heading',
            'text-xl md:text-2xl',
            'font-bold mb-4',
            'text-[#5D5FEF] dark:text-[#7C7EF5]',
            'text-center'
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
            'text-center'
          )}
        >
          {description}
        </p>

        {/* Visual Element */}
        <div className="mt-auto flex justify-center">{visual}</div>
      </Card>
    </motion.div>
  )
}

function LogicFirstVisual() {
  const puzzlePieces = Array.from({ length: 4 }, (_, i) => i)

  return (
    <div className="flex gap-2 justify-center">
      {puzzlePieces.map((_piece, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className={cn(
            'w-8 h-8 rounded-lg',
            i % 2 === 0 ? 'bg-primary' : 'bg-primary-light'
          )}
        />
      ))}
    </div>
  )
}

function GamifiedRewardsVisual() {
  const [earned, setEarned] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setEarned(3)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center">
        {[1, 2, 3].map((count) => (
          <motion.div
            key={count}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{
              opacity: count <= earned ? 1 : 0.3,
              scale: count <= earned ? 1 : 0.8,
              y: count <= earned ? 0 : 10,
            }}
            transition={{
              delay: count * 0.15,
              duration: 0.4,
              type: 'spring',
              stiffness: 200,
            }}
            style={{ marginTop: count > 1 ? -8 : 0 }}
          >
            <Cookie
              className={cn(
                'w-10 h-10',
                count <= earned
                  ? 'text-secondary fill-secondary'
                  : 'text-gray-400 dark:text-gray-600'
              )}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function PythonReadyVisual() {
  return (
    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-3 text-sm font-mono w-full max-w-[200px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-green-400"
      >
        <div>def solve_puzzle():</div>
        <div className="pl-4 text-gray-300">return "success"</div>
      </motion.div>
    </div>
  )
}

function TrackProgressVisual() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(75)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full max-w-[200px]">
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="bg-primary h-3 rounded-full"
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-2 block text-center"
      >
        {progress}% Complete
      </motion.span>
    </div>
  )
}

export function Benefits() {
  const benefits = [
    {
      title: 'Logic First',
      description:
        'Build a strong foundation before touching code. Master problem-solving through visual logic puzzles.',
      icon: <Brain className="w-8 h-8" />,
      visual: <LogicFirstVisual />,
      delay: 0,
    },
    {
      title: 'Gamified Rewards',
      description:
        'Earn cookies for every solved puzzle. Collect rewards and track your achievements as you progress.',
      icon: <Trophy className="w-8 h-8" />,
      visual: <GamifiedRewardsVisual />,
      delay: 0.1,
    },
    {
      title: 'Python Ready',
      description:
        'Smooth transition to real-world programming. Build on your logic skills and start writing actual code.',
      icon: <Code2 className="w-8 h-8" />,
      visual: <PythonReadyVisual />,
      delay: 0.2,
    },
    {
      title: 'Track Progress',
      description:
        "Always pick up where you left off. Monitor your learning journey and see how far you've come.",
      icon: <BarChart3 className="w-8 h-8" />,
      visual: <TrackProgressVisual />,
      delay: 0.3,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      <section
        className={cn(
          'section',
          'bg-[#F0FDF4]',
          'dark:bg-gray-900',
          'py-16 md:py-20 lg:py-24',
          'relative'
        )}
        id="benefits"
      >
        {/* Subtle background accent with organic shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-green-100/30 to-transparent dark:from-green-900/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-emerald-100/30 to-transparent dark:from-emerald-900/20 rounded-full blur-3xl" />
        </div>
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
            Why CodeCookies?
          </h2>
          <p
            className={cn(
              'body-text',
              'text-lg md:text-xl',
              'text-gray-600 dark:text-gray-400',
              'max-w-2xl mx-auto'
            )}
          >
            Discover what makes CodeCookies the perfect way to learn programming
            logic
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {benefits.map((benefit) => (
            <BenefitCard
              key={benefit.title}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              visual={benefit.visual}
              delay={benefit.delay}
            />
          ))}
        </motion.div>
      </div>
      </section>
      <SectionDivider variant="green-to-dark" />
    </>
  )
}

