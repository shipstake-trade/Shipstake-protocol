"use client";

import { Section } from "@/components/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/config";

const POINTS = [
  {
    label: "Deposit = signal of intent",
    description: "The deposit is skin in the game, not a security deposit. The proof is the security.",
  },
  {
    label: "GitHub proof = real verification",
    description: "One-time scammers exist everywhere. Serial scammers can't hide here.",
  },
  {
    label: "PROOF Score = permanent consequence",
    description: "One bad delivery follows you forever. Every future grant committee sees it.",
  },
];

export function AntiScam() {
  return (
    <Section
      id="anti-scam"
      title="How does it actually prevent scams?"
      subtitle="Three layers. No exceptions."
      flickerColor="#00C896"
      flickerOpacity={0.06}
    >
      <div className="border-x border-b p-6 lg:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {POINTS.map((point, i) => (
            <BlurFade key={point.label} delay={BLUR_FADE_DELAY * (i + 1)}>
              <div className="glass-card rounded-lg p-5 h-full">
                <p className="text-xs font-mono font-bold text-primary uppercase tracking-widest mb-2">
                  → {point.label}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </Section>
  );
}
