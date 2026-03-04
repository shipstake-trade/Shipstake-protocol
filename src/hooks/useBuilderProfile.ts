"use client"

import { useQuery } from "@tanstack/react-query"
import { PublicKey } from "@solana/web3.js"
import { fetchBuilderProfile } from "@/lib/solana/shipstake"
import { useShipstakeProgram } from "./useShipstakeProgram"

/**
 * React Query hook that fetches a BuilderProfile from chain.
 * Pass an explicit builder address, or omit to use the connected wallet.
 */
export function useBuilderProfile(builderAddress?: string) {
  const { program, publicKey } = useShipstakeProgram()

  const builder = builderAddress ? new PublicKey(builderAddress) : publicKey

  return useQuery({
    queryKey: ["builderProfile", builder?.toBase58() ?? null],
    queryFn: async () => {
      if (!program || !builder) return null
      return fetchBuilderProfile(program, builder)
    },
    enabled: !!program && !!builder,
    staleTime: 30_000,
  })
}
