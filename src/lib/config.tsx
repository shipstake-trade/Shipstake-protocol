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
  description: "Stake your reputation. Ship on-chain.",
  cta: "Create a Quest",
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
    twitter: "https://twitter.com/shipstake",
    discord: "https://discord.gg/shipstake",
    github: "https://github.com/shipstake",
  },
  navLinks: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Docs", href: "#", external: true },
  ],
  hero: {
    badge: "Accountability Protocol on Solana",
    title: "Stake your reputation.",
    titleHighlight: "Ship on-chain.",
    description:
      "Lock SOL behind your shipping deadline. A deterministic oracle scores your delivery. Ship and earn back your stake — or get slashed. No votes, no committees, no vibes.",
    cta: "Create a Quest",
    ctaDescription: "Lock SOL to your next deadline",
    secondaryCta: "Explore Quests",
  },
  stats: [
    { value: 847, label: "SOL Staked", suffix: "" },
    { value: 34, label: "Active Quests", suffix: "" },
    { value: 89, label: "Ship Rate", suffix: "%" },
    { value: 127, label: "Builders", suffix: "" },
  ],
  howItWorks: [
    {
      step: 1,
      title: "Post your commitment",
      description:
        "Lock SOL behind your shipping deadline. Choose your proof type — GitHub commit, Vercel deploy, or live URL. Set your delivery window.",
      icon: <AnchorIcon className="h-5 w-5" />,
    },
    {
      step: 2,
      title: "Build and submit proof",
      description:
        "Submit your proof URL before the deadline. The oracle fetches and validates your delivery automatically. No human review needed.",
      icon: <RocketIcon className="h-5 w-5" />,
    },
    {
      step: 3,
      title: "Oracle settles automatically",
      description:
        "PROOF Score ≥ 70 = SHIPPED — you get your stake back. Score < 70 = SLASHED — your stake is redistributed. Deterministic. Transparent. Final.",
      icon: <CheckCircleIcon className="h-5 w-5" />,
    },
  ],
  modes: [
    {
      name: "Grant Guard",
      tag: "B2B",
      description: "Protect your grant capital",
      longDescription:
        "Foundations and DAOs lock grant tranches in SHIPSTAKE. Builders must ship milestones to unlock funds. If they miss deadlines, capital returns to the grant pool automatically.",
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      features: [
        "Milestone-based fund release",
        "Automatic capital recovery on missed deadlines",
        "On-chain audit trail for every grant",
        "Multi-signer program configuration",
      ],
      cta: "Set Up Grant Guard",
    },
    {
      name: "Self-Stake",
      tag: "B2C",
      description: "Build in public with skin in the game",
      longDescription:
        "Builders lock their own SOL to prove commitment. Community supporters can stake alongside — backing builders they believe will deliver. Earn your reputation on-chain.",
      icon: <TargetIcon className="h-6 w-6" />,
      features: [
        "Lock SOL to your own deadlines",
        "Community can back your commitment",
        "Build an immutable shipping reputation",
        "PROOF Score compounds with streaks",
      ],
      cta: "Stake Your Build",
    },
  ],
  proofScore: {
    title: "PROOF Score",
    subtitle: "Deterministic. Non-gameable. Composable.",
    description:
      "Your on-chain reputation, distilled into a single number. Every quest you ship — or miss — feeds the formula.",
    components: [
      {
        name: "base",
        label: "Ship Rate",
        formula: "(shipped / total) × 100",
        description: "Your lifetime delivery rate across all quests",
        weight: "40%",
        icon: <CheckCircleIcon className="h-4 w-4" />,
      },
      {
        name: "speed",
        label: "Speed Bonus",
        formula: "max(0, (deadline - submitted) / deadline) × 20",
        description: "Bonus for shipping ahead of schedule",
        weight: "20%",
        icon: <ZapIcon className="h-4 w-4" />,
      },
      {
        name: "stake_weight",
        label: "Stake Weight",
        formula: "log2(total_sol_staked + 1) × 5",
        description: "Higher stakes signal higher conviction",
        weight: "20%",
        icon: <AnchorIcon className="h-4 w-4" />,
      },
      {
        name: "streak",
        label: "Streak Multiplier",
        formula: "min(consecutive_ships × 2, 20)",
        description: "Consecutive deliveries compound your score",
        weight: "20%",
        icon: <FlameIcon className="h-4 w-4" />,
      },
    ],
    tags: ["On-chain", "Non-gameable", "Composable"],
  },
  faqs: [
    {
      question: "What is SHIPSTAKE?",
      answer:
        "SHIPSTAKE is an accountability protocol on Solana. Builders lock SOL behind shipping deadlines. A deterministic oracle validates delivery and settles stakes automatically — no votes, no committees.",
    },
    {
      question: "How does the oracle work?",
      answer:
        "When you submit proof (a GitHub commit URL, Vercel deployment, or live URL), the oracle fetches it automatically and computes your PROOF Score. Score ≥ 70 = SHIPPED, your stake returns. Score < 70 = SLASHED, your stake is redistributed.",
    },
    {
      question: "What happens if I miss my deadline?",
      answer:
        "If you don't submit proof before your deadline, your quest is automatically marked as SLASHED. Your staked SOL is redistributed to community supporters who backed the opposite outcome.",
    },
    {
      question: "What is a PROOF Score?",
      answer:
        "Your PROOF Score is a composable, on-chain reputation metric. It factors in your ship rate, delivery speed, total SOL staked, and consecutive shipping streaks. It's deterministic and non-gameable.",
    },
    {
      question: "Is my SOL safe?",
      answer:
        "All stakes are held in Solana program-owned vault accounts (PDAs). Funds are only released when the oracle settles the quest outcome. The protocol is fully non-custodial — your keys, your SOL.",
    },
    {
      question: "What are the two modes?",
      answer:
        "Grant Guard (B2B) lets foundations lock grant capital behind builder milestones. Self-Stake (B2C) lets individual builders lock their own SOL to prove commitment. Both use the same oracle and settlement logic.",
    },
  ],
  footer: {
    tagline: "Prove it. On-chain.",
    socialLinks: [
      {
        icon: <Icons.github className="h-5 w-5" />,
        url: "https://github.com/shipstake",
      },
      {
        icon: <Icons.twitter className="h-5 w-5" />,
        url: "https://twitter.com/shipstake",
      },
      {
        icon: <Icons.discord className="h-5 w-5" />,
        url: "https://discord.gg/shipstake",
      },
    ],
    links: [
      { text: "Docs", url: "#" },
      { text: "Blog", url: "/blog" },
      { text: "Explore Quests", url: "/explore" },
      { text: "Leaderboard", url: "/leaderboard" },
    ],
    bottomText: "All rights reserved.",
    brandText: "SHIPSTAKE",
    protocolVersion: "SHIPSTAKE v0.3 | Solana Devnet | Pre-Audit",
    geoNote:
      "This protocol is not available in restricted jurisdictions. By connecting your wallet you confirm you are not located in a restricted territory.",
  },
};

export type SiteConfig = typeof siteConfig;
