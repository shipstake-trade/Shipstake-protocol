"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ProofScoreRing } from "@/components/builder/proof-score-ring";
import { StatusBadge } from "@/components/quest/status-badge";
import { WalletAddress } from "@/components/ui/wallet-address";
import { mockBuilderProfile, mockQuests } from "@/lib/mock-data";
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

            {/* Right: stats */}
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: "Quests Shipped", value: profile.questsShipped, cls: "text-foreground" },
                  { label: "Ship Rate", value: `${shipRate}%`, cls: "text-primary" },
                  { label: "SOL Staked", value: `${profile.totalSolStaked.toFixed(1)} SOL`, cls: "text-primary" },
                ].map((s) => (
                  <div key={s.label} className="bg-secondary/50 rounded-lg p-3">
                    <p className={cn("text-xl font-mono font-bold", s.cls)}>{s.value}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
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
