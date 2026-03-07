import { createLazyFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'

const DocsContent = lazy(() =>
  import('@/app/(marketing)/docs/docs-client').then((m) => ({ default: m.DocsContent }))
)

export const Route = createLazyFileRoute('/docs')({
  component: DocsPage,
})

function DocsPage() {
  return (
    <main>
      <Header />
      <Suspense fallback={null}>
        <DocsContent />
      </Suspense>
      <Footer />
    </main>
  )
}
