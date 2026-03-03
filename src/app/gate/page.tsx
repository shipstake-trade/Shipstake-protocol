"use client";

import FlickeringGrid from "@/components/ui/flickering-grid";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { usePrivyWallet } from "@/lib/solana/shipstake";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function GateContent() {
  const { ready, connected } = usePrivyWallet();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isGeoBlocked = searchParams.get("blocked") === "geo";

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (ready && connected && !isGeoBlocked) {
      router.push("/explore");
    }
  }, [ready, connected, isGeoBlocked, router]);

  if (!ready) return null;

  const handleNotify = () => {
    if (!email.trim()) return;
    console.log("[waitlist]", email.trim());
    setSubmitted(true);
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

        <h1 className="text-4xl font-display font-bold text-foreground mb-3 tracking-tight">
          Coming soon.
        </h1>

        <p className="text-muted-foreground mb-10 text-sm leading-relaxed">
          Prove it on-chain.
        </p>

        {submitted ? (
          <p className="text-sm font-mono text-primary">
            You&apos;re on the list.
          </p>
        ) : (
          <div className="flex w-full max-w-sm gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNotify()}
              placeholder="you@example.com"
              className="flex-1 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button
              onClick={handleNotify}
              size="default"
              className="rounded-lg text-primary-foreground font-medium shrink-0"
            >
              Notify me
            </Button>
          </div>
        )}

        <p className="mt-10 text-[10px] text-muted-foreground/50 max-w-sm">
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
