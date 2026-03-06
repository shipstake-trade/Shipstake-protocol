<img width="2752" height="1502" alt="image" src="https://github.com/user-attachments/assets/2114c6ff-e507-41da-a1a7-e426b7c54cb0" />
<br><br>

SHIPSTAKE is a deterministic accountability protocol on Solana. Builders lock SOL as a performance bond against a public delivery commitment. An oracle validates the proof automatically. The smart contract settles without human intervention.

No committee. No vote. No discretion. Math, not feelings.

---

## Overview

Builders face zero financial consequences for missing deadlines. Grant programs disburse capital before delivery. Roadmaps are announced and forgotten. SHIPSTAKE inverts this by making non-delivery financially painful — automatically and on-chain.

**Self-Stake** — A builder locks SOL, sets a public deadline, and submits proof before it expires. Proof validates: stake returned minus a 2% fee. Deadline missed or proof fails: stake slashed. No external participants. No appeals.

Settlement is automatic. The rule is frozen at quest creation. Nothing changes after the builder signs.

---

## How It Works

```
Builder locks SOL → Quest published on-chain
  → Builder submits proof URL before deadline
  → Oracle fetches GitHub / Vercel API
  → Score computed deterministically
  → Contract settles: SHIPPED or SLASHED
```

The oracle is not an AI judge. It is a deterministic proof checker. Every API call is logged and replayable. Any party can verify the outcome by re-running the same calls against the same proof URL.

---

## PROOF Score

Every builder has an on-chain counter stored in `BuilderProfile`. It increments on each SHIPPED outcome and is queryable by any Solana program.

```
proof_score = quests_shipped
```

PROOF Score is queryable on-chain by any Solana program. Lending protocols, grant programs, job boards, and DAOs can gate access or extend credit based on verified delivery history.

---

## Protocol Economics

Fees apply only on SHIPPED outcomes. The protocol does not profit from builder failure.

| Outcome | Fee | Applied to   |
| ------- | ---- | ------------ |
| SHIPPED | 2%   | Stake amount |
| SLASHED | 0%   | —            |

Fee parameters are stored in `ProtocolConfig` and updatable by admin with a 48-hour timelock. Changes apply only to quests created after the update.

---

## Architecture

### On-Chain Accounts

**QuestAccount** — The core primitive. Stores builder pubkey, title, description, stake amount, deadline, status, proof URL, proof type, and slash destination.

**PoolVault** — PDA holding builder stake for a given quest. Releases funds on settlement only.

**BuilderProfile** — Stores PROOF Score (quests shipped count), quest history, and lifetime stake. Updated automatically at every settlement.

**ProtocolConfig** — Admin-controlled configuration. Oracle pubkey, fee parameters, fee vault, minimum stake, pause flag.

### PDA Derivation

```
Quest PDA:     ["quest", builder_pubkey, title_bytes]
PoolVault PDA: ["pool_vault", quest_pda]
Config PDA:    ["config"]
```

### Instructions

| Instruction           | Actor   | Description                                 |
| --------------------- | ------- | ------------------------------------------- |
| `initialize_protocol` | Admin   | Setup ProtocolConfig                        |
| `create_quest`        | Builder | Lock stake, create QuestAccount + PoolVault |
| `submit_proof`        | Builder | Submit proof URL, transition to IN_PROGRESS |
| `report_outcome`      | Oracle  | SHIPPED or SLASHED, execute settlement      |
| `claim_stake`         | Builder | Reclaim stake after SHIPPED                 |

### Quest Lifecycle

```
OPEN → IN_PROGRESS → SHIPPED
                   → SLASHED
```

| State       | Trigger                    | Actor   |
| ----------- | -------------------------- | ------- |
| OPEN        | Quest created, stake locked | Builder |
| IN_PROGRESS | Proof submitted            | Builder |
| SHIPPED     | Oracle validates proof     | Oracle  |
| SLASHED     | Deadline missed or invalid | Oracle  |

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

Threshold: score >= 70 = SHIPPED. Below = SLASHED.

The oracle keypair can call exactly one instruction: `report_outcome`. It cannot transfer funds. If compromised, an attacker can affect outcomes but cannot access user funds.

---

## Tech Stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| Smart contract | Anchor (Rust), Solana devnet        |
| Frontend       | Next.js 15, React 19, Tailwind v4   |
| Wallet auth    | Privy (Phantom, Solflare, Backpack) |
| GitHub OAuth   | Next.js API routes, AES-256-GCM     |
| UI components  | shadcn/ui, MagicUI                  |
| Oracle         | Node.js, Railway                    |
| Deployment     | Vercel                              |

---

## Repository Structure

```
src/
  app/
    api/
      auth/github/          GitHub OAuth initiation + callback
      github/               status, repos, disconnect endpoints
      waitlist/             Waitlist signup
    explore/                Quest board
    quest/
      [id]/                 Quest detail + submit proof
      create/               Create quest wizard (5 steps)
    portfolio/              Builder's own quests + GitHub connect
    leaderboard/            PROOF Score rankings
    builder/[address]/      Public builder profile
    gate/                   Wallet connection gate
  components/
    github/                 GitHubConnect, RepoSelector
    sections/               Landing page sections
    quest/                  Quest card, status badge, proof type badge
    builder/                Builder card, PROOF Score ring
    ui/                     Primitives (sol-amount, wallet-address, etc.)
  lib/
    github.ts               GitHub OAuth utilities (server-only, AES-256-GCM)
    solana/
      idl.ts                Program types and IDL (immutable)
      shipstake.ts          Anchor hooks (immutable)
      provider.tsx          Privy + Solana provider (immutable)
    mock-data.ts            Dev mock data
    utils.ts                Shared utilities
  middleware.ts             Geo-blocking (immutable)
```

---

## Environment Variables

```bash
# App
NEXT_PUBLIC_APP_URL=https://shipstake.trade/
NEXT_PUBLIC_PRIVY_APP_ID=

# GitHub OAuth (create app at https://github.com/settings/developers)
# Callback URL: <APP_URL>/api/auth/github/callback
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
# Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
GITHUB_TOKEN_ENCRYPTION_KEY=

# Email (Resend)
RESEND_API_KEY=
RESEND_AUDIENCE_ID=
```

---

## Development

```bash
# Install dependencies
pnpm install

# Run dev server (requires Node 22 LTS)
pnpm dev

# Type check
pnpm exec tsc --noEmit

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

GitHub access tokens are encrypted at rest using AES-256-GCM in httpOnly cookies. The plaintext token is never stored or logged. The `GITHUB_TOKEN_ENCRYPTION_KEY` must be rotated if compromised.

The slash destination for each quest is frozen at creation. The oracle cannot move funds. Admin actions require a 48-hour timelock. Builder double-claim is prevented by `builder_claimed: bool` on PoolVault.

---

## Compliance

SHIPSTAKE is a performance bond protocol. Stakes are not gambling instruments. There are no external participants taking financial positions in v0.

Geoblocked jurisdictions: US, GB, AU, CA, CN, KP, IR.

Prohibited terminology throughout the codebase: bet, gamble, odds, prediction market, positions, spectators.

---

## Status

- Network: Solana Devnet
- Version: 0.5
- Audit: Pre-audit
- Mainnet: Pending audit completion

---

## License

Proprietary. All rights reserved.
