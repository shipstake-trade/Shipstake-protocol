import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { QuestCard } from '@/components/quest/quest-card'
import { QuestCardSkeleton } from '@/components/quest/quest-card-skeleton'
import { Button } from '@/components/ui/button'
import { API_URL } from '@/lib/api'
import type { ApiQuest } from '@/lib/types'
import { parseStatus } from '@/lib/types'
import type { QuestStatus } from '@/lib/solana/idl'
import { cn } from '@/lib/utils'
import { usePrivyWallet } from '@/lib/solana/shipstake'
import { RefreshCw } from 'lucide-react'

export const Route = createLazyFileRoute('/explore')({
  component: ExplorePage,
})

const STATUS_OPTIONS: QuestStatus[] = ['Open', 'InProgress', 'Shipped', 'Slashed']
type SortOption = 'newest' | 'deadline' | 'stake'
const SORT_LABELS: Record<SortOption, string> = {
  newest: 'Newest',
  deadline: 'Deadline',
  stake: 'Stake ↓',
}

function ExplorePage() {
  const { connected } = usePrivyWallet()
  const [statusFilter, setStatusFilter] = useState<QuestStatus | 'all'>('all')
  const [sort, setSort] = useState<SortOption>('newest')

  const { data, isLoading, isError, refetch } = useQuery<ApiQuest[]>({
    queryKey: ['quests'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/quests`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return Array.isArray(json) ? json : (json.quests ?? [])
    },
    staleTime: 30_000,
  })

  const filtered = useMemo(() => {
    let quests = data ?? []
    if (statusFilter !== 'all') {
      quests = quests.filter((q) => parseStatus(q.status) === statusFilter)
    }
    switch (sort) {
      case 'deadline': return [...quests].sort((a, b) => a.deadline - b.deadline)
      case 'stake':    return [...quests].sort((a, b) => b.stake_amount - a.stake_amount)
      default:         return [...quests].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }
  }, [data, statusFilter, sort])

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Who&apos;s shipping.</h1>
            <p className="text-muted-foreground text-sm mt-1">Builders with SOL on the line.</p>
          </div>
          {connected && (
            <Link to="/quest/create">
              <Button className="text-primary-foreground">Create a Quest</Button>
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setStatusFilter('all')}
              className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition-colors', statusFilter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground')}
            >All</button>
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition-colors', statusFilter === status ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground')}
              >{status}</button>
            ))}
          </div>
          <div className="flex gap-1 ml-auto flex-wrap justify-end">
            {(['newest', 'deadline', 'stake'] as SortOption[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition-colors', sort === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground')}
              >{SORT_LABELS[s]}</button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <QuestCardSkeleton key={i} />)}
          </div>
        ) : isError ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-muted-foreground">Failed to load quests.</p>
            <Button variant="secondary" size="sm" onClick={() => refetch()} className="gap-2">
              <RefreshCw className="w-4 h-4" /> Retry
            </Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-lg font-display font-bold text-foreground mb-2">No commitments yet.</h3>
            <p className="text-muted-foreground mb-4">Be the first builder to put SOL on the line.</p>
            <Link to="/quest/create">
              <Button variant="default" className="text-primary-foreground">Create a Quest</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((quest) => <QuestCard key={quest.pubkey} quest={quest} />)}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
