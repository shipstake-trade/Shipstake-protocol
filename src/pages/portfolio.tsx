import { createFileRoute, Link } from "@tanstack/react-router"
import { Header } from "@/components/sections/header"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { useBuilderProfile } from "@/hooks/useBuilderProfile"
import { useShipstakeProgram } from "@/hooks/useShipstakeProgram"
import { lamportsToSol } from "@/lib/solana/shipstake"
import { Loader2, Plus, Trophy, Zap, CheckCircle2, XCircle } from "lucide-react"

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
})

function PortfolioPage() {
  return (
    <main>
      <Header />
      <AuthGuard>
        <PortfolioDashboard />
      </AuthGuard>
    </main>
  )
}

function PortfolioDashboard() {
  const { publicKey } = useShipstakeProgram()
  const { data: profile, isLoading } = useBuilderProfile()

  return (
    <div className="mx-auto max-w-[var(--container-max-width)] px-4 py-10 space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">My Portfolio</h1>
          {publicKey && (
            <p className="text-xs text-muted-foreground font-mono mt-1">
              {publicKey.toBase58().slice(0, 8)}…{publicKey.toBase58().slice(-8)}
            </p>
          )}
        </div>
        <Link to="/quest/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Quest
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground py-8">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading profile…
        </div>
      ) : profile ? (
        <>
          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              icon={<Zap className="w-4 h-4 text-primary" />}
              label="Total Staked"
              value={`${lamportsToSol(profile.totalStakedLifetime).toFixed(2)} SOL`}
            />
            <StatCard
              icon={<Trophy className="w-4 h-4 text-yellow-400" />}
              label="Quests"
              value={String(profile.questsTotal)}
            />
            <StatCard
              icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              label="Shipped"
              value={String(profile.questsShipped)}
            />
            <StatCard
              icon={<XCircle className="w-4 h-4 text-destructive" />}
              label="Slashed"
              value={String(profile.questsSlashed)}
            />
          </div>

          {/* Builder profile link */}
          {publicKey && (
            <div className="glass-card rounded-lg p-4 flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">View your public builder profile</p>
              <Link to="/builder/$address" params={{ address: publicKey.toBase58() }}>
                <Button variant="secondary" size="sm">View Profile</Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="glass-card rounded-xl p-8 text-center space-y-4 max-w-sm">
          <p className="text-lg font-semibold">No quests yet</p>
          <p className="text-sm text-muted-foreground">
            Create your first quest to start building your on-chain reputation.
          </p>
          <Link to="/quest/create">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Quest
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="glass-card rounded-lg p-4 space-y-2">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-xl font-bold font-mono text-foreground">{value}</p>
    </div>
  )
}
