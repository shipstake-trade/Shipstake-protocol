"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// ─── Navigation ───────────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    label: "GETTING STARTED",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "how-it-works", label: "How It Works" },
      { id: "two-modes", label: "Two Modes" },
    ],
  },
  {
    label: "PROTOCOL",
    items: [
      { id: "proof-score", label: "PROOF Score" },
      { id: "oracle", label: "Oracle" },
      { id: "settlement", label: "Settlement" },
    ],
  },
  {
    label: "BUILDERS",
    items: [
      { id: "create-a-quest", label: "Create a Quest" },
      { id: "submit-proof", label: "Submit Proof" },
      { id: "claiming-stake", label: "Claiming Your Stake" },
    ],
  },
  {
    label: "SUPPORTERS (v1)",
    items: [
      { id: "taking-positions", label: "Taking Positions" },
      { id: "claiming-settlement", label: "Claiming Settlement" },
    ],
  },
  {
    label: "GRANT GUARD (B2B)",
    items: [
      { id: "grant-overview", label: "Overview" },
      { id: "for-foundations", label: "For Foundations" },
      { id: "grant-pricing", label: "Pricing" },
    ],
  },
  {
    label: "RESOURCES",
    items: [
      { id: "faq", label: "FAQ" },
      { id: "glossary", label: "Glossary" },
      { id: "security", label: "Security" },
    ],
  },
];

