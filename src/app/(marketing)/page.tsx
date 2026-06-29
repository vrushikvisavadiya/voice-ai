import { FaqSection } from "@/components/marketing/home/faq-section";
import { FeatureGridSection } from "@/components/marketing/home/feature-grid-section";
import { FeatureShowcaseSection } from "@/components/marketing/home/feature-showcase-section";
import { HeroSection } from "@/components/marketing/home/hero-section";
import { HowItWorksSection } from "@/components/marketing/home/how-it-works-section";
import { LogoStrip } from "@/components/marketing/home/logo-strip";
import { PricingSection } from "@/components/marketing/home/pricing-section";
import { TestimonialsAndCtaSection } from "@/components/marketing/home/testimonials-and-cta-section";

export default function MarketingHomePage() {
  return (
    <div className="relative overflow-x-hidden">
      {/* 1. Hero */}
      <HeroSection />
      <FeatureShowcaseSection /> 

      {/* 2. Social proof logo strip */}
      <LogoStrip />

      {/* 3. Feature grid — core capabilities */}
      <FeatureGridSection />

      {/* 4. How it works — step-by-step */}
      <HowItWorksSection />

      {/* 5. Pricing */}
      <PricingSection />

      {/* 6. Testimonials + dark CTA banner */}
      <TestimonialsAndCtaSection />

      {/* 7. FAQ */}
      <FaqSection />
    </div>
  );
}
