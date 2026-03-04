"use client";

import { Section } from "@/components/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { siteConfig, BLUR_FADE_DELAY } from "@/lib/config";

const INCENTIVES = [
  {
    title: "Streak Rewards",
    lines: ["Ship 3 in a row → 1% fee", "Ship 5 in a row → 0% fee"],
    tagline: "The protocol rewards builders who actually build.",
  },
  {
    title: "Early Delivery",
    lines: ["Submit ≥48h before deadline", "→ earn bonus from fee vault"],
    tagline: "Faster delivery = extra reward. Every time.",
  },
  {
    title: "PROOF Score",
    lines: [
      "Every shipped quest adds to your score.",
      "Every slashed quest costs 15 points.",
    ],
    tagline: "Non-transferable. Non-fakeable. Permanent.",
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
              {siteConfig.howItWorks.map((step, i) => (
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
