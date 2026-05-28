// import { CtaSection } from "@/components/marketing/home/cta-section";
// import { FaqSection } from "@/components/marketing/home/faq-section";
// import { FeatureGridSection } from "@/components/marketing/home/feature-grid-section";
import { HeroSection } from "@/components/marketing/home/hero-section";
import { HowItWorksSection } from "@/components/marketing/home/how-it-works-section";
import { TestimonialsAndCtaSection } from "@/components/marketing/home/testimonials-and-cta-section";
// import { HowItWorksSection } from "@/components/marketing/home/how-it-works-section";
// import { LogoStrip } from "@/components/marketing/home/logo-strip";

export default function MarketingHomePage() {
  return (
    <div className="relative overflow-x-hidden">
      <HeroSection />
      <HowItWorksSection />
      <TestimonialsAndCtaSection />
      {/* <LogoStrip />
      <HowItWorksSection />
      <FeatureGridSection />
      <FaqSection />
      <CtaSection /> */}
    </div>
  );
}
