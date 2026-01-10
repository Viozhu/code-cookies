import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Benefits } from '@/components/sections/Benefits'
import { FAQ } from '@/components/sections/FAQ'
import { Footer } from '@/components/sections/Footer'
import { FloatingScrollButtons } from '@/components/sections/FloatingScrollButtons'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <FAQ />
      <Footer />
      <FloatingScrollButtons />
    </div>
  )
}

