"use client";

import { Section } from "@/components/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/config";

const MOCK_STATS = [
  {
    emoji: "\u2705",
    label: "Shipped",
    value: "8",
    chipStyle: {
      background: "var(--bg-primary)",
      border: "1px solid var(--border-subtle)",
      color: "var(--foreground)",
    },
  },
  {
    emoji: "\uD83D\uDC80",
    label: "Missed",
    value: "1",
    chipStyle: {
      background: "var(--bg-primary)",
      border: "1px solid var(--danger-dim)",
      color: "var(--danger)",
    },
  },
  {
    emoji: "\uD83D\uDCC8",
    label: "Score",
    value: "847",
    chipStyle: {
      background: "var(--bg-primary)",
      border: "1px solid var(--accent-dim)",
      color: "var(--accent-primary)",
    },
  },
];

export function ProofScore() {
  return (
    <Section
      id="proof-score"
      flickerColor="#00FFA3"
      flickerOpacity={0.05}
    >
      <div className="border-x border-b p-6 lg:p-12">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
            {/* Section label */}
            <div>
              <p
                className="section-label"
                style={{ marginBottom: "12px" }}
              >
                Your Builder Reputation
              </p>
              <h2
                className="font-mono font-bold text-foreground leading-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                PROOF Score
              </h2>
              <p
                className="mt-3 text-base max-w-sm mx-auto"
                style={{ color: "var(--muted-foreground)" }}
              >
                The on-chain record every foundation, DAO, and lending protocol
                already checks.
              </p>
            </div>

            {/* Terminal stat chips */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {MOCK_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-4 py-2.5"
                  style={{
                    ...stat.chipStyle,
                    borderRadius: "4px",
                    fontFamily: "inherit",
                  }}
                >
                  <span className="text-base">{stat.emoji}</span>
                  <span
                    className="stat-mono text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {stat.label}:
                  </span>
                  <span
                    className="stat-mono text-base font-bold"
                    style={{ color: stat.chipStyle.color }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Body copy */}
            <div className="space-y-2 max-w-sm">
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                SOL staked = skin in the game. GitHub commits = proof of work.
              </p>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Every build compounds your score.{" "}
                <span className="text-foreground font-medium">
                  Every miss stays on-chain. Forever.
                </span>
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </Section>
  );
}
