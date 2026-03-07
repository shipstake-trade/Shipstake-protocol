"use client";

import { Section } from "@/components/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/config";

const MOCK_STATS = [
  { emoji: "\u2705", label: "Shipped", value: "8" },
  { emoji: "\uD83D\uDC80", label: "Missed", value: "1" },
  { emoji: "\uD83D\uDCC8", label: "Score", value: "847" },
];

export function ProofScore() {
  return (
    <Section
      id="proof-score"
      flickerColor="#00C896"
      flickerOpacity={0.06}
    >
      <div className="border-x border-b p-6 lg:p-12">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
            {/* Label */}
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">
                On-chain reputation
              </p>
              <h2
                className="font-serif font-bold text-foreground leading-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                PROOF Score
              </h2>
              <p className="mt-3 text-muted-foreground text-base max-w-sm mx-auto">
                Like a credit score&nbsp;&mdash; but for builders. And it actually means something.
              </p>
            </div>

            {/* Stat pills */}
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {MOCK_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-border bg-[var(--bg-secondary)]"
                >
                  <span className="text-lg">{stat.emoji}</span>
                  <span className="font-mono text-sm text-muted-foreground">{stat.label}:</span>
                  <span className="font-mono text-lg font-bold text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Threat line */}
            <p className="text-sm text-muted-foreground/70 max-w-sm">
              One bad delivery follows you forever.{" "}
              <span className="text-foreground font-medium">
                Every future grant committee sees it.
              </span>
            </p>
          </div>
        </BlurFade>
      </div>
    </Section>
  );
}
