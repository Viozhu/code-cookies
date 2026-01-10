import { motion } from 'framer-motion'
import { Puzzle, Cookie, Code } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { SectionDivider } from './SectionDivider'

interface StepCardProps {
  stepNumber: number
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
}

function StepCard({ stepNumber, title, description, icon, delay = 0 }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs"
    >
      <Card
        className={cn(
          'p-6 md:p-8 text-center',
          'hover:shadow-xl',
          'transition-all duration-300 ease-out',
          'border-2 hover:border-primary/20',
          'min-h-[280px] sm:min-h-[300px] md:min-h-[320px] flex flex-col items-center justify-start'
        )}
      >
        {/* Step Number Badge */}
        <motion.div
          className="mb-4 sm:mb-5 md:mb-6"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className={cn(
              'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full',
              'flex items-center justify-center',
              'text-white text-xl sm:text-2xl font-bold',
              'bg-gradient-to-br from-primary via-primary-light to-secondary',
              'shadow-lg'
            )}
          >
            {stepNumber}
          </div>
        </motion.div>

        {/* Icon */}
        <motion.div
          className="mb-4 sm:mb-5 md:mb-6"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: delay + 0.2,
            duration: 0.5,
            type: 'spring',
            stiffness: 200,
          }}
        >
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-2xl opacity-20"
         
            />
            <div className="relative z-10" style={{ color: '#5D5FEF' }}>
              {icon}
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <h3
          className={cn(
            'subsection-heading',
            'text-xl sm:text-2xl md:text-3xl',
            'font-bold mb-2 sm:mb-3',
            'text-[#5D5FEF] dark:text-[#7C7EF5]'
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            'body-text',
            'text-sm sm:text-base',
            'text-gray-600 dark:text-gray-400',
            'flex-grow'
          )}
        >
          {description}
        </p>
      </Card>
    </motion.div>
  )
}

function Connector({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: delay + 0.3,
        ease: 'easeInOut',
      }}
      className="hidden md:flex items-center justify-center origin-center"
    >
      <svg
        className="w-16 h-12 md:w-20 md:h-14 lg:w-24 lg:h-16"
        viewBox="0 0 96 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`connector-gradient-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5D5FEF" />
            <stop offset="50%" stopColor="#7C7EF5" />
            <stop offset="100%" stopColor="#A5F344" />
          </linearGradient>
        </defs>
        {/* Curved path connecting steps */}
        <motion.path
          d="M 8 32 Q 32 16 48 32 T 88 32"
          stroke={`url(#connector-gradient-${delay})`}
          strokeWidth="3"
          strokeDasharray="6 4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: delay + 0.3,
            ease: 'easeInOut',
          }}
        />
        {/* Animated dot at the end */}
        <motion.circle
          cx="88"
          cy="32"
          r="5"
          fill="#A5F344"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay + 0.5,
          }}
        />
      </svg>
    </motion.div>
  )
}

export function HowItWorks() {
  const steps = [
    {
      stepNumber: 1,
      title: 'Solve Puzzles',
      description: 'Complete logic-based challenges that teach programming fundamentals through visual problem-solving.',
      icon: <Puzzle className="w-16 h-16 md:w-20 md:h-20" />,
      delay: 0,
    },
    {
      stepNumber: 2,
      title: 'Earn Cookies',
      description: 'Receive 1-5 cookies per solved puzzle based on your performance. Collect them all in your cookie jar!',
      icon: <Cookie className="w-16 h-16 md:w-20 md:h-20" />,
      delay: 0.1,
    },
    {
      stepNumber: 3,
      title: 'Unlock Python',
      description: 'Transition seamlessly from visual puzzles to real Python code. Build on your logic skills and start writing actual programs.',
      icon: <Code className="w-16 h-16 md:w-20 md:h-20" />,
      delay: 0.2,
    },
  ]

  return (
    <>
      <section
        className={cn(
          'section',
          'bg-white',
          'dark:bg-gray-900',
          'py-16 md:py-20 lg:py-24',
          'relative'
        )}
        id="how-it-works"
      >
        {/* Subtle blob shape behind steps */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-to-r from-blue-100/20 via-sky-100/15 to-green-100/20 dark:from-blue-900/10 dark:via-sky-900/10 dark:to-green-900/10 rounded-full blur-3xl" />
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
            How It Works
          </h2>
          <p
            className={cn(
              'body-text',
              'text-lg md:text-xl',
              'text-gray-600 dark:text-gray-400',
              'max-w-2xl mx-auto'
            )}
          >
            Learn programming logic in three simple steps
          </p>
        </motion.div>

        {/* Steps Flow */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16">
          {steps.flatMap((step, index) => {
            const elements = [
              <StepCard
                key={`step-${step.stepNumber}`}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
                icon={step.icon}
                delay={step.delay}
              />,
            ]
            
            if (index < steps.length - 1) {
              elements.push(
                <Connector key={`connector-${index}`} delay={step.delay} />
              )
            }
            
            return elements
          })}
        </div>
      </div>
      </section>
      <SectionDivider variant="white-to-green" />
    </>
  )
}

