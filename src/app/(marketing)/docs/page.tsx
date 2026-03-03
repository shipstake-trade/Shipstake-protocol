import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Docs",
  description: `Protocol documentation for ${siteConfig.name}.`,
});

const sections = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p>
          SHIPSTAKE is an on-chain accountability protocol built on Solana. Builders lock SOL against a
          deadline and submit verifiable proof of work. An automated oracle scores the submission and
          settles the outcome — no committee, no appeals, no vibes.
        </p>
        <p className="mt-4">
          Every quest is a smart contract. Every outcome is deterministic. Nobody can intervene.
        </p>
      </>
    ),
  },
  {
    id: "quests",
    title: "Quests",
    content: (
      <>
        <p>
          A quest is the core unit of commitment on SHIPSTAKE. To open one, a builder specifies:
        </p>
        <ul className="mt-4 space-y-2 list-none">
          {[
            ["Stake amount", "SOL locked until settlement"],
            ["Deadline", "Unix timestamp — immutable once set"],
            ["Proof type", "GitHub commit, Vercel deploy, or live URL"],
            ["Quest title", "What you're committing to build"],
          ].map(([term, def]) => (
            <li key={term} className="flex gap-3">
              <span className="font-mono text-primary shrink-0">{term}</span>
              <span className="text-muted-foreground">— {def}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          The stake is escrowed by the program at creation time. Neither the builder nor anyone else
          can withdraw it until the oracle settles.
        </p>
      </>
    ),
  },
  {
    id: "proof-submission",
    title: "Proof Submission",
    content: (
      <>
        <p>
          Before the deadline, the builder submits a single URL as proof. Accepted proof types:
        </p>
        <div className="mt-4 space-y-3">
          {[
            {
              type: "GitHub Commit",
              desc: "A direct link to a commit on a public or private repo. The oracle verifies authorship, timestamp, and diff size via the GitHub API.",
            },
            {
              type: "Vercel Deploy",
              desc: "A deployment URL. The oracle checks the deploy timestamp and associated Git SHA.",
            },
            {
              type: "Live URL",
              desc: "Any publicly reachable URL. The oracle verifies uptime and, where possible, deployment metadata.",
            },
          ].map(({ type, desc }) => (
            <div key={type} className="border border-border rounded-md p-4">
              <p className="font-mono text-sm text-primary mb-1">{type}</p>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Submissions after the deadline are rejected by the program. The window is enforced at the
          contract level, not by the frontend.
        </p>
      </>
    ),
  },
  {
    id: "proof-score",
    title: "PROOF Score",
    content: (
      <>
        <p>
          Every submission is scored 0–100. The formula is deterministic and public:
        </p>
        <div className="mt-4 border border-border rounded-md p-4 font-mono text-sm space-y-1">
          <p>
            <span className="text-primary">PROOF</span> = base × 0.6 + speed × 0.15 + stake_weight × 0.15 + streak × 0.1
          </p>
          <p className="text-muted-foreground pt-2">Score ≥ 70 → SHIPPED &nbsp;·&nbsp; Score &lt; 70 → SLASHED</p>
        </div>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          {[
            ["base", "Code quality signal: diff size, file count, commit message."],
            ["speed", "Ratio of time used vs. time available. Earlier = higher."],
            ["stake_weight", "Normalised SOL amount relative to protocol median."],
            ["streak", "Consecutive shipped quests on the same wallet."],
          ].map(([term, def]) => (
            <div key={term} className="flex gap-3">
              <span className="font-mono text-foreground/70 shrink-0 w-28">{term}</span>
              <span>{def}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "settlement",
    title: "Settlement",
    content: (
      <>
        <p>
          Settlement is triggered automatically once the deadline passes and a proof has been scored.
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-border rounded-md p-4">
            <p className="font-mono text-sm text-primary mb-2">SHIPPED</p>
            <p className="text-sm text-muted-foreground">
              Full stake returned to builder. PROOF Score recorded on-chain. Streak incremented.
            </p>
          </div>
          <div className="border border-border rounded-md p-4">
            <p className="font-mono text-sm text-destructive mb-2">SLASHED</p>
            <p className="text-sm text-muted-foreground">
              Stake split: 80% to protocol treasury, 20% to the quest sponsor (if any). Streak reset to zero.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          No submission before the deadline = automatic SLASHED. The oracle does not need to be
          called — the program resolves on the next interaction.
        </p>
      </>
    ),
  },
  {
    id: "grant-guard",
    title: "Grant Guard (B2B)",
    content: (
      <>
        <p>
          Grant Guard is the B2B configuration of SHIPSTAKE for foundations and grant programs.
        </p>
        <p className="mt-4">
          A sponsor locks the grant tranche alongside builder-matching stake. If the milestone is
          missed, both the grant and the builder stake are recovered to the sponsor. Multi-signer
          program configuration is available for DAO-governed treasuries.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Contact{" "}
          <a href={`mailto:${siteConfig.links.email}`} className="text-primary hover:underline">
            {siteConfig.links.email}
          </a>{" "}
          for Grant Guard onboarding.
        </p>
      </>
    ),
  },
  {
    id: "contracts",
    title: "Contracts & Source",
    content: (
      <>
        <p>
          The SHIPSTAKE program is deployed on Solana Devnet. Mainnet deployment follows audit
          completion.
        </p>
        <div className="mt-4 space-y-2 text-sm font-mono">
          <div className="flex gap-3 items-center">
            <span className="text-muted-foreground shrink-0">Program IDL</span>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline truncate"
            >
              github.com/shipstake-trade/Shipstake-protocol
            </a>
          </div>
          <div className="flex gap-3 items-center">
            <span className="text-muted-foreground shrink-0">Network</span>
            <span className="text-foreground/70">Solana Devnet · Pre-Audit</span>
          </div>
        </div>
      </>
    ),
  },
];

export default function DocsPage() {
  return (
    <div className="container mx-auto max-w-[var(--container-max-width)] px-4 py-24">
      {/* Header */}
      <div className="mb-16 border-b border-border pb-10">
        <p className="text-xs font-mono text-primary uppercase tracking-widest mb-3">Documentation</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-foreground mb-4">
          Protocol Docs
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          How SHIPSTAKE works, end to end.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar TOC */}
        <aside className="lg:w-48 shrink-0">
          <nav className="sticky top-24 flex flex-col gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 space-y-16">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                {s.title}
              </h2>
              <div className="text-base text-muted-foreground leading-relaxed">
                {s.content}
              </div>
            </section>
          ))}

          {/* Footer CTA */}
          <div className="border border-border rounded-lg p-6 mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Questions not covered here? Reach out on X or open an issue on GitHub.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-primary hover:underline"
              >
                @shipstake →
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-primary hover:underline"
              >
                GitHub →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
