"use client";

import { Section } from "@/components/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/config";

const STEPS = [
  {
    step: 1,
    title: "Set a commitment",
    description: "Pick a deadline. Define what you're shipping. Your commitment is public and permanent on the blockchain from the moment you lock in.",
  },
  {
    step: 2,
    title: "Lock your deposit",
    description: "Deposit SOL into the smart contract. That SOL is frozen until the deadline passes. No extensions. No exceptions.",
  },
  {
    step: 3,
    title: "Ship the proof (GitHub commit or Vercel deployment)",
    description: "Paste a GitHub commit URL or a Vercel deploy link before the deadline. The automatic validator calls the API and checks if the proof is real.",
  },
  {
    step: 4,
    title: "Get paid or get penalized — automatically",
    description:
      "Proof validates → your SOL comes back minus a 2% fee. Proof fails or deadline passes → your SOL is gone. No appeals. Final.",
  },
];

// MVP: Streak Rewards, Early Bonus removed. Keeping only the core Your Score card.
const INCENTIVES = [
  {
    title: "Your PROOF Score",
    lines: [
      "Every settlement writes to your PROOF Score.",
      "Commitments shipped. Permanent. On the blockchain.",
    ],
    tagline: "Earned one delivery at a time.",
  },
];

/* Removed for MVP — re-enable in future sprint:
const REMOVED_INCENTIVES = [
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
];
*/

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

        {/* Self-Stake callout — centré */}
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <div className="flex justify-center">
            {INCENTIVES.map((card) => (
              <div
                key={card.title}
                className="w-full max-w-sm border border-border/40 rounded-lg overflow-hidden bg-[var(--bg-secondary)] p-5 text-center"
              >
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
