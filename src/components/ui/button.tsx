import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-normal ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-primary to-primary-light text-white shadow-[0_4px_12px_rgba(75,25,174,0.3)] hover:shadow-[0_6px_16px_rgba(75,25,174,0.4)] hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]',
        secondary:
          'border-2 border-primary bg-transparent text-primary hover:bg-primary-subtle hover:border-primary-light active:bg-primary-light active:text-white',
        accent:
          'bg-gradient-to-r from-secondary to-secondary-light text-text-light shadow-[0_4px_12px_rgba(196,255,62,0.3)] hover:shadow-[0_6px_16px_rgba(196,255,62,0.4)] hover:-translate-y-0.5 hover:scale-[1.02]',
      },
      size: {
        default: 'min-h-[44px] px-6 py-3 text-base',
        sm: 'min-h-[44px] px-4 py-2 text-sm',
        lg: 'min-h-[56px] px-8 py-4 text-xl',
        icon: 'min-h-[44px] min-w-[44px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

