import type {
  QuestStatus,
  ProofType,
  Category,
} from "@/lib/solana/idl"

// ─── Stats ───────────────────────────────────────────────────────────────────

export const mockStats = {
  solStaked: 847.3,
  activeQuests: 34,
  shipRate: 89,
  builders: 127,
  totalQuests: 312,
}

// ─── Mock Quest type (standalone display type for UI) ───────────────────────

export type MockQuest = {
  publicKey: string
  builder: string
  mode: "SelfStake" | "GrantGuard"
  title: string
  description: string
  stakeAmount: number
  grantTranche: number | null
  deadline: number
  positionCloseTs: number
  category: Category
  status: QuestStatus
  outcome: "Shipped" | "Slashed" | null
  proofUrl: string | null
  proofType: ProofType | null
  repoOwner: string
  repoName: string
  slashDestination: string
  createdAt: number
  resolvedAt: number | null
  bump: number
  builderProofScore: number
  builderStreak: number
}

const now = Math.floor(Date.now() / 1000)
const DAY = 86400

export const mockQuests: MockQuest[] = [
  {
    publicKey: "QsT1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2wX3yZ",
    builder: "7xKX...4nPq",
    mode: "SelfStake",
    title: "DEX Aggregator v2",
    description: "Multi-hop routing with Orca, Raydium, and Jupiter integration.",
    stakeAmount: 5_000_000_000,
    grantTranche: null,
    deadline: now + 13 * DAY,
    positionCloseTs: now + 10 * DAY,
    category: "DeFi" as Category,
    status: "Open" as QuestStatus,
    outcome: null,
    proofUrl: null,
    proofType: "GithubCommit" as ProofType,
    repoOwner: "builder",
    repoName: "dex-aggregator-v2",
    bump: 255,
    slashDestination: "burn",
    createdAt: now - 1 * DAY,
    resolvedAt: null,
    builderProofScore: 82,
    builderStreak: 5,
  },
  {
    publicKey: "QsT2bC3dE4fG5hI6jK7lM8nO9pQ0rS1tU2vW3xY4zA",
    builder: "3mRq...8vKx",
    mode: "SelfStake",
    title: "NFT Collection Generator",
    description: "On-chain generative art system with trait rarity.",
    stakeAmount: 2_000_000_000,
    grantTranche: null,
    deadline: now + 6 * DAY,
    positionCloseTs: now + 3 * DAY,
    category: "NFT" as Category,
    status: "InProgress" as QuestStatus,
    outcome: null,
    proofUrl: "https://github.com/builder/nft-gen/actions/runs/12345",
    proofType: "VercelDeployment" as ProofType,
    repoOwner: "builder",
    repoName: "nft-gen",
    bump: 254,
    slashDestination: "burn",
    createdAt: now - 8 * DAY,
    resolvedAt: null,
    builderProofScore: 78,
    builderStreak: 3,
  },
  {
    publicKey: "QsT3cD4eF5gH6iJ7kL8mN9oP0qR1sT2uV3wX4yZ5aB",
    builder: "9pLm...2dFn",
    mode: "GrantGuard",
    title: "DAO Voting Dashboard",
    description: "On-chain governance UI for SPL governance programs.",
    stakeAmount: 3_000_000_000,
    grantTranche: 10_000_000_000,
    deadline: now - 2 * DAY,
    positionCloseTs: now - 5 * DAY,
    category: "DAO" as Category,
    status: "Shipped" as QuestStatus,
    outcome: "Shipped",
    proofUrl: "https://github.com/builder/dao-vote/commit/abc123",
    proofType: "GithubCommit" as ProofType,
    repoOwner: "builder",
    repoName: "dao-vote",
    bump: 253,
    slashDestination: "foundation_escrow",
    createdAt: now - 15 * DAY,
    resolvedAt: now - 1 * DAY,
    builderProofScore: 95,
    builderStreak: 12,
  },
  {
    publicKey: "QsT4dE5fG6hI7jK8lM9nO0pQ1rS2tU3vW4xY5zA6bC",
    builder: "5kHj...7gTs",
    mode: "SelfStake",
    title: "Solana Mobile dApp",
    description: "Mobile-first wallet and swap interface for Solana Mobile Stack.",
    stakeAmount: 1_500_000_000,
    grantTranche: null,
    deadline: now - 5 * DAY,
    positionCloseTs: now - 8 * DAY,
    category: "Tools" as Category,
    status: "Slashed" as QuestStatus,
    outcome: "Slashed",
    proofUrl: null,
    proofType: "GithubCommit" as ProofType,
    repoOwner: "builder",
    repoName: "solana-mobile-dapp",
    bump: 252,
    slashDestination: "burn",
    createdAt: now - 20 * DAY,
    resolvedAt: now - 4 * DAY,
    builderProofScore: 47,
    builderStreak: 0,
  },
  {
    publicKey: "QsT5eF6gH7iJ8kL9mN0oP1qR2sT3uV4wX5yZ6aB7cD",
    builder: "2nWp...6cRm",
    mode: "SelfStake",
    title: "Infrastructure Monitor",
    description: "Real-time Solana validator monitoring dashboard with alerting.",
    stakeAmount: 8_000_000_000,
    grantTranche: null,
    deadline: now + 20 * DAY,
    positionCloseTs: now + 14 * DAY,
    category: "Infrastructure" as Category,
    status: "Open" as QuestStatus,
    outcome: null,
    proofUrl: null,
    proofType: "VercelDeployment" as ProofType,
    repoOwner: "builder",
    repoName: "infra-monitor",
    bump: 251,
    slashDestination: "burn",
    createdAt: now - 3 * DAY,
    resolvedAt: null,
    builderProofScore: 68,
    builderStreak: 1,
  },
]

