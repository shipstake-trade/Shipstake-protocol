"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ProofScoreRing } from "@/components/builder/proof-score-ring";
import { StatusBadge } from "@/components/quest/status-badge";
import { WalletAddress } from "@/components/ui/wallet-address";
import { mockBuilderProfile, mockQuests } from "@/lib/mock-data";
import { siteConfig } from "@/lib/config";
import { lamportsToSol } from "@/lib/solana/shipstake";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { use, useState } from "react";
import type { QuestStatus } from "@/lib/solana/idl";

type TabFilter = "all" | QuestStatus;

export default function BuilderProfilePage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = use(params);
  const profile = mockBuilderProfile;
  const [tabFilter, setTabFilter] = useState<TabFilter>("all");

  const shipRate =
    profile.questsTotal > 0
      ? Math.round((profile.questsShipped / profile.questsTotal) * 100)
      : 0;

  const filteredQuests =
    tabFilter === "all"
      ? mockQuests
      : mockQuests.filter((q) => q.status === tabFilter);

  const tabs: { value: TabFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "Open", label: "Open" },
    { value: "InProgress", label: "In progress" },
    { value: "Shipped", label: "Shipped" },
    { value: "Slashed", label: "Slashed" },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
        {/* Profile header */}
        <div className="glass-card rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Left: identity */}
            <div className="flex flex-col items-center gap-3 md:w-40 shrink-0">
              <ProofScoreRing
                score={profile.proofScore}
                streak={profile.currentStreak}
                showNextRank
                size="lg"
              />
              <WalletAddress
                address={address}
                length={8}
                className="text-sm font-mono text-muted-foreground"
              />
              <p className="text-[10px] text-muted-foreground/60 text-center">
                joined{" "}
                {new Date(profile.joinedAt * 1000).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
                {" · "}
                {profile.questsTotal} quests
              </p>
            </div>

            {/* Right: stats + progress */}
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {[
                  { label: "Quests Shipped", value: profile.questsShipped, cls: "text-foreground" },
                  { label: "Current Streak", value: `🔥 ${profile.currentStreak}`, cls: "text-amber-400" },
                  { label: "SOL Staked", value: `${profile.totalSolStaked.toFixed(1)} SOL`, cls: "text-primary" },
                  { label: "Best Streak", value: profile.bestStreak, cls: "text-foreground" },
                ].map((s) => (
                  <div key={s.label} className="bg-secondary/50 rounded-lg p-3">
                    <p className={cn("text-xl font-mono font-bold", s.cls)}>{s.value}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Progress to next rank */}
              <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">
                    Progress to next rank
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    {profile.questsTotal > 0
                      ? `${Math.round((profile.questsShipped / profile.questsTotal) * 100)}% ship rate`
                      : "—"
                    }
                  </p>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{ width: `${profile.proofScore}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {profile.proofScore < 91
                    ? `${profile.proofScore}/100 · ${(() => {
                        if (profile.proofScore < 26) return `${26 - profile.proofScore} pts to Adept`;
                        if (profile.proofScore < 51) return `${51 - profile.proofScore} pts to Veteran`;
                        if (profile.proofScore < 76) return `${76 - profile.proofScore} pts to Legend`;
                        return `${91 - profile.proofScore} pts to Mythic`;
                      })()}`
                    : "Mythic — maximum rank achieved"
                  }
                </p>
              </div>

              {/* Incentive active */}
              {profile.currentStreak >= 5 ? (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400 font-medium">
                  🔥🔥🔥 0% fee — FREE SHIPPING active
                </div>
              ) : profile.currentStreak >= 3 ? (
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400">
                  🔥 1% fee active · Ship {5 - profile.currentStreak} more for 0%
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-secondary/30 px-4 py-3 text-xs text-muted-foreground">
                  Start a streak → earn fee reductions · Ship 3 in a row for 1%
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PROOF Score Formula */}
        <div className="glass-card rounded-lg p-5 mb-8">
          <h3 className="text-sm font-medium text-foreground mb-4">
            PROOF Score breakdown
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {siteConfig.proofScore.components.map((comp) => (
              <div key={comp.name} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {comp.icon}
                  <span className="text-xs font-medium text-foreground">
                    {comp.label}
                  </span>
                </div>
                <code className="text-[10px] font-mono text-muted-foreground block">
                  {comp.weight}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Quest History */}
        <div>
          <h2 className="text-lg font-display font-bold text-foreground mb-4">
            Quest history
          </h2>

          {/* Tabs */}
          <div className="flex gap-1 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setTabFilter(tab.value)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  tabFilter === tab.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quest table */}
          <div className="glass-card rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                    Quest
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4 hidden md:table-cell">
                    Category
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                    Status
                  </th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider p-4">
                    Stake
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredQuests.map((quest) => (
                  <tr
                    key={quest.publicKey}
                    className="border-b border-border/30 last:border-0 hover:bg-secondary/20 transition-colors"
                  >
                    <td className="p-4">
                      <Link
                        href={`/quest/${quest.publicKey}`}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {quest.title}
                      </Link>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-xs font-mono text-muted-foreground uppercase">
                        {quest.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={quest.status} />
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-sm font-mono font-bold text-primary">
                          {lamportsToSol(quest.stakeAmount).toFixed(1)} SOL
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredQuests.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No quests found.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
