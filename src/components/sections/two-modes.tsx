"use client";

import { Section } from "@/components/section";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig, BLUR_FADE_DELAY } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

// MVP: Single mode — Self-Stake only. Grant Guard commented out.
export function TwoModes() {
  const [hovered, setHovered] = useState(false);
  const mode = siteConfig.modes[0]; // Self-Stake

  return (
    <Section
      id="modes"
      title="How Self-Stake Works"
      subtitle="Your SOL. Your deadline. Your proof."
      description="Lock SOL before you start building. Ship the proof. Get it back. Miss the deadline. Lose it."
    >
      <div className="border-x border-b p-6 lg:p-12">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div
            className="relative glass-card rounded-lg p-6 max-w-xl flex flex-col transition-all duration-300 hover:border-[var(--border-active)]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {hovered && <BorderBeam duration={10} size={120} />}

            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                {mode.icon}
              </div>
              <div>
                <h4 className="text-lg font-display font-bold text-foreground">
                  {mode.name}
                </h4>
                <span className="text-xs font-mono text-muted-foreground uppercase">
                  {mode.tag}
                </span>
              </div>
            </div>

            <div className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 space-y-3">
              {mode.longDescription.split("\n\n").map((paragraph, pi) => (
                <p key={pi}>{paragraph}</p>
              ))}
            </div>

            <Link
              href="/quest/create"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "w-fit text-primary-foreground rounded-lg font-medium mt-auto"
              )}
            >
              {mode.cta} →
            </Link>
          </div>
        </BlurFade>
      </div>
    </Section>
  );
}
