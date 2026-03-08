import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/sections/header'
import { Footer } from '@/components/sections/footer'
import { StatusBadge } from '@/components/quest/status-badge'
import { Button } from '@/components/ui/button'
import { WalletAddress } from '@/components/ui/wallet-address'
import { useBuilderProfile } from '@/hooks/useBuilderProfile'
import { useClaimStakeReal } from '@/hooks/useClaimStake'
import { useShipstakeProgram } from '@/hooks/useShipstakeProgram'
import { API_URL } from '@/lib/api'
import type { ApiQuest } from '@/lib/types'
import { parseStatus, shipRate } from '@/lib/types'
import { lamportsToSol } from '@/lib/solana/shipstake'
import { toast } from 'sonner'
import { Loader2, ExternalLink, RefreshCw } from 'lucide-react'

export const Route = createLazyFileRoute('/quest/$id')({
  component: QuestDetailPage,
})

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

function formatCountdown(timestamp: number): string {
  const now = Date.now() / 1000
  const diff = timestamp - now
  if (diff <= 0) return 'Expired'
  const days = Math.floor(diff / 86400)
  const hours = Math.floor((diff % 86400) / 3600)
  const minutes = Math.floor((diff % 3600) / 60)
  if (days > 0) return `${days}d ${hours}h ${minutes}m`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

function BuilderSidebar({ builderAddress }: { builderAddress: string }) {
  const { data: profile } = useBuilderProfile(builderAddress)
  const rate = profile ? shipRate(profile.questsShipped, profile.questsTotal) : null

  return (
    <div className="glass-card rounded-lg p-5">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Builder</h3>
      <div className="flex items-center gap-3 mb-3">
        <div>
          <WalletAddress address={builderAddress} className="text-sm" />
          {rate !== null && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {profile?.questsShipped ?? 0}/{profile?.questsTotal ?? 0} shipped · {rate}% ship rate
            </p>
          )}
        </div>
      </div>
      <Link to="/builder/$address" params={{ address: builderAddress }}>
        <Button variant="ghost" size="sm" className="w-full text-xs">View profile</Button>
      </Link>
    </div>
  )
}

