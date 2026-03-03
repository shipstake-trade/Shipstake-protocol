"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { StatusBadge } from "@/components/quest/status-badge";
import { ProofTypeBadge } from "@/components/quest/proof-type-badge";
import { ProofScoreRing } from "@/components/builder/proof-score-ring";
import { Button } from "@/components/ui/button";
import { WalletAddress } from "@/components/ui/wallet-address";
import { mockQuests, mockBuilderProfile } from "@/lib/mock-data";
import { lamportsToSol } from "@/lib/solana/shipstake";
import Link from "next/link";
import { use } from "react";

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCountdown(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = timestamp - now;
  if (diff <= 0) return "Expired";
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export default function QuestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const quest = mockQuests.find((q) => q.publicKey === id) ?? mockQuests[0];
  const stake = quest.vault ? lamportsToSol(quest.vault.builderStake) : 0;
  const totalPool = quest.vault
    ? lamportsToSol(
        quest.vault.builderStake +
          quest.vault.totalSuccessCommitments +
          quest.vault.totalFailureCommitments
      )
    : 0;

  const isActive = quest.status === "Open" || quest.status === "InProgress";
  const isShipped = quest.status === "Shipped";
  const isSlashed = quest.status === "Slashed";

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-xs text-muted-foreground mb-6">
          <Link href="/explore" className="hover:text-foreground transition-colors">
            Explore
          </Link>
          <span className="mx-2">→</span>
          <span className="text-foreground">{quest.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider">
                  {quest.category}
                </span>
                <StatusBadge status={quest.status} />
                {quest.proofType && <ProofTypeBadge type={quest.proofType} />}
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-3">
                {quest.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {quest.description}
              </p>
            </div>

            {/* Timeline */}
            <div className="glass-card rounded-lg p-5">
              <h3 className="text-sm font-medium text-foreground mb-4">
                Quest Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Quest Created</p>
                    <p className="text-xs text-muted-foreground">
                      Builder staked {stake.toFixed(1)} SOL
                    </p>
                  </div>
                </div>
                {quest.proofUrl && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Proof Submitted</p>
                      <p className="text-xs font-mono text-muted-foreground break-all">
                        {quest.proofUrl}
                      </p>
                    </div>
                  </div>
                )}
                {(isShipped || isSlashed) && (
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isShipped ? "bg-emerald-brand" : "bg-danger"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        {isShipped ? "Quest Shipped" : "Quest Slashed"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isShipped
                          ? "Oracle verified delivery — stake returned to builder"
                          : "Deadline missed — stake redistributed"}
                      </p>
                    </div>
                  </div>
                )}
                {isActive && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-muted animate-pulse" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        Deadline: {formatDate(quest.deadline)}
                      </p>
                      <p className="text-xs font-mono text-primary">
                        {formatCountdown(quest.deadline)} remaining
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Builder card */}
            <div className="glass-card rounded-lg p-5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Builder
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <ProofScoreRing score={mockBuilderProfile.proofScore} size="sm" />
                <div>
                  <WalletAddress
                    address={quest.builder}
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {mockBuilderProfile.questsShipped}/{mockBuilderProfile.questsTotal} quests shipped
                  </p>
                </div>
              </div>
              <Link href={`/builder/${quest.builder}`}>
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View Profile →
                </Button>
              </Link>
            </div>

            {/* Stake info */}
            <div className="glass-card rounded-lg p-5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Pool Vault
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Builder Stake</span>
                  <span className="font-mono font-bold text-primary">
                    {stake.toFixed(1)} SOL
                  </span>
                </div>
                {quest.vault && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Success Commitments
                      </span>
                      <span className="font-mono text-emerald-brand">
                        {lamportsToSol(quest.vault.totalSuccessCommitments).toFixed(1)} SOL
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Failure Commitments
                      </span>
                      <span className="font-mono text-danger">
                        {lamportsToSol(quest.vault.totalFailureCommitments).toFixed(1)} SOL
                      </span>
                    </div>
                    <hr className="border-border/50" />
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-foreground">Total Pool</span>
                      <span className="font-mono font-bold text-foreground">
                        {totalPool.toFixed(1)} SOL
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="glass-card rounded-lg p-5 space-y-2">
              {isActive && (
                <>
                  <Button className="w-full text-primary-foreground">
                    Back This Builder
                  </Button>
                  <Button variant="outline" className="w-full">
                    Stake Against
                  </Button>
                </>
              )}
              {quest.status === "InProgress" && (
                <Link href={`/quest/${quest.publicKey}/submit-proof`}>
                  <Button variant="secondary" className="w-full mt-2">
                    Submit Proof
                  </Button>
                </Link>
              )}
              {isShipped && (
                <Button variant="default" className="w-full text-primary-foreground">
                  Claim Settlement
                </Button>
              )}

              {/* Share */}
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground"
                onClick={() => {
                  const text = `Check out "${quest.title}" on SHIPSTAKE — ${stake.toFixed(1)} SOL staked`;
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
                    "_blank"
                  );
                }}
              >
                Share on X →
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
