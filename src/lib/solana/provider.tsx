"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana"

const solanaConnectors = toSolanaWalletConnectors({ shouldAutoConnect: false })

interface SolanaProviderProps {
  children: React.ReactNode
}

export function SolanaProvider({ children }: SolanaProviderProps) {
  return (
    <PrivyProvider
      appId="cmm8h3txq00yp0cjsg61arbz5"
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#00C896",
          logo: "https://shipstake.trade/icon.svg",
          landingHeader: "// SHIPSTAKE",
          loginMessage: "Prove it. On-chain.",
          walletList: ["phantom", "solflare", "backpack"],
          showWalletLoginFirst: true,
        },
        externalWallets: {
          solana: { connectors: solanaConnectors },
        },
        embeddedWallets: {
          solana: { createOnLogin: "off" },
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}
