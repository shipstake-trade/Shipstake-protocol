"use client";

import FlickeringGrid from "@/components/ui/flickering-grid";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { usePrivyWallet } from "@/lib/solana/shipstake";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function GateContent() {
  const { ready, connected, login } = usePrivyWallet();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isGeoBlocked = searchParams.get("blocked") === "geo";

  useEffect(() => {
    if (ready && connected && !isGeoBlocked) {
      router.push("/explore");
    }
  }, [ready, connected, isGeoBlocked, router]);

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
          {isGeoBlocked
            ? "Region restricted"
            : "Connect your wallet."}
        </h1>

        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          {isGeoBlocked
            ? "SHIPSTAKE is not available in your jurisdiction."
            : "Create quests, stake SOL, and build your on-chain reputation."}
        </p>

        {!isGeoBlocked && (
          <Button
            onClick={() => login()}
            size="lg"
            className="text-primary-foreground rounded-lg font-medium"
            disabled={!ready}
          >
            Connect Wallet
          </Button>
        )}

        <p className="mt-8 text-[10px] text-muted-foreground/50 max-w-sm">
          By connecting you confirm you are not in a restricted jurisdiction.
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
