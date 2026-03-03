"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { useSubmitProof, usePrivyWallet } from "@/lib/solana/shipstake";
import { useLinkAccount } from "@privy-io/react-auth";
import { mockQuests } from "@/lib/mock-data";
import type { ProofType } from "@/lib/solana/idl";
import { cn } from "@/lib/utils";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PROOF_GUIDANCE: Record<ProofType, string> = {
  GithubCommit: "https://github.com/user/repo/commit/abc123...",
  VercelDeployment: "https://your-project.vercel.app",
  LiveUrl: "https://your-shipped-project.com",
};

export default function SubmitProofPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { ready, authenticated, connected, login } = usePrivyWallet();
  const { linkWallet } = useLinkAccount();
  const { submitProof, isPending } = useSubmitProof();

  const quest = mockQuests.find((q) => q.publicKey === id) ?? mockQuests[0];
  const proofType = quest.proofType ?? "GithubCommit";

  const [proofUrl, setProofUrl] = useState("");

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (!ready) return null;

  const handleSubmit = async () => {
    if (!connected) {
      authenticated ? linkWallet() : login();
      return;
    }

    if (!isValidUrl(proofUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }

    const result = await submitProof({
      questPda: id,
      proofUrl,
      proofType,
    });

    if (result) {
      toast.success("Proof submitted.", {
        description: "The oracle will validate your delivery automatically.",
      });
      router.push(`/quest/${id}`);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Submit proof
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          One URL. Before the deadline.
        </p>

        <div className="glass-card rounded-lg p-6 space-y-6">
          {/* Proof type info */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-1">
              Proof type
            </h3>
            <p className="text-xs font-mono text-primary">{proofType}</p>
          </div>

          {/* URL input */}
          <div>
            <label className="text-sm text-muted-foreground block mb-1.5">
              Proof URL — paste it here
            </label>
            <input
              type="url"
              value={proofUrl}
              onChange={(e) => setProofUrl(e.target.value)}
              placeholder={PROOF_GUIDANCE[proofType]}
              className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Publicly accessible. The oracle fetches and validates it automatically.
            </p>
          </div>

          {/* Validation */}
          {proofUrl && !isValidUrl(proofUrl) && (
            <p className="text-xs text-danger">Please enter a valid URL.</p>
          )}

          {proofUrl && isValidUrl(proofUrl) && (
            <div className="p-3 rounded-md bg-primary/10 border border-primary/20 text-xs text-primary">
              URL looks valid. After submission, the oracle will compute your
              PROOF Score. Score ≥ 70 = SHIPPED, score &lt; 70 = SLASHED.
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={isPending || !proofUrl || !isValidUrl(proofUrl)}
            className="w-full text-primary-foreground"
          >
            {isPending
              ? "Submitting..."
              : connected
              ? "Submit proof"
              : "Connect Wallet"}
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
