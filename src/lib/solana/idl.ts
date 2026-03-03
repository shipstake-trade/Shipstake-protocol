// SHIPSTAKE — Real on-chain program IDL
// Program ID: 3B2hgPZf15sUqZ9DhhNBjE6Lyi6NirbXLb9TMWpGAbeq

export const PROGRAM_ID = "3B2hgPZf15sUqZ9DhhNBjE6Lyi6NirbXLb9TMWpGAbeq"

// ─── Enums (must match contract exactly) ───────────────────────────────────

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

// ─── On-chain account types ─────────────────────────────────────────────────

export interface QuestAccount {
  builder: string        // PublicKey as base58
  title: string
  description: string
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

// ─── IDL (minimal, for Anchor Program constructor) ──────────────────────────

export const IDL = {
  address: "3B2hgPZf15sUqZ9DhhNBjE6Lyi6NirbXLb9TMWpGAbeq",
  metadata: { name: "shipstake", version: "0.1.0", spec: "0.1.0" },
  instructions: [
    {
      name: "createQuest",
      discriminator: [112, 49, 32, 224, 255, 173, 5, 7],
      accounts: [
        { name: "config", pda: { seeds: [{ kind: "const", value: [99, 111, 110, 102, 105, 103] }] } },
        { name: "quest", writable: true, pda: { seeds: [{ kind: "const", value: [113, 117, 101, 115, 116] }, { kind: "account", path: "builder" }, { kind: "arg", path: "title" }] } },
        { name: "poolVault", writable: true, pda: { seeds: [{ kind: "const", value: [112, 111, 111, 108, 95, 118, 97, 117, 108, 116] }, { kind: "account", path: "quest" }] } },
        { name: "builder", writable: true, signer: true },
        { name: "systemProgram", address: "11111111111111111111111111111111" },
      ],
      args: [
        { name: "title", type: "string" },
        { name: "description", type: "string" },
        { name: "deadline", type: "i64" },
        { name: "positionCloseTs", type: "i64" },
        { name: "category", type: { defined: { name: "Category" } } },
        { name: "stakeAmount", type: "u64" },
      ],
    },
    {
      name: "takePosition",
      discriminator: [33, 247, 99, 64, 57, 75, 247, 99],
      accounts: [
        { name: "config", pda: { seeds: [{ kind: "const", value: [99, 111, 110, 102, 105, 103] }] } },
        { name: "quest", writable: true },
        { name: "poolVault", writable: true, pda: { seeds: [{ kind: "const", value: [112, 111, 111, 108, 95, 118, 97, 117, 108, 116] }, { kind: "account", path: "quest" }] } },
        { name: "commitment", writable: true, pda: { seeds: [{ kind: "const", value: [99, 111, 109, 109, 105, 116, 109, 101, 110, 116] }, { kind: "account", path: "quest" }, { kind: "account", path: "supporter" }] } },
        { name: "supporter", writable: true, signer: true },
        { name: "systemProgram", address: "11111111111111111111111111111111" },
      ],
      args: [
        { name: "direction", type: { defined: { name: "CommitmentDirection" } } },
        { name: "amount", type: "u64" },
      ],
    },
    {
      name: "submitProof",
      discriminator: [54, 241, 46, 84, 4, 212, 46, 94],
      accounts: [
        { name: "quest", writable: true },
        { name: "builder", signer: true, relations: ["quest"] },
      ],
      args: [
        { name: "proofUrl", type: "string" },
        { name: "proofType", type: { defined: { name: "ProofType" } } },
      ],
    },
    {
      name: "claimSettlement",
      discriminator: [85, 208, 73, 229, 143, 98, 83, 212],
      accounts: [
        { name: "config", pda: { seeds: [{ kind: "const", value: [99, 111, 110, 102, 105, 103] }] } },
        { name: "quest" },
        { name: "poolVault", writable: true, pda: { seeds: [{ kind: "const", value: [112, 111, 111, 108, 95, 118, 97, 117, 108, 116] }, { kind: "account", path: "quest" }] } },
        { name: "commitment", writable: true, pda: { seeds: [{ kind: "const", value: [99, 111, 109, 109, 105, 116, 109, 101, 110, 116] }, { kind: "account", path: "quest" }, { kind: "account", path: "supporter" }] } },
        { name: "supporter", writable: true, signer: true },
      ],
      args: [],
    },
    {
      name: "claimStake",
      discriminator: [62, 145, 133, 242, 244, 59, 53, 139],
      accounts: [
        { name: "config", pda: { seeds: [{ kind: "const", value: [99, 111, 110, 102, 105, 103] }] } },
        { name: "quest" },
        { name: "poolVault", writable: true, pda: { seeds: [{ kind: "const", value: [112, 111, 111, 108, 95, 118, 97, 117, 108, 116] }, { kind: "account", path: "quest" }] } },
        { name: "builder", writable: true, signer: true },
      ],
      args: [],
    },
  ],
  accounts: [
    { name: "CommitmentAccount", discriminator: [155, 206, 108, 147, 168, 110, 100, 181] },
    { name: "PoolVault", discriminator: [9, 184, 204, 69, 231, 82, 252, 154] },
    { name: "ProtocolConfig", discriminator: [207, 91, 250, 28, 152, 179, 215, 209] },
    { name: "QuestAccount", discriminator: [150, 179, 23, 90, 199, 60, 121, 92] },
  ],
  types: [
    { name: "Category", type: { kind: "enum", variants: [{ name: "DeFi" }, { name: "NFT" }, { name: "Gaming" }, { name: "Infrastructure" }, { name: "Tools" }, { name: "DAO" }, { name: "Other" }] } },
    { name: "CommitmentDirection", type: { kind: "enum", variants: [{ name: "SuccessCommitment" }, { name: "FailureCommitment" }] } },
    { name: "ProofType", type: { kind: "enum", variants: [{ name: "GithubCommit" }, { name: "VercelDeployment" }, { name: "LiveUrl" }] } },
    { name: "QuestStatus", type: { kind: "enum", variants: [{ name: "Open" }, { name: "InProgress" }, { name: "Validating" }, { name: "Shipped" }, { name: "Slashed" }] } },
    { name: "QuestOutcome", type: { kind: "enum", variants: [{ name: "Shipped" }, { name: "Slashed" }] } },
  ],
  errors: [
    { code: 6000, name: "BuilderCannotTakePosition", msg: "Builder cannot take position on own quest" },
    { code: 6001, name: "AlreadyHasPosition", msg: "Already has a position on this quest" },
    { code: 6002, name: "PositionsClosed", msg: "Position window is closed" },
    { code: 6003, name: "QuestDeadlinePassed", msg: "Quest deadline has passed" },
    { code: 6004, name: "QuestNotResolved", msg: "Quest has not been resolved yet" },
    { code: 6005, name: "AlreadyClaimed", msg: "Already claimed" },
    { code: 6006, name: "WrongDirection", msg: "Wrong direction for this outcome" },
    { code: 6007, name: "Overflow", msg: "Arithmetic overflow" },
    { code: 6008, name: "StakeBelowMinimum", msg: "Stake below minimum" },
    { code: 6009, name: "PositionBelowMinimum", msg: "Position below minimum" },
  ],
} as const
