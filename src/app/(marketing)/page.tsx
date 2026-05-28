import { FaqSection } from "@/components/marketing/faq-section";
import { FeatureGridSection } from "@/components/marketing/feature-grid-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { LogoStrip } from "@/components/marketing/logo-strip";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";

export default function MarketingHomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(122,92,255,0.18),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(255,122,89,0.12),_transparent_28%)] dark:bg-[radial-gradient(circle_at_top,_rgba(140,120,255,0.2),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(255,122,89,0.1),_transparent_28%)]" />

      <MarketingHeader />

      <main className="pb-16">
        <HeroSection />
        <LogoStrip />
        <HowItWorksSection />
        <FeatureGridSection />
        <FaqSection />
      </main>

      <MarketingFooter />
    </div>
  );
}
