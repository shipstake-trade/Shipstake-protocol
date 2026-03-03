import type {
  QuestAccount,
  QuestStatus,
  ProofType,
  Category,
  PoolVault,
} from "@/lib/solana/idl"

// ─── Stats ───────────────────────────────────────────────────────────────────

export const mockStats = {
  solStaked: 847.3,
  activeQuests: 34,
  shipRate: 89,
  builders: 127,
  totalQuests: 312,
}

// ─── Mock Quests (matching real QuestAccount from idl.ts) ────────────────────

const now = Math.floor(Date.now() / 1000)
const DAY = 86400

export const mockQuests: (QuestAccount & { publicKey: string; vault?: PoolVault })[] = [
  {
    publicKey: "QsT1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2wX3yZ",
    builder: "7xKX...4nPq",
    title: "DEX Aggregator v2",
    description: "Ship the complete DEX aggregator with Jupiter integration, limit orders, and DCA vaults on Solana devnet.",
    deadline: now + 14 * DAY,
    positionCloseTs: now + 7 * DAY,
    category: "DeFi" as Category,
    status: "Open" as QuestStatus,
    outcome: null,
    proofUrl: null,
    proofType: "GithubCommit" as ProofType,
    bump: 255,
    vault: {
      quest: "QsT1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2wX3yZ",
      builderStake: 5_000_000_000, // 5 SOL
      totalSuccessCommitments: 12_000_000_000,
      totalFailureCommitments: 3_000_000_000,
      bump: 254,
    },
  },
  {
    publicKey: "QsT2bC3dE4fG5hI6jK7lM8nO9pQ0rS1tU2vW3xY4zA",
    builder: "3mRq...8vKx",
    title: "NFT Collection Generator",
    description: "Build a generative art engine with trait layering, rarity calculation, and Metaplex Candy Machine V3 deployment.",
    deadline: now + 7 * DAY,
    positionCloseTs: now + 3 * DAY,
    category: "NFT" as Category,
    status: "InProgress" as QuestStatus,
    outcome: null,
    proofUrl: null,
    proofType: "VercelDeployment" as ProofType,
    bump: 254,
    vault: {
      quest: "QsT2bC3dE4fG5hI6jK7lM8nO9pQ0rS1tU2vW3xY4zA",
      builderStake: 2_000_000_000, // 2 SOL
      totalSuccessCommitments: 8_000_000_000,
      totalFailureCommitments: 5_000_000_000,
      bump: 253,
    },
  },
  {
    publicKey: "QsT3cD4eF5gH6iJ7kL8mN9oP0qR1sT2uV3wX4yZ5aB",
    builder: "9pLm...2dFn",
    title: "DAO Voting Dashboard",
    description: "Full-stack governance dashboard with SPL Governance integration, proposal creation, and real-time vote tracking.",
    deadline: now - 2 * DAY,
    positionCloseTs: now - 5 * DAY,
    category: "DAO" as Category,
    status: "Shipped" as QuestStatus,
    outcome: "Shipped",
    proofUrl: "https://github.com/example/dao-voting/commit/abc123",
    proofType: "GithubCommit" as ProofType,
    bump: 253,
    vault: {
      quest: "QsT3cD4eF5gH6iJ7kL8mN9oP0qR1sT2uV3wX4yZ5aB",
      builderStake: 3_000_000_000,
      totalSuccessCommitments: 15_000_000_000,
      totalFailureCommitments: 2_000_000_000,
      bump: 252,
    },
  },
  {
    publicKey: "QsT4dE5fG6hI7jK8lM9nO0pQ1rS2tU3vW4xY5zA6bC",
    builder: "5kHj...7gTs",
    title: "Solana Mobile dApp",
    description: "Build a Solana Mobile Stack dApp with Saga wallet integration and SMS-based transaction signing.",
    deadline: now - 5 * DAY,
    positionCloseTs: now - 8 * DAY,
    category: "Tools" as Category,
    status: "Slashed" as QuestStatus,
    outcome: "Slashed",
    proofUrl: null,
    proofType: "LiveUrl" as ProofType,
    bump: 252,
    vault: {
      quest: "QsT4dE5fG6hI7jK8lM9nO0pQ1rS2tU3vW4xY5zA6bC",
      builderStake: 1_500_000_000,
      totalSuccessCommitments: 4_000_000_000,
      totalFailureCommitments: 9_000_000_000,
      bump: 251,
    },
  },
  {
    publicKey: "QsT5eF6gH7iJ8kL9mN0oP1qR2sT3uV4wX5yZ6aB7cD",
    builder: "2nWp...6cRm",
    title: "Infrastructure Monitor",
    description: "Real-time Solana validator monitoring dashboard with alerting, performance metrics, and historical data.",
    deadline: now + 21 * DAY,
    positionCloseTs: now + 14 * DAY,
    category: "Infrastructure" as Category,
    status: "Open" as QuestStatus,
    outcome: null,
    proofUrl: null,
    proofType: "LiveUrl" as ProofType,
    bump: 251,
    vault: {
      quest: "QsT5eF6gH7iJ8kL9mN0oP1qR2sT3uV4wX5yZ6aB7cD",
      builderStake: 8_000_000_000,
      totalSuccessCommitments: 20_000_000_000,
      totalFailureCommitments: 6_000_000_000,
      bump: 250,
    },
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
  joinedAt: number // Unix timestamp
}

export const mockBuilderProfile: BuilderProfile = {
  address: "7xKXa4nPqR9sT1uV2wX3yZ5bC6dE8fG0hI1jK2lM3m",
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
  questsShipped: number
}

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, address: "9pLm...2dFn", proofScore: 95, shipRate: 97, totalStaked: 124.5, streak: 12, questsShipped: 31 },
  { rank: 2, address: "7xKX...4nPq", proofScore: 82, shipRate: 87, totalStaked: 47.5, streak: 5, questsShipped: 13 },
  { rank: 3, address: "3mRq...8vKx", proofScore: 78, shipRate: 82, totalStaked: 35.2, streak: 3, questsShipped: 9 },
  { rank: 4, address: "5kHj...7gTs", proofScore: 71, shipRate: 75, totalStaked: 22.1, streak: 2, questsShipped: 6 },
  { rank: 5, address: "2nWp...6cRm", proofScore: 68, shipRate: 71, totalStaked: 18.3, streak: 1, questsShipped: 5 },
  { rank: 6, address: "8vFb...3kQw", proofScore: 65, shipRate: 69, totalStaked: 15.7, streak: 0, questsShipped: 9 },
  { rank: 7, address: "4jNc...9hLx", proofScore: 61, shipRate: 65, totalStaked: 12.4, streak: 2, questsShipped: 11 },
  { rank: 8, address: "6tPd...1fRy", proofScore: 58, shipRate: 62, totalStaked: 9.8, streak: 0, questsShipped: 5 },
  { rank: 9, address: "1rGe...5mSz", proofScore: 54, shipRate: 58, totalStaked: 7.2, streak: 1, questsShipped: 7 },
  { rank: 10, address: "0qHf...4nTa", proofScore: 50, shipRate: 55, totalStaked: 5.1, streak: 0, questsShipped: 11 },
]