const ALL_SECTIONS = NAV_GROUPS.flatMap((g) => g.items);

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function SidebarNav({
  activeId,
  onLinkClick,
}: {
  activeId: string;
  onLinkClick?: () => void;
}) {
  return (
    <nav className="space-y-5">
      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-1.5 px-2">
            {group.label}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={onLinkClick}
                  className={cn(
                    "block text-sm py-1.5 px-2 rounded-md transition-colors",
                    activeId === item.id
                      ? "bg-emerald-500/10 text-emerald-400 font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="pt-4 border-t border-border">
        <Link
          href="/"
          className="block text-sm py-1.5 px-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to app
        </Link>
      </div>
    </nav>
  );
}

// ─── Screenshot placeholder ───────────────────────────────────────────────────

function Screenshot({ caption }: { caption: string }) {
  return (
    <div className="w-full">
      <div className="bg-secondary border border-border rounded-lg aspect-video" />
      <p className="text-xs text-muted-foreground/50 mt-2 text-center">{caption}</p>
    </div>
  );
}

// ─── Content: Introduction ────────────────────────────────────────────────────

function SectionIntroduction() {
  return (
    <section id="introduction" className="scroll-mt-24">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/30 text-emerald-400 mb-6">
        Accountability Protocol · Solana
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6">
        No excuses.
        <br />
        Just proof.
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
        SHIPSTAKE is an accountability protocol on Solana. Builders lock SOL against a public
        delivery commitment. An oracle validates the proof. The contract settles automatically.
        No judges. No humans. No mercy.
      </p>
      <div className="max-w-2xl">
        <Screenshot caption="Explore page — live quests" />
      </div>
    </section>
  );
}

// ─── Content: How It Works ────────────────────────────────────────────────────

function SectionHowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Create a Quest",
      desc: "Set a title, deadline, and proof type (GitHub / Vercel / Live URL). Lock your SOL. The quest goes live on-chain immediately.",
    },
    {
      n: "02",
      title: "Build",
      desc: "Do the work. The blockchain is watching. Your quest is public. Your stake is real.",
    },
    {
      n: "03",
      title: "Submit Proof",
      desc: "Before the deadline, submit your proof URL. GitHub commit, Vercel deployment, or live URL.",
    },
    {
      n: "04",
      title: "Oracle Decides",
      desc: "The oracle validates automatically via GitHub/Vercel APIs. SHIPPED → reclaim your stake. SLASHED → lose it. On-chain. Final.",
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">How It Works</h2>
      <p className="text-muted-foreground mb-8">Four steps. No exceptions.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {steps.map((step) => (
          <div key={step.n} className="glass-card rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold font-mono shrink-0">
                {step.n}
              </span>
              <h3 className="font-bold font-display text-foreground">{step.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Content: Two Modes ───────────────────────────────────────────────────────

function SectionTwoModes() {
  return (
    <section id="two-modes" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">Two Modes</h2>
      <p className="text-muted-foreground mb-8">Pick your accountability path.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Self-Stake */}
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
              B2C
            </span>
            <h3 className="font-bold font-display text-foreground text-lg">Self-Stake</h3>
          </div>
          <p className="text-sm text-primary font-medium mb-3">
            Personal accountability. No external participants in v0.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground mb-4">
            {[
              "Lock SOL on your own deadline",
              "Submit proof URL before deadline",
              "SHIPPED → reclaim stake minus fee",
              "SLASHED → stake burned or donated (you choose at creation)",
              "Fee: 2% / 1.5% / 1% tiered by stake size",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground/70">
            <span className="text-muted-foreground font-medium">Best for:</span> solo builders,
            indie developers, public commitments
          </p>
        </div>

        {/* Grant Guard */}
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
              B2B
            </span>
            <h3 className="font-bold font-display text-foreground text-lg">Grant Guard</h3>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Recommended
            </span>
          </div>
          <p className="text-sm text-primary font-medium mb-3">
            Foundations enforce grant milestones automatically.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground mb-4">
            {[
              "Foundation creates a grant program with fixed slash rule",
              "Builder posts a matching stake to receive the tranche",
              "SHIPPED → builder gets stake + tranche − 1.5% fee",
              "SLASHED → stake → foundation escrow, tranche returned",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground/70">
            <span className="text-muted-foreground font-medium">Best for:</span> DAOs, foundations,
            accelerators, grant programs
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium"></th>
              <th className="text-left py-3 px-4 text-foreground font-medium">Self-Stake</th>
              <th className="text-left py-3 px-4 text-foreground font-medium">Grant Guard</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ["Who creates the quest", "Builder", "Builder (within a program)"],
              ["Who defines slash rule", "Builder", "Foundation"],
              ["External participants", "None (v0)", "Foundation"],
              ["Fee", "2 / 1.5 / 1% tiered", "1.5% on tranche"],
              ["Slash destination", "Burn / donation", "Foundation escrow"],
            ].map(([label, a, b]) => (
              <tr key={String(label)} className="border-b border-border/50 last:border-0">
                <td className="py-3 px-4 text-muted-foreground/70 font-medium">{label}</td>
                <td className="py-3 px-4">{a}</td>
                <td className="py-3 px-4">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Content: PROOF Score ─────────────────────────────────────────────────────

function SectionProofScore() {
  const ranks = [
    { label: "Novice", cls: "text-zinc-400 border-zinc-700 bg-zinc-800/50" },
    { label: "Adept", cls: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
    { label: "Veteran", cls: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
    { label: "Legend", cls: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
    { label: "Mythic", cls: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
  ];

  return (
    <section id="proof-score" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">PROOF Score</h2>
      <p className="text-sm font-mono text-primary uppercase tracking-wider mb-4">
        Reputation, on-chain.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
        PROOF Score is a 0–100 metric stored directly in your on-chain BuilderProfile. It cannot
        be faked, deleted, or transferred. Every quest you complete — or miss — is permanently
        recorded.
      </p>

      <div className="bg-secondary border border-border rounded-lg p-4 font-mono text-sm mb-6 space-y-1.5 max-w-2xl overflow-x-auto">
        <p className="text-muted-foreground/60 text-xs mb-2">// formula</p>
        <p>
          <span className="text-primary">base</span>
          {"         = (shipped / total) × 60 "}
          <span className="text-muted-foreground/50">// max 60</span>
        </p>
        <p>
          <span className="text-primary">speed</span>
          {"        = avg_early_delivery_days × 2 "}
          <span className="text-muted-foreground/50">// max 15</span>
        </p>
        <p>
          <span className="text-primary">stake_weight</span>
          {" = log10(total_staked_SOL) × 5 "}
          <span className="text-muted-foreground/50">// max 15</span>
        </p>
        <p>
          <span className="text-primary">streak</span>
          {"       = streak_current × 1 "}
          <span className="text-muted-foreground/50">// max 10</span>
        </p>
        <div className="border-t border-border mt-3 pt-3">
          <p className="text-foreground font-bold">
            PROOF Score = min(100, base + speed + stake_weight + streak)
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm mb-6">
        {[
          ["SHIPPED on time", "→ recompute formula"],
          ["SHIPPED early", "→ speed bonus"],
          ["SLASHED", "→ −15 pts (floor: 0)"],
          ["Inactive > 90 days", "→ −1 pt/week (floor: 10)"],
        ].map(([event, outcome]) => (
          <div key={String(event)} className="flex items-center gap-3">
            <span className="font-mono text-foreground/70 shrink-0 w-44">{event}</span>
            <span className="text-muted-foreground">{outcome}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {ranks.map((rank) => (
          <span
            key={rank.label}
            className={cn("text-xs px-2.5 py-1 rounded-full font-medium border", rank.cls)}
          >
            {rank.label}
          </span>
        ))}
      </div>

      <div className="max-w-2xl">
        <Screenshot caption="BuilderProfile — PROOF Score gauge" />
      </div>
    </section>
  );
}

// ─── Content: Oracle ──────────────────────────────────────────────────────────

function SectionOracle() {
  return (
    <section id="oracle" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">Oracle</h2>
      <p className="text-sm font-mono text-primary uppercase tracking-wider mb-4">
        Deterministic. Auditable. Unkillable.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-8">
        The oracle is a Node.js service that validates proof URLs against GitHub and Vercel APIs.
        Every validation is recomputable from public data. No human judgment. No appeals.
      </p>

      <div className="space-y-4 mb-8">
        {[
          {
            icon: "🔒",
            title: "Minimal blast radius",
            desc: "The oracle can call report_outcome() — nothing else. It cannot move funds. If compromised: outcomes faked, funds safe.",
          },
          {
            icon: "⏱️",
            title: "48h timelock on replacement",
            desc: "Admin can replace the oracle with a 48-hour timelock. This prevents unilateral oracle changes without notice.",
          },
          {
            icon: "🔁",
            title: "Post-audit: multi-node consensus",
            desc: "Multiple independent validators must agree before on-chain submission. Consensus before settlement.",
          },
        ].map((item) => (
          <div key={item.title} className="glass-card rounded-lg p-4 flex gap-4 items-start">
            <span className="text-xl shrink-0">{item.icon}</span>
            <div>
              <p className="font-medium font-display text-foreground mb-1">{item.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-foreground mb-4">Supported proof types</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            type: "GitHub Commit",
            desc: "Validates author, timestamp, and lines changed via GitHub API.",
          },
          {
            type: "Vercel Deploy",
            desc: "Validates readyState, createdAt, and production target.",
          },
          {
            type: "Live URL",
            desc: "Validates HTTP 200 response. Lower confidence — max score 60/100.",
          },
        ].map((item) => (
          <div key={item.type} className="border border-border rounded-lg p-4">
            <p className="font-mono text-sm text-primary mb-2">{item.type}</p>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Content: Settlement ──────────────────────────────────────────────────────

function SectionSettlement() {
  return (
    <section id="settlement" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">Settlement</h2>
      <p className="text-sm font-mono text-primary uppercase tracking-wider mb-6">
        Code settles. Not people.
      </p>

      <div className="space-y-4 mb-6">
        <div className="border-l-4 border-emerald-500 bg-emerald-500/5 rounded-r-lg p-5">
          <p className="font-mono text-sm text-emerald-400 font-bold mb-3">SHIPPED</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>Builder submits proof → oracle validates (score ≥ 70)</li>
            <li>→ contract releases stake to builder</li>
            <li>→ fee deducted (tiered: 2% / 1.5% / 1%)</li>
            <li>→ PROOF Score updated upward</li>
            <li>→ streak incremented</li>
          </ul>
        </div>

        <div className="border-l-4 border-destructive bg-destructive/5 rounded-r-lg p-5">
          <p className="font-mono text-sm text-destructive font-bold mb-3">SLASHED</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>Deadline passes without valid proof (score &lt; 70)</li>
            <li>→ stake sent to slash destination (set at creation, immutable)</li>
            <li>→ fee: 0</li>
            <li>→ PROOF Score −15</li>
            <li>→ streak reset to 0</li>
          </ul>
        </div>
      </div>

      <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-lg p-4">
        <p className="text-sm text-emerald-400 font-medium mb-1">Note</p>
        <p className="text-sm text-muted-foreground">
          Slash destination is set at quest creation and cannot be changed. Ever. This is by design
          — it prevents builders from changing the destination before a likely slash.
        </p>
      </div>
    </section>
  );
}

// ─── Content: Create a Quest ──────────────────────────────────────────────────

function SectionCreateAQuest() {
  const steps = [
    {
      n: "Step 1",
      title: "Basics",
      desc: "Title (max 64 chars), description (max 512 chars), category. Choose proof type: GitHub Commit, Vercel Deploy, or Live URL.",
    },
    {
      n: "Step 2",
      title: "Stake & Deadline",
      desc: "Amount in SOL (minimum 0.1 SOL). Deadline: date + time (UTC). Cannot be changed after creation. Slash destination: burn address or fixed donation wallet.",
    },
    {
      n: "Step 3",
      title: "Review & Sign",
      desc: "Review all parameters. Connect wallet. Sign the transaction. Quest is live on-chain immediately.",
    },
  ];

  return (
    <section id="create-a-quest" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">Create a Quest</h2>
      <p className="text-muted-foreground mb-8">Three steps. Then it&apos;s on-chain.</p>

      <div className="space-y-4 mb-6">
        {steps.map((step) => (
          <div key={step.n} className="glass-card rounded-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-primary uppercase">{step.n}</span>
              <span className="text-foreground font-bold font-display">— {step.title}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="border border-yellow-500/30 bg-yellow-500/5 rounded-lg p-4">
        <p className="text-sm text-yellow-400 font-medium mb-1">Immutable after creation</p>
        <p className="text-sm text-muted-foreground">
          Once created, title, deadline, stake amount, and slash destination are immutable. The
          smart contract enforces this.
        </p>
      </div>
    </section>
  );
}

// ─── Content: Submit Proof ────────────────────────────────────────────────────

function SectionSubmitProof() {
  return (
    <section id="submit-proof" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">Submit Proof</h2>
      <p className="text-muted-foreground mb-6">Before the deadline. One URL. No extensions.</p>

      <div className="space-y-4 mb-6 text-muted-foreground leading-relaxed">
        <p>
          Navigate to your active quest and click{" "}
          <span className="font-mono text-foreground bg-secondary px-1.5 py-0.5 rounded text-sm">
            Submit Proof
          </span>
          . Paste your proof URL. The frontend validates the URL format before submitting.
        </p>
        <p>
          The transaction is signed by your wallet. The submission timestamp is recorded on-chain.
          Submissions after the deadline are rejected by the program — not the frontend.
        </p>
      </div>

      <div className="border border-border rounded-lg p-4 space-y-3">
        {[
          ["GitHub Commit", "https://github.com/user/repo/commit/abc123def"],
          ["Vercel Deploy", "https://myapp-abc123.vercel.app"],
          ["Live URL", "https://myapp.com"],
        ].map(([type, example]) => (
          <div key={String(type)} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="font-mono text-sm text-primary shrink-0 w-36">{type}</span>
            <span className="font-mono text-xs text-muted-foreground">{example}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Content: Claiming Your Stake ────────────────────────────────────────────

function SectionClaimingStake() {
  return (
    <section id="claiming-stake" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">
        Claiming Your Stake
      </h2>
      <p className="text-muted-foreground mb-6">After the oracle settles, reclaim what&apos;s yours.</p>

      <p className="text-muted-foreground leading-relaxed mb-6">
        Once the oracle has submitted a{" "}
        <span className="font-mono text-emerald-400 text-sm">SHIPPED</span> outcome on-chain, you
        can claim your returned stake from your Portfolio page. The protocol fee is deducted
        automatically at settlement — no separate fee transaction required.
      </p>

      <div className="glass-card rounded-lg p-5">
        <p className="font-medium font-display text-foreground mb-3">Claim flow</p>
        <ol className="space-y-2 text-sm text-muted-foreground">
          {[
            "Go to /portfolio → find your settled quest",
            'Click "Claim" — the transaction is pre-populated',
            "Sign with your connected wallet",
            "SOL returns to your wallet, minus protocol fee",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="font-mono text-primary shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─── Content: Taking Positions ────────────────────────────────────────────────

function SectionTakingPositions() {
  return (
    <section id="taking-positions" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-3">Taking Positions</h2>
      <span className="inline-block text-xs font-mono px-2.5 py-1 rounded-full border border-emerald-500/30 text-emerald-400 mb-6">
        Coming in v1
      </span>
      <p className="text-muted-foreground leading-relaxed mb-4">
        In v1, external supporters will be able to take positions on builder quests — staking
        alongside or against completion. This creates a prediction market layer on top of the
        accountability protocol.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        v0 is purely self-stake. No external participants. No speculative positions. This page will
        be updated when the Supporters module goes live.
      </p>
    </section>
  );
}

// ─── Content: Claiming Settlement ────────────────────────────────────────────

function SectionClaimingSettlement() {
  return (
    <section id="claiming-settlement" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-3">
        Claiming Settlement
      </h2>
      <span className="inline-block text-xs font-mono px-2.5 py-1 rounded-full border border-emerald-500/30 text-emerald-400 mb-6">
        Coming in v1
      </span>
      <p className="text-muted-foreground leading-relaxed">
        Settlement claims for position holders will be available once the Supporters module launches
        in v1. Supporters who backed a correct outcome will be able to claim their returns from the
        protocol.
      </p>
    </section>
  );
}

// ─── Content: Grant Guard Overview ───────────────────────────────────────────

function SectionGrantOverview() {
  return (
    <section id="grant-overview" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">
        Grant Guard — Overview
      </h2>
      <span className="inline-block text-xs font-mono px-2.5 py-1 rounded-full border border-emerald-500/30 text-emerald-400 mb-6">
        Private Beta
      </span>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Grant Guard is the B2B configuration of SHIPSTAKE. Foundations and DAOs use it to enforce
        grant milestones automatically — no manual review, no governance vote, no chasing builders.
      </p>

      <div className="glass-card rounded-lg p-5">
        <p className="font-medium font-display text-foreground mb-3">How it works</p>
        <ol className="space-y-3 text-sm text-muted-foreground">
          {[
            "Foundation creates a Grant Program on-chain: defines milestones, slash rules, and escrows the tranche.",
            "Builder applies, posts matching stake (equal to tranche), and receives the quest.",
            "Oracle evaluates proof at deadline. SHIPPED → builder gets stake + tranche minus fee. SLASHED → stake and tranche return to foundation escrow.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-mono text-primary shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─── Content: For Foundations ─────────────────────────────────────────────────

function SectionForFoundations() {
  return (
    <section id="for-foundations" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">For Foundations</h2>
      <p className="text-muted-foreground mb-6">Stop funding promises. Fund proof.</p>

      <p className="text-muted-foreground leading-relaxed mb-6">
        Grant Guard eliminates milestone ambiguity. The slash rule is defined at program creation
        and is immutable — builders know exactly what&apos;s required before they apply.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          {
            title: "On-chain audit trail",
            desc: "Every grant, every milestone, every outcome — permanent and public.",
          },
          {
            title: "Automatic capital recovery",
            desc: "Missed milestones return funds without manual intervention or governance votes.",
          },
          {
            title: "Multi-signer configuration",
            desc: "Program admin keys can be distributed across a DAO multisig.",
          },
          {
            title: "Builder screening",
            desc: "Filter applicants by minimum PROOF Score before they can post matching stake.",
          },
        ].map((item) => (
          <div key={item.title} className="border border-border rounded-lg p-4">
            <p className="font-medium font-display text-foreground mb-1">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Contact{" "}
        <a href="mailto:support@shipstake.com" className="text-primary hover:underline">
          support@shipstake.com
        </a>{" "}
        for Grant Guard onboarding.
      </p>
    </section>
  );
}

// ─── Content: Pricing ─────────────────────────────────────────────────────────

function SectionGrantPricing() {
  return (
    <section id="grant-pricing" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">Pricing</h2>
      <p className="text-muted-foreground mb-6">Fees only on successful outcomes.</p>

      <div className="overflow-x-auto rounded-lg border border-border mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Mode</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Condition</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Fee</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ["Self-Stake", "Stake < 10 SOL", "2%"],
              ["Self-Stake", "Stake 10–100 SOL", "1.5%"],
              ["Self-Stake", "Stake ≥ 100 SOL", "1%"],
              ["Self-Stake", "Streak ≥ 3", "1%"],
              ["Self-Stake", "Streak ≥ 5", "0%"],
              ["Grant Guard", "On tranche only", "1.5%"],
            ].map(([mode, condition, fee], i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                <td className="py-3 px-4 font-mono text-primary">{mode}</td>
                <td className="py-3 px-4">{condition}</td>
                <td className="py-3 px-4 font-mono text-foreground font-medium">{fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-lg p-4">
        <p className="text-sm text-emerald-400 font-medium mb-1">Zero fees on SLASHED outcomes</p>
        <p className="text-sm text-muted-foreground">
          SHIPSTAKE does not profit from builder failure. Fees are only charged on SHIPPED outcomes.
        </p>
      </div>
    </section>
  );
}

// ─── Content: FAQ ─────────────────────────────────────────────────────────────

function SectionFAQ() {
  const faqs = [
    {
      q: "Can I edit my quest after creating it?",
      a: "No. Title, deadline, stake, and slash destination are immutable once the quest is on-chain. This is intentional — mutability would undermine the accountability mechanism.",
    },
    {
      q: "What happens if the oracle is wrong?",
      a: "The oracle scores based on objective, recomputable criteria. If you believe a result was incorrect, contact the team. Admin can override outcomes as a last resort, but this requires manual review and is logged publicly.",
    },
    {
      q: "What proof types are supported?",
      a: "GitHub Commit URL, Vercel Deployment URL, or Live URL. GitHub and Vercel give higher confidence scores. Live URL alone maxes at 60/100 — unlikely to reach the 70 threshold without additional validation.",
    },
    {
      q: "What is the minimum stake?",
      a: "0.1 SOL. There is no maximum.",
    },
    {
      q: "Can I create multiple quests at the same time?",
      a: "Yes. Each quest is an independent on-chain account.",
    },
    {
      q: "What is the fee?",
      a: "Fees are only charged on SHIPPED outcomes, never on SLASHED. Stake < 10 SOL → 2%. Stake 10–100 SOL → 1.5%. Stake ≥ 100 SOL → 1%. Builders with a streak ≥ 3 pay 1%, streak ≥ 5 pay 0%.",
    },
    {
      q: "Is SHIPSTAKE available in my country?",
      a: "SHIPSTAKE is not available in France, the United States, the United Kingdom, Australia, Canada, and other restricted jurisdictions. See our Terms of Service for the full list.",
    },
    {
      q: "When is Grant Guard available?",
      a: "Grant Guard is in private beta. Apply via the waitlist.",
    },
    {
      q: "Is the smart contract audited?",
      a: "Not yet. Audit with Sec3 or OtterSec is planned before mainnet. Do not use SHIPSTAKE on mainnet with significant amounts until the audit is complete and published.",
    },
  ];

  return (
    <section id="faq" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-8">FAQ</h2>
      <div>
        {faqs.map((item, i) => (
          <div key={i} className="py-5 border-b border-border/50 last:border-0">
            <p className="font-medium font-display text-foreground mb-2">{item.q}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Content: Glossary ────────────────────────────────────────────────────────

function SectionGlossary() {
  const terms: [string, string][] = [
    ["Quest", "A public delivery commitment with SOL locked as collateral"],
    ["SHIPPED", "Outcome: proof validated, stake returned to builder"],
    ["SLASHED", "Outcome: deadline missed or proof invalid, stake distributed"],
    ["PROOF Score", "On-chain reputation metric (0–100), stored in BuilderProfile"],
    ["Oracle", "Off-chain service that validates proofs and calls report_outcome()"],
    ["PoolVault", "PDA (program-derived address) holding a builder's stake"],
    ["Grant Guard", "B2B mode: foundation creates a program, builder posts matching stake"],
    ["Endorsement", "Gasless on-chain signal of support for a builder's quest"],
    ["Streak", "Consecutive SHIPPED count; resets to 0 on any SLASHED"],
    ["Slash destination", "Fixed address receiving slashed SOL (set at creation, immutable)"],
  ];

  return (
    <section id="glossary" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-8">Glossary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        {terms.map(([term, def]) => (
          <div key={term} className="py-3.5 border-b border-border/50 flex gap-4 items-start">
            <span className="font-mono text-sm text-primary shrink-0 w-36 leading-relaxed">
              {term}
            </span>
            <span className="text-sm text-muted-foreground leading-relaxed">{def}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Content: Security ────────────────────────────────────────────────────────

function SectionSecurity() {
  return (
    <section id="security" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">Security</h2>
      <p className="text-muted-foreground mb-6">What we know, what&apos;s planned, what to avoid.</p>

      <div className="space-y-4 mb-6">
        {[
          {
            status: "✅",
            title: "Oracle blast radius limited",
            desc: "The oracle can only call report_outcome(). It cannot move funds. A compromised oracle cannot steal SOL.",
          },
          {
            status: "✅",
            title: "48h oracle replacement timelock",
            desc: "Admin cannot silently swap the oracle. Any replacement is delayed 48 hours, giving users time to react.",
          },
          {
            status: "⏳",
            title: "Smart contract audit pending",
            desc: "Audit with Sec3 or OtterSec is planned before mainnet launch. Pre-audit — use with appropriate caution.",
          },
          {
            status: "⏳",
            title: "Multi-node oracle consensus",
            desc: "Post-audit, the oracle will require consensus from multiple independent validators before submitting on-chain.",
          },
          {
            status: "⚠️",
            title: "Devnet only",
            desc: "SHIPSTAKE is on Solana Devnet. Do not stake significant real SOL until mainnet launch and audit completion.",
          },
        ].map((item) => (
          <div key={item.title} className="glass-card rounded-lg p-4 flex gap-4 items-start">
            <span className="text-lg shrink-0">{item.status}</span>
            <div>
              <p className="font-medium font-display text-foreground mb-1">{item.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Found a vulnerability? Contact{" "}
        <a href="mailto:support@shipstake.com" className="text-primary hover:underline">
          support@shipstake.com
        </a>
        .
      </p>
    </section>
  );
}

// ─── Closing CTA ──────────────────────────────────────────────────────────────

function DocsCTA() {
  return (
    <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-xl p-8 sm:p-12 text-center">
      <h2 className="text-3xl font-bold font-display text-foreground mb-3">Prove it on-chain.</h2>
      <p className="text-muted-foreground mb-8">
        Create your first quest. Lock SOL. Ship the proof.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/quest/create"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "text-primary-foreground rounded-lg font-medium"
          )}
        >
          Create a Quest
        </Link>
        <Link
          href="/explore"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-lg")}
        >
          Explore Quests
        </Link>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function DocsContent() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container mx-auto max-w-[var(--container-max-width)] px-4 py-12">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden flex items-center gap-2 mb-6 p-3 border border-border rounded-lg bg-secondary/50 text-sm">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Open documentation navigation"
        >
          <Menu className="h-4 w-4" />
          <span>Docs</span>
        </button>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-foreground truncate">
          {ALL_SECTIONS.find((s) => s.id === activeSection)?.label ?? "Introduction"}
        </span>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-[var(--bg-secondary)] border-r border-border overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-semibold text-foreground">Documentation</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <SidebarNav
              activeId={activeSection}
              onLinkClick={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Three-column layout */}
      <div className="flex gap-8 lg:gap-12">
        {/* Left sidebar */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="sticky top-[calc(var(--header-height)+1.5rem)] overflow-y-auto max-h-[calc(100vh-var(--header-height)-3rem)]">
            <SidebarNav activeId={activeSection} />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 space-y-20 pb-24">
          <SectionIntroduction />
          <SectionHowItWorks />
          <SectionTwoModes />
          <SectionProofScore />
          <SectionOracle />
          <SectionSettlement />
          <SectionCreateAQuest />
          <SectionSubmitProof />
          <SectionClaimingStake />
          <SectionTakingPositions />
          <SectionClaimingSettlement />
          <SectionGrantOverview />
          <SectionForFoundations />
          <SectionGrantPricing />
          <SectionFAQ />
          <SectionGlossary />
          <SectionSecurity />
          <DocsCTA />
        </main>

      </div>
    </div>
  );
}
