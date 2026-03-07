<div align="center">

# SHIPSTAKE

**Put your money where your roadmap is.**

Lock SOL on a deadline. Deliver → get it back. Miss → lose it. Automatically.

[![Live](https://img.shields.io/badge/live-shipstake.trade-00C896?style=flat-square)](https://shipstake.trade)
[![Built on Solana](https://img.shields.io/badge/built%20on-Solana-9945FF?style=flat-square&logo=solana)](https://solana.com)
[![Anchor](https://img.shields.io/badge/Anchor-Rust-orange?style=flat-square)](https://anchor-lang.com)
[![Oracle](https://img.shields.io/badge/oracle-live%20%E2%80%94%2060s%20polling-00C896?style=flat-square)](https://shipstake.trade)
[![Waitlist](https://img.shields.io/badge/waitlist-open-blue?style=flat-square)](https://shipstake.trade)

</div>

-----

## What is SHIPSTAKE?

SHIPSTAKE is a proof-of-delivery protocol on Solana.

Think of it like a **trust score for builders** — backed by real money and verified on the blockchain.

Here’s how it works:

1. **Set a commitment** — Pick what you’ll build and set a deadline
1. **Lock your deposit** — Put SOL behind your promise. Skin in the game.
1. **Ship the proof** — Submit your GitHub commit before the deadline
1. **Get paid or get penalized** — Deliver → get your deposit back. Miss → lose it. Automatically.

No humans involved. An automatic validator checks your proof and settles on the blockchain.

> **Your delivery record is permanent. Verifiable. Can’t be bought. Can’t be faked.**
> One bad delivery follows you forever. Every future grant committee sees it.

-----

## Why it exists

Solana has thousands of builders. Grant committees can’t tell who actually ships.

Roadmaps are promises. Promises are free. **Commitments cost something.**

SHIPSTAKE makes delivery verifiable — not by trusting builders, but by giving them a permanent, on-chain track record that speaks for itself.

-----

## How the automatic validator works

The oracle is live on Railway, polling every 60 seconds.

At deadline:

- It checks the linked GitHub repository for commits
- If valid proof exists → **SHIPPED** — deposit returned to builder
- If no proof → **PENALIZED** — deposit goes to slash destination (set at creation, immutable)

The validation is **deterministic and recomputable**. No oracle discretion. No appeals. No committees.

-----

## PROOF Score

Your PROOF Score is your builder reputation. It builds with every delivery.

|Factor        |Weight|What it measures                              |
|--------------|------|----------------------------------------------|
|Delivery rate |60%   |Did you deliver? This is the biggest factor.  |
|Early delivery|15%   |Shipped before the deadline? You earn a bonus.|
|Stake size    |15%   |Higher deposits signal higher conviction.     |
|Consistency   |10%   |Consecutive deliveries compound your score.   |


> Like a credit score — but for builders. And it actually means something.

-----

## Tech Stack

```
Frontend   Next.js 14 App Router · TypeScript · Tailwind · shadcn/ui
Auth       Privy (wallet + social login)
Contract   Anchor (Rust) · Solana · @solana/web3.js
RPC        Helius SDK
Oracle     Node.js · Railway · Supabase PostgreSQL
Email      Resend
Deploy     Vercel (frontend) · Railway (oracle)
```

-----

## Current Status

```
✅ Smart contract    Anchor/Rust — localnet E2E 12/12 tests passing
✅ Oracle            Live on Railway — polling every 60s — Supabase connected
✅ GitHub OAuth      AES-256-GCM encrypted token storage
✅ Frontend          Live at shipstake.trade — Next.js 14, Vercel
✅ Waitlist          Live — first external signups coming in
🔄 Devnet deploy     In progress (IMA-57)
⏳ Mainnet           After audit (Sec3 / OtterSec)
```

-----

## Architecture

```
shipstake-trade/
├── Shipstake-protocol/     ← Frontend (this repo)
│   ├── src/app/            ← Next.js App Router pages
│   ├── src/components/     ← UI components (shadcn/ui)
│   ├── src/lib/solana/     ← IDL, hooks, Anchor client  ← IMMUTABLE
│   └── middleware.ts       ← Geoblocking + auth gating  ← IMMUTABLE
│
└── shipstake-backend/      ← Oracle worker
    ├── src/index.ts        ← Cron polling + GitHub validation
    └── railway.toml        ← nixpacks Node 20 deploy config
```

**Immutable files** (do not modify):

```
src/lib/solana/idl.ts
src/lib/solana/shipstake.ts
src/lib/solana/provider.tsx
middleware.ts
```

-----

## Security

- Geoblocking: 7 jurisdictions (middleware layer)
- Auth gating: 3-layer protection (Privy + middleware + API)
- AES-256-GCM: GitHub token encryption at rest
- Slash destination: immutable at commitment creation
- Pre-mainnet: smart contract audit required (Sec3 / OtterSec)
- Pre-mainnet: multisig admin via Squads Protocol

-----

## Invariants

These never change, regardless of roadmap:

1. SOL native only — no LST
1. Oracle is deterministic — every outcome is recomputable
1. Slash destination is immutable at creation
1. No external positions in v0 (Self-Stake only)
1. Flat 2% settlement fee — no tiers in MVP
1. Maximum security — audit before mainnet
1. GitHub is the source of truth for shipping

-----

## Roadmap

**Now — Devnet**

- [ ] Devnet deploy + end-to-end public test (IMA-57)
- [ ] Legal pre-code checklist (IMA-35)

**Next — Mainnet**

- [ ] Smart contract audit (Sec3 / OtterSec)
- [ ] Shannon security scan frontend (IMA-37)
- [ ] Multisig admin (Squads Protocol)

**Later**

- [ ] Grant Guard — for foundations and DAOs
- [ ] Soul-Bound Access Tiers
- [ ] Oracle decentralization (3-phase)
- [ ] SaaS analytics for grant committees

-----

## Join

**Waitlist** → [shipstake.trade](https://shipstake.trade)

**X** → [@shipstake](https://x.com/shipstake)

If you build on Solana and you actually ship — this was built for you. 🫡