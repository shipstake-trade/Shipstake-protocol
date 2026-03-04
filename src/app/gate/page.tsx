"use client";

import FlickeringGrid from "@/components/ui/flickering-grid";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { usePrivyWallet } from "@/lib/solana/shipstake";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const TEASER_CARDS = [
  {
    icon: "🏦",
    title: "PROOF Score >80 → uncollateralized credit",
    sub: "Lending protocols will read your on-chain track record. Coming.",
  },
  {
    icon: "🏛️",
    title: "DAO grant eligibility filter",
    sub: "Foundations will require minimum PROOF Score to apply. Coming.",
  },
  {
    icon: "✅",
    title: "Verified Builder badge across web3",
    sub: "One score. Every protocol. Permanent. Coming.",
  },
];

function GateContent() {
  const { ready, connected } = usePrivyWallet();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isGeoBlocked = searchParams.get("blocked") === "geo";

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [buildersCount, setBuildersCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/waitlist/count")
      .then((r) => r.json())
      .then((d) => setBuildersCount(d.count))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (ready && connected && !isGeoBlocked) {
      router.push("/explore");
    }
  }, [ready, connected, isGeoBlocked, router]);

  if (!ready) return null;

  const handleNotify = async () => {
    if (!email.trim() || loading) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        setError("Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isGeoBlocked) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FlickeringGrid
          squareSize={4}
          gridGap={4}
          color="#00C896"
          maxOpacity={0.12}
          flickerChance={0.1}
          className="absolute inset-0 size-full -z-10"
        />
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
          <Icons.logo className="h-12 w-12 text-primary mb-6" />
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">
            Region restricted
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            SHIPSTAKE is not available in your jurisdiction.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-16">
      <FlickeringGrid
        squareSize={4}
        gridGap={4}
        color="#00C896"
        maxOpacity={0.12}
        flickerChance={0.1}
        className="absolute inset-0 size-full -z-10"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-xl">
        <Icons.logo className="h-12 w-12 text-primary mb-6" />

        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/30 text-emerald-400 mb-6">
          Accountability Protocol · Solana
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight">
          Prove it on-chain.
        </h1>

        <p className="text-muted-foreground mb-8 text-sm leading-relaxed max-w-sm">
          SHIPSTAKE is launching soon.{" "}
          Lock SOL as collateral on your delivery commitments.{" "}
          Build your PROOF Score — the on-chain reputation that lending protocols,
          DAOs, and job boards will read.
        </p>

        {/* Teaser cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-10">
          {TEASER_CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-border bg-secondary/40 p-4 text-left"
            >
              <span className="text-2xl mb-2 block">{card.icon}</span>
              <p className="text-xs font-medium text-foreground mb-1 leading-snug">{card.title}</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Waitlist */}
        {submitted ? (
          <div className="text-center">
            <p className="text-sm font-mono text-primary mb-2">
              You&apos;re on the list. ✓
            </p>
            <p className="text-xs text-muted-foreground">
              Early builders get Founder badge · 0% fee on first quest.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNotify()}
                placeholder="you@example.com"
                disabled={loading}
                className="flex-1 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              />
              <Button
                onClick={handleNotify}
                size="default"
                disabled={loading}
                className="rounded-lg text-primary-foreground font-medium shrink-0"
              >
                {loading ? (
                  <Icons.spinner className="h-4 w-4 animate-spin" />
                ) : (
                  "Notify me"
                )}
              </Button>
            </div>
            {error && (
              <p className="text-[11px] text-red-400 text-center">{error}</p>
            )}
            <p className="text-[10px] text-muted-foreground/60 text-center">
              Early builders get Founder badge · 0% fee on first quest
            </p>
          </div>
        )}

        <p className="mt-8 text-xs text-muted-foreground font-mono">
          <span className="text-primary font-bold">
            {buildersCount ?? "—"}
          </span>
          {" "}builders waiting
        </p>

        <p className="mt-6 text-[10px] text-muted-foreground/40 max-w-sm">
          By joining you confirm you are not in a restricted jurisdiction.
        </p>
      </div>
    </div>
  );
}

export default function GatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <GateContent />
    </Suspense>
  );
}
