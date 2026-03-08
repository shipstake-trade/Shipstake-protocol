import { createFileRoute } from "@tanstack/react-router"
import { Header } from "@/components/sections/header"
import { mockLeaderboard } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Trophy, Info } from "lucide-react"

export const Route = createFileRoute("/leaderboard")({
  component: LeaderboardPage,
})

function proofScoreColor(score: number): string {
  if (score >= 91) return "text-yellow-400"
  if (score >= 76) return "text-orange-400"
  if (score >= 51) return "text-purple-400"
  if (score >= 26) return "text-blue-400"
  return "text-slate-400"
}

const RANK_ICONS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" }

function LeaderboardPage() {
  return (
    <main>
      <Header />
      <div className="mx-auto max-w-[var(--container-max-width)] px-4 py-10 space-y-6">
        {/* Title row */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h1 className="text-2xl font-bold">PROOF Score Leaderboard</h1>
          </div>

          {/* Demo data badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
            <Info className="w-3 h-3" />
            Demo data
          </span>
        </div>

        <p className="text-sm text-muted-foreground max-w-lg">
          Builders ranked by their on-chain PROOF Score — a permanent reputation metric based on
          shipped quests, SOL staked, and streak consistency.
        </p>

        {/* Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[40px_1fr_80px_80px_80px_60px] gap-4 px-4 py-2.5 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <span>#</span>
            <span>Builder</span>
            <span className="text-right">PROOF</span>
            <span className="text-right hidden sm:block">Ship %</span>
            <span className="text-right hidden sm:block">Staked</span>
            <span className="text-right">Streak</span>
          </div>

          {/* Rows */}
          {mockLeaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={cn(
                "grid grid-cols-[40px_1fr_80px_80px_80px_60px] gap-4 items-center px-4 py-3 border-b border-border/50 last:border-0 text-sm transition-colors hover:bg-secondary/30",
                entry.rank === 1 && "bg-yellow-400/5"
              )}
            >
              {/* Rank */}
              <span className="text-muted-foreground font-mono text-xs">
                {RANK_ICONS[entry.rank] ?? `#${entry.rank}`}
              </span>

              {/* Address */}
              <span className="font-mono text-xs text-foreground truncate">{entry.address}</span>

              {/* PROOF Score */}
              <span
                className={cn(
                  "text-right font-bold font-mono",
                  proofScoreColor(entry.proofScore)
                )}
              >
                {entry.proofScore}
              </span>

              {/* Ship rate */}
              <span className="text-right text-muted-foreground hidden sm:block">
                {entry.shipRate}%
              </span>

              {/* Total staked */}
              <span className="text-right font-mono text-muted-foreground hidden sm:block">
                {entry.totalStaked.toFixed(1)} ◎
              </span>

              {/* Streak */}
              <span className="text-right text-muted-foreground">
                {entry.streak > 0 ? `🔥${entry.streak}` : "—"}
              </span>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-xs text-muted-foreground/50 flex items-center gap-1.5">
          <Info className="w-3 h-3 shrink-0" />
          Live on-chain leaderboard coming soon. Data shown is for demonstration purposes only.
        </p>
      </div>
    </main>
  )
}
