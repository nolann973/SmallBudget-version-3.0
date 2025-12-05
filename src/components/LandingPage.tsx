import { AnimatedBackground } from "./AnimatedBackground";
import { Navbar } from "./landing/Navbar";
import { HeroSection } from "./landing/HeroSection";
import { StatsSection } from "./landing/StatsSection";
import { FeaturesSection } from "./landing/FeaturesSection";
import { PricingSection } from "./landing/PricingSection";
import { FAQSection } from "./landing/FAQSection";
import { Footer } from "./landing/Footer";

export const LandingPage = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AnimatedBackground />

      <div className="fixed inset-0 pointer-events-none z-[1]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};
