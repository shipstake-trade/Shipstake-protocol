import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Header } from '@/components/sections/header'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { usePrivyWallet } from '@/lib/solana/shipstake'
import { API_URL } from '@/lib/api'
import { ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react'

export const Route = createLazyFileRoute('/gate')({
  component: GatePage,
})

const PROGRAM_ID = 'H2NZtj6ncpknevBc6PUb3Qqd5UdeFXDyBrqWGEeqdaLv'
const INIT_TX = '3vK8oDvD3Q7ZMwgLidUPzkjfWM1TBszd55nX2r76Kv3DiN4tuYBFxNqgGrz9wgsV53uJo54kS661Co8YJ8Mxe8EY'

function truncateMid(s: string, head = 6, tail = 4) {
  return `${s.slice(0, head)}…${s.slice(-tail)}`
}

const HOW_IT_WORKS = [
  { n: '01', title: 'Lock SOL', desc: 'Set a deadline, stake SOL as collateral on your commitment.' },
  { n: '02', title: 'Build', desc: 'Ship the feature, write the code — on your schedule.' },
  { n: '03', title: 'Oracle verifies', desc: 'Ed25519 signature proves delivery on-chain in under 60 seconds.' },
  { n: '04', title: 'Collect or get slashed', desc: 'Deliver: get your stake back. Miss the deadline: stake is slashed.' },
]

function GatePage() {
  const navigate = useNavigate()
  const { ready, authenticated } = usePrivyWallet()
  const { blocked } = Route.useSearch()
  const isGeoBlocked = blocked === 'geo'

  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null)

  // Authenticated users skip the gate
  useEffect(() => {
    if (ready && authenticated && !isGeoBlocked) {
      navigate({ to: '/quest/create' })
    }
  }, [ready, authenticated, isGeoBlocked, navigate])

  // Fetch waitlist count
  useEffect(() => {
    fetch(`${API_URL}/waitlist/count`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.count != null) setWaitlistCount(d.count) })
      .catch(() => {})
  }, [])

  if (!ready) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || submitting) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message ?? `Error ${res.status}`)
      }
      setSubmitted(true)
      setWaitlistCount((c) => (c != null ? c + 1 : 1))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong — try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Geo-blocked view
  if (isGeoBlocked) {
    return (
      <div
        className="relative min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="flex flex-col items-center text-center px-6 max-w-md gap-4">
          <img src="/brand/shipstake-mark.svg" alt="SHIPSTAKE" className="h-12 w-12" />
          <h1 className="font-mono text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
            Region restricted
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            SHIPSTAKE is not available in your jurisdiction.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Header />

      {/* ── SECTION 1: Hero ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-[var(--container-max-width)] px-4 pt-20 pb-16 text-center">
        {/* Mainnet Live badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: 'var(--accent-primary)' }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ background: 'var(--accent-primary)' }}
            />
          </span>
          <span
            className="font-mono text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--accent-primary)' }}
          >
            Mainnet Live
          </span>
        </div>

        <h1
          className="font-mono font-bold leading-[1.1] tracking-tight"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            color: 'var(--foreground)',
            maxWidth: '760px',
            margin: '0 auto',
          }}
        >
          The accountability layer
          <br />
          Solana was missing.
        </h1>

        <p
          className="font-sans mt-5"
          style={{
            fontSize: 'clamp(0.9375rem, 1.8vw, 1.0625rem)',
            color: 'var(--muted-foreground)',
            maxWidth: '480px',
            margin: '1.25rem auto 0',
            lineHeight: 1.6,
          }}
        >
          SHIPSTAKE is live on Solana mainnet. Private beta &mdash; request access below.
        </p>
      </section>

      {/* ── SECTION 2: On-chain proof ──────────────────────────────── */}
      <section className="mx-auto max-w-[var(--container-max-width)] px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Quests Resolved', value: 1, suffix: '', decimals: 0 },
            { label: 'SOL Settled', value: 0.1, suffix: ' SOL', decimals: 1 },
            { label: 'Fee Accuracy', value: 100, suffix: '%', decimals: 0 },
          ].map(({ label, value, suffix, decimals }) => (
            <div
              key={label}
              className="flex flex-col gap-2 p-5"
              style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: '5px',
                background: 'var(--bg-secondary)',
              }}
            >
              <span
                className="font-sans text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {label}
              </span>
              <span
                className="font-mono font-bold"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: 'var(--accent-primary)' }}
              >
                <NumberTicker value={value} decimalPlaces={decimals} delay={0.2} />
                {suffix}
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col gap-3 p-4"
          style={{
            border: '1px solid var(--border-subtle)',
            borderRadius: '5px',
            background: 'var(--bg-secondary)',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent-primary)' }} />
            <span
              className="font-mono text-xs font-semibold tracking-wide"
              style={{ color: 'var(--accent-primary)' }}
            >
              Verified on Solana mainnet
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <a
              href={`https://solscan.io/account/${PROGRAM_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs hover:underline"
              style={{ color: 'var(--teal)' }}
            >
              Program: {truncateMid(PROGRAM_ID, 6, 4)}
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
            <span className="hidden sm:block" style={{ color: 'var(--border-active)' }}>·</span>
            <a
              href={`https://solscan.io/tx/${INIT_TX}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs hover:underline"
              style={{ color: 'var(--teal)' }}
            >
              Init tx: {truncateMid(INIT_TX, 6, 4)}
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>
          <p className="font-sans text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Oracle resolution &lt; 60s &nbsp;·&nbsp; Flat 2% settlement fee &nbsp;·&nbsp; Ed25519 signature verification
          </p>
        </div>
      </section>

      {/* ── SECTION 3: How it works ───────────────────────────────── */}
      <section className="mx-auto max-w-[var(--container-max-width)] px-4 pb-16">
        <h2
          className="font-mono font-bold text-sm uppercase tracking-widest mb-5"
          style={{ color: 'var(--muted-foreground)' }}
        >
          How it works
        </h2>
        <div className="flex flex-col">
          {HOW_IT_WORKS.map((step, i) => (
            <div
              key={step.n}
              className="flex items-start gap-4 py-4"
              style={{
                borderTop: i === 0 ? '1px solid var(--border-subtle)' : undefined,
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <span
                className="font-mono font-bold text-xs shrink-0 mt-0.5 w-7"
                style={{ color: 'var(--accent-primary)' }}
              >
                {step.n}
              </span>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 min-w-0">
                <span className="font-mono font-semibold text-sm shrink-0" style={{ color: 'var(--foreground)' }}>
                  {step.title}
                </span>
                <ArrowRight className="w-3 h-3 shrink-0 hidden sm:block" style={{ color: 'var(--border-active)' }} />
                <span className="font-sans text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {step.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: Request Early Access ──────────────────────── */}
      <section className="mx-auto max-w-[var(--container-max-width)] px-4 pb-24">
        <div
          className="p-6 sm:p-8 max-w-lg"
          style={{
            border: '1px solid var(--border-active)',
            borderRadius: '5px',
            background: 'var(--bg-secondary)',
          }}
        >
          <h2
            className="font-mono font-bold mb-1"
            style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)', color: 'var(--foreground)' }}
          >
            Request Early Access
          </h2>
          <p className="font-sans text-sm mb-6" style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
            We&rsquo;re onboarding builders one by one. Early access gets priority when we go public.
          </p>

          {submitted ? (
            <div className="flex items-center gap-3 py-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: 'var(--accent-primary)' }} />
              <div>
                <p className="font-mono font-semibold text-sm" style={{ color: 'var(--accent-primary)' }}>
                  You&rsquo;re on the list.
                </p>
                <p className="font-sans text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                  We&rsquo;ll reach out when your spot opens up.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                placeholder="you@example.com"
                required
                className="flex-1"
                style={{ borderRadius: '4px' }}
              />
              <Button
                type="submit"
                disabled={submitting}
                className="font-mono font-semibold shrink-0"
                style={{ borderRadius: '4px' }}
              >
                {submitting ? 'Sending…' : 'Request Access'}
              </Button>
            </form>
          )}

          {error && (
            <p className="font-sans text-xs mt-2" style={{ color: 'var(--danger)' }}>{error}</p>
          )}

          {waitlistCount != null && waitlistCount > 0 && (
            <p className="font-sans text-xs mt-4" style={{ color: 'var(--muted-foreground)' }}>
              <span className="font-mono font-semibold" style={{ color: 'var(--foreground)' }}>
                {waitlistCount}
              </span>{' '}
              builder{waitlistCount === 1 ? '' : 's'} waiting
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
