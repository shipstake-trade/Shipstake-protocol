"use client";

import { Section } from "@/components/section";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { siteConfig, BLUR_FADE_DELAY } from "@/lib/config";

export function ProofScore() {
  const { proofScore } = siteConfig;

  return (
    <Section
      id="proof-score"
      title={proofScore.title}
      subtitle={proofScore.subtitle}
      description={proofScore.description}
      flickerColor="#00C896"
      flickerOpacity={0.06}
    >
      <div className="border-x border-b p-6 lg:p-12">
        {/* Formula components grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {proofScore.components.map((component, i) => (
            <BlurFade
              key={component.name}
              delay={BLUR_FADE_DELAY * (i + 1)}
            >
              <div className="glass-card rounded-lg p-5 glass-card-hover transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
                    {component.icon}
                  </div>
                  <h4 className="text-sm font-display font-bold text-foreground">
                    {component.label}
                  </h4>
                  <span className="ml-auto text-xs font-mono text-muted-foreground">
                    {component.weight}
                  </span>
                </div>
                <code className="block text-xs font-mono text-primary/80 mb-2">
                  {component.formula}
                </code>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {component.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Mock profile display */}
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <div className="glass-card rounded-lg p-6 text-center mb-6">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
              Example PROOF Score
            </div>
            <div className="text-5xl font-mono font-bold text-primary mb-1">
              82
            </div>
            <div className="text-xs text-muted-foreground">
              13 shipped / 15 total · 5-quest streak · 47.5 SOL staked
            </div>
          </div>
        </BlurFade>

        {/* Tags */}
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {proofScore.tags.map((tag) => (
              <AnimatedGradientText key={tag} className="text-xs">
                {tag}
              </AnimatedGradientText>
            ))}
          </div>
        </BlurFade>
      </div>
    </Section>
  );
}
