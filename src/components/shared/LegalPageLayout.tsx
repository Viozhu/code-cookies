import { motion } from 'framer-motion'
import { ReactNode, useEffect } from 'react'
import { Footer } from '@/components/sections/Footer'
import { cn } from '@/lib/utils'

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  children: ReactNode
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  // Scroll to top when component mounts (when navigating to legal pages)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16 lg:py-20 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <h1
            className={cn(
              'text-3xl md:text-4xl lg:text-5xl font-bold mb-4',
              'bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent'
            )}
          >
            {title}
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            Last updated: {lastUpdated}
          </p>
          <div className="mt-6 h-1 w-24 bg-gradient-to-r from-primary to-primary-light rounded-full" />
        </motion.div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            'bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10',
            '[&>h2]:font-bold [&>h2]:text-2xl [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-primary',
            '[&>h3]:font-semibold [&>h3]:text-xl [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-primary-dark',
            '[&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:mb-4',
            '[&>ul]:text-gray-700 [&>ul]:leading-relaxed [&>ul]:mb-4 [&>ul]:ml-6 [&>ul]:list-disc [&>ul]:space-y-2',
            '[&>ol]:text-gray-700 [&>ol]:leading-relaxed [&>ol]:mb-4 [&>ol]:ml-6 [&>ol]:list-decimal [&>ol]:space-y-2',
            '[&>li]:my-1',
            '[&>strong]:text-gray-900 [&>strong]:font-semibold',
            '[&>a]:text-primary [&>a]:no-underline [&>a]:hover:underline [&>a]:font-medium',
            '[&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4 [&>blockquote]:text-gray-600'
          )}
        >
          {children}
        </motion.article>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

