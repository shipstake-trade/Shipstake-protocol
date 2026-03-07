import dynamic from "next/dynamic";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";

const StatsTicker = dynamic(() =>
  import("@/components/sections/stats-ticker").then((m) => ({ default: m.StatsTicker }))
);
const HowItWorks = dynamic(() =>
  import("@/components/sections/how-it-works").then((m) => ({ default: m.HowItWorks }))
);
const ProofScore = dynamic(() =>
  import("@/components/sections/proof-score").then((m) => ({ default: m.ProofScore }))
);
const AntiScam = dynamic(() =>
  import("@/components/sections/anti-scam").then((m) => ({ default: m.AntiScam }))
);
const Footer = dynamic(() =>
  import("@/components/sections/footer").then((m) => ({ default: m.Footer }))
);

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <StatsTicker />
      <HowItWorks />
      <ProofScore />
      <AntiScam />
      <Footer />
    </main>
  );
}