// ─── Builder Profile (client-side aggregated, not on-chain) ──────────────────

export interface BuilderProfile {
  address: string
  proofScore: number
  questsTotal: number
  questsShipped: number
  questsSlashed: number
  totalSolStaked: number
  currentStreak: number
  bestStreak: number
  joinedAt: number
}

export const mockBuilderProfile: BuilderProfile = {
  address: "2nWp...6cRm",
  proofScore: 82,
  questsTotal: 15,
  questsShipped: 13,
  questsSlashed: 2,
  totalSolStaked: 47.5,
  currentStreak: 5,
  bestStreak: 8,
  joinedAt: now - 90 * DAY,
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  rank: number
  address: string
  proofScore: number
  shipRate: number
  totalStaked: number
  streak: number
  shipped: number
}

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, address: "9pLm...2dFn", proofScore: 95, shipRate: 97, totalStaked: 124.5, streak: 12, shipped: 31 },
  { rank: 2, address: "7xKX...4nPq", proofScore: 82, shipRate: 87, totalStaked: 47.5, streak: 5, shipped: 13 },
  { rank: 3, address: "3mRq...8vKx", proofScore: 78, shipRate: 82, totalStaked: 35.2, streak: 3, shipped: 9 },
  { rank: 4, address: "5kHj...7gTs", proofScore: 71, shipRate: 75, totalStaked: 22.1, streak: 2, shipped: 6 },
  { rank: 5, address: "2nWp...6cRm", proofScore: 68, shipRate: 71, totalStaked: 18.3, streak: 1, shipped: 5 },
]

// ─── Ticker Items (for landing page marquee) ─────────────────────────────────

export interface TickerItem {
  builder: string
  stakeAmount: number // in SOL
  title: string
  status: QuestStatus
  proofType: ProofType
}

export const mockTickerItems: TickerItem[] = [
  { builder: "9pLm...2dFn", stakeAmount: 3.0, title: "DAO Voting Dashboard", status: "Shipped", proofType: "GithubCommit" },
  { builder: "2nWp...6cRm", stakeAmount: 8.0, title: "Infrastructure Monitor", status: "Open", proofType: "VercelDeployment" },
  { builder: "7xKX...4nPq", stakeAmount: 5.0, title: "DEX Aggregator v2", status: "Open", proofType: "GithubCommit" },
  { builder: "3mRq...8vKx", stakeAmount: 2.0, title: "NFT Collection Generator", status: "InProgress", proofType: "VercelDeployment" },
  { builder: "5kHj...7gTs", stakeAmount: 1.5, title: "Solana Mobile dApp", status: "Slashed", proofType: "GithubCommit" },
]
