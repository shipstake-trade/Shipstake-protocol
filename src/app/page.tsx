import dynamic from "next/dynamic";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { getWaitlistCount } from "@/lib/resend";

const BuiltOn = dynamic(() =>
  import("@/components/sections/built-on").then((m) => ({ default: m.default }))
);
const HowItWorks = dynamic(() =>
  import("@/components/sections/how-it-works").then((m) => ({ default: m.HowItWorks }))
);
const AntiScam = dynamic(() =>
  import("@/components/sections/anti-scam").then((m) => ({ default: m.AntiScam }))
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

export default async function Home() {
  const buildersCount = await getWaitlistCount();
  return (
    <main>
      <Header />
      <Hero buildersCount={buildersCount} />
      <BuiltOn />
      <HowItWorks />
      <AntiScam />
      <TwoModes />
      <ProofScore />
      <QuestTicker />
      <Footer />
    </main>
  );
}
