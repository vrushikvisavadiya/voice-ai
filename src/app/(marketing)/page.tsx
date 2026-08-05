import { FaqSection } from "@/components/marketing/home/faq-section";
import { FeatureGridSection } from "@/components/marketing/home/feature-grid-section";
import { FeatureShowcaseSection } from "@/components/marketing/home/feature-showcase-section";
import { HeroSection } from "@/components/marketing/home/hero-section";
import { HowItWorksSection } from "@/components/marketing/home/how-it-works-section";
import { InsightsShowcaseSection } from "@/components/marketing/home/insights-showcase-section";
import { LogoStrip } from "@/components/marketing/home/logo-strip";
import { PricingSection } from "@/components/marketing/home/pricing-section";
import { TestimonialsAndCtaSection } from "@/components/marketing/home/testimonials-and-cta-section";

export default function MarketingHomePage() {
  return (
    <div className="relative overflow-x-hidden">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Insights Showcase Section (From Conversation to Clear Insights) */}
      <InsightsShowcaseSection />

      {/* 3. Feature Showcase */}
      <FeatureShowcaseSection />

      {/* 4. Social proof logo strip */}
      <LogoStrip />

      {/* 5. Feature grid — core capabilities */}
      <FeatureGridSection />

      {/* 6. How it works — step-by-step */}
      <HowItWorksSection />

      {/* 7. Pricing */}
      <PricingSection />

      {/* 8. Testimonials + dark CTA banner */}
      <TestimonialsAndCtaSection />

      {/* 9. FAQ */}
      <FaqSection />
    </div>
  );
}
