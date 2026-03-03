"use client";

import { ProofScoreRing } from "@/components/builder/proof-score-ring";
import type { BuilderProfile } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BuilderCardProps {
  profile: BuilderProfile;
  className?: string;
}

export function BuilderCard({ profile, className }: BuilderCardProps) {
  const shipRate =
    profile.questsTotal > 0
      ? Math.round((profile.questsShipped / profile.questsTotal) * 100)
      : 0;

  return (
    <Link href={`/builder/${profile.address}`}>
      <div
        className={cn(
          "glass-card glass-card-hover rounded-lg p-5 flex items-center gap-4 cursor-pointer transition-all duration-300",
          className
        )}
      >
        <ProofScoreRing score={profile.proofScore} size="md" />

        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-muted-foreground truncate mb-1">
            {profile.address}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>
              <span className="text-foreground font-medium">{shipRate}%</span>{" "}
              Ship Rate
            </span>
            <span>
              <span className="text-foreground font-medium">
                {profile.questsShipped}
              </span>
              /{profile.questsTotal} Quests
            </span>
            <span>
              <span className="text-primary font-medium font-mono">
                {profile.totalSolStaked.toFixed(1)}
              </span>{" "}
              SOL
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
