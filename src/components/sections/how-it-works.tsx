"use client";

import { Section } from "@/components/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/config";

const STEPS = [
  {
    n: "01",
    emoji: "\uD83C\uDFAF",
    title: "Define the build",
    sentence: "What ships. When it ships.",
    danger: false,
  },
  {
    n: "02",
    emoji: "\uD83D\uDD12",
    title: "Lock SOL",
    sentence: "Skin in the game, on-chain.",
    danger: false,
  },
  {
    n: "03",
    emoji: "\u26A1",
    title: "Push the proof",
    sentence: "GitHub commits before the clock hits zero.",
    danger: false,
  },
  {
    n: "04",
    emoji: "\uD83D\uDC80",
    title: "Collect or get slashed",
    sentence:
      "Delivered \u2192 deposit back + PROOF pumps. Missed \u2192 slashed, forever on-chain.",
    danger: true,
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      title="How it works"
      subtitle="Four steps. On-chain. Instant."
      flickerColor="#00FFA3"
      flickerOpacity={0.06}
    >
      <div className="border-x border-b p-6 lg:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <BlurFade key={step.n} delay={BLUR_FADE_DELAY * (i + 1)}>
              <div
                className={`flex flex-col gap-4 p-5 border h-full transition-colors duration-150 ${
                  step.danger ? "step-card-danger" : "glass-card-hover"
                }`}
                style={{
                  borderRadius: "6px",
                  background: "var(--bg-secondary)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="font-mono"
                    style={{ fontSize: "11px", color: "var(--text-muted)" }}
                  >
                    {step.n}
                  </span>
                  <span className="text-xl">{step.emoji}</span>
                </div>
                <div>
                  <h4
                    className="font-mono font-bold text-foreground mb-1"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {step.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    {step.sentence}
                  </p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </Section>
  );
}
