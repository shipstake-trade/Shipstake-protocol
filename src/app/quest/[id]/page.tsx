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
import { calcSelfStakeFee, calcGrantGuardFee } from "@/lib/utils";
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
  const stakeSol = lamportsToSol(quest.stakeAmount);
  const grantTrancheSol =
    quest.grantTranche !== null ? lamportsToSol(quest.grantTranche) : null;

  const isActive = quest.status === "Open" || quest.status === "InProgress";
  const isShipped = quest.status === "Shipped";
  const isSlashed = quest.status === "Slashed";

  // Fee calculation for display (use builder's streak for tiered discount)
  const feeInfo =
    quest.mode === "GrantGuard" && grantTrancheSol !== null
      ? calcGrantGuardFee(stakeSol, grantTrancheSol)
      : calcSelfStakeFee(stakeSol, quest.builderStreak);

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-[var(--container-max-width)] px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-xs text-muted-foreground mb-6">
          <Link
            href="/explore"
            className="hover:text-foreground transition-colors"
          >
            Explore
          </Link>
          <span className="mx-2">/</span>
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
                {quest.mode === "GrantGuard" && (
                  <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                    Grant Guard
                  </span>
                )}
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
                Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Quest created · stake locked</p>
                    <p className="text-xs text-muted-foreground">
                      {stakeSol.toFixed(1)} SOL locked
                    </p>
                  </div>
                </div>
                {quest.proofUrl && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Proof submitted</p>
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
                        {isShipped ? "SHIPPED · stake returned" : "SLASHED · stake burned"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isShipped
                          ? `Oracle verified — ${feeInfo.builderReceives.toFixed(4)} SOL returned`
                          : "Deadline missed — stake forfeited"}
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
                <ProofScoreRing
                  score={mockBuilderProfile.proofScore}
                  size="sm"
                />
                <div>
                  <WalletAddress
                    address={quest.builder}
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {mockBuilderProfile.questsShipped}/
                    {mockBuilderProfile.questsTotal} shipped
                  </p>
                </div>
              </div>
              <Link href={`/builder/${quest.builder}`}>
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View profile
                </Button>
              </Link>
            </div>

            {/* Pool Vault */}
            <div className="glass-card rounded-lg p-5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                POOL VAULT
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Builder stake</span>
                  <span className="font-mono font-bold text-primary">
                    {stakeSol.toFixed(3)} SOL
                  </span>
                </div>
                {grantTrancheSol !== null && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Grant tranche</span>
                    <span className="font-mono font-bold text-primary">
                      {grantTrancheSol.toFixed(3)} SOL
                    </span>
                  </div>
                )}
                <hr className="border-border/50" />
                {isShipped && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Builder receives
                      </span>
                      <span className="font-mono text-emerald-brand">
                        {feeInfo.builderReceives.toFixed(4)} SOL
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Protocol fee ({feeInfo.bps / 100}%)
                      </span>
                      <span className="font-mono text-amber-400">
                        {feeInfo.fee.toFixed(4)} SOL
                      </span>
                    </div>
                  </div>
                )}
                {isSlashed && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Builder receives
                      </span>
                      <span className="font-mono text-danger">0 SOL</span>
                    </div>
                    {quest.mode === "GrantGuard" ? (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Stake
                          </span>
                          <span className="font-mono text-xs text-danger">
                            Foundation escrow
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Tranche
                          </span>
                          <span className="font-mono text-xs text-danger">
                            Returned to foundation
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Slash destination
                        </span>
                        <span className="font-mono text-xs text-danger">
                          {quest.slashDestination}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Protocol fee
                      </span>
                      <span className="font-mono">0 SOL</span>
                    </div>
                  </div>
                )}
                {isActive && (
                  <p className="text-[10px] text-muted-foreground">
                    Locked until oracle settlement. Fee charged only on SHIPPED.
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="glass-card rounded-lg p-5 space-y-2">
              {quest.status === "Open" && (
                <Link href={`/quest/${quest.publicKey}/submit-proof`}>
                  <Button className="w-full text-primary-foreground">
                    Submit proof
                  </Button>
                </Link>
              )}
              {quest.status === "InProgress" && (
                <Button
                  variant="secondary"
                  className="w-full"
                  disabled
                >
                  Oracle is checking your proof.
                </Button>
              )}
              {isShipped && (
                <Button
                  variant="default"
                  className="w-full text-primary-foreground"
                >
                  Claim your SOL
                </Button>
              )}

              {/* Share */}
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground"
                onClick={() => {
                  const text = `"${quest.title}" on SHIPSTAKE — ${stakeSol.toFixed(1)} SOL locked`;
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
                    "_blank"
                  );
                }}
              >
                Share on X
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
