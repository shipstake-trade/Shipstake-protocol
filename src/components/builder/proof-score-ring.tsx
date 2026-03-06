"use client";

import { cn } from "@/lib/utils";

// MVP: Rank system, streak badges, fee badges, and rank progress removed.
// Props retained for backward compat but ignored.
interface ProofScoreRingProps {
  score: number;
  streak?: number;       // unused in MVP
  showProgress?: boolean; // unused in MVP
  showNextRank?: boolean; // unused in MVP
  size?: "sm" | "md" | "lg";
  className?: string;
  tier?: string;          // unused in MVP
  activePerk?: string | null; // unused in MVP
}

const sizeConfig = {
  sm: { dim: 48, stroke: 3, fontSize: "text-xs" },
  md: { dim: 72, stroke: 4, fontSize: "text-lg" },
  lg: { dim: 120, stroke: 5, fontSize: "text-3xl" },
};

const RING_COLOR = "#00C896"; // emerald-brand — fixed, no rank tiers

export function ProofScoreRing({
  score,
  size = "md",
  className,
}: ProofScoreRingProps) {
  const config = sizeConfig[size];
  const radius = (config.dim - config.stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, score));
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className="relative inline-flex items-center justify-center"
        style={{ width: config.dim, height: config.dim }}
      >
        <svg
          width={config.dim}
          height={config.dim}
          viewBox={`0 0 ${config.dim} ${config.dim}`}
          className="transform -rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={config.dim / 2}
            cy={config.dim / 2}
            r={radius}
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth={config.stroke}
          />
          {/* Progress ring */}
          <circle
            cx={config.dim / 2}
            cy={config.dim / 2}
            r={radius}
            fill="none"
            stroke={RING_COLOR}
            strokeWidth={config.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Score */}
        <span className={cn("absolute font-mono font-bold text-primary", config.fontSize)}>
          {score}
        </span>
      </div>
    </div>
  );
}
