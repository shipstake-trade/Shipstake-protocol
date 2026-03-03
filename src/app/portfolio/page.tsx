"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ProofScoreRing } from "@/components/builder/proof-score-ring";
import { StatusBadge } from "@/components/quest/status-badge";
import { Button } from "@/components/ui/button";
import { usePrivyWallet } from "@/lib/solana/shipstake";
import { mockBuilderProfile, mockQuests } from "@/lib/mock-data";
import { lamportsToSol } from "@/lib/solana/shipstake";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type Tab = "active" | "completed" | "all";

function formatCountdown(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = timestamp - now;
  if (diff <= 0) return "Expired";
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
}

export default function PortfolioPage() {
  const { connected, login } = usePrivyWallet();
  const [tab, setTab] = useState<Tab>("all");
  const profile = mockBuilderProfile;

  const filteredQuests = mockQuests.filter((q) => {
    if (tab === "active")
      return q.status === "Open" || q.status === "InProgress" || q.status === "Validating";
    if (tab === "completed")
      return q.status === "Shipped" || q.status === "Slashed";
    return true;
  });

  if (!connected) {
    return (
      <>
        <Header />
        <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-16 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">
            My Quests
          </h1>
          <p className="text-muted-foreground mb-6">
            Connect your wallet to view your quests and PROOF Score.
          </p>
          <Button
            onClick={() => login()}
            className="text-primary-foreground"
          >
            Connect Wallet
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
        {/* PROOF Score summary */}
        <div className="glass-card rounded-lg p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
          <ProofScoreRing score={profile.proofScore} size="lg" />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-display font-bold text-foreground">
              My Quests
            </h1>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2 text-sm text-muted-foreground">
              <span>
                <span className="text-foreground font-medium">
                  {profile.questsShipped}
                </span>
                /{profile.questsTotal} Shipped
              </span>
              <span>
                <span className="text-primary font-mono font-medium">
                  {profile.totalSolStaked.toFixed(1)}
                </span>{" "}
                SOL Staked
              </span>
              <span>
                <span className="text-foreground font-medium">
                  {profile.currentStreak}
                </span>{" "}
                Streak
              </span>
            </div>
          </div>
          <Link href="/quest/create">
            <Button className="text-primary-foreground">
              Create Quest →
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6">
          {(["active", "completed", "all"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize",
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Quest list */}
        <div className="space-y-3">
          {filteredQuests.map((quest) => {
            const stake = quest.vault
              ? lamportsToSol(quest.vault.builderStake)
              : 0;
            const isActive =
              quest.status === "Open" ||
              quest.status === "InProgress" ||
              quest.status === "Validating";
            const canClaim = quest.status === "Shipped";

            return (
              <div
                key={quest.publicKey}
                className="glass-card rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/quest/${quest.publicKey}`}
                    className="text-sm font-display font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {quest.title}
                  </Link>
                  <div className="flex items-center gap-3 mt-1">
                    <StatusBadge status={quest.status} />
                    <span className="text-xs font-mono text-muted-foreground uppercase">
                      {quest.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-primary">
                      {stake.toFixed(1)} SOL
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isActive && (
                    <span className="text-xs font-mono text-amber-400">
                      {formatCountdown(quest.deadline)}
                    </span>
                  )}
                  {canClaim && (
                    <Button
                      size="sm"
                      className="text-primary-foreground text-xs"
                      onClick={() =>
                        toast.success("Stake claimed!", {
                          description: `${stake.toFixed(1)} SOL returned to your wallet`,
                        })
                      }
                    >
                      Claim Stake
                    </Button>
                  )}
                  {quest.status === "Slashed" && (
                    <span className="text-xs text-danger font-medium">
                      Slashed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {filteredQuests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No quests found in this category.
              </p>
              <Link href="/quest/create">
                <Button className="text-primary-foreground">
                  Create your first quest →
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
