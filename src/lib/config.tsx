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
    { label: "Self-Stake", href: "/#modes" },
    { label: "Grant Guard", href: "/#modes" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Docs", href: "/docs" },
  ] as { label: string; href: string; external?: boolean }[],
  hero: {
    badge: "Accountability Protocol · Solana",
    title: "Your reputation.",
    titleHighlight: "On-chain. Forever.",
    description:
      "Lock SOL before you start building.\nShip the proof. Get it back. Miss the deadline. Lose it.",
    tensionLine: "Talk is mass-produced. Your PROOF Score isn't.",
    cta: "Lock SOL on a Deadline",
    ctaDescription: "Lock SOL as collateral on your next deadline",
    secondaryCta: "See Who's Shipping",
    incentiveLine: "Streak ≥3 → lower fee. Streak ≥5 → zero fee. Ship early → earn bonus.",
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
      title: "Put SOL on the line",
      description:
        "Pick a deadline. Deposit SOL into the smart contract. That SOL is frozen until the deadline passes. Think of it as a security deposit on your own promise.",
      icon: <AnchorIcon className="h-5 w-5" />,
    },
    {
      step: 2,
      title: "Build against the clock",
      description:
        "Your commitment is public and on-chain. Anyone can see it. The deadline doesn't move. The oracle doesn't care why you're behind.",
      icon: <RocketIcon className="h-5 w-5" />,
    },
    {
      step: 3,
      title: "Submit a link",
      description:
        "Paste a GitHub commit URL or a Vercel deploy link before the deadline. That's it. The oracle calls the API and checks if the proof is real.",
      icon: <ZapIcon className="h-5 w-5" />,
    },
    {
      step: 4,
      title: "Shipped or slashed",
      description:
        "Proof validates → your SOL comes back minus a small fee. Proof fails or deadline passes → your SOL is gone. PROOF Score updates either way. No appeals. Final.",
      icon: <CheckCircleIcon className="h-5 w-5" />,
    },
  ],
  modes: [
    {
      name: "Grant Guard",
      tag: "B2B · Foundations & DAOs",
      description: "For foundations",
      longDescription:
        "Foundations lose money on grants that never ship. It happens constantly. A builder gets funded, disappears, and there's no enforcement mechanism besides reputation damage — which doesn't recover the capital.\n\nGrant Guard locks funds in the smart contract. Builders post matching collateral. If the milestone ships, funds release automatically. If it doesn't, the foundation's capital is returned. No committees. No chasing invoices. The contract settles it.",
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      cta: "Protect a grant",
    },
    {
      name: "Self-Stake",
      tag: "B2C · Indie Builders",
      description: "For builders",
      longDescription:
        "Anyone can say they're building something. Most of them never ship. The ones who do have no way to prove consistency — just a Twitter thread and a pinned repo.\n\nSelf-Stake lets you lock your own SOL against your own deadline. Ship and get it back. Miss and lose it. Every settled commitment writes to your PROOF Score. Over time, that score becomes the only credential that matters — because you can't buy it.",
      icon: <TargetIcon className="h-6 w-6" />,
      cta: "Start shipping",
    },
  ],
  proofScore: {
    title: "PROOF Score",
    subtitle: "Your track record, computed.",
    description:
      "A number from 0 to 100 that reflects how reliably you deliver. Calculated automatically every time a commitment settles. Stored on-chain. You can't edit it, buy it, or reset it.",
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
      "Any program on Solana can read your PROOF Score directly from the blockchain. A lending protocol could use it to set your collateral ratio. A DAO could require a minimum score to apply for grants. A job board could filter by it. You build the record once. It follows you everywhere.",
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
          { text: "Self-Stake", url: "/#modes" },
          { text: "Grant Guard", url: "/#modes" },
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
      { text: "How It Works", url: "/#how-it-works" },
      { text: "Docs", url: "/docs" },
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
