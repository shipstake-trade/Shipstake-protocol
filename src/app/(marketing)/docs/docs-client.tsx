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
      { id: "oracle", label: "Oracle" },
      { id: "settlement", label: "Settlement" },
    ],
  },
  {
    label: "BUILDERS",
    items: [
      { id: "create-a-quest", label: "Create a Quest" },
      { id: "connect-github", label: "Connect GitHub" },
      { id: "submit-proof", label: "Submit Proof" },
      { id: "claiming-stake", label: "Claiming Your Stake" },
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
        Accountability Protocol &middot; Solana
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6">
        No excuses.
        <br />
        Just proof.
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
        SHIPSTAKE is an accountability protocol on Solana. Builders lock SOL against a public
        delivery commitment. An oracle validates the proof. The contract settles automatically.
        No judges. No humans. No mercy.
      </p>
      <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8">
        The protocol has one mode:{" "}
        <span className="text-foreground font-medium">Self-Stake</span>. You lock your own SOL,
        set your own deadline, and submit your own proof. Ship and get it back. Miss and lose it.
        Every settled quest writes to your on-chain PROOF Score.
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
      title: "Lock SOL",
      desc: "Set a title, deadline, and proof type. Optionally link a GitHub repository. Lock your SOL. The quest goes live on-chain immediately.",
    },
    {
      n: "02",
      title: "Build",
      desc: "Do the work. The blockchain is watching. Your quest is public. Your stake is real.",
    },
    {
      n: "03",
      title: "Submit Proof",
      desc: "Before the deadline, submit your proof URL — a GitHub commit or Vercel deployment link.",
    },
    {
      n: "04",
      title: "Shipped or Slashed",
      desc: "The oracle validates automatically. SHIPPED — reclaim your stake minus 2%. SLASHED — lose it. On-chain. Final.",
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
        Reputation, on-chain.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
        PROOF Score is your on-chain delivery counter, stored directly in your{" "}
        <span className="font-mono text-foreground text-sm">BuilderProfile</span>. It cannot be
        faked, deleted, or transferred. Every quest you ship is permanently recorded.
      </p>

      <div className="bg-secondary border border-border rounded-lg p-4 font-mono text-sm mb-6 max-w-2xl">
        <p className="text-muted-foreground/60 text-xs mb-3">// formula</p>
        <p>
          <span className="text-primary">proof_score</span>
          {" = quests_shipped"}
        </p>
        <div className="border-t border-border mt-3 pt-3 text-xs text-muted-foreground/60">
          Increments by 1 on every SHIPPED outcome. Stored on-chain. Read by any Solana program.
        </div>
      </div>

      <div className="space-y-2 text-sm mb-8">
        {[
          ["SHIPPED", "proof_score + 1"],
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

      <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-lg p-4 mb-8 max-w-2xl">
        <p className="text-sm text-emerald-400 font-medium mb-1">Composability</p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your PROOF Score is stored on-chain and readable by any Solana protocol.
          Lending protocols, DAO grant programs, and job boards can read it directly.
          Ship once. Prove it everywhere.
        </p>
      </div>

      <div className="max-w-2xl">
        <Screenshot caption="BuilderProfile — PROOF Score" />
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
        Deterministic. Auditable. Final.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-8">
        An oracle validates your proof automatically. It checks your submitted URL against
        GitHub and Vercel APIs, determines whether you shipped, and writes the outcome on-chain.
        No human judgment. No appeals. Resolution is final.
      </p>

      <div className="space-y-4 mb-8">
        {[
          {
            icon: "🔒",
            title: "Minimal blast radius",
            desc: "The oracle can only call report_outcome() — nothing else. It cannot move funds. If compromised: outcomes affected, funds safe.",
          },
          {
            icon: "⏱️",
            title: "48h timelock on replacement",
            desc: "Admin can replace the oracle with a 48-hour timelock. This prevents unilateral oracle changes without notice.",
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
            desc: "Submit a GitHub commit URL. The oracle validates authorship, timestamp, and lines changed via the GitHub API.",
          },
          {
            type: "Vercel Deploy",
            desc: "Submit a Vercel deployment URL. The oracle validates readiness, creation timestamp, and production target.",
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
            <li>Builder submits proof &rarr; oracle validates before deadline</li>
            <li>&rarr; SOL returned to builder minus 2% protocol fee</li>
            <li>&rarr; PROOF Score incremented by 1</li>
          </ul>
        </div>

        <div className="border-l-4 border-destructive bg-destructive/5 rounded-r-lg p-5">
          <p className="font-mono text-sm text-destructive font-bold mb-3">SLASHED</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>Deadline passes without valid proof</li>
            <li>&rarr; SOL sent to slash destination (set at creation, immutable)</li>
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
              <td className="py-3 px-4">Stake amount</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-destructive">SLASHED</td>
              <td className="py-3 px-4 font-mono text-foreground font-medium">0%</td>
              <td className="py-3 px-4">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-lg p-4">
        <p className="text-sm text-emerald-400 font-medium mb-1">Note</p>
        <p className="text-sm text-muted-foreground">
          Slash destination is set at quest creation and cannot be changed. This prevents builders
          from changing the destination before a likely slash. The 2% fee is only charged on
          SHIPPED outcomes — SHIPSTAKE does not profit from failure.
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
      title: "Details",
      desc: "Title (max 64 chars), description (max 256 chars), and category. This is the public record of your commitment.",
    },
    {
      n: "Step 2",
      title: "Proof Type",
      desc: "Choose how you will prove delivery: GitHub Commit URL or Vercel Deployment URL. This determines how the oracle validates your proof.",
    },
    {
      n: "Step 3",
      title: "Repository",
      desc: "Optionally link a GitHub repository to this quest. Requires GitHub to be connected in your Portfolio. The oracle will scope validation to this repo.",
    },
    {
      n: "Step 4",
      title: "Stake & Deadline",
      desc: "Stake amount in SOL (minimum 0.1). Deadline in days from now (1–90). Both are immutable after creation. A 2% fee is deducted on SHIPPED outcomes.",
    },
    {
      n: "Step 5",
      title: "Confirm & Sign",
      desc: "Review all parameters. Connect wallet if needed. Sign the transaction. The quest is live on-chain immediately.",
    },
  ];

  return (
    <section id="create-a-quest" className="scroll-mt-24">
      <h2 className="text-2xl font-bold font-display text-foreground mb-1">Create a Quest</h2>
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
          Once created, title, deadline, stake amount, and slash destination are immutable. The
          smart contract enforces this. No extensions. No appeals.
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
        Connecting your GitHub account lets you link a specific repository to each quest. This
        scopes oracle validation to your repo and makes your proof of authorship stronger.
      </p>

      <h3 className="font-bold text-foreground mb-4">How to connect</h3>
      <div className="glass-card rounded-lg p-5 mb-6">
        <ol className="space-y-3 text-sm text-muted-foreground">
          {[
            "Go to your Portfolio page (/portfolio).",
            "Click \"Connect GitHub\" in the top-right of the PROOF Score card.",
            "Authorise SHIPSTAKE on GitHub — read:user and public_repo scope only.",
            "You are redirected back. Your GitHub username and avatar appear immediately.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-mono text-primary shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <h3 className="font-bold text-foreground mb-4">Using it in quest creation</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        Once connected, Step 3 of the quest creation wizard shows a searchable list of your
        repositories. Select one to link it to the quest. The linked repository appears in the
        Confirm step summary and is recorded on the quest.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          {
            title: "OAuth scope",
            desc: "read:user and public_repo only. SHIPSTAKE cannot write to, fork, or modify your repositories.",
          },
          {
            title: "Encrypted at rest",
            desc: "Your access token is encrypted with AES-256-GCM and stored in an httpOnly cookie. It is never logged or exposed to the browser.",
          },
          {
            title: "Repository step is optional",
            desc: "You can skip the repository step. Oracle validation still works — linking a repo tightens the validation scope.",
          },
          {
            title: "Disconnect any time",
            desc: "Click \"Disconnect\" on your Portfolio page to remove access. Revoke the app on GitHub at any time for immediate effect.",
          },
        ].map((item) => (
          <div key={item.title} className="border border-border rounded-lg p-4">
            <p className="font-medium font-display text-foreground mb-1">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-lg p-4">
        <p className="text-sm text-emerald-400 font-medium mb-1">Revoking access</p>
        <p className="text-sm text-muted-foreground">
          To fully revoke access, go to{" "}
          <span className="font-mono text-foreground text-xs">
            GitHub &rarr; Settings &rarr; Applications &rarr; Authorized OAuth Apps
          </span>{" "}
          and revoke SHIPSTAKE. This invalidates the token immediately even if the cookie is still
          present.
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
          Submissions after the deadline are rejected by the program &mdash; not the frontend.
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
        <p className="text-sm text-yellow-400 font-medium mb-1">One submission per quest</p>
        <p className="text-sm text-muted-foreground">
          You can only submit proof once. The oracle processes it and the outcome is final.
          Choose your proof URL carefully before signing.
        </p>
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
        can claim your returned stake from your Portfolio page. The 2% protocol fee is deducted
        automatically at settlement &mdash; no separate fee transaction required.
      </p>

      <div className="glass-card rounded-lg p-5">
        <p className="font-medium font-display text-foreground mb-3">Claim flow</p>
        <ol className="space-y-2 text-sm text-muted-foreground">
          {[
            "Go to /portfolio — find your settled quest with SHIPPED status.",
            "Click \"Claim your SOL\" — the transaction is pre-populated.",
            "Sign with your connected wallet.",
            "SOL returns to your wallet, minus the 2% protocol fee.",
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
      q: "Can I edit my quest after creating it?",
      a: "No. Title, deadline, stake, and slash destination are immutable once the quest is on-chain. This is intentional — mutability would undermine the accountability mechanism.",
    },
    {
      q: "What proof types are supported?",
      a: "GitHub Commit URL and Vercel Deployment URL. Submit the URL before your deadline — the oracle handles the rest.",
    },
    {
      q: "What is the minimum stake?",
      a: "0.1 SOL. There is no maximum.",
    },
    {
      q: "Can I create multiple quests at the same time?",
      a: "Yes. Each quest is an independent on-chain account. You can have multiple active quests with separate deadlines and stakes.",
    },
    {
      q: "What is the protocol fee?",
      a: "A flat 2% on SHIPPED outcomes. Nothing is charged on SLASHED outcomes — SHIPSTAKE does not profit from your failure.",
    },
    {
      q: "Do I need to connect GitHub?",
      a: "No. GitHub connection is optional. It enables the repository selector in the quest creation wizard, which scopes oracle validation to your repo. You can still submit proof without it.",
    },
    {
      q: "What happens if the oracle is wrong?",
      a: "The oracle scores based on objective, deterministic criteria — commit authorship, timestamp, deployment readiness. Resolution is final. There is no appeals process.",
    },
    {
      q: "Is SHIPSTAKE available in my country?",
      a: "SHIPSTAKE is geo-blocked in 7 jurisdictions: the United States, the United Kingdom, France, Australia, Canada, North Korea, and Iran. See our Terms of Service for the full list.",
    },
    {
      q: "Is SHIPSTAKE gambling?",
      a: "No. SHIPSTAKE is an accountability protocol. You are committing your own capital against your own deliverable. There is no counterparty, no odds, and no house edge.",
    },
    {
      q: "Is the smart contract audited?",
      a: "Not yet. Audit is planned before mainnet. Currently on Solana Devnet. Do not use SHIPSTAKE with significant amounts until the audit is complete and published.",
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
    ["Self-Stake", "The core protocol mode: builder locks their own SOL against their own deadline"],
    ["PROOF Score", "On-chain delivery counter stored in BuilderProfile; increments on each SHIPPED"],
    ["Oracle", "Service that validates proofs and writes the outcome on-chain"],
    ["Slash Destination", "Fixed address receiving slashed SOL (set at creation, immutable)"],
    ["Ship Rate", "Percentage of quests resolved as SHIPPED out of total quests created"],
    ["SHIPPED", "Outcome: proof validated, stake returned to builder minus 2% fee"],
    ["SLASHED", "Outcome: deadline missed or proof invalid, stake sent to slash destination"],
    ["GitHub Connect", "Optional OAuth integration to link repositories to quests"],
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
            desc: "The oracle can only call report_outcome(). It cannot move funds. A compromised oracle cannot steal SOL — it can only affect outcomes.",
          },
          {
            status: "✅",
            title: "48h oracle replacement timelock",
            desc: "Admin cannot silently swap the oracle. Any replacement is delayed 48 hours, giving users time to react.",
          },
          {
            status: "✅",
            title: "GitHub tokens encrypted at rest",
            desc: "Access tokens are encrypted with AES-256-GCM before storage and kept in httpOnly cookies. The plaintext token is never logged or sent to the browser.",
          },
          {
            status: "✅",
            title: "GitHub OAuth scope minimised",
            desc: "SHIPSTAKE requests read:user and public_repo only. No write access to repositories. Revocable at any time from GitHub settings.",
          },
          {
            status: "✅",
            title: "Geo-blocking enforced",
            desc: "SHIPSTAKE is geo-blocked in 7 jurisdictions at the middleware layer: US, UK, France, Australia, Canada, North Korea, and Iran.",
          },
          {
            status: "✅",
            title: "Not a gambling product",
            desc: "Builders commit their own capital against their own deliverables. No counterparty. No odds. No house edge.",
          },
          {
            status: "⏳",
            title: "Smart contract audit pending",
            desc: "Audit is planned before mainnet launch. Pre-audit — use with appropriate caution.",
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
          <SectionProofScore />
          <SectionOracle />
          <SectionSettlement />
          <SectionCreateAQuest />
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
