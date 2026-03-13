import Background from "@/components/Background";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import TrustBar from "@/components/TrustBar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505]">
      <Background />
      <HeroSection />
      <HowItWorks />
      <Features />
      <TrustBar />
      <FinalCTA />
      <Footer />
    </main>
  );
}
