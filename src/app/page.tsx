import dynamic from "next/dynamic";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";

const HowItWorks = dynamic(() =>
  import("@/components/sections/how-it-works").then((m) => ({ default: m.HowItWorks }))
);
const TwoModes = dynamic(() =>
  import("@/components/sections/two-modes").then((m) => ({ default: m.TwoModes }))
);
const ProofScore = dynamic(() =>
  import("@/components/sections/proof-score").then((m) => ({ default: m.ProofScore }))
);
const QuestTicker = dynamic(() =>
  import("@/components/sections/quest-ticker").then((m) => ({ default: m.QuestTicker }))
);
const Footer = dynamic(() =>
  import("@/components/sections/footer").then((m) => ({ default: m.Footer }))
);

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <HowItWorks />
      <TwoModes />
      <ProofScore />
      <QuestTicker />
      <Footer />
    </main>
  );
}
