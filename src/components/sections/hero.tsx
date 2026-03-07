"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0c" }}
    >
      {/* Animated dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #00C896 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.08,
          animation: "dot-pulse 4s ease-in-out infinite",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,200,150,0.07) 0%, transparent 70%)",
        }}
      />

      <style>{`
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.12; }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-[90vw]">
        <h1
          className="font-serif font-bold leading-[1.05] tracking-tight text-foreground"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 7rem)",
            maxWidth: "70vw",
          }}
        >
          Put your money where your roadmap is.
        </h1>

        <p
          className="mt-6 text-muted-foreground font-sans"
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}
        >
          Lock funds. Ship proof. Get paid&nbsp;&mdash; or get wrecked.
        </p>

        <Link
          to="/quest/create"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "mt-10 rounded-lg font-medium text-primary-foreground px-8 py-4 text-base",
          )}
        >
          Start a commitment &rarr;
        </Link>
      </div>
    </section>
  );
}
