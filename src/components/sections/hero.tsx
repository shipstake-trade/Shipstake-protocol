"use client";

import { AuroraText } from "@/components/aurora-text";
import { Section } from "@/components/section";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { buttonVariants } from "@/components/ui/button";
import { NumberTicker } from "@/components/ui/number-ticker";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1];

function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <AnimatedGradientText>{siteConfig.hero.badge}</AnimatedGradientText>
    </motion.div>
  );
}

function HeroTitles() {
  return (
    <div className="flex w-full max-w-3xl flex-col overflow-hidden pt-8">
      <motion.h1
        className="text-left text-4xl font-semibold leading-tighter text-foreground sm:text-5xl md:text-6xl tracking-tighter"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, staggerChildren: 0.2 }}
      >
        <motion.span
          className="inline-block text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
        >
          <AuroraText
            className="leading-normal font-bold"
            colors={["#00C896", "#00FFB2", "#00C896", "#00FFB2", "#00C896"]}
          >
            {siteConfig.hero.title}
          </AuroraText>{" "}
          <span className="font-bold">{siteConfig.hero.titleHighlight}</span>
        </motion.span>
      </motion.h1>
      <motion.p
        className="text-left max-w-xl leading-normal text-muted-foreground sm:text-lg sm:leading-normal text-balance mt-4 whitespace-pre-line"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease }}
      >
        {siteConfig.hero.description}
      </motion.p>
    </div>
  );
}

function HeroCTA() {
  return (
    <motion.div
      className="flex flex-col items-start mt-8 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease }}
    >
      <div className="flex w-full max-w-2xl flex-col items-start justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link
          href="/quest/create"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "text-primary-foreground rounded-lg font-medium"
          )}
        >
          {siteConfig.hero.cta} →
        </Link>
        <Link
          href="/explore"
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "rounded-lg"
          )}
        >
          {siteConfig.hero.secondaryCta}
        </Link>
      </div>
      <p className="text-xs text-muted-foreground/70 font-mono">
        {siteConfig.hero.incentiveLine}
      </p>
    </motion.div>
  );
}

function HeroStats({ buildersCount }: { buildersCount?: number }) {
  const stats = siteConfig.stats.map((stat) =>
    stat.label === "builders" && buildersCount != null
      ? { ...stat, value: buildersCount }
      : stat
  );

  return (
    <motion.div
      className="mt-12 pb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0, duration: 0.8 }}
    >
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <NumberTicker
                value={stat.value}
                delay={0.2 * i}
                className="text-2xl font-bold font-mono text-foreground"
              />
              {stat.suffix && (
                <span className="text-2xl font-bold font-mono text-foreground">
                  {stat.suffix}
                </span>
              )}
            </div>
            <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground/50 italic mt-4">
        PROOF Score: the on-chain reputation stack you can&apos;t buy or fake.
      </p>
    </motion.div>
  );
}

export function Hero({ buildersCount }: { buildersCount?: number }) {
  return (
    <Section id="hero" flickerColor="#00C896" flickerOpacity={0.15}>
      <div className="relative grid grid-cols-1 gap-x-8 w-full p-6 lg:p-12 border-x overflow-hidden">
        <div className="flex flex-col justify-start items-start">
          <HeroBadge />
          <HeroTitles />
          <HeroCTA />
          <HeroStats buildersCount={buildersCount} />
        </div>
      </div>
    </Section>
  );
}
