import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { ProofScoreRing } from '@/components/builder/proof-score-ring'
import { StatusBadge } from '@/components/quest/status-badge'
import { GitHubConnect } from '@/components/github/github-connect'
import { Button } from '@/components/ui/button'
import { usePrivyWallet } from '@/lib/solana/shipstake'
import { useLinkAccount } from '@privy-io/react-auth'
import { mockBuilderProfile, mockQuests } from '@/lib/mock-data'
import { lamportsToSol } from '@/lib/solana/shipstake'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

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
  const { ready, authenticated, connected, login } = usePrivyWallet()
  const { linkWallet } = useLinkAccount()
  const [tab, setTab] = useState<Tab>('all')
  const profile = mockBuilderProfile

  const filteredQuests = mockQuests.filter((q) => {
    if (tab === 'active') return q.status === 'Open' || q.status === 'InProgress'
    if (tab === 'completed') return q.status === 'Shipped' || q.status === 'Slashed'
    return true
  })

  if (!ready) return null

  if (!connected) {
    return (
      <>
        <Header />
        <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-16 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">My Quests</h1>
          <p className="text-muted-foreground mb-6">Connect your wallet to view your quests and PROOF Score.</p>
          <Button onClick={() => (authenticated ? linkWallet() : login())} className="text-primary-foreground">
            Connect Wallet
          </Button>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
        <div className="glass-card rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ProofScoreRing score={profile.proofScore} size="lg" />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs font-mono text-primary uppercase tracking-widest mb-1">PROOF Score</p>
              <h1 className="text-2xl font-display font-bold text-foreground">My Quests</h1>
              <p className="text-sm text-muted-foreground mt-1">Your on-chain reputation. Permanent.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'Quests Shipped', value: profile.questsShipped, cls: 'text-foreground' },
                  { label: 'Ship Rate', value: `${profile.questsTotal > 0 ? Math.round((profile.questsShipped / profile.questsTotal) * 100) : 0}%`, cls: 'text-primary' },
                  { label: 'SOL Staked', value: `${profile.totalSolStaked.toFixed(1)}`, cls: 'text-primary' },
                ].map((s) => (
                  <div key={s.label} className="bg-secondary/50 rounded-lg p-3 text-center">
                    <p className={cn('text-lg font-mono font-bold', s.cls)}>{s.value}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0 items-stretch">
              <Link to="/quest/create">
                <Button className="text-primary-foreground w-full">Create a Quest</Button>
              </Link>
              <div className="border-t border-border/30 pt-3">
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-2 font-mono">GitHub</p>
                <GitHubConnect returnTo="/portfolio" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-1 mb-6">
          {(['active', 'completed', 'all'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn('px-4 py-2 rounded-full text-sm font-medium transition-colors', tab === t ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground')}
            >{TAB_LABELS[t]}</button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredQuests.map((quest) => {
            const stake = lamportsToSol(quest.stakeAmount)
            const isActive = quest.status === 'Open' || quest.status === 'InProgress'
            const canClaim = quest.status === 'Shipped'
            return (
              <div key={quest.publicKey} className="glass-card rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <Link to="/quest/$id" params={{ id: quest.publicKey }} className="text-sm font-display font-bold text-foreground hover:text-primary transition-colors">
                    {quest.title}
                  </Link>
                  <div className="flex items-center gap-3 mt-1">
                    <StatusBadge status={quest.status} />
                    <span className="text-xs font-mono text-muted-foreground uppercase">{quest.category}</span>
                    <span className="text-xs font-mono font-bold text-primary">{stake.toFixed(1)} SOL</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {isActive && <span className="text-xs font-mono text-amber-400">{formatCountdown(quest.deadline)}</span>}
                  {canClaim && (
                    <Button size="sm" className="text-primary-foreground text-xs" onClick={() => toast.success('Stake claimed.', { description: `${stake.toFixed(1)} SOL returned to your wallet` })}>
                      Claim your SOL
                    </Button>
                  )}
                  {quest.status === 'Open' && (
                    <Link to="/quest/$id/submit-proof" params={{ id: quest.publicKey }}>
                      <Button size="sm" variant="secondary" className="text-xs">Submit proof</Button>
                    </Link>
                  )}
                  {quest.status === 'Slashed' && <span className="text-xs text-danger font-medium">SLASHED</span>}
                </div>
              </div>
            )
          })}
          {filteredQuests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {tab === 'active' ? 'No active quests. Go build something.' : tab === 'completed' ? 'No completed quests yet.' : 'No quests found.'}
              </p>
              <Link to="/quest/create">
                <Button className="text-primary-foreground">Create a Quest</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
