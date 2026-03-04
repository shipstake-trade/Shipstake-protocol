"use client";

import { Section } from "@/components/section";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig, BLUR_FADE_DELAY } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export function TwoModes() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Section
      id="modes"
      title="Two modes"
      subtitle="Same protocol. Different stakes."
      description="Whether you're protecting a treasury or betting on yourself — the contract settles the same way. Proof or slash."
    >
      <div className="border-x border-b p-6 lg:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteConfig.modes.map((mode, i) => (
            <BlurFade key={mode.name} delay={BLUR_FADE_DELAY * (i + 1)}>
              <div
                className="relative glass-card rounded-lg p-6 h-full flex flex-col transition-all duration-300 hover:border-[var(--border-active)]"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === i && (
                  <BorderBeam duration={10} size={120} />
                )}

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

                <p className="text-sm text-primary font-medium mb-3">
                  {mode.description}
                </p>

                <div className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 space-y-3">
                  {mode.longDescription.split("\n\n").map((paragraph, pi) => (
                    <p key={pi}>{paragraph}</p>
                  ))}
                </div>

                <Link
                  href="/quest/create"
                  className={cn(
                    buttonVariants({ variant: "default", size: "sm" }),
                    "w-full text-primary-foreground rounded-lg font-medium mt-auto"
                  )}
                >
                  {mode.cta} →
                </Link>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </Section>
  );
}
