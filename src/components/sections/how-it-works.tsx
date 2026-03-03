"use client";

import { Section } from "@/components/section";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig, BLUR_FADE_DELAY } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Section
      id="how-it-works"
      title="How It Works"
      subtitle="Three steps to accountability"
      description="Lock SOL. Build. Let the oracle decide."
      flickerColor="#00C896"
      flickerOpacity={0.08}
    >
      <div className="border-x border-b p-6 lg:p-12">
        <div className="grid grid-cols-1 gap-8 md:gap-6">
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
                  {/* Step number */}
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

        {/* Oracle formula accordion */}
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="mt-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="formula" className="border-border/50">
                <AccordionTrigger className="text-sm text-muted-foreground hover:text-foreground hover:no-underline">
                  How does the oracle compute PROOF Score?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 font-mono text-xs text-muted-foreground">
                    <p>
                      <span className="text-primary">PROOF</span> = base × 0.4 +
                      speed × 0.2 + stake_weight × 0.2 + streak × 0.2
                    </p>
                    <p>
                      base = (shipped / total) × 100
                    </p>
                    <p>
                      speed = max(0, (deadline - submitted) / deadline) × 20
                    </p>
                    <p>
                      stake_weight = log2(total_sol_staked + 1) × 5
                    </p>
                    <p>
                      streak = min(consecutive_ships × 2, 20)
                    </p>
                    <p className="pt-2 text-foreground/60">
                      Score ≥ 70 → SHIPPED | Score &lt; 70 → SLASHED
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </BlurFade>
      </div>
    </Section>
  );
}
