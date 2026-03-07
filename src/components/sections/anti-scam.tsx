"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/config";

export function AntiScam() {
  return (
    <section id="anti-scam">
      <div className="relative mx-auto container max-w-[var(--container-max-width)]">
        <div className="border-x border-b p-10 lg:p-16 text-center">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <p
              className="font-sans font-medium text-foreground leading-snug"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
            >
              The deposit is skin in the game. The GitHub proof is the security.
            </p>
            <p
              className="mt-3 font-sans text-muted-foreground leading-snug"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.35rem)" }}
            >
              Serial scammers can&rsquo;t hide here.{" "}
              <span className="text-foreground font-medium">
                One missed deadline. Forever on-chain.
              </span>
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
