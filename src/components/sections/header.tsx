"use client";

import { Icons } from "@/components/icons";
import { MobileDrawer } from "@/components/mobile-drawer";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 h-[var(--header-height)] z-50 p-0 bg-background/80 backdrop-blur-md">
      <div className="flex justify-between items-center container mx-auto max-w-[var(--container-max-width)] p-2">
        {/* Logo */}
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <Icons.logo className="w-auto" />
          <span className="font-display font-bold text-lg">
            {siteConfig.name}
          </span>
        </Link>

        {/* Center nav — hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-x-6">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {link.label}
              {link.external && " →"}
            </Link>
          ))}
        </nav>

        {/* Right: CTAs */}
        <div className="hidden lg:flex items-center gap-x-3">
          <Link
            href="/explore"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-sm"
            )}
          >
            Explore Quests
          </Link>
          <Link
            href="/gate"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "text-primary-foreground rounded-lg font-medium"
            )}
          >
            Connect Wallet
          </Link>
        </div>

        {/* Mobile drawer */}
        <div className="mt-2 cursor-pointer block lg:hidden">
          <MobileDrawer />
        </div>
      </div>
      <hr className="absolute w-full bottom-0" />
    </header>
  );
}