function QuestDetailPage() {
  const { id } = Route.useParams()
  const { publicKey } = useShipstakeProgram()
  const claimStake = useClaimStakeReal()

  const { data: quest, isLoading, isError, refetch } = useQuery<ApiQuest>({
    queryKey: ['quest', id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/quests/${id}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    },
    refetchInterval: (q) => {
      const s = q.state.data ? parseStatus(q.state.data.status) : null
      return s === 'Open' || s === 'InProgress' || s === 'Validating' ? 20_000 : false
    },
    staleTime: 15_000,
  })

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-16">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading quest…
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (isError || !quest) {
    return (
      <>
        <Header />
        <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-16 space-y-4">
          <p className="text-muted-foreground">Quest not found.</p>
          <Button variant="secondary" size="sm" onClick={() => refetch()} className="gap-2">
            <RefreshCw className="w-4 h-4" /> Retry
          </Button>
          <div><Link to="/explore" className="text-sm text-primary hover:underline">← Back to Explore</Link></div>
        </main>
        <Footer />
      </>
    )
  }

  const status = parseStatus(quest.status)
  const stakeSol = lamportsToSol(quest.stake_amount)
  const isActive = status === 'Open' || status === 'InProgress'
  const isShipped = status === 'Shipped'
  const isSlashed = status === 'Slashed'
  const isOwner = publicKey?.toBase58() === quest.builder
  const fee = stakeSol * 0.02

  const handleClaim = async () => {
    try {
      await claimStake.mutateAsync({ questPda: id })
      toast.success('Stake claimed!', { description: `${(stakeSol * 0.98).toFixed(4)} SOL returned to your wallet.` })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Claim failed')
    }
  }

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
        <div className="text-xs text-muted-foreground mb-6">
          <Link to="/explore" className="hover:text-foreground transition-colors">Explore</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{quest.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <StatusBadge status={status} />
                {quest.repo_owner && quest.repo_name && (
                  <span className="text-xs font-mono text-muted-foreground">
                    {quest.repo_owner}/{quest.repo_name}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-3">{quest.title}</h1>
              {quest.description && (
                <p className="text-muted-foreground leading-relaxed">{quest.description}</p>
              )}
            </div>

            {/* Timeline */}
            <div className="glass-card rounded-lg p-5">
              <h3 className="text-sm font-medium text-foreground mb-4">Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm text-foreground">Quest created · stake locked</p>
                    <p className="text-xs text-muted-foreground">
                      {stakeSol.toFixed(3)} SOL locked
                      {quest.tx_signature && (
                        <>
                          {' · '}
                          <a
                            href={`https://solscan.io/tx/${quest.tx_signature}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            {quest.tx_signature.slice(0, 8)}… <ExternalLink className="w-3 h-3" />
                          </a>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                {quest.proof_url && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div>
                      <p className="text-sm text-foreground">Proof submitted</p>
                      <a
                        href={quest.proof_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-primary hover:underline break-all inline-flex items-center gap-1"
                      >
                        {quest.proof_url} <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>
                )}
                {(isShipped || isSlashed) && (
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isShipped ? 'bg-emerald-brand' : 'bg-danger'}`} />
                    <div>
                      <p className="text-sm text-foreground">
                        {isShipped ? 'SHIPPED · stake ready to claim' : 'SLASHED · stake forfeited'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isShipped
                          ? `Oracle verified — ${(stakeSol * 0.98).toFixed(4)} SOL claimable`
                          : 'Deadline missed — stake forfeited'}
                      </p>
                    </div>
                  </div>
                )}
                {isActive && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-muted animate-pulse" />
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline: {formatDate(quest.deadline)}</p>
                      <p className="text-xs font-mono text-primary">{formatCountdown(quest.deadline)} remaining</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <BuilderSidebar builderAddress={quest.builder} />

            {/* Pool vault */}
            <div className="glass-card rounded-lg p-5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Pool Vault</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Builder stake</span>
                  <span className="font-mono font-bold text-primary">{stakeSol.toFixed(3)} SOL</span>
                </div>
                <hr className="border-border/50" />
                {isShipped && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Builder receives</span>
                      <span className="font-mono text-emerald-brand">{(stakeSol - fee).toFixed(4)} SOL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Protocol fee (2%)</span>
                      <span className="font-mono text-amber-400">{fee.toFixed(4)} SOL</span>
                    </div>
                  </div>
                )}
                {isSlashed && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Builder receives</span>
                      <span className="font-mono text-danger">0 SOL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Protocol fee</span>
                      <span className="font-mono">0 SOL</span>
                    </div>
                  </div>
                )}
                {isActive && <p className="text-[10px] text-muted-foreground">Locked until oracle settlement. Fee only on SHIPPED.</p>}
              </div>
            </div>

            {/* Actions */}
            <div className="glass-card rounded-lg p-5 space-y-2">
              {isOwner && status === 'Open' && (
                <Link to="/quest/$id/submit-proof" params={{ id: quest.pubkey }}>
                  <Button className="w-full text-primary-foreground">Submit proof</Button>
                </Link>
              )}
              {status === 'InProgress' && (
                <Button variant="secondary" className="w-full" disabled>Oracle is validating…</Button>
              )}
              {isOwner && isShipped && (
                <Button
                  variant="default"
                  className="w-full text-primary-foreground"
                  onClick={handleClaim}
                  disabled={claimStake.isPending}
                >
                  {claimStake.isPending ? (
                    <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Claiming…</>
                  ) : (
                    'Claim your SOL'
                  )}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground"
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quest.title}" on SHIPSTAKE — ${stakeSol.toFixed(1)} SOL locked`)}`, '_blank')}
              >
                Share on X
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
