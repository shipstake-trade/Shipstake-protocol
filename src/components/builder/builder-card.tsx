"use client";

import { ProofScoreRing } from "@/components/builder/proof-score-ring";
import type { ApiProfile } from "@/lib/types";
import { shipRate } from "@/lib/types";
import { lamportsToSol } from "@/lib/solana/shipstake";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface BuilderCardProps {
  profile: ApiProfile;
  className?: string;
}

export function BuilderCard({ profile, className }: BuilderCardProps) {
  const rate = shipRate(profile.quests_shipped, profile.quests_total);
  const stakedSol = lamportsToSol(profile.total_staked_lifetime);

  return (
    <Link to="/builder/$address" params={{ address: profile.address }}>
      <div
        className={cn(
          "glass-card glass-card-hover rounded-lg p-5 flex items-center gap-4 cursor-pointer transition-all duration-300",
          className
        )}
      >
        <ProofScoreRing score={rate} size="md" />

        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-muted-foreground truncate mb-1">
            {profile.address}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>
              <span className="text-foreground font-medium">{rate}%</span>{" "}
              Ship Rate
            </span>
            <span>
              <span className="text-foreground font-medium">
                {profile.quests_shipped}
              </span>
              /{profile.quests_total} Quests
            </span>
            <span>
              <span className="text-primary font-medium font-mono">
                {stakedSol.toFixed(1)}
              </span>{" "}
              SOL
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
