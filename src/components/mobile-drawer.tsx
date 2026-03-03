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
import Link from "next/link";
import { Menu } from "lucide-react";

export function MobileDrawer() {
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
          <Link
            href="/gate"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full text-primary-foreground rounded-lg"
            )}
          >
            Connect Wallet
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
