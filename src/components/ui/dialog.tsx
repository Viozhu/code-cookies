import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue | undefined>(undefined)

const useDialogContext = () => {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog')
  }
  return context
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onOpenChange])

  // Prevent body scroll when dialog is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {children}
          </div>
        )}
      </AnimatePresence>
    </DialogContext.Provider>
  )
}

export function DialogContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { onOpenChange } = useDialogContext()

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }}
        className={cn(
          'relative z-50 w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl',
          'border border-gray-200',
          'focus:outline-none',
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </motion.div>
    </>
  )
}

export function DialogHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-2 p-6 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function DialogTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        'text-2xl font-bold leading-none tracking-tight',
        'font-[Inter,Montserrat,sans-serif]',
        'text-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function DialogDescription({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-gray-600 leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  )
}

export function DialogFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end gap-3 p-6 pt-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function DialogClose({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useDialogContext()

  return (
    <button
      type="button"
      onClick={() => onOpenChange(false)}
      className={cn(
        'absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:text-gray-600',
        'hover:bg-gray-100 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
      {...props}
    >
      {children || <X className="w-4 h-4" />}
    </button>
  )
}

// Confirmation Dialog Helper Component
interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
}

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogClose />
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'secondary' : 'primary'}
            onClick={handleConfirm}
            className={cn(
              'w-full sm:w-auto',
              variant === 'destructive' &&
                'text-red-600 border-red-600 hover:bg-red-50 hover:border-red-700'
            )}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}




