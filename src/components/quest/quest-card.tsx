"use client";

import { StatusBadge } from "@/components/quest/status-badge";
import { ProofTypeBadge } from "@/components/quest/proof-type-badge";
import { BorderBeam } from "@/components/ui/border-beam";
import type { MockQuest } from "@/lib/mock-data";
import { lamportsToSol } from "@/lib/solana/shipstake";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

interface QuestCardProps {
  quest: MockQuest;
  showBuilder?: boolean;
}

function formatDeadline(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = timestamp - now;

  if (diff <= 0) return "Expired";

  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);

  if (days > 0) return `${days}d ${hours}h left`;
  return `${hours}h left`;
}

function proofScoreColor(score: number): string {
  if (score >= 91) return "text-yellow-400";
  if (score >= 76) return "text-orange-400";
  if (score >= 51) return "text-purple-400";
  if (score >= 26) return "text-blue-400";
  return "text-slate-400";
}

function MiniScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-12 h-1 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function QuestCard({ quest, showBuilder = true }: QuestCardProps) {
  const [hovered, setHovered] = useState(false);
  const stake = lamportsToSol(quest.stakeAmount);
  const isSettled = quest.status === "Shipped" || quest.status === "Slashed";

  return (
    <Link href={`/quest/${quest.publicKey}`}>
      <div
        className={cn(
          "relative glass-card rounded-lg p-5 h-full flex flex-col transition-all duration-300 cursor-pointer",
          "hover:border-[var(--border-active)]"
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered && <BorderBeam duration={8} size={100} />}

        {/* Top: Category + Mode + Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
              {quest.category}
            </span>
            {quest.mode === "GrantGuard" && (
              <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">
                Grant Guard
              </span>
            )}
          </div>
          <StatusBadge status={quest.status} />
        </div>

        {/* Title */}
        <h3 className="text-base font-display font-bold text-foreground mb-2 line-clamp-2">
          {quest.title}
        </h3>

        {/* Builder address + PROOF Score */}
        {showBuilder && (
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <p className="text-xs font-mono text-muted-foreground">
              {quest.builder}
            </p>
            <span className="text-muted-foreground/30">·</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-mono">PROOF</span>
              <span className={cn("text-xs font-mono font-bold", proofScoreColor(quest.builderProofScore))}>
                {quest.builderProofScore}
              </span>
              <MiniScoreBar score={quest.builderProofScore} />
            </div>
            {quest.builderStreak > 0 && (
              <span className="text-[10px] font-mono text-amber-400">
                🔥{quest.builderStreak}
              </span>
            )}
          </div>
        )}

        {/* Settled outcome line */}
        {isSettled && quest.resolvedAt && (
          <p className={cn(
            "text-[10px] font-mono mb-2",
            quest.status === "Shipped" ? "text-emerald-400" : "text-destructive"
          )}>
            {quest.status === "Shipped"
              ? `SHIPPED ${new Date(quest.resolvedAt * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · Score +${Math.floor(quest.builderProofScore * 0.1) + 2} pts`
              : `SLASHED ${new Date(quest.resolvedAt * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · Score −15`
            }
          </p>
        )}

        {/* Bottom: Stake, Deadline, Proof Type */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
          <span className="text-sm font-mono font-bold text-primary">
            {stake.toFixed(1)} SOL
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDeadline(quest.deadline)}
          </span>
          {quest.proofType && <ProofTypeBadge type={quest.proofType} />}
        </div>
      </div>
    </Link>
  );
}
