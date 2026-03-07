import { lazy } from "react";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { DocsContent } from "./docs-client";

export const metadata = constructMetadata({
  title: "Docs",
  description: `Protocol documentation for ${siteConfig.name}. Self-Stake, quest creation, GitHub connect, oracle settlement, and PROOF Score.`,
});

const Header = lazy(() =>
  import("@/components/sections/header").then((m) => ({ default: m.Header }))
);
const Footer = lazy(() =>
  import("@/components/sections/footer").then((m) => ({ default: m.Footer }))
);

export default function DocsPage() {
  return (
    <main>
      <Header />
      <DocsContent />
      <Footer />
    </main>
  );
}
