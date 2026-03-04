import { Icons } from "@/components/icons";
import {
  AnchorIcon,
  CheckCircleIcon,
  FlameIcon,
  GlobeIcon,
  RocketIcon,
  ShieldCheckIcon,
  TargetIcon,
  ZapIcon,
} from "lucide-react";

export const SHIPSTAKE_PROGRAM_ID = "H2NZtj6ncpknevBc6PUb3Qqd5UdeFXDyBrqWGEeqdaLv";
export const SOLANA_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC || "http://127.0.0.1:8899";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "SHIPSTAKE",
  description: "Prove it on-chain.",
  cta: "Start a Quest",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "SHIPSTAKE",
    "Solana",
    "accountability protocol",
    "shipping",
    "builder",
    "staking",
    "on-chain",
    "proof of work",
    "commitment",
    "delivery",
  ],
  links: {
    email: "support@shipstake.com",
    twitter: "https://x.com/shipstake",
    discord: "https://discord.gg/shipstake",
    github: "https://github.com/shipstake-trade/Shipstake-protocol",
  },
  navLinks: [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Docs", href: "/docs" },
  ] as { label: string; href: string; external?: boolean }[],
  hero: {
    badge: "Accountability Protocol · Solana",
    title: "Your reputation.",
    titleHighlight: "On-chain. Forever.",
    description:
      "Lock SOL as collateral on a delivery commitment.\nShip the proof. Oracle validates.\nPROOF Score updates. Permanently.",
    cta: "Create a Quest",
    ctaDescription: "Lock SOL as collateral on your next deadline",
    secondaryCta: "See Who's Shipping",
    incentiveLine: "Streak ≥5 → 0% fee · Ship early → earn bonus · Build your PROOF Score.",
  },
  stats: [
    { label: "avg PROOF Score", suffix: "", pending: true },
    { value: 0, label: "builders", suffix: "" },
    { label: "SOL locked", suffix: "", pending: true },
    { label: "ship rate", suffix: "%", pending: true },
  ] as { value?: number; label: string; suffix: string; pending?: boolean }[],
  howItWorks: [
    {
      step: 1,
      title: "Lock SOL as collateral",
      description:
        "Pick a deadline. Lock SOL. Your commitment is public, on-chain, and immutable.",
      icon: <AnchorIcon className="h-5 w-5" />,
    },
    {
      step: 2,
      title: "Build",
      description:
        "Ship the work. The oracle doesn't care about your excuses.",
      icon: <RocketIcon className="h-5 w-5" />,
    },
    {
      step: 3,
      title: "Submit proof",
      description:
        "GitHub commit. Vercel deploy. Live URL. Submitted before deadline.",
      icon: <ZapIcon className="h-5 w-5" />,
    },
    {
      step: 4,
      title: "Oracle settles",
      description:
        "SHIPPED → reclaim stake. PROOF Score goes up. SLASHED → lose your stake. Score drops 15 pts. No appeals. Final.",
      icon: <CheckCircleIcon className="h-5 w-5" />,
    },
  ],
  modes: [
    {
      name: "Grant Guard",
      tag: "B2B · Foundations",
      description: "Stop funding promises.",
      longDescription:
        "Lock the grant tranche on-chain. Builders post matching stake. No milestone = no funds. Automatic.",
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      features: [
        "Milestone-based fund release",
        "Automatic capital recovery on missed deadlines",
        "On-chain audit trail for every grant",
        "Multi-signer program configuration",
      ],
      cta: "Protect your grant",
    },
    {
      name: "Self-Stake",
      tag: "B2C · Builders",
      description: "Build in public. For real.",
      longDescription:
        "Lock your own SOL. Set a public deadline. Ship or get slashed. No external participants. Just you and the chain.",
      icon: <TargetIcon className="h-6 w-6" />,
      features: [
        "Lock SOL to your own deadlines",
        "Solo accountability — no external participants",
        "Build an immutable shipping reputation",
        "PROOF Score compounds with streaks",
      ],
      cta: "Start shipping",
    },
  ],
  proofScore: {
    title: "PROOF Score",
    subtitle: "Your reputation, computed.",
    description:
      "Not self-reported. Not gamed. Stored on-chain. Readable by any protocol.",
    components: [
      {
        name: "base",
        label: "Delivery rate",
        formula: "(shipped / total) x 100",
        description: "Your lifetime delivery rate across all quests",
        weight: "x60",
        icon: <CheckCircleIcon className="h-4 w-4" />,
      },
      {
        name: "speed",
        label: "Ship early",
        formula: "max(0, (deadline - submitted) / deadline) x 15",
        description: "Bonus for shipping ahead of schedule",
        weight: "x15",
        icon: <ZapIcon className="h-4 w-4" />,
      },
      {
        name: "stake_weight",
        label: "Skin in game",
        formula: "log2(total_sol_staked + 1) x 5",
        description: "Higher stakes signal higher conviction",
        weight: "x15",
        icon: <AnchorIcon className="h-4 w-4" />,
      },
      {
        name: "streak",
        label: "Consistency",
        formula: "min(consecutive_ships x 2, 10)",
        description: "Consecutive deliveries compound your score",
        weight: "x10",
        icon: <FlameIcon className="h-4 w-4" />,
      },
    ],
    tags: ["On-chain", "Non-gameable", "Composable"],
    composabilityBody:
      "Any Solana program can read your PROOF Score. Lending protocols. Grant programs. Job boards. You built the track record. It follows you.",
  },
  faqs: [
    {
      question: "What happens if I miss the deadline?",
      answer:
        "Your stake is slashed. It goes to the destination you set at quest creation — burn address or a fixed donation address. The oracle doesn't care why you missed it.",
    },
    {
      question: "Who validates my proof?",
      answer:
        "A deterministic oracle. It calls the GitHub or Vercel API, runs a scoring algorithm, and submits the result on-chain. No human in the loop. The logic is public and replayable.",
    },
    {
      question: "Can I extend my deadline?",
      answer:
        "No. The deadline is frozen at quest creation. That's the point.",
    },
    {
      question: "What is a PROOF Score?",
      answer:
        "An on-chain reputation metric (0-100) that reflects your delivery history. It's computed automatically at every settlement. You can't buy it. You can't fake it.",
    },
    {
      question: "What's the protocol fee?",
      answer:
        "2% on Self-Stake settlements. 1.5% on Grant Guard tranches. Only on SHIPPED outcomes — we don't profit from your failure.",
    },
    {
      question: "Is this a speculative market?",
      answer:
        "No. There are no external participants in v0. No one places a wager on you. No one wins if you fail. It's a performance bond — you against your own deadline.",
    },
  ],
  footer: {
    tagline: "Prove it on-chain.",
    subTagline: "Your reputation. On-chain. Forever.",
    columns: [
      {
        heading: "Protocol",
        links: [
          { text: "How It Works", url: "/#how-it-works" },
          { text: "Explore Quests", url: "/explore" },
          { text: "Create a Quest", url: "/quest/create" },
          { text: "Docs", url: "/docs" },
        ],
      },
      {
        heading: "PROOF Score",
        links: [
          { text: "What is PROOF Score?", url: "/docs#proof-score" },
          { text: "Leaderboard", url: "/leaderboard" },
          { text: "Builder Profiles", url: "/explore" },
        ],
      },
      {
        heading: "Ecosystem",
        links: [] as { text: string; url: string }[],
        teaser: [
          "Lending protocols (coming)",
          "DAO grant eligibility (coming)",
          "Verified Builder badge (coming)",
        ],
      },
    ],
    socialLinks: [
      {
        icon: <Icons.github className="h-5 w-5" aria-hidden="true" />,
        url: "https://github.com/shipstake-trade/Shipstake-protocol",
        label: "SHIPSTAKE on GitHub",
      },
      {
        icon: <Icons.twitter className="h-5 w-5" aria-hidden="true" />,
        url: "https://x.com/shipstake",
        label: "SHIPSTAKE on X (Twitter)",
      },
      {
        icon: <Icons.discord className="h-5 w-5" aria-hidden="true" />,
        url: "https://discord.gg/shipstake",
        label: "SHIPSTAKE Discord server",
      },
    ],
    links: [
      { text: "Docs", url: "/docs" },
      { text: "Explore Quests", url: "/explore" },
      { text: "Leaderboard", url: "/leaderboard" },
    ],
    bottomText: "All rights reserved.",
    brandText: "SHIPSTAKE",
    protocolVersion: "SHIPSTAKE v0.4 · Solana Devnet · Pre-Audit",
    geoNote:
      "Not available in restricted jurisdictions. This is not a gambling product.",
  },
};

export type SiteConfig = typeof siteConfig;
