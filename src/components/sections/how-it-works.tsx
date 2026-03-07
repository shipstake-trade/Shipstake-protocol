"use client";

import { Section } from "@/components/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/config";

const STEPS = [
  {
    n: "01",
    emoji: "\uD83C\uDFAF",
    title: "Set a commitment",
    sentence: "Pick a deadline. Describe what you'll ship.",
  },
  {
    n: "02",
    emoji: "\uD83D\uDD12",
    title: "Lock your deposit",
    sentence: "Put SOL behind your words.",
  },
  {
    n: "03",
    emoji: "\u26A1",
    title: "Ship the proof",
    sentence: "Push to GitHub before the clock hits zero.",
  },
  {
    n: "04",
    emoji: "\uD83C\uDFC6",
    title: "Get paid or get wrecked",
    sentence: "Delivered \u2192 deposit back + PROOF Score up. Missed \u2192 slashed.",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      title="How it works"
      subtitle="Four steps. No middlemen. No appeals."
      flickerColor="#00C896"
      flickerOpacity={0.08}
    >
      <div className="border-x border-b p-6 lg:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <BlurFade key={step.n} delay={BLUR_FADE_DELAY * (i + 1)}>
              <div className="flex flex-col gap-4 p-5 border border-border/40 rounded-lg bg-[var(--bg-secondary)] h-full">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl font-bold text-primary/20 leading-none">
                    {step.n}
                  </span>
                  <span className="text-2xl">{step.emoji}</span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground mb-1 text-base">
                    {step.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
