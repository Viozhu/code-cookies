import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-subtle text-primary-dark border border-primary/20',
        secondary:
          'bg-secondary-subtle text-secondary-dark border border-secondary/20',
        outline:
          'text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700',
      },
      size: {
        default: 'px-3 py-1 text-sm',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

