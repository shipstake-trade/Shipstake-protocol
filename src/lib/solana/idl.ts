// SHIPSTAKE — Real on-chain program IDL
// Program ID: H2NZtj6ncpknevBc6PUb3Qqd5UdeFXDyBrqWGEeqdaLv

export const PROGRAM_ID = "H2NZtj6ncpknevBc6PUb3Qqd5UdeFXDyBrqWGEeqdaLv"

// ─── Enums (backward-compatible aliases used by UI) ─────────────────────────

export type Category = "DeFi" | "NFT" | "Gaming" | "Infrastructure" | "Tools" | "DAO" | "Other"

// Map Category string → Anchor enum object
export function categoryToAnchor(c: Category): object {
  const map: Record<Category, object> = {
    DeFi: { defi: {} },
    NFT: { nft: {} },
    Gaming: { gaming: {} },
    Infrastructure: { infrastructure: {} },
    Tools: { tools: {} },
    DAO: { dao: {} },
    Other: { other: {} },
  }
  return map[c]
}

// Direction: "SHIP" = SuccessCommitment, "FAIL" = FailureCommitment
export type PositionSide = "SHIP" | "FAIL"

export function sideToAnchor(side: PositionSide): object {
  return side === "SHIP" ? { successCommitment: {} } : { failureCommitment: {} }
}

export type ProofType = "GithubCommit" | "VercelDeployment" | "LiveUrl"

export function proofTypeToAnchor(pt: ProofType): object {
  const map: Record<ProofType, object> = {
    GithubCommit: { githubCommit: {} },
    VercelDeployment: { vercelDeployment: {} },
    LiveUrl: { liveUrl: {} },
  }
  return map[pt]
}

export type QuestStatus = "Open" | "InProgress" | "Validating" | "Shipped" | "Slashed"

// ─── On-chain account types (backward-compatible interfaces) ────────────────

export interface QuestAccount {
  builder: string        // PublicKey as base58
  title: string
  description: string
  stakeAmount: number    // lamports
  grantTranche: number | null  // null = Self-Stake, number = Grant Guard (lamports)
  deadline: number       // Unix timestamp (BN → number)
  positionCloseTs: number
  category: Category
  status: QuestStatus
  outcome: "Shipped" | "Slashed" | null
  proofUrl: string | null
  proofType: ProofType | null
  bump: number
}

export interface PoolVault {
  quest: string
  builderStake: number       // lamports
  totalSuccessCommitments: number
  totalFailureCommitments: number
  bump: number
}

export interface CommitmentAccount {
  quest: string
  supporter: string
  direction: "SuccessCommitment" | "FailureCommitment"
  amount: number
  settled: boolean
  bump: number
}

export interface ProtocolConfig {
  admin: string
  oracle: string
  feeBps: number
  grantFeeBps: number
  feeVault: string
  minStakeLamports: number
  minPositionLamports: number
  paused: boolean
  bump: number
}

// ─── New on-chain types from real contract ───────────────────────────────────

export interface BuilderProfileAccount {
  builder: string
  proofScore: number
  questsTotal: number
  questsShipped: number
  questsSlashed: number
  totalStakedLifetime: number
  streakCurrent: number
  streakBest: number
  questNonce: number
  lastQuestAt: number
  joinedAt: number
  bump: number
}

export interface GrantProgramAccount {
  foundation: string
  name: string
  slashToEscrow: boolean
  active: boolean
  questCount: number
  bump: number
}

// ─── IDL (real contract from shipstake.json) ─────────────────────────────────

