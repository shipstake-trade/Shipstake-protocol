"use client";

import { Section } from "@/components/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/config";

const STEPS = [
  {
    step: 1,
    title: "Put SOL on the line",
    description: "Pick a deadline. Deposit SOL into the smart contract. That SOL is frozen until the deadline passes. A security deposit on your own promise.",
  },
  {
    step: 2,
    title: "Build against the clock",
    description: "Your commitment is public and on-chain. Anyone can see it. The deadline doesn't move. The oracle doesn't care why you're behind.",
  },
  {
    step: 3,
    title: "Submit a link",
    description: "Paste a GitHub commit URL or a Vercel deploy link before the deadline. The oracle calls the API and checks if the proof is real.",
  },
  {
    step: 4,
    title: "Shipped or slashed",
    description:
      "Proof validates → your SOL comes back minus a small fee. Proof fails or deadline passes → your SOL is gone. PROOF Score updates either way. No appeals. Final.",
  },
];

const INCENTIVES = [
  {
    title: "Streak Rewards",
    lines: ["Streak ≥3 → reduced fee", "Streak ≥5 → zero fee"],
    tagline: "Consistency pays. Literally.",
  },
  {
    title: "Early Bonus",
    lines: ["Ship before the deadline", "Earn from the fee vault"],
    tagline: "The faster you deliver, the more you keep.",
  },
  {
    title: "Your Score",
    lines: [
      "Every settlement writes to your PROOF Score.",
      "0–100. On-chain. Permanent.",
    ],
    tagline: "Earned one delivery at a time.",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      title="How it works"
      subtitle="Four steps. No middlemen. No appeals."
      description="Lock SOL. Build. Submit proof. The contract settles the rest."
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
