# SHIPSTAKE

**Prove it on-chain.**

SHIPSTAKE is a deterministic accountability protocol on Solana. Builders lock SOL as a performance bond against a public delivery commitment. An oracle validates the proof automatically. The smart contract settles without human intervention.

No committee. No vote. No discretion. Math, not feelings.

---

## Overview

Builders face zero financial consequences for missing deadlines. Grant programs disburse capital before delivery. Roadmaps are announced and forgotten. SHIPSTAKE inverts this by making non-delivery financially painful — automatically and on-chain.

The protocol exposes two modes:

**Self-Stake** — A builder locks SOL, sets a public deadline, and submits proof before it expires. Score 70 or above: stake returned. Below 70: slashed. No external participants. No appeals.

**Grant Guard** — A foundation locks a grant tranche on-chain. The builder posts matching stake. The oracle validates the milestone. SHIPPED: builder recovers stake and receives the tranche. SLASHED: stake transfers to the foundation, tranche returns untouched.

Settlement is automatic. The rule is frozen at quest creation. Nothing changes after the builder signs.

---

## How It Works

```
Builder posts stake
  → Quest published on-chain
  → Builder submits proof URL before deadline
  → Oracle fetches GitHub / Vercel API
  → Score computed deterministically
  → Contract settles: SHIPPED or SLASHED
```

The oracle is not an AI judge. It is a deterministic proof checker. Every API call is logged and replayable. Any party can verify the outcome by re-running the same calls against the same proof URL.

---

## PROOF Score

Every builder has an on-chain reputation metric stored in `BuilderProfile`. It is computed automatically at each settlement. It cannot be purchased or transferred.

```
base         = (quests_shipped / quests_total) × 60    // max 60
speed        = avg_early_delivery_days × 2             // max 15
stake_weight = log10(total_staked_lifetime_SOL) × 5    // max 15
streak       = streak_current × 1                      // max 10

proof_score  = min(100, base + speed + stake_weight + streak)
```

PROOF Score is queryable on-chain by any Solana program. Lending protocols, grant programs, job boards, and DAOs can gate access or extend credit based on verified delivery history.

---

## Protocol Economics

Fees apply only on SHIPPED outcomes. The protocol does not profit from builder failure.

| Mode        | Outcome | Fee  | Applied to        |
|-------------|---------|------|-------------------|
| Self-Stake  | SHIPPED | 2%   | Stake amount      |
| Self-Stake  | SLASHED | 0%   | —                 |
| Grant Guard | SHIPPED | 1.5% | Grant tranche     |
| Grant Guard | SLASHED | 0%   | —                 |

Fee parameters are stored in `ProtocolConfig` and updatable by admin with a 48-hour timelock. Changes apply only to quests created after the update.

---

## Architecture

### On-Chain Accounts

**QuestAccount** — The core primitive. Stores builder pubkey, mode, title, description, stake amount, deadline, status, proof URL, proof type, slash destination, and grant tranche.

**PoolVault** — PDA holding builder stake for a given quest. Releases funds on settlement only.

**BuilderProfile** — Stores PROOF Score, quest history, streak, and lifetime stake. Updated automatically at every settlement.

**GrantProgram** — Created by foundations. Defines the slash rule for all quests under that program. Fixed at creation.

**ProtocolConfig** — Admin-controlled configuration. Oracle pubkey, fee parameters, fee vault, minimum stake, pause flag.

### PDA Derivation

```
Quest PDA:        ["quest", builder_pubkey, title_bytes]
PoolVault PDA:    ["pool_vault", quest_pda]
GrantProgram PDA: ["grant_program", foundation_pubkey, name_bytes]
Config PDA:       ["config"]
```

### Instructions

| Instruction           | Actor       | Description                                      |
|-----------------------|-------------|--------------------------------------------------|
| `initialize_protocol` | Admin       | Setup ProtocolConfig                             |
| `create_grant_program`| Foundation  | Setup GrantProgram with fixed slash rule         |
| `create_quest`        | Builder     | Lock stake, create QuestAccount + PoolVault      |
| `submit_proof`        | Builder     | Submit proof URL, transition to IN_PROGRESS      |
| `report_outcome`      | Oracle      | SHIPPED or SLASHED, execute settlement           |
| `claim_stake`         | Builder     | Reclaim stake after SHIPPED                      |

