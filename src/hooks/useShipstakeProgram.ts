"use client"

import { useMemo } from "react"
import { PublicKey, Connection, Transaction } from "@solana/web3.js"
import { Program, AnchorProvider } from "@coral-xyz/anchor"
import { IDL, PROGRAM_ID } from "@/lib/solana/idl"
import { usePrivyWallet } from "@/lib/solana/shipstake"

/**
 * Hook returning an initialized Anchor Program for the real deployed contract.
 * Uses the Privy wallet + connection from usePrivyWallet.
 */
export function useShipstakeProgram() {
  const { mounted, connected, publicKey, wallet, connection } = usePrivyWallet()

  const program = useMemo(() => {
    if (!mounted || !connected || !publicKey || !wallet) return null

    const walletAdapter = {
      publicKey,
      signTransaction: async (tx: Transaction) => {
        const signedTx = await wallet.signTransaction(tx as any)
        return signedTx as any as Transaction
      },
      signAllTransactions: async (txs: Transaction[]) => {
        const signed = await Promise.all(txs.map(tx => wallet.signTransaction(tx as any)))
        return signed as any as Transaction[]
      },
    }

    const provider = new AnchorProvider(
      connection,
      walletAdapter as any,
      { commitment: "confirmed" },
    )

    return new Program(IDL as any, provider)
  }, [mounted, connected, publicKey, wallet, connection])

  return { program, connected, publicKey, mounted }
}
