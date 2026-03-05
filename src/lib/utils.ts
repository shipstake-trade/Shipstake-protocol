import { siteConfig } from "@/lib/config";
import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Protocol fee calculation (aligned with on-chain ProtocolConfig) ─────────
// Tiered BPS: <10 SOL = 200bps, 10-100 SOL = 150bps, >100 SOL = 100bps
// Streak discount: ≥3 = -100bps, ≥5 = floor at 50bps (0.5%)

export const FEE_BPS_LOW = 200;  // <10 SOL — 2%
export const FEE_BPS_MID = 150;  // 10-100 SOL — 1.5%
export const FEE_BPS_HIGH = 100; // >100 SOL — 1%
export const GRANT_FEE_BPS = 150; // 1.5% on grant tranche

export function getSelfStakeFeeBps(stakeSol: number, streak: number = 0): number {
  let bps = stakeSol >= 100 ? FEE_BPS_HIGH : stakeSol >= 10 ? FEE_BPS_MID : FEE_BPS_LOW;
  if (streak >= 5) bps = Math.min(bps, 50); // floor 0.5%
  else if (streak >= 3) bps = Math.max(bps - 100, 0);
  return bps;
}

export function calcSelfStakeFee(stakeSol: number, streak: number = 0) {
  const bps = getSelfStakeFeeBps(stakeSol, streak);
  const fee = (stakeSol * bps) / 10000;
  return { fee, builderReceives: stakeSol - fee, bps };
}

export function calcGrantGuardFee(stakeSol: number, trancheSol: number) {
  const fee = (trancheSol * GRANT_FEE_BPS) / 10000;
  return { fee, builderReceives: stakeSol + trancheSol - fee, bps: GRANT_FEE_BPS };
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || siteConfig.url}${path}`;
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = absoluteUrl("/og"),
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  return {
    title: {
      template: "%s | " + siteConfig.name,
      default: siteConfig.name,
    },
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    icons: [
      { rel: "icon", url: "/brand/shipstake-mark.svg", type: "image/svg+xml" },
    ],
    metadataBase: new URL(siteConfig.url),
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    ...props,
  };
}

export function formatDate(date: string) {
  let currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}
