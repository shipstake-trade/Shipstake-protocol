import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { ProofScoreRing } from '@/components/builder/proof-score-ring'
import { StatusBadge } from '@/components/quest/status-badge'
import { WalletAddress } from '@/components/ui/wallet-address'
import { Button } from '@/components/ui/button'
import { useBuilderProfile } from '@/hooks/useBuilderProfile'
import { API_URL } from '@/lib/api'
import type { ApiQuest } from '@/lib/types'
import { parseStatus, shipRate } from '@/lib/types'
import { lamportsToSol } from '@/lib/solana/shipstake'
import { cn } from '@/lib/utils'
import type { QuestStatus } from '@/lib/solana/idl'
import { Loader2, RefreshCw } from 'lucide-react'

export const Route = createLazyFileRoute('/builder/$address')({
  component: BuilderProfilePage,
})

type TabFilter = 'all' | QuestStatus

function BuilderProfilePage() {
  const { address } = Route.useParams()
  const [tabFilter, setTabFilter] = useState<TabFilter>('all')

  const { data: profile, isLoading: profileLoading } = useBuilderProfile(address)

  const { data: questsData, isLoading: questsLoading, isError: questsError, refetch } = useQuery<ApiQuest[]>({
    queryKey: ['quests', address],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/quests?builder=${address}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return Array.isArray(json) ? json : (json.quests ?? [])
    },
    staleTime: 30_000,
  })

  const quests = questsData ?? []
  const filteredQuests = tabFilter === 'all'
    ? quests
    : quests.filter((q) => parseStatus(q.status) === tabFilter)

  const rate = profile ? shipRate(profile.questsShipped, profile.questsTotal) : 0

  const tabs: { value: TabFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'Open', label: 'Open' },
    { value: 'InProgress', label: 'In progress' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Slashed', label: 'Slashed' },
  ]

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
        {/* Profile header */}
        <div className="glass-card rounded-lg p-6 mb-8">
          {profileLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" /> Loading profile…
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex flex-col items-center gap-3 md:w-40 shrink-0">
                <ProofScoreRing score={rate} size="lg" />
                <WalletAddress address={address} length={8} className="text-sm font-mono text-muted-foreground" />
                {profile && (
                  <p className="text-[10px] text-muted-foreground/60 text-center">
                    {profile.joinedAt > 0
                      ? `joined ${new Date(profile.joinedAt * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} · `
                      : ''}
                    {profile.questsTotal} quest{profile.questsTotal !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              {profile ? (
                <div className="flex-1">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { label: 'Quests Shipped', value: String(profile.questsShipped), cls: 'text-foreground' },
                      { label: 'Ship Rate', value: `${rate}%`, cls: 'text-primary' },
                      { label: 'SOL Staked', value: `${lamportsToSol(profile.totalStakedLifetime).toFixed(1)} SOL`, cls: 'text-primary' },
                    ].map((s) => (
                      <div key={s.label} className="bg-secondary/50 rounded-lg p-3">
                        <p className={cn('text-xl font-mono font-bold', s.cls)}>{s.value}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No on-chain profile found for this address yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Quest history */}
        <div>
          <h2 className="text-lg font-display font-bold text-foreground mb-4">Commitment history</h2>
          <div className="flex gap-1 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setTabFilter(tab.value)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition-colors', tabFilter === tab.value ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground')}
              >{tab.label}</button>
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
            <div className="glass-card rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Quest</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Status</th>
                    <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">Stake</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuests.map((quest) => (
                    <tr key={quest.pubkey} className="border-b border-border/30 last:border-0 hover:bg-secondary/20 transition-colors">
                      <td className="p-4">
                        <Link to="/quest/$id" params={{ id: quest.pubkey }} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                          {quest.title}
                        </Link>
                      </td>
                      <td className="p-4"><StatusBadge status={parseStatus(quest.status)} /></td>
                      <td className="p-4 text-right">
                        <span className="text-sm font-mono font-bold text-primary">{lamportsToSol(quest.stake_amount).toFixed(1)} SOL</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredQuests.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">No commitments found.</div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
