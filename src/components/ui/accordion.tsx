import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface AccordionContextValue {
  value: string | null
  onValueChange: (value: string | null) => void
  collapsible?: boolean
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined
)

interface AccordionProps {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  children: React.ReactNode
  className?: string
}

export function Accordion ({
  type = 'single',
  collapsible = true,
  value: controlledValue,
  defaultValue,
  onValueChange: controlledOnValueChange,
  children,
  className
}: AccordionProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | null
  >(defaultValue ?? null)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue
  const onValueChange = isControlled
    ? controlledOnValueChange
    : setUncontrolledValue

  const handleValueChange = React.useCallback(
    (newValue: string | null) => {
      if (type === 'single') {
        if (collapsible && value === newValue) {
          onValueChange?.(null)
        } else {
          onValueChange?.(newValue)
        }
      }
    },
    [type, collapsible, value, onValueChange]
  )

  return (
    <AccordionContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        collapsible
      }}
    >
      <div className={cn('w-full', className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemContextValue {
  value: string
}

const AccordionItemContext = React.createContext<
  AccordionItemContextValue | undefined
>(undefined)

interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function AccordionItem ({
  value,
  children,
  className
}: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div
        className={cn(
          'border-b border-gray-200 dark:border-gray-800',
          className
        )}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

export function AccordionTrigger ({
  children,
  className
}: AccordionTriggerProps) {
  const accordionContext = React.useContext(AccordionContext)
  const itemContext = React.useContext(AccordionItemContext)

  if (!accordionContext) {
    throw new Error('AccordionTrigger must be used within Accordion')
  }
  if (!itemContext) {
    throw new Error(
      'AccordionTrigger must be used within AccordionItem component'
    )
  }

  const { value, onValueChange } = accordionContext
  const { value: itemValue } = itemContext

  const isOpen = value === itemValue

  return (
    <button
      type='button'
      onClick={() => onValueChange(itemValue)}
      className={cn(
        'w-full flex items-center justify-between',
        'text-left text-lg font-semibold',
        'py-4 px-4',
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        'rounded-md',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'min-h-[44px]', // Touch target minimum
        className
      )}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${itemValue}`}
    >
      <span className='pr-4'>{children}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='flex-shrink-0'
      >
        <ChevronDown
          className={cn(
            'w-5 h-5',
            // Green accent for FAQ section (when trigger has text-white class)
            className?.includes('text-white')
              ? 'text-[#A5F344] group-hover:text-[#B8FF6B]'
              : 'text-gray-500 dark:text-gray-400'
          )}
        />
      </motion.div>
    </button>
  )
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

export function AccordionContent ({
  children,
  className
}: AccordionContentProps) {
  const accordionContext = React.useContext(AccordionContext)
  const itemContext = React.useContext(AccordionItemContext)

  if (!accordionContext) {
    throw new Error('AccordionContent must be used within Accordion')
  }
  if (!itemContext) {
    throw new Error('AccordionContent must be used within AccordionItem')
  }

  const { value } = accordionContext
  const { value: itemValue } = itemContext

  const isOpen = value === itemValue

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key={itemValue}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='overflow-hidden'
        >
          <div
            id={`accordion-content-${itemValue}`}
            className={cn(
              'pt-2 pb-4 px-4',
              'text-gray-600 dark:text-gray-400',
              'body-text',
              className
            )}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
