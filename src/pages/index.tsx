import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'

const StatsTicker = lazy(() =>
  import('@/components/sections/stats-ticker').then((m) => ({ default: m.StatsTicker }))
)
const HowItWorks = lazy(() =>
  import('@/components/sections/how-it-works').then((m) => ({ default: m.HowItWorks }))
)
const ProofScore = lazy(() =>
  import('@/components/sections/proof-score').then((m) => ({ default: m.ProofScore }))
)
const AntiScam = lazy(() =>
  import('@/components/sections/anti-scam').then((m) => ({ default: m.AntiScam }))
)
const Footer = lazy(() =>
  import('@/components/sections/footer').then((m) => ({ default: m.Footer }))
)

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Suspense fallback={null}>
        <StatsTicker />
        <HowItWorks />
        <ProofScore />
        <AntiScam />
        <Footer />
      </Suspense>
    </main>
  )
}
