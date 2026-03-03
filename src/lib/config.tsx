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
    title: "Prove it",
    titleHighlight: "on-chain.",
    description:
      "Lock SOL. Set a deadline. Ship the proof.\nThe oracle decides. On-chain. Automatically.",
    cta: "Start a Quest",
    ctaDescription: "Lock SOL to your next deadline",
    secondaryCta: "See Who's Shipping",
  },
  stats: [
    { value: 847, label: "SOL locked", suffix: "" },
    { value: 34, label: "active quests", suffix: "" },
    { value: 89, label: "ship rate", suffix: "%" },
    { value: 127, label: "builders", suffix: "" },
  ],
  howItWorks: [
    {
      step: 1,
      title: "Lock your stake",
      description:
        "Pick a deadline. Lock SOL. Your commitment is now public, on-chain, and non-negotiable.",
      icon: <AnchorIcon className="h-5 w-5" />,
    },
    {
      step: 2,
      title: "Ship the proof",
      description:
        "Submit a GitHub commit, a Vercel deploy, or a live URL. One URL. Before the deadline.",
      icon: <RocketIcon className="h-5 w-5" />,
    },
    {
      step: 3,
      title: "Oracle settles. Automatically.",
      description:
        "No committee. No vote. No vibes. Score >= 70 = SHIPPED. Below that = SLASHED. Math, not feelings.",
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
    socialLinks: [
      {
        icon: <Icons.github className="h-5 w-5" />,
        url: "https://github.com/shipstake-trade/Shipstake-protocol",
      },
      {
        icon: <Icons.twitter className="h-5 w-5" />,
        url: "https://x.com/shipstake",
      },
      {
        icon: <Icons.discord className="h-5 w-5" />,
        url: "https://discord.gg/shipstake",
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
