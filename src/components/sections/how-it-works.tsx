"use client";

import { Section } from "@/components/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/config";

const STEPS = [
  {
    step: 1,
    title: "Lock SOL as collateral",
    description: "Public. Immutable. On-chain from the moment you create.",
  },
  {
    step: 2,
    title: "Build",
    description: "No one's watching. The deadline is.",
  },
  {
    step: 3,
    title: "Submit proof",
    description: "One URL. One chance. Before the clock hits zero.",
  },
  {
    step: 4,
    title: "The protocol decides",
    description:
      "Delivered → get your SOL back, score goes up. Missed → lose your stake, score drops. No appeals. No humans. No exceptions.",
  },
];

const INCENTIVES = [
  {
    title: "Streak Rewards",
    lines: ["3 in a row → reduced fee", "5 in a row → zero fee"],
    tagline: "The protocol rewards consistency.",
  },
  {
    title: "Early Bonus",
    lines: ["Submit before the deadline by 48h", "→ earn from the protocol's reward pool."],
    tagline: "Speed pays.",
  },
  {
    title: "Your Score",
    lines: [
      "Every quest shapes your permanent on-chain record.",
      "Non-transferable. Non-fakeable.",
    ],
    tagline: "Earned one delivery at a time.",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      title="How it works"
      subtitle="Four steps. No trust required."
      description="Lock SOL as collateral. Build. Oracle settles it."
      flickerColor="#00C896"
      flickerOpacity={0.08}
    >
      <div className="border-x border-b p-6 lg:p-12">

        {/* Timeline — horizontal on desktop */}
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="relative mb-12">
            {/* Connector line */}
            <div className="hidden md:block absolute top-[19px] left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-border/60" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {STEPS.map((step, i) => (
                <BlurFade key={step.step} delay={BLUR_FADE_DELAY * (i + 1)}>
                  <div className="flex flex-col items-start md:items-center md:text-center gap-4">
                    {/* Number badge */}
                    <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border border-border bg-[var(--bg-secondary)] text-xs font-mono font-bold text-primary shrink-0">
                      {String(step.step).padStart(2, "0")}
                    </div>
                    {/* Content */}
                    <div>
                      <h4 className="font-display font-bold text-foreground mb-2 text-base">
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Incentive strip */}
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/40 border border-border/40 rounded-lg overflow-hidden">
            {INCENTIVES.map((card) => (
              <div key={card.title} className="p-5 bg-[var(--bg-secondary)]">
                <h4 className="text-xs font-mono font-bold text-primary uppercase tracking-widest mb-3">
                  {card.title}
                </h4>
                <ul className="space-y-1 mb-3">
                  {card.lines.map((line) => (
                    <li key={line} className="text-sm text-muted-foreground">
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground/50 italic">
                  {card.tagline}
                </p>
              </div>
            ))}
          </div>
        </BlurFade>

      </div>
    </Section>
  );
}
