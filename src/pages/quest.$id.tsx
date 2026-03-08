import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { toast } from "sonner"
import { Header } from "@/components/sections/header"
import { StatusBadge } from "@/components/quest/status-badge"
import { Button } from "@/components/ui/button"
import { apiFetch } from "@/lib/api"
import { useClaimStakeReal } from "@/hooks/useClaimStake"
import { useShipstakeProgram } from "@/hooks/useShipstakeProgram"
import type { QuestStatus } from "@/lib/solana/idl"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import {
  ExternalLink,
  GitBranch,
  Loader2,
  Clock,
  Coins,
  AlertTriangle,
} from "lucide-react"

export const Route = createFileRoute("/quest/$id")({
  component: QuestDetailPage,
})

// Numeric status from Supabase → QuestStatus string
const STATUS_MAP: Record<number, QuestStatus> = {
  0: "Open",
  1: "InProgress",
  2: "Validating",
  3: "Shipped",
  4: "Slashed",
}

interface ApiQuest {
  pubkey: string
  builder: string
  title: string
  description: string | null
  stake_amount: number
  deadline: number
  status: number
  proof_url: string | null
  repo_owner: string
  repo_name: string
  tx_signature: string | null
  builder_github_id: string | null
  created_at: string
}

function parseStatus(raw: number | string): QuestStatus {
  if (typeof raw === "string") return raw as QuestStatus
  return STATUS_MAP[raw] ?? "Open"
}

function formatDeadline(ts: number): string {
  const date = new Date(ts * 1000)
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  if (diff < 0) return `Expired ${Math.abs(Math.floor(diff / 86_400_000))}d ago`
  const days = Math.floor(diff / 86_400_000)
  if (days === 0) return "Due today"
  if (days === 1) return "Due tomorrow"
  return `${days}d remaining`
}

function QuestDetailPage() {
  const { id } = Route.useParams()
  const { publicKey, connected } = useShipstakeProgram()
  const claimStake = useClaimStakeReal()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: quest, isLoading, error } = useQuery<ApiQuest>({
    queryKey: ["quest", id],
    queryFn: async () => {
      const res = await apiFetch(`/quests/${id}`)
      if (!res.ok) throw new Error(`Quest not found (${res.status})`)
      return res.json()
    },
    // Poll every 20s while quest is Open or InProgress
    refetchInterval: (query) => {
      const data = query.state.data
      if (!data) return false
      const status = parseStatus(data.status)
      return status === "Open" || status === "InProgress" || status === "Validating"
        ? 20_000
        : false
    },
    staleTime: 15_000,
  })

  async function handleClaim() {
    if (!connected) {
      toast.error("Connect your wallet to claim.")
      return
    }
    toast.loading("Claiming stake…", { id: "claim-stake" })
    try {
      await claimStake.mutateAsync({ questPda: id })
      queryClient.invalidateQueries({ queryKey: ["quest", id] })
      toast.success("Stake claimed!", { id: "claim-stake" })
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Claim failed"
      toast.error(msg, { id: "claim-stake" })
    }
  }

  if (isLoading) {
    return (
      <main>
        <Header />
        <div className="mx-auto max-w-[var(--container-max-width)] px-4 py-16 flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading quest…
        </div>
      </main>
    )
  }

  if (error || !quest) {
    return (
      <main>
        <Header />
        <div className="mx-auto max-w-[var(--container-max-width)] px-4 py-16 space-y-4">
          <p className="text-destructive">Quest not found.</p>
          <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/explore" })}>
            Back to Explore
          </Button>
        </div>
      </main>
    )
  }

  const status = parseStatus(quest.status)
  const isBuilder = connected && publicKey?.toBase58() === quest.builder
  const stakeSol = (quest.stake_amount / LAMPORTS_PER_SOL).toFixed(2)
  const deadlineExpired = quest.deadline * 1000 < Date.now()

  return (
    <main>
      <Header />
      <div className="mx-auto max-w-[var(--container-max-width)] px-4 py-10 space-y-8">
        {/* Header row */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h1 className="text-2xl font-bold leading-tight">{quest.title}</h1>
            <StatusBadge status={status} />
          </div>

          {quest.description && (
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
              {quest.description}
            </p>
          )}
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetaCard icon={<Coins className="w-4 h-4" />} label="Staked">
            <span className="font-mono font-bold text-primary">{stakeSol} SOL</span>
          </MetaCard>

          <MetaCard icon={<Clock className="w-4 h-4" />} label="Deadline">
            <span className={deadlineExpired && status === "Open" ? "text-destructive" : ""}>
              {formatDeadline(quest.deadline)}
            </span>
          </MetaCard>

          <MetaCard icon={<GitBranch className="w-4 h-4" />} label="Repository">
            <a
              href={`https://github.com/${quest.repo_owner}/${quest.repo_name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              {quest.repo_owner}/{quest.repo_name}
              <ExternalLink className="w-3 h-3" />
            </a>
          </MetaCard>

          {quest.tx_signature && (
            <MetaCard icon={<ExternalLink className="w-4 h-4" />} label="Tx">
              <a
                href={`https://solscan.io/tx/${quest.tx_signature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-primary hover:underline inline-flex items-center gap-1 truncate"
              >
                {quest.tx_signature.slice(0, 8)}…
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </MetaCard>
          )}
        </div>

        {/* Proof URL */}
        {quest.proof_url && (
          <div className="glass-card rounded-lg p-4 space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Proof
            </p>
            <a
              href={quest.proof_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1.5 break-all"
            >
              {quest.proof_url}
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        )}

        {/* Slashed explanation */}
        {status === "Slashed" && (
          <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-destructive">Quest Slashed</p>
              <p className="text-xs text-muted-foreground">
                The deadline passed without a verified proof submission. The staked SOL has been
                redirected to the slash destination.
              </p>
            </div>
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3">
          {/* Builder: submit proof when Open */}
          {isBuilder && status === "Open" && (
            <Link to="/quest/$id/submit-proof" params={{ id }}>
              <Button>Submit Proof</Button>
            </Link>
          )}

          {/* Builder: claim stake when Shipped */}
          {isBuilder && status === "Shipped" && (
            <Button onClick={handleClaim} disabled={claimStake.isPending} className="gap-2">
              {claimStake.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Claiming…
                </>
              ) : (
                <>
                  <Coins className="w-4 h-4" />
                  Claim Stake
                </>
              )}
            </Button>
          )}

          {/* Claimed state */}
          {isBuilder && status === "Shipped" && claimStake.isSuccess && (
            <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Claimed
            </span>
          )}
        </div>

        {/* Pubkey */}
        <p className="text-xs text-muted-foreground/50 font-mono break-all">
          Quest: {quest.pubkey}
        </p>
      </div>
    </main>
  )
}

function MetaCard({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <div className="glass-card rounded-lg p-3 space-y-1.5">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-sm font-medium text-foreground">{children}</div>
    </div>
  )
}
