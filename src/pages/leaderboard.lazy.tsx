import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { ProofScoreRing } from '@/components/builder/proof-score-ring'
import { Button } from '@/components/ui/button'
import { API_URL } from '@/lib/api'
import type { ApiProfile } from '@/lib/types'
import { shipRate } from '@/lib/types'
import { lamportsToSol } from '@/lib/solana/shipstake'
import { RefreshCw, Loader2 } from 'lucide-react'

export const Route = createLazyFileRoute('/leaderboard')({
  component: LeaderboardPage,
})


function LeaderboardPage() {
  const { data: profiles, isLoading, isError, refetch } = useQuery<ApiProfile[]>({
    queryKey: ['profiles-leaderboard'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/profiles?limit=20`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return Array.isArray(json) ? json : (json.profiles ?? [])
    },
    staleTime: 60_000,
  })

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Leaderboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Top builders by ship rate.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => refetch()} className="gap-2 text-muted-foreground">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20 gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading builders…
          </div>
        ) : isError ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-muted-foreground">Failed to load leaderboard.</p>
            <Button variant="secondary" size="sm" onClick={() => refetch()} className="gap-2">
              <RefreshCw className="w-4 h-4" /> Retry
            </Button>
          </div>
        ) : !profiles || profiles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No builders yet.</p>
          </div>
        ) : (
          <div className="glass-card rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4 w-12">#</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">BUILDER</th>
                  <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">SHIP RATE</th>
                  <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider p-4 hidden md:table-cell">SHIPPED</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider p-4 hidden md:table-cell">TOTAL STAKED</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile, i) => {
                  const rate = shipRate(profile.quests_shipped, profile.quests_total)
                  return (
                    <tr key={profile.address} className="border-b border-border/30 last:border-0 hover:bg-secondary/20 transition-colors">
                      <td className="p-4">
                        <span className={`text-sm font-mono font-bold ${i < 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link to="/builder/$address" params={{ address: profile.address }} className="text-sm font-mono text-foreground hover:text-primary transition-colors">
                          {profile.address.slice(0, 6)}…{profile.address.slice(-4)}
                        </Link>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <ProofScoreRing score={rate} size="sm" />
                        </div>
                      </td>
                      <td className="p-4 text-center hidden md:table-cell">
                        <span className="text-sm font-mono text-foreground">{profile.quests_shipped}</span>
                      </td>
                      <td className="p-4 text-right hidden md:table-cell">
                        <span className="text-sm font-mono text-primary">{lamportsToSol(profile.total_staked_lifetime).toFixed(1)} SOL</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
