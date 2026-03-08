"use client";

import { StatusBadge } from "@/components/quest/status-badge";
import { BorderBeam } from "@/components/ui/border-beam";
import type { ApiQuest } from "@/lib/types";
import { parseStatus } from "@/lib/types";
import { lamportsToSol } from "@/lib/solana/shipstake";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface QuestCardProps {
  quest: ApiQuest;
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

function truncate(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function QuestCard({ quest, showBuilder = true }: QuestCardProps) {
  const [hovered, setHovered] = useState(false);
  const stake = lamportsToSol(quest.stake_amount);
  const status = parseStatus(quest.status);
  const isSettled = status === "Shipped" || status === "Slashed";

  return (
    <Link to="/quest/$id" params={{ id: quest.pubkey }}>
      <div
        className={cn(
          "relative glass-card rounded-lg p-5 h-full flex flex-col transition-all duration-300 cursor-pointer",
          "hover:border-[var(--border-active)]"
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered && <BorderBeam duration={8} size={100} />}

        {/* Status */}
        <div className="flex items-center justify-between mb-3">
          {quest.repo_owner && quest.repo_name ? (
            <span className="text-[10px] font-mono text-muted-foreground tracking-wider truncate max-w-[140px]">
              {quest.repo_owner}/{quest.repo_name}
            </span>
          ) : (
            <span />
          )}
          <StatusBadge status={status} />
        </div>

        {/* Title */}
        <h3 className="text-base font-display font-bold text-foreground mb-2 line-clamp-2">
          {quest.title}
        </h3>

        {/* Builder address */}
        {showBuilder && (
          <p className="text-xs font-mono text-muted-foreground mb-3">
            {truncate(quest.builder)}
          </p>
        )}

        {/* Settled indicator */}
        {isSettled && (
          <p className={cn(
            "text-[10px] font-mono mb-2",
            status === "Shipped" ? "text-emerald-400" : "text-destructive"
          )}>
            {status === "Shipped" ? "✓ SHIPPED" : "✗ SLASHED"}
          </p>
        )}

        {/* Bottom: Stake + Deadline */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
          <span className="text-sm font-mono font-bold text-primary">
            {stake.toFixed(1)} SOL
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDeadline(quest.deadline)}
          </span>
        </div>
      </div>
    </Link>
  );
}
