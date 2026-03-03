"use client";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth/solana";
import Link from "next/link";
import { Menu, LogOut, Copy } from "lucide-react";
import { toast } from "sonner";

function truncate(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function MobileDrawer() {
  const { ready, authenticated, logout } = usePrivy();
  const { wallets } = useWallets();
  const walletAddress = wallets[0]?.address ?? "";
  const isConnected = ready && authenticated && !!walletAddress;

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Address copied");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button type="button" aria-label="Open navigation menu">
          <Menu className="h-6 w-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6">
          <Link
            href="/"
            title="brand-logo"
            className="relative mr-6 flex items-center space-x-2"
          >
            <Icons.logo className="w-auto h-[40px]" />
            <DrawerTitle>{siteConfig.name}</DrawerTitle>
          </Link>
          <DrawerDescription>{siteConfig.description}</DrawerDescription>
        </DrawerHeader>

        <nav className="flex flex-col gap-y-2 px-6 py-4">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {link.label}
              {link.external && " →"}
            </Link>
          ))}
        </nav>

        <DrawerFooter className="flex flex-col gap-y-2">
          <Link
            href="/explore"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full rounded-lg"
            )}
          >
            Explore Quests
          </Link>
          {isConnected ? (
            <>
              <button
                onClick={copyAddress}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full rounded-lg font-mono gap-2"
                )}
              >
                <Copy className="h-3.5 w-3.5" />
                {truncate(walletAddress)}
              </button>
              <button
                onClick={() => logout()}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full rounded-lg text-destructive hover:text-destructive gap-2"
                )}
              >
                <LogOut className="h-3.5 w-3.5" />
                Disconnect
              </button>
            </>
          ) : (
            <Link
              href="/gate"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full text-primary-foreground rounded-lg"
              )}
            >
              Connect Wallet
            </Link>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
