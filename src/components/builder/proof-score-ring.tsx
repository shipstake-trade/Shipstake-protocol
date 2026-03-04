"use client";

import { cn } from "@/lib/utils";

interface ProofScoreRingProps {
  score: number;
  streak?: number;
  /** Alias for showNextRank — show progress bar toward next tier */
  showProgress?: boolean;
  /** Keep for backward compat */
  showNextRank?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Optional tier label override; computed from score if omitted */
  tier?: string;
  /** Optional fee perk badge override; computed from streak if omitted */
  activePerk?: string | null;
}

const sizeConfig = {
  sm: { dim: 48, stroke: 3, fontSize: "text-xs", rankSize: "text-[8px]" },
  md: { dim: 72, stroke: 4, fontSize: "text-lg", rankSize: "text-[9px]" },
  lg: { dim: 120, stroke: 5, fontSize: "text-3xl", rankSize: "text-xs" },
};

function getRank(score: number): { label: string; color: string; textClass: string } {
  if (score >= 91) return { label: "Mythic", color: "#F59E0B", textClass: "text-yellow-400" };
  if (score >= 76) return { label: "Legend", color: "#F97316", textClass: "text-orange-400" };
  if (score >= 51) return { label: "Veteran", color: "#A855F7", textClass: "text-purple-400" };
  if (score >= 26) return { label: "Adept", color: "#60A5FA", textClass: "text-blue-400" };
  return { label: "Novice", color: "#94A3B8", textClass: "text-slate-400" };
}

function getNextRank(score: number): { label: string; threshold: number; prevThreshold: number } | null {
  if (score < 26) return { label: "Adept", threshold: 26, prevThreshold: 0 };
  if (score < 51) return { label: "Veteran", threshold: 51, prevThreshold: 26 };
  if (score < 76) return { label: "Legend", threshold: 76, prevThreshold: 51 };
  if (score < 91) return { label: "Mythic", threshold: 91, prevThreshold: 76 };
  return null;
}

function getFeeLabel(streak: number): string | null {
  if (streak >= 5) return "0% fee";
  if (streak >= 3) return "1% fee";
  return null;
}

export function ProofScoreRing({
  score,
  streak = 0,
  showNextRank = false,
  showProgress = false,
  size = "md",
  className,
  tier: tierOverride,
  activePerk: activePerkOverride,
}: ProofScoreRingProps) {
  const config = sizeConfig[size];
  const radius = (config.dim - config.stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, score));
  const offset = circumference - (progress / 100) * circumference;
  const rank = getRank(score);
  const nextRank = getNextRank(score);
  const feeLabel = getFeeLabel(streak);

  const effectiveShowProgress = showProgress || showNextRank;
  const effectiveTierLabel = tierOverride ?? rank.label;
  const effectivePerk = activePerkOverride !== undefined ? activePerkOverride : feeLabel;

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
          {/* Progress ring — rank-colored */}
          <circle
            cx={config.dim / 2}
            cy={config.dim / 2}
            r={radius}
            fill="none"
            stroke={rank.color}
            strokeWidth={config.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Score */}
        <span
          className={cn(
            "absolute font-mono font-bold",
            config.fontSize,
            rank.textClass
          )}
        >
          {score}
        </span>

        {/* Streak badge — top right */}
        {streak > 0 && size !== "sm" && (
          <span className="absolute -top-1 -right-1 text-[10px] bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-full px-1.5 py-0.5 font-mono leading-none">
            🔥{streak}
          </span>
        )}

        {/* Fee / perk badge — bottom */}
        {effectivePerk && size === "lg" && (
          <span className="absolute -bottom-1 text-[9px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full px-1.5 py-0.5 font-mono leading-none">
            {effectivePerk}
          </span>
        )}
      </div>

      {/* Rank label */}
      {size !== "sm" && (
        <span className={cn("font-mono font-bold uppercase tracking-wider", config.rankSize, rank.textClass)}>
          {effectiveTierLabel}
        </span>
      )}

      {/* Next rank progress */}
      {effectiveShowProgress && nextRank && size === "lg" && (
        <div className="w-full mt-1">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>{rank.label}</span>
            <span>{nextRank.label} at {nextRank.threshold}</span>
          </div>
          <div className="h-1 rounded-full bg-border overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${((score - nextRank.prevThreshold) / (nextRank.threshold - nextRank.prevThreshold)) * 100}%`,
                backgroundColor: rank.color,
              }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1 text-right">
            {nextRank.threshold - score} pts to {nextRank.label}
          </p>
        </div>
      )}
    </div>
  );
}
