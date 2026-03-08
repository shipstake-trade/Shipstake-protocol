import type { QuestStatus } from '@/lib/solana/idl'

export interface ApiQuest {
  pubkey: string
  builder: string
  title: string
  description: string | null
  stake_amount: number          // lamports
  deadline: number              // unix timestamp
  status: number                // 0=Open 1=InProgress 2=Validating 3=Shipped 4=Slashed
  proof_url: string | null
  repo_owner: string | null
  repo_name: string | null
  tx_signature: string | null
  created_at: string
}

export interface ApiProfile {
  address: string
  quests_total: number
  quests_shipped: number
  quests_slashed: number
  total_staked_lifetime: number  // lamports
  quest_nonce: number
  last_quest_at: number | null
  joined_at: number | null
  github_oauth_id: string | null
}

export interface ApiStats {
  quests_total: number
  sol_settled_lamports: number
  builders_count: number
  ship_rate_pct: number
}

const STATUS_MAP: Record<number, QuestStatus> = {
  0: 'Open',
  1: 'InProgress',
  2: 'Validating',
  3: 'Shipped',
  4: 'Slashed',
}

export function parseStatus(status: number | string): QuestStatus {
  if (typeof status === 'string') return status as QuestStatus
  return STATUS_MAP[status] ?? 'Open'
}

/** Ship rate as 0–100 integer, suitable for ProofScoreRing */
export function shipRate(shipped: number, total: number): number {
  if (total === 0) return 0
  return Math.round((shipped / total) * 100)
}