No `take_position`. No `claim_settlement` for external participants. Not in v0.

### Quest Lifecycle

```
OPEN → IN_PROGRESS → SHIPPED
                   → SLASHED
```

| State       | Trigger                          | Actor   |
|-------------|----------------------------------|---------|
| OPEN        | Quest created, stake locked      | Builder |
| IN_PROGRESS | Proof submitted                  | Builder |
| SHIPPED     | Oracle validates, score >= 70    | Oracle  |
| SLASHED     | Deadline missed or score < 70    | Oracle  |

---

## Oracle

The oracle is a Node.js worker deployed on Railway. It polls for IN_PROGRESS quests with passed deadlines every 60 seconds and calls `report_outcome` on-chain.

**Proof validation algorithms:**

GitHub Commit
```
if commit_author matches builder wallet:  +40
if commit_timestamp <= quest_deadline:    +35
if lines_changed > 100:                   +15
elif lines_changed > 50:                  +8
```

Vercel Deployment
```
if deployment.readyState == "READY":      +50
if deployment.createdAt <= deadline:      +30
if deployment.target == "production":     +20
```

CI Pass (GitHub Actions)
```
if workflow_run.conclusion == "success":  +60
if workflow_run.created_at <= deadline:   +30
if repo matches declared repo:            +10
```

Threshold: score >= 70 = SHIPPED. Below = SLASHED.

The oracle keypair can call exactly one instruction: `report_outcome`. It cannot transfer funds. If compromised, an attacker can affect outcomes but cannot access user funds.

---

## Tech Stack

| Layer          | Technology                                      |
|----------------|-------------------------------------------------|
| Smart contract | Anchor (Rust), Solana devnet                    |
| Frontend       | Next.js 15, React 19, Tailwind v4               |
| Wallet         | Privy (Phantom, Solflare, Backpack)             |
| UI components  | shadcn/ui, MagicUI                              |
| Oracle         | Node.js, Railway                                |
| Deployment     | Vercel                                          |

---

## Repository Structure

```
shipstake-frontend/
  src/
    app/
      explore/          Quest board
      quest/
        [id]/           Quest detail + submit proof
        create/         Create quest wizard
      portfolio/        Builder's own quests
      leaderboard/      PROOF Score rankings
      builder/[address] Builder profile
      gate/             Wallet connection gate
    components/
      sections/         Landing page sections
      quest/            Quest card, status badge, proof type badge
      builder/          Builder card, PROOF Score ring
      ui/               Primitives (sol-amount, wallet-address, etc.)
    lib/
      solana/
        idl.ts          Program types and IDL (read-only)
        shipstake.ts    Anchor hooks (read-only)
        provider.tsx    Privy + Solana provider (read-only)
      mock-data.ts      Dev mock data
      utils.ts          Fee calculation helpers
    middleware.ts       Geo-blocking (read-only)
```

---

## Environment Variables

```bash
NEXT_PUBLIC_PRIVY_APP_ID=cmm8h3txq00yp0cjsg61arbz5
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PROGRAM_ID=3B2hgPZf15sUqZ9DhhNBjE6Lyi6NirbXLb9TMWpGAbeq
```

---

## Development

```bash
# Install dependencies
pnpm install

# Run dev server (requires Node 22 LTS)
nvm use 22
pnpm dev

# Type check
pnpm tsc --noEmit

# Lint
pnpm lint

# Build
pnpm build
```

---

## Security

Four files are non-negotiable and must never be modified without a protocol version review:

- `src/lib/solana/idl.ts`
- `src/lib/solana/shipstake.ts`
- `src/lib/solana/provider.tsx`
- `src/middleware.ts`

The slash destination for each quest is frozen at creation. The oracle cannot move funds. Admin actions require a 48-hour timelock. Builder double-claim is prevented by `builder_claimed: bool` on PoolVault.

---

## Compliance

SHIPSTAKE is a performance bond protocol. Stakes are not gambling instruments. There are no external participants taking financial positions in v0.

Geoblocked jurisdictions: US, GB, AU, CA, CN, KP, IR.

Prohibited terminology throughout the codebase: bet, gamble, odds, prediction market, positions, spectators.

---

## Status

- Network: Solana Devnet
- Version: 0.4
- Audit: Pre-audit
- Mainnet: Pending audit completion

---

## License

Proprietary. All rights reserved.
