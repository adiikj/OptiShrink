import { CtaSection } from "@/components/marketing/CtaSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { Hero } from "@/components/marketing/Hero";
import { NumbersSection } from "@/components/marketing/NumbersSection";
import { Process } from "@/components/marketing/Process";
import { Tools } from "@/components/marketing/Tools";
import { WhySection } from "@/components/marketing/WhySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Tools />
      <Process />
      <WhySection />
      <NumbersSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
