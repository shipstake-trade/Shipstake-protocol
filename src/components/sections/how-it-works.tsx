"use client";

import { Section } from "@/components/section";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { siteConfig, BLUR_FADE_DELAY } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useState } from "react";

const INCENTIVES = [
  {
    title: "Streak Rewards",
    icon: "🔥",
    lines: [
      "Ship 3 in a row → 1% fee",
      "Ship 5 in a row → 0% fee",
    ],
    tagline: "The protocol rewards builders who actually build.",
  },
  {
    title: "Early Delivery Bonus",
    icon: "⚡",
    lines: [
      "Submit proof ≥48h before deadline",
      "→ earn a bonus from the fee vault",
    ],
    tagline: "Faster delivery = extra reward. Every time.",
  },
  {
    title: "PROOF Score",
    icon: "⬆️",
    lines: [
      "Every shipped quest adds to your score.",
      "Every slashed quest costs 15 points.",
      "Non-transferable. Non-fakeable.",
    ],
    tagline: "The only score that means something in web3.",
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

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
        {/* Step cards */}
        <div className="grid grid-cols-1 gap-4 md:gap-5 mb-10">
          {siteConfig.howItWorks.map((step, i) => (
            <BlurFade key={step.step} delay={BLUR_FADE_DELAY * (i + 1)}>
              <div
                className={cn(
                  "relative glass-card rounded-lg p-6 cursor-pointer transition-all duration-300",
                  activeStep === i
                    ? "border-[var(--border-active)] glow-emerald"
                    : "hover:border-[var(--border-active)]"
                )}
                onClick={() => setActiveStep(i)}
              >
                {activeStep === i && <BorderBeam duration={8} size={150} />}

                <div className="flex items-start gap-4">
                  <div className="step-number select-none">{step.step}</div>
                  <div className="relative z-10 pl-2 pt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                        {step.icon}
                      </div>
                      <h4 className="text-lg font-display font-bold text-foreground">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Incentive cards */}
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INCENTIVES.map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{card.icon}</span>
                  <h4 className="font-display font-bold text-foreground text-sm">
                    {card.title}
                  </h4>
                </div>
                <ul className="space-y-1 mb-3">
                  {card.lines.map((line) => (
                    <li key={line} className="text-sm text-muted-foreground">
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-emerald-400 font-medium italic">
                  &ldquo;{card.tagline}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </Section>
  );
}
