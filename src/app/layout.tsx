import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/config";
import { fontDisplay, fontMono, fontSans, fontSerif } from "@/lib/fonts";
import { SolanaProvider } from "@/lib/solana/provider";
import { cn, constructMetadata } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = constructMetadata({
  title: `${siteConfig.name} | ${siteConfig.description}`,
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0A0C0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${fontSans.variable} ${fontMono.variable} ${fontSerif.variable} ${fontDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://auth.privy.io" />
        <link rel="dns-prefetch" href="https://auth.privy.io" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased w-full mx-auto scroll-smooth font-sans"
        )}
      >
        <SolanaProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            {children}
            <Toaster
              theme="dark"
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--foreground)",
                },
              }}
            />
            <TailwindIndicator />
            <Analytics />
          </ThemeProvider>
        </SolanaProvider>
      </body>
    </html>
  );
}
