import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrustBar from "./components/TrustBar";
import FeaturesSection from "./components/FeaturesSection";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Noise grain overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />

      <main id="main-content">
        <HeroSection />
        {/* <TrustBar /> */}
        <FeaturesSection />
        {/* <StatsSection />
        <TestimonialsSection /> */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
