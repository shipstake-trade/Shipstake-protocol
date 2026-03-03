"use client";

import { StatusBadge } from "@/components/quest/status-badge";
import { ProofTypeBadge } from "@/components/quest/proof-type-badge";
import { BorderBeam } from "@/components/ui/border-beam";
import type { QuestAccount, PoolVault } from "@/lib/solana/idl";
import { lamportsToSol } from "@/lib/solana/shipstake";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

interface QuestCardProps {
  quest: QuestAccount & { publicKey: string; vault?: PoolVault };
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

export function QuestCard({ quest, showBuilder = true }: QuestCardProps) {
  const [hovered, setHovered] = useState(false);
  const stake = quest.vault
    ? lamportsToSol(quest.vault.builderStake)
    : 0;

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

        {/* Top: Category + Status */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
            {quest.category}
          </span>
          <StatusBadge status={quest.status} />
        </div>

        {/* Title */}
        <h3 className="text-base font-display font-bold text-foreground mb-2 line-clamp-2">
          {quest.title}
        </h3>

        {/* Builder address */}
        {showBuilder && (
          <p className="text-xs font-mono text-muted-foreground mb-3">
            {quest.builder}
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
