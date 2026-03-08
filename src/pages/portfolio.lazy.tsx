import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { ProofScoreRing } from '@/components/builder/proof-score-ring'
import { StatusBadge } from '@/components/quest/status-badge'
import { GitHubConnect } from '@/components/github/github-connect'
import { Button } from '@/components/ui/button'
import { usePrivyWallet, lamportsToSol } from '@/lib/solana/shipstake'
import { useLinkAccount } from '@privy-io/react-auth'
import { useBuilderProfile } from '@/hooks/useBuilderProfile'
import { API_URL } from '@/lib/api'
import type { ApiQuest } from '@/lib/types'
import { parseStatus, shipRate } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Loader2, RefreshCw } from 'lucide-react'

export const Route = createLazyFileRoute('/portfolio')({
  component: PortfolioPage,
})

type Tab = 'active' | 'completed' | 'all'
const TAB_LABELS: Record<Tab, string> = { active: 'Active', completed: 'Completed', all: 'All' }

function formatCountdown(timestamp: number): string {
  const now = Date.now() / 1000
  const diff = timestamp - now
  if (diff <= 0) return 'Expired'
  const days = Math.floor(diff / 86400)
  const hours = Math.floor((diff % 86400) / 3600)
  if (days > 0) return `${days}d ${hours}h`
  return `${hours}h`
}

function PortfolioPage() {
  const navigate = useNavigate()
  const { ready, authenticated, connected, publicKey } = usePrivyWallet()
  const { linkWallet } = useLinkAccount()
  const [tab, setTab] = useState<Tab>('all')

  useEffect(() => {
    if (ready && !authenticated) navigate({ to: '/gate' })
  }, [ready, authenticated, navigate])

  const { data: profile, isLoading: profileLoading } = useBuilderProfile()

  const walletAddr = publicKey?.toBase58()

  const { data: questsData, isLoading: questsLoading, isError: questsError, refetch } = useQuery<ApiQuest[]>({
    queryKey: ['quests', walletAddr],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/quests?builder=${walletAddr}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return Array.isArray(json) ? json : (json.quests ?? [])
    },
    enabled: !!walletAddr,
    staleTime: 30_000,
  })

  if (!ready) return null

  if (!connected) {
    return (
      <>
        <Header />
        <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-16 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">My Commitments</h1>
          <p className="text-muted-foreground mb-6">Connect your Solana wallet to view your commitments.</p>
          <Button onClick={() => linkWallet()} className="text-primary-foreground">Connect Wallet</Button>
        </main>
        <Footer />
      </>
    )
  }

  const quests = questsData ?? []
  const filteredQuests = quests.filter((q) => {
    const s = parseStatus(q.status)
    if (tab === 'active') return s === 'Open' || s === 'InProgress'
    if (tab === 'completed') return s === 'Shipped' || s === 'Slashed'
    return true
  })

  const rate = profile ? shipRate(profile.questsShipped, profile.questsTotal) : 0

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
        {/* Profile card */}
        <div className="glass-card rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ProofScoreRing score={rate} size="lg" />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs font-mono text-primary uppercase tracking-widest mb-1">Ship Rate</p>
              <h1 className="text-2xl font-display font-bold text-foreground">My Commitments</h1>
              <p className="text-sm text-muted-foreground mt-1">Your on-chain reputation. Permanent.</p>

              {profileLoading ? (
                <div className="flex items-center gap-2 mt-4 text-muted-foreground text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading profile…
                </div>
              ) : profile ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {[
                    { label: 'Quests Shipped', value: String(profile.questsShipped), cls: 'text-foreground' },
                    { label: 'Ship Rate', value: `${rate}%`, cls: 'text-primary' },
                    { label: 'SOL Staked', value: `${lamportsToSol(profile.totalStakedLifetime).toFixed(1)}`, cls: 'text-primary' },
                  ].map((s) => (
                    <div key={s.label} className="bg-secondary/50 rounded-lg p-3 text-center">
                      <p className={cn('text-lg font-mono font-bold', s.cls)}>{s.value}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-4">
                  No on-chain profile yet — stake your first build to start earning your PROOF score.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 shrink-0 items-stretch">
              <Link to="/quest/create">
                <Button className="text-primary-foreground w-full">Stake a Build</Button>
              </Link>
              <div className="border-t border-border/30 pt-3">
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-2 font-mono">GitHub</p>
                <GitHubConnect returnTo="/portfolio" />
              </div>
            </div>
          </div>
        </div>

        {/* Quest history */}
        <div className="flex gap-1 mb-6">
          {(['active', 'completed', 'all'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn('px-4 py-2 rounded-full text-sm font-medium transition-colors', tab === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground')}
            >{TAB_LABELS[t]}</button>
          ))}
        </div>

        {questsLoading ? (
          <div className="flex items-center gap-2 py-8 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading quests…
          </div>
        ) : questsError ? (
          <div className="flex items-center gap-3 py-8">
            <p className="text-muted-foreground text-sm">Failed to load quests.</p>
            <Button variant="secondary" size="sm" onClick={() => refetch()} className="gap-2">
              <RefreshCw className="w-4 h-4" /> Retry
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredQuests.map((quest) => {
              const stake = lamportsToSol(quest.stake_amount)
              const status = parseStatus(quest.status)
              const isActive = status === 'Open' || status === 'InProgress'
              const canClaim = status === 'Shipped'
              return (
                <div key={quest.pubkey} className="glass-card rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <Link to="/quest/$id" params={{ id: quest.pubkey }} className="text-sm font-display font-bold text-foreground hover:text-primary transition-colors">
                      {quest.title}
                    </Link>
                    <div className="flex items-center gap-3 mt-1">
                      <StatusBadge status={status} />
                      <span className="text-xs font-mono font-bold text-primary">{stake.toFixed(1)} SOL</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {isActive && <span className="text-xs font-mono text-amber-400">{formatCountdown(quest.deadline)}</span>}
                    {canClaim && (
                      <Link to="/quest/$id" params={{ id: quest.pubkey }}>
                        <Button size="sm" className="text-primary-foreground text-xs">Claim SOL</Button>
                      </Link>
                    )}
                    {status === 'Open' && (
                      <Link to="/quest/$id/submit-proof" params={{ id: quest.pubkey }}>
                        <Button size="sm" variant="secondary" className="text-xs">Submit proof</Button>
                      </Link>
                    )}
                    {status === 'Slashed' && <span className="text-xs text-danger font-medium">SLASHED</span>}
                  </div>
                </div>
              )
            })}
            {filteredQuests.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  {tab === 'active' ? 'No active commitments. Go build something.' : tab === 'completed' ? 'No completed commitments yet.' : 'No commitments found.'}
                </p>
                <Link to="/quest/create">
                  <Button className="text-primary-foreground">Stake a Build</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
