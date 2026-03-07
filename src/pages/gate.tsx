import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import FlickeringGrid from '@/components/ui/flickering-grid'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { usePrivyWallet } from '@/lib/solana/shipstake'
import { API_URL } from '@/lib/api'

export const Route = createFileRoute('/gate')({
  validateSearch: (search: Record<string, string>) => ({
    blocked: search.blocked as string | undefined,
  }),
  component: GatePage,
})

const TEASER_CARDS = [
  {
    icon: '🏦',
    title: 'Borrow more with a shipping history',
    sub: 'Lending protocols will be able to read your PROOF Score and adjust your terms. Builders who deliver consistently get better rates. No paperwork — just your on-chain record.',
  },
  {
    icon: '🏛️',
    title: 'Skip the grant application pile',
    sub: 'Foundations will be able to require a minimum PROOF Score before accepting applications. Your delivery history becomes your cover letter.',
  },
  {
    icon: '✅',
    title: 'One score. Every platform.',
    sub: 'Job boards, DAOs, and protocols will reference the same on-chain score. Ship once, prove it everywhere. No badges to collect. No profiles to maintain.',
  },
]

function GatePage() {
  const { ready, connected } = usePrivyWallet()
  const navigate = useNavigate()
  const { blocked } = Route.useSearch()
  const isGeoBlocked = blocked === 'geo'

  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [buildersCount, setBuildersCount] = useState<number | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/waitlist/count`)
      .then((r) => r.json())
      .then((d) => setBuildersCount(d.count))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (ready && connected && !isGeoBlocked) {
      navigate({ to: '/explore' })
    }
  }, [ready, connected, isGeoBlocked, navigate])

  if (!ready) return null

  const handleNotify = async () => {
    if (!email.trim() || loading) return
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok) {
        setError('Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (isGeoBlocked) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FlickeringGrid
          squareSize={4}
          gridGap={4}
          color="#00C896"
          maxOpacity={0.12}
          flickerChance={0.1}
          className="absolute inset-0 size-full -z-10"
        />
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
          <img src="/brand/shipstake-mark.svg" alt="SHIPSTAKE" className="h-12 w-12 mb-6" />
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">Region restricted</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            SHIPSTAKE is not available in your jurisdiction.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-16">
      <FlickeringGrid
        squareSize={4}
        gridGap={4}
        color="#00C896"
        maxOpacity={0.12}
        flickerChance={0.1}
        className="absolute inset-0 size-full -z-10"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-xl">
        <img src="/brand/shipstake-mark.svg" alt="SHIPSTAKE" className="h-12 w-12 mb-6" />

        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/30 text-emerald-400 mb-6">
          Accountability Protocol · Solana
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight">
          Prove it on-chain.
        </h1>

        <p className="text-muted-foreground mb-8 text-sm leading-relaxed max-w-sm">
          SHIPSTAKE is launching soon. Lock SOL on your delivery commitments. Build a PROOF Score
          that other protocols can read and trust.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-10">
          {TEASER_CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-border bg-secondary/40 p-4 text-left"
            >
              <span className="text-2xl mb-2 block">{card.icon}</span>
              <p className="text-xs font-medium text-foreground mb-1 leading-snug">{card.title}</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{card.sub}</p>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="text-center">
            <p className="text-sm font-mono text-primary mb-2">
              You&apos;re on the list. We&apos;ll reach out before launch.
            </p>
            <p className="text-xs text-muted-foreground">
              Early builders get Founder status and zero fee on their first commitment.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNotify()}
                placeholder="you@example.com"
                disabled={loading}
                className="flex-1 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              />
              <Button
                onClick={handleNotify}
                size="default"
                disabled={loading}
                className="rounded-lg text-primary-foreground font-medium shrink-0"
              >
                {loading ? <Icons.spinner className="h-4 w-4 animate-spin" /> : 'Notify me'}
              </Button>
            </div>
            {error && <p className="text-[11px] text-red-400 text-center">{error}</p>}
            <p className="text-[10px] text-muted-foreground/60 text-center">
              Early builders get Founder status and zero fee on their first commitment.
            </p>
          </div>
        )}

        <p className="mt-8 text-xs text-muted-foreground font-mono">
          <span className="text-primary font-bold">{buildersCount ?? '—'}</span> builders waiting
        </p>

        <p className="mt-6 text-[10px] text-muted-foreground/40 max-w-sm">
          By joining you confirm you are not in a restricted jurisdiction.
        </p>

        <a
          href="https://resend.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-[10px] text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors"
        >
          powered by
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 60"
            className="h-3.5 w-3.5 inline-block"
            fill="currentColor"
            aria-label="Resend"
          >
            <path d="M34.2 29.6c3.6-1 6.2-4.3 6.2-8.2C40.4 16 36.4 12 31 12H16v36h7V32h5.2L36 48h8.2L34.2 29.6ZM23 26v-8h7.5c2.5 0 4.5 1.8 4.5 4s-2 4-4.5 4H23Z" />
          </svg>
          <span className="font-medium tracking-wide">Resend</span>
        </a>
      </div>
    </div>
  )
}