// ─── Ticker Items (for landing page marquee) ─────────────────────────────────

export interface TickerItem {
  address: string
  stake: number // in SOL
  title: string
  status: QuestStatus
  proofType: ProofType
}

export const mockTickerItems: TickerItem[] = [
  { address: "7xKX...4nPq", stake: 5.0, title: "DEX Aggregator v2", status: "Open", proofType: "GithubCommit" },
  { address: "3mRq...8vKx", stake: 2.0, title: "NFT Collection Generator", status: "InProgress", proofType: "VercelDeployment" },
  { address: "9pLm...2dFn", stake: 3.0, title: "DAO Voting Dashboard", status: "Shipped", proofType: "GithubCommit" },
  { address: "5kHj...7gTs", stake: 1.5, title: "Solana Mobile dApp", status: "Slashed", proofType: "LiveUrl" },
  { address: "2nWp...6cRm", stake: 8.0, title: "Infrastructure Monitor", status: "Open", proofType: "LiveUrl" },
  { address: "8vFb...3kQw", stake: 4.2, title: "Token Launchpad", status: "InProgress", proofType: "VercelDeployment" },
  { address: "4jNc...9hLx", stake: 6.1, title: "Analytics Dashboard", status: "Shipped", proofType: "GithubCommit" },
  { address: "6tPd...1fRy", stake: 3.7, title: "Wallet Tracker", status: "Open", proofType: "LiveUrl" },
  { address: "1rGe...5mSz", stake: 2.8, title: "Governance Module", status: "Validating", proofType: "GithubCommit" },
  { address: "0qHf...4nTa", stake: 1.2, title: "Bridge Interface", status: "InProgress", proofType: "VercelDeployment" },
]
