"use client";

import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section
      id="hero"
      className="hero flex min-h-screen flex-col items-center justify-center"
    >
      {/* Rain — pure CSS, zero JS */}
      <div className="rain-container" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="rain-drop" style={{
            left: `${(i * 4.17) % 100}%`,
            animationDelay: `${(i * 0.37) % 3}s`,
            animationDuration: `${1.5 + (i * 0.13) % 2}s`,
            opacity: 0.15 + (i * 0.01) % 0.25,
          }} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-[90vw]">
        <h1
          className="hero-h1 font-mono font-bold leading-[1.1] tracking-tight"
          style={{
            color: "var(--foreground)",
            maxWidth: "800px",
          }}
        >
          Ship. Stake. Collect.
          <span
            className="cursor-blink inline-block ml-1 w-[3px] relative"
            style={{
              display: "inline-block",
              width: "3px",
              height: "0.85em",
              background: "var(--accent-primary)",
              verticalAlign: "middle",
              marginLeft: "6px",
              borderRadius: "1px",
            }}
            aria-hidden="true"
          />
        </h1>

        <p
          className="mt-6 font-sans"
          style={{
            fontSize: "clamp(0.9375rem, 1.8vw, 1rem)",
            color: "var(--muted-foreground)",
            maxWidth: "520px",
          }}
        >
          Lock SOL on your next build. Deliver on-chain proof. Get your deposit
          back&nbsp;&mdash; plus a reputation that compounds forever.
        </p>

        <Link
          to="/quest/create"
          className={cn("mt-10 inline-flex items-center font-mono font-bold")}
          style={{
            background: "var(--accent-primary)",
            color: "#000",
            borderRadius: "4px",
            padding: "12px 24px",
            fontSize: "0.9375rem",
            textDecoration: "none",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Stake your next build &rarr;
        </Link>
      </div>
    </section>
  );
}
