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
    { value: "InProgress", label: "In Progress" },
    { value: "Shipped", label: "Shipped" },
    { value: "Slashed", label: "Slashed" },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
        {/* Profile header */}
        <div className="glass-card rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <ProofScoreRing score={profile.proofScore} size="lg" />
            <div className="flex-1">
              <WalletAddress
                address={address}
                length={8}
                className="text-lg font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Joined{" "}
                {new Date(profile.joinedAt * 1000).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="text-2xl font-mono font-bold text-foreground">
                    {shipRate}%
                  </p>
                  <p className="text-xs text-muted-foreground">Ship Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-mono font-bold text-foreground">
                    {profile.questsShipped}/{profile.questsTotal}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Quests Shipped
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-mono font-bold text-primary">
                    {profile.totalSolStaked.toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    SOL Staked
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-mono font-bold text-foreground">
                    {profile.currentStreak}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Current Streak
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROOF Score Formula */}
        <div className="glass-card rounded-lg p-5 mb-8">
          <h3 className="text-sm font-medium text-foreground mb-4">
            PROOF Score Breakdown
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
            Quest History
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
                        {quest.vault
                          ? lamportsToSol(quest.vault.builderStake).toFixed(1)
                          : "—"}{" "}
                        SOL
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