export const IDL = {
  address: "H2NZtj6ncpknevBc6PUb3Qqd5UdeFXDyBrqWGEeqdaLv",
  metadata: { name: "shipstake", version: "0.1.0", spec: "0.1.0", description: "ShipStake — stake SOL on shipping quests" },
  instructions: [
    {
      name: "claim_stake",
      discriminator: [62, 145, 133, 242, 244, 59, 53, 139],
      accounts: [
        { name: "builder", writable: true, signer: true, relations: ["quest"] },
        { name: "quest" },
        { name: "pool_vault", writable: true, pda: { seeds: [{ kind: "const", value: [112, 111, 111, 108, 95, 118, 97, 117, 108, 116] }, { kind: "account", path: "quest" }] } },
      ],
      args: [],
    },
    {
      name: "create_grant_program",
      discriminator: [16, 63, 181, 58, 159, 223, 240, 178],
      accounts: [
        { name: "foundation", writable: true, signer: true },
        { name: "grant_program", writable: true },
        { name: "system_program", address: "11111111111111111111111111111111" },
      ],
      args: [
        { name: "name", type: "string" },
        { name: "slash_to_escrow", type: "bool" },
      ],
    },
    {
      name: "create_quest",
      discriminator: [112, 49, 32, 224, 255, 173, 5, 7],
      accounts: [
        { name: "builder", writable: true, signer: true },
        { name: "config", pda: { seeds: [{ kind: "const", value: [99, 111, 110, 102, 105, 103] }] } },
        { name: "builder_profile", writable: true, pda: { seeds: [{ kind: "const", value: [98, 117, 105, 108, 100, 101, 114, 95, 112, 114, 111, 102, 105, 108, 101] }, { kind: "account", path: "builder" }] } },
        { name: "quest", writable: true, pda: { seeds: [{ kind: "const", value: [113, 117, 101, 115, 116] }, { kind: "account", path: "builder" }, { kind: "arg", path: "nonce" }] } },
        { name: "pool_vault", writable: true, pda: { seeds: [{ kind: "const", value: [112, 111, 111, 108, 95, 118, 97, 117, 108, 116] }, { kind: "account", path: "quest" }] } },
        { name: "system_program", address: "11111111111111111111111111111111" },
      ],
      args: [
        { name: "nonce", type: "u64" },
        { name: "title", type: "string" },
        { name: "description", type: "string" },
        { name: "deadline", type: "i64" },
        { name: "mode", type: "u8" },
        { name: "slash_destination", type: "pubkey" },
        { name: "stake_amount", type: "u64" },
        { name: "grant_tranche", type: "u64" },
        { name: "grant_program", type: "pubkey" },
      ],
    },
    {
      name: "initialize_protocol",
      discriminator: [188, 233, 252, 106, 134, 146, 202, 91],
      accounts: [
        { name: "admin", writable: true, signer: true },
        { name: "config", writable: true, pda: { seeds: [{ kind: "const", value: [99, 111, 110, 102, 105, 103] }] } },
        { name: "fee_vault", writable: true },
        { name: "system_program", address: "11111111111111111111111111111111" },
      ],
      args: [
        { name: "oracle", type: "pubkey" },
        { name: "fee_bps_low", type: "u16" },
        { name: "fee_bps_mid", type: "u16" },
        { name: "fee_bps_high", type: "u16" },
        { name: "grant_fee_bps", type: "u16" },
        { name: "early_bonus_bps", type: "u16" },
        { name: "min_stake_lamports", type: "u64" },
      ],
    },
    {
      name: "report_outcome",
      discriminator: [12, 250, 114, 172, 2, 7, 2, 36],
      accounts: [
        { name: "oracle", signer: true },
        { name: "config", pda: { seeds: [{ kind: "const", value: [99, 111, 110, 102, 105, 103] }] } },
        { name: "quest", writable: true },
        { name: "builder", writable: true },
        { name: "fee_vault", writable: true },
        { name: "pool_vault", writable: true, pda: { seeds: [{ kind: "const", value: [112, 111, 111, 108, 95, 118, 97, 117, 108, 116] }, { kind: "account", path: "quest" }] } },
        { name: "builder_profile", writable: true, pda: { seeds: [{ kind: "const", value: [98, 117, 105, 108, 100, 101, 114, 95, 112, 114, 111, 102, 105, 108, 101] }, { kind: "account", path: "quest.builder", account: "QuestAccount" }] } },
        { name: "slash_destination", writable: true },
        { name: "instructions_sysvar", address: "Sysvar1nstructions1111111111111111111111111" },
      ],
      args: [
        { name: "outcome", type: "u8" },
        { name: "message", type: "bytes" },
        { name: "signature", type: "bytes" },
      ],
    },
    {
      name: "submit_proof",
      discriminator: [54, 241, 46, 84, 4, 212, 46, 94],
      accounts: [
        { name: "builder", signer: true, relations: ["quest"] },
        { name: "quest", writable: true },
      ],
      args: [
        { name: "proof_url", type: "string" },
        { name: "proof_type", type: "u8" },
      ],
    },
  ],
  accounts: [
    { name: "BuilderProfile", discriminator: [202, 117, 185, 141, 85, 237, 81, 168] },
    { name: "GrantProgram", discriminator: [44, 6, 52, 35, 212, 162, 70, 105] },
    { name: "PoolVault", discriminator: [9, 184, 204, 69, 231, 82, 252, 154] },
    { name: "ProtocolConfig", discriminator: [207, 91, 250, 28, 152, 179, 215, 209] },
    { name: "QuestAccount", discriminator: [150, 179, 23, 90, 199, 60, 121, 92] },
  ],
  errors: [
    { code: 6000, name: "QuestDeadlinePassed", msg: "Quest deadline has passed" },
    { code: 6001, name: "QuestNotOpen", msg: "Quest is not in Open status" },
    { code: 6002, name: "QuestNotInProgress", msg: "Quest is not in InProgress status" },
    { code: 6003, name: "QuestNotShipped", msg: "Quest is not in Shipped status" },
    { code: 6004, name: "StakeBelowMinimum", msg: "Stake amount is below minimum" },
    { code: 6005, name: "AlreadyClaimed", msg: "Stake already claimed" },
    { code: 6006, name: "InvalidOracleInstruction", msg: "Invalid Ed25519 oracle instruction" },
    { code: 6007, name: "InvalidOraclePubkey", msg: "Invalid oracle public key" },
    { code: 6008, name: "InvalidOracleMessage", msg: "Invalid oracle message" },
    { code: 6009, name: "ProtocolPaused", msg: "Protocol is paused" },
    { code: 6010, name: "Unauthorized", msg: "Unauthorized" },
    { code: 6011, name: "ArithmeticOverflow", msg: "Arithmetic overflow" },
  ],
  types: [
    {
      name: "BuilderProfile", type: {
        kind: "struct", fields: [
          { name: "builder", type: "pubkey" },
          { name: "proof_score", type: "u8" },
          { name: "quests_total", type: "u32" },
          { name: "quests_shipped", type: "u32" },
          { name: "quests_slashed", type: "u32" },
          { name: "total_staked_lifetime", type: "u64" },
          { name: "streak_current", type: "u16" },
          { name: "streak_best", type: "u16" },
          { name: "quest_nonce", type: "u64" },
          { name: "last_quest_at", type: "i64" },
          { name: "joined_at", type: "i64" },
          { name: "bump", type: "u8" },
        ],
      },
    },
    {
      name: "GrantProgram", type: {
        kind: "struct", fields: [
          { name: "foundation", type: "pubkey" },
          { name: "name", type: "string" },
          { name: "slash_to_escrow", type: "bool" },
          { name: "active", type: "bool" },
          { name: "quest_count", type: "u32" },
          { name: "bump", type: "u8" },
        ],
      },
    },
    {
      name: "PoolVault", type: {
        kind: "struct", fields: [
          { name: "quest", type: "pubkey" },
          { name: "builder_stake", type: "u64" },
          { name: "builder_claimed", type: "bool" },
          { name: "bump", type: "u8" },
        ],
      },
    },
    {
      name: "ProtocolConfig", type: {
        kind: "struct", fields: [
          { name: "admin", type: "pubkey" },
          { name: "oracle", type: "pubkey" },
          { name: "fee_bps_low", type: "u16" },
          { name: "fee_bps_mid", type: "u16" },
          { name: "fee_bps_high", type: "u16" },
          { name: "grant_fee_bps", type: "u16" },
          { name: "early_bonus_bps", type: "u16" },
          { name: "fee_vault", type: "pubkey" },
          { name: "min_stake_lamports", type: "u64" },
          { name: "paused", type: "bool" },
          { name: "bump", type: "u8" },
        ],
      },
    },
    {
      name: "QuestAccount", type: {
        kind: "struct", fields: [
          { name: "builder", type: "pubkey" },
          { name: "mode", type: "u8" },
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "stake_amount", type: "u64" },
          { name: "deadline", type: "i64" },
          { name: "status", type: "u8" },
          { name: "proof_url", type: "string" },
          { name: "proof_type", type: "u8" },
          { name: "slash_destination", type: "pubkey" },
          { name: "grant_tranche", type: "u64" },
          { name: "grant_program", type: "pubkey" },
          { name: "created_at", type: "i64" },
          { name: "resolved_at", type: "i64" },
          { name: "bump", type: "u8" },
        ],
      },
    },
  ],
} as const

export type Shipstake = typeof IDL

// ─── Fee calculation helpers ────────────────────────────────────────────────

export const SELF_STAKE_FEE_BPS = 200   // 2%
export const GRANT_GUARD_FEE_BPS = 150  // 1.5%

/** Compute protocol fee in lamports for a SHIPPED quest */
export function computeShippedFee(
  stakeAmountLamports: number,
  grantTrancheLamports: number | null,
): number {
  if (grantTrancheLamports !== null) {
    return Math.floor((grantTrancheLamports * GRANT_GUARD_FEE_BPS) / 10_000)
  }
  return Math.floor((stakeAmountLamports * SELF_STAKE_FEE_BPS) / 10_000)
}

/** Compute builder net payout in lamports for a SHIPPED quest */
export function computeBuilderNetPayout(
  stakeAmountLamports: number,
  grantTrancheLamports: number | null,
): number {
  const fee = computeShippedFee(stakeAmountLamports, grantTrancheLamports)
  if (grantTrancheLamports !== null) {
    return stakeAmountLamports + grantTrancheLamports - fee
  }
  return stakeAmountLamports - fee
}
