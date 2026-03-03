import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ProofScore } from "@/components/sections/proof-score";
import { QuestTicker } from "@/components/sections/quest-ticker";
import { TwoModes } from "@/components/sections/two-modes";

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
