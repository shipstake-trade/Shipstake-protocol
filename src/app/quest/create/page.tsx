"use client";

import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { useCreateQuest, usePrivyWallet } from "@/lib/solana/shipstake";
import type { Category, ProofType } from "@/lib/solana/idl";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CATEGORIES: Category[] = ["DeFi", "NFT", "Gaming", "Infrastructure", "Tools", "DAO", "Other"];
const PROOF_TYPES: { value: ProofType; label: string; description: string }[] = [
  { value: "GithubCommit", label: "GitHub Commit", description: "Link to a specific commit on GitHub" },
  { value: "VercelDeployment", label: "Vercel Deployment", description: "Production deployment URL" },
  { value: "LiveUrl", label: "Live URL", description: "Any publicly accessible URL" },
];

type Mode = "self-stake" | "grant-guard";

export default function CreateQuestPage() {
  const router = useRouter();
  const { connected, login } = usePrivyWallet();
  const { createQuest, isPending } = useCreateQuest();

  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<Mode>("self-stake");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("DeFi");
  const [proofType, setProofType] = useState<ProofType>("GithubCommit");
  const [stakeSol, setStakeSol] = useState(1);
  const [deadlineDays, setDeadlineDays] = useState(14);

  const steps = ["Mode", "Details", "Proof Type", "Stake", "Confirm"];

  const canProceed = () => {
    switch (step) {
      case 0: return true;
      case 1: return title.trim().length >= 3 && description.trim().length >= 10;
      case 2: return true;
      case 3: return stakeSol >= 0.1 && deadlineDays >= 1;
      case 4: return connected;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    if (!connected) {
      login();
      return;
    }

    const result = await createQuest({
      title,
      description,
      category,
      stakeSol,
      deadlineDays,
      positionCloseDays: Math.max(1, deadlineDays - 3),
    });

    if (result) {
      toast.success("Quest created on-chain!", {
        description: `Signature: ${result.signature.slice(0, 16)}...`,
      });
      router.push(`/quest/${result.questPda}`);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Create a Quest
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          Lock SOL behind your shipping deadline. Prove you deliver.
        </p>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono font-bold transition-colors",
                  i === step
                    ? "bg-primary text-primary-foreground"
                    : i < step
                    ? "bg-primary/20 text-primary cursor-pointer"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {i + 1}
              </button>
              <span
                className={cn(
                  "text-xs hidden sm:inline",
                  i === step ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <div className="w-4 h-px bg-border mx-1" />
              )}
            </div>
          ))}
        </div>

        <div className="glass-card rounded-lg p-6">
          {/* Step 0: Mode */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold">Choose Mode</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(["self-stake", "grant-guard"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={cn(
                      "glass-card rounded-lg p-4 text-left transition-all",
                      mode === m
                        ? "border-[var(--border-active)] glow-emerald"
                        : "hover:border-[var(--border-active)]"
                    )}
                  >
                    <h3 className="text-sm font-display font-bold text-foreground mb-1">
                      {m === "self-stake" ? "Self-Stake" : "Grant Guard"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {m === "self-stake"
                        ? "Stake your own SOL to prove commitment"
                        : "Lock grant funds behind milestones"}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold">Quest Details</h2>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Ship DEX Aggregator v2"
                  className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  maxLength={64}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you're building and what 'shipped' means..."
                  rows={4}
                  className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  maxLength={256}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                        category === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Proof Type */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold">Proof Type</h2>
              <p className="text-sm text-muted-foreground">
                How will you prove delivery?
              </p>
              <div className="space-y-3">
                {PROOF_TYPES.map((pt) => (
                  <button
                    key={pt.value}
                    onClick={() => setProofType(pt.value)}
                    className={cn(
                      "w-full glass-card rounded-lg p-4 text-left transition-all",
                      proofType === pt.value
                        ? "border-[var(--border-active)] glow-emerald"
                        : "hover:border-[var(--border-active)]"
                    )}
                  >
                    <h3 className="text-sm font-display font-bold text-foreground">
                      {pt.label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {pt.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Stake */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold">Stake & Deadline</h2>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">
                  Stake Amount (SOL)
                </label>
                <input
                  type="range"
                  min={0.1}
                  max={50}
                  step={0.1}
                  value={stakeSol}
                  onChange={(e) => setStakeSol(Number(e.target.value))}
                  className="w-full accent-emerald-brand"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0.1 SOL</span>
                  <span className="text-lg font-mono font-bold text-primary">
                    {stakeSol.toFixed(1)} SOL
                  </span>
                  <span>50 SOL</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1.5">
                  Deadline (days from now)
                </label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={deadlineDays}
                  onChange={(e) => setDeadlineDays(Number(e.target.value))}
                  className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Deadline:{" "}
                  {new Date(
                    Date.now() + deadlineDays * 86400000
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold">Confirm Quest</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mode</span>
                  <span className="font-medium capitalize">
                    {mode.replace("-", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Title</span>
                  <span className="font-medium">{title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-mono text-xs">{category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Proof Type</span>
                  <span className="font-mono text-xs">{proofType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stake</span>
                  <span className="font-mono font-bold text-primary">
                    {stakeSol.toFixed(1)} SOL
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deadline</span>
                  <span>{deadlineDays} days</span>
                </div>
              </div>
              <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400">
                Your SOL will be locked in a program-owned vault until the oracle
                settles this quest. If you miss your deadline, your stake will
                be redistributed.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-4 border-t border-border/50">
            {step > 0 ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(step - 1)}
              >
                ← Back
              </Button>
            ) : (
              <div />
            )}
            {step < 4 ? (
              <Button
                size="sm"
                disabled={!canProceed()}
                onClick={() => setStep(step + 1)}
                className="text-primary-foreground"
              >
                Next →
              </Button>
            ) : (
              <Button
                size="sm"
                disabled={isPending || !connected}
                onClick={handleSubmit}
                className="text-primary-foreground"
              >
                {isPending
                  ? "Creating..."
                  : connected
                  ? "Create Quest →"
                  : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
