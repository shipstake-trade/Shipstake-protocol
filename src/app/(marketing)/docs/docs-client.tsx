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
    ],
  },
  {
    label: "PROTOCOL",
    items: [
      { id: "proof-score", label: "PROOF Score" },
      { id: "validator", label: "Automatic Validator" },
      { id: "settlement", label: "Settlement" },
    ],
  },
  {
    label: "BUILDERS",
    items: [
      { id: "create-a-commitment", label: "Create a Commitment" },
      { id: "connect-github", label: "Connect GitHub" },
      { id: "submit-proof", label: "Submit Proof" },
      { id: "claiming-stake", label: "Claim Your Deposit" },
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
          &larr; Back to app
        </Link>
      </div>
    </nav>
  );
}

// ─── Content: Introduction ────────────────────────────────────────────────────

function SectionIntroduction() {
  return (
    <section id="introduction" className="scroll-mt-24">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/30 text-emerald-400 mb-6">
        Accountability Protocol &middot; Solana
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6">
        No excuses.
        <br />
        Just proof.
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
        SHIPSTAKE is an accountability protocol on Solana. Lock SOL against a public commitment.
        The automatic validator checks your proof. The contract settles — no humans, no appeals.
      </p>
      <p className="text-muted-foreground leading-relaxed max-w-2xl">
        One mode:{" "}
        <span className="text-foreground font-medium">Self-Stake</span>. Lock your own SOL,
        set your own deadline, submit your own proof. Ship and get it back. Miss and lose it.
        Every settled commitment writes to your PROOF Score.
      </p>
    </section>
  );
}

// ─── Content: How It Works ────────────────────────────────────────────────────

function SectionHowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Lock SOL",
      desc: "Set a title, deadline, and proof type. Lock your SOL. The commitment goes live on-chain immediately.",
    },
    {
      n: "02",
      title: "Build",
      desc: "Do the work. Your commitment is public. Your deposit is real.",
    },
    {
      n: "03",
      title: "Submit Proof",
      desc: "Before the deadline, submit your proof URL — a GitHub commit or Vercel deployment link.",
    },
    {
      n: "04",
      title: "Shipped or Slashed",
      desc: "The automatic validator checks your proof. Shipped — get your deposit back minus 2%. Slashed — it's gone. Final.",
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

// ─── Content: PROOF Score ─────────────────────────────────────────────────────

function SectionProofScore() {
  return (
    <section id="proof-score" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">PROOF Score</h2>
      <p className="text-sm font-mono text-primary uppercase tracking-wider mb-4">
        Your delivery record. On-chain. Forever.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
        PROOF Score counts every commitment you&apos;ve shipped. Stored permanently on Solana.
        You can&apos;t edit it, buy it, or reset it.
      </p>

      <div className="space-y-2 text-sm mb-8">
        {[
          ["SHIPPED", "PROOF Score +1"],
          ["SLASHED", "no change"],
        ].map(([event, outcome]) => (
          <div key={String(event)} className="flex items-center gap-3">
            <span
              className={cn(
                "font-mono shrink-0 w-20 px-2 py-0.5 rounded text-xs font-bold text-center",
                event === "SHIPPED"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                  : "bg-destructive/10 border border-destructive/30 text-destructive"
              )}
            >
              {event}
            </span>
            <span className="text-muted-foreground font-mono text-xs">{outcome}</span>
          </div>
        ))}
      </div>

      <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-lg p-4 max-w-2xl">
        <p className="text-sm text-emerald-400 font-medium mb-1">Composability</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Any Solana protocol can read your PROOF Score directly from the blockchain — lending,
          DAO grants, job boards. Ship once. Prove it everywhere.
        </p>
      </div>
    </section>
  );
}

// ─── Content: Automatic Validator ─────────────────────────────────────────────

function SectionValidator() {
  return (
    <section id="validator" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">Automatic Validator</h2>
      <p className="text-sm font-mono text-primary uppercase tracking-wider mb-4">
        No humans. No judgment. Final.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-8">
        The automatic validator checks your submitted proof URL against the GitHub or Vercel API,
        determines whether you shipped, and writes the outcome on-chain. Resolution is final.
      </p>

      <div className="space-y-4 mb-8">
        {[
          {
            icon: "\uD83D\uDD12",
            title: "Limited blast radius",
            desc: "The validator can only write outcomes — it cannot move funds. A compromised validator affects outcomes, not balances.",
          },
          {
            icon: "\u23F1\uFE0F",
            title: "48h replacement timelock",
            desc: "The validator cannot be swapped silently — any replacement has a 48-hour delay.",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            type: "GitHub Commit",
            desc: "Submit a GitHub commit URL. The validator checks authorship, timestamp, and lines changed.",
          },
          {
            type: "Vercel Deploy",
            desc: "Submit a Vercel deployment URL. The validator checks readiness, timestamp, and production target.",
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

      <div className="space-y-4 mb-8">
        <div className="border-l-4 border-emerald-500 bg-emerald-500/5 rounded-r-lg p-5">
          <p className="font-mono text-sm text-emerald-400 font-bold mb-3">SHIPPED</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>Submit proof &rarr; validator confirms before deadline</li>
            <li>&rarr; Deposit returned minus 2% protocol fee</li>
            <li>&rarr; PROOF Score +1</li>
          </ul>
        </div>

        <div className="border-l-4 border-destructive bg-destructive/5 rounded-r-lg p-5">
          <p className="font-mono text-sm text-destructive font-bold mb-3">SLASHED</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>Deadline passes without valid proof</li>
            <li>&rarr; Deposit sent to slash destination (set at creation, immutable)</li>
            <li>&rarr; PROOF Score unchanged</li>
          </ul>
        </div>
      </div>

      <h3 className="font-bold text-foreground mb-4">Protocol fee</h3>
      <div className="overflow-x-auto rounded-lg border border-border mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Outcome</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Fee</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Applied to</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/50">
              <td className="py-3 px-4 font-mono text-emerald-400">SHIPPED</td>
              <td className="py-3 px-4 font-mono text-foreground font-medium">2%</td>
              <td className="py-3 px-4">Deposit amount</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-destructive">SLASHED</td>
              <td className="py-3 px-4 font-mono text-foreground font-medium">0%</td>
              <td className="py-3 px-4">&mdash;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-lg p-4">
        <p className="text-sm text-emerald-400 font-medium mb-1">Note</p>
        <p className="text-sm text-muted-foreground">
          SHIPSTAKE charges a fee only on successful deliveries — we don&apos;t profit from failure.
        </p>
      </div>
    </section>
  );
}

// ─── Content: Create a Commitment ─────────────────────────────────────────────

function SectionCreateACommitment() {
  const steps = [
    {
      n: "Step 1",
      title: "Details",
      desc: "Title and description — the public record of your commitment.",
    },
    {
      n: "Step 2",
      title: "Proof Type",
      desc: "Choose GitHub Commit or Vercel Deployment — this determines how the validator checks your proof.",
    },
    {
      n: "Step 3",
      title: "Repository",
      desc: "Optionally link a GitHub repo — scopes validation to your work.",
    },
    {
      n: "Step 4",
      title: "Deposit & Deadline",
      desc: "Minimum 0.1 SOL. Deadline 1–90 days. Both immutable after creation.",
    },
    {
      n: "Step 5",
      title: "Confirm & Sign",
      desc: "Review, connect wallet, sign. Your commitment is live on-chain.",
    },
  ];

  return (
    <section id="create-a-commitment" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">Create a Commitment</h2>
      <p className="text-muted-foreground mb-8">Five steps. Then it&apos;s on-chain.</p>

      <div className="space-y-3 mb-6">
        {steps.map((step) => (
          <div key={step.n} className="glass-card rounded-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-primary uppercase">{step.n}</span>
              <span className="text-foreground font-bold font-display">&mdash; {step.title}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="border border-yellow-500/30 bg-yellow-500/5 rounded-lg p-4">
        <p className="text-sm text-yellow-400 font-medium mb-1">Immutable after creation</p>
        <p className="text-sm text-muted-foreground">
          Title, deadline, deposit amount, and slash destination cannot be changed once the
          commitment is on-chain. No extensions. No appeals.
        </p>
      </div>
    </section>
  );
}

// ─── Content: Connect GitHub ──────────────────────────────────────────────────

function SectionConnectGitHub() {
  return (
    <section id="connect-github" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">Connect GitHub</h2>
      <p className="text-sm font-mono text-primary uppercase tracking-wider mb-4">
        Link repositories. Prove authorship.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
        Connecting GitHub lets you link a specific repo to each commitment, scoping validation
        to your work.
      </p>

      <h3 className="font-bold text-foreground mb-4">How to connect</h3>
      <div className="glass-card rounded-lg p-5 mb-6">
        <ol className="space-y-3 text-sm text-muted-foreground">
          {[
            "Go to your Portfolio page (/portfolio).",
            'Click "Connect GitHub" in the PROOF Score card.',
            "Authorise SHIPSTAKE — read:user and public_repo scope only.",
            "Your GitHub username and avatar appear immediately.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-mono text-primary shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          {
            title: "OAuth scope",
            desc: "read:user and public_repo only — SHIPSTAKE cannot write to your repositories.",
          },
          {
            title: "Encrypted at rest",
            desc: "Your token is encrypted with AES-256-GCM in an httpOnly cookie — never exposed to the browser.",
          },
          {
            title: "Optional",
            desc: "You can skip GitHub linking entirely — the validator still works without it.",
          },
          {
            title: "Disconnect any time",
            desc: 'Click "Disconnect" on your Portfolio page, or revoke directly on GitHub.',
          },
        ].map((item) => (
          <div key={item.title} className="border border-border rounded-lg p-4">
            <p className="font-medium font-display text-foreground mb-1">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
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
          Navigate to your active commitment and click{" "}
          <span className="font-mono text-foreground bg-secondary px-1.5 py-0.5 rounded text-sm">
            Submit Proof
          </span>
          . Paste your proof URL. The submission is signed by your wallet and recorded on-chain.
        </p>
        <p>
          Submissions after the deadline are rejected by the program — not the frontend.
        </p>
      </div>

      <div className="border border-border rounded-lg p-4 space-y-3 mb-6">
        {[
          ["GitHub Commit", "https://github.com/user/repo/commit/abc123def456"],
          ["Vercel Deploy", "https://myapp-abc123.vercel.app"],
        ].map(([type, example]) => (
          <div key={String(type)} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="font-mono text-sm text-primary shrink-0 w-36">{type}</span>
            <span className="font-mono text-xs text-muted-foreground">{example}</span>
          </div>
        ))}
      </div>

      <div className="border border-yellow-500/30 bg-yellow-500/5 rounded-lg p-4">
        <p className="text-sm text-yellow-400 font-medium mb-1">One submission per commitment</p>
        <p className="text-sm text-muted-foreground">
          You can only submit proof once. The validator&apos;s decision is final. Choose carefully before signing.
        </p>
      </div>
    </section>
  );
}

// ─── Content: Claim Your Deposit ─────────────────────────────────────────────

function SectionClaimingStake() {
  return (
    <section id="claiming-stake" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">
        Claim Your Deposit
      </h2>
      <p className="text-muted-foreground mb-6">After the validator settles, reclaim what&apos;s yours.</p>

      <p className="text-muted-foreground leading-relaxed mb-6">
        Once the validator writes a{" "}
        <span className="font-mono text-emerald-400 text-sm">SHIPPED</span> outcome on-chain,
        claim your deposit from the Portfolio page. The 2% fee is deducted automatically.
      </p>

      <div className="glass-card rounded-lg p-5">
        <p className="font-medium font-display text-foreground mb-3">Claim flow</p>
        <ol className="space-y-2 text-sm text-muted-foreground">
          {[
            "Go to /portfolio — find your SHIPPED commitment.",
            'Click "Claim your SOL".',
            "Sign with your connected wallet.",
            "SOL returns to your wallet minus the 2% fee.",
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

// ─── Content: FAQ ─────────────────────────────────────────────────────────────

function SectionFAQ() {
  const faqs = [
    {
      q: "Can I edit my commitment after creating it?",
      a: "No. Title, deadline, deposit, and slash destination are immutable once on-chain. That's the point.",
    },
    {
      q: "What proof types are supported?",
      a: "GitHub Commit URL and Vercel Deployment URL. Submit before your deadline — the automatic validator handles the rest.",
    },
    {
      q: "What is the minimum deposit?",
      a: "0.1 SOL. No maximum.",
    },
    {
      q: "Can I have multiple active commitments?",
      a: "Yes. Each commitment is an independent on-chain account with its own deadline and deposit.",
    },
    {
      q: "What is the protocol fee?",
      a: "A flat 2% on SHIPPED outcomes only — SHIPSTAKE does not profit from failure.",
    },
    {
      q: "Do I need to connect GitHub?",
      a: "No. It's optional. Linking a repo scopes validation to your work, but proof submission works without it.",
    },
    {
      q: "What if the automatic validator is wrong?",
      a: "The validator uses objective, deterministic criteria — authorship, timestamp, deployment readiness. Resolution is final. No appeals.",
    },
    {
      q: "Is SHIPSTAKE available in my country?",
      a: "SHIPSTAKE is geo-blocked in 7 jurisdictions: the United States, United Kingdom, France, Australia, Canada, North Korea, and Iran.",
    },
    {
      q: "Is SHIPSTAKE gambling?",
      a: "No. You commit your own capital against your own deliverable. No counterparty, no odds, no house edge.",
    },
    {
      q: "Is the smart contract audited?",
      a: "Not yet. Audit is planned before mainnet. Currently on Solana Devnet — use with caution.",
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
    ["Commitment", "A public delivery promise with SOL locked as collateral"],
    ["Self-Stake", "Lock your own SOL against your own deadline"],
    ["PROOF Score", "On-chain delivery counter — increments on each SHIPPED outcome"],
    ["Automatic Validator", "Service that checks proofs and writes outcomes on-chain"],
    ["Slash Destination", "Fixed address receiving slashed SOL (set at creation, immutable)"],
    ["SHIPPED", "Proof validated — deposit returned minus 2% fee"],
    ["SLASHED", "Deadline missed or proof invalid — deposit sent to slash destination"],
    ["GitHub Connect", "Optional OAuth integration to link repositories to commitments"],
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
      <p className="text-muted-foreground mb-6">What&apos;s live, what&apos;s planned, what to avoid.</p>

      <div className="space-y-4 mb-6">
        {[
          {
            status: "\u2705",
            title: "Validator blast radius limited",
            desc: "The validator can only write outcomes — it cannot move funds.",
          },
          {
            status: "\u2705",
            title: "48h validator replacement timelock",
            desc: "Any validator swap is delayed 48 hours — giving builders time to react.",
          },
          {
            status: "\u2705",
            title: "GitHub tokens encrypted at rest",
            desc: "Tokens encrypted with AES-256-GCM in httpOnly cookies — never logged or exposed.",
          },
          {
            status: "\u2705",
            title: "GitHub OAuth scope minimised",
            desc: "read:user and public_repo only — no write access. Revocable any time.",
          },
          {
            status: "\u2705",
            title: "Geo-blocking enforced",
            desc: "Blocked in 7 jurisdictions at the middleware layer: US, UK, France, Australia, Canada, North Korea, Iran.",
          },
          {
            status: "\u2705",
            title: "Not a gambling product",
            desc: "Your capital, your deliverable. No counterparty. No house edge.",
          },
          {
            status: "\u23F3",
            title: "Smart contract audit pending",
            desc: "Planned before mainnet. Currently on Devnet.",
          },
          {
            status: "\u26A0\uFE0F",
            title: "Devnet only",
            desc: "Do not stake significant real SOL until mainnet launch and audit completion.",
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
        Create your first commitment. Lock SOL. Ship the proof.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/quest/create"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "text-primary-foreground rounded-lg font-medium"
          )}
        >
          Start a Commitment
        </Link>
        <Link
          href="/explore"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-lg")}
        >
          See Who&apos;s Shipping
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
          <SectionProofScore />
          <SectionValidator />
          <SectionSettlement />
          <SectionCreateACommitment />
          <SectionConnectGitHub />
          <SectionSubmitProof />
          <SectionClaimingStake />
          <SectionFAQ />
          <SectionGlossary />
          <SectionSecurity />
          <DocsCTA />
        </main>
      </div>
    </div>
  );
}
