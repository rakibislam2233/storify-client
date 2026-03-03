import CTASection from "@/components/Pages/Home/CTASection";
import FeaturesSection from "@/components/Pages/Home/FeaturesSection";
import HeroSection from "@/components/Pages/Home/HeroSection";
import SubscriptionTiers from "@/components/Pages/Home/SubscriptionTiers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storify | Secure File Management System",
  description: "Professional subscription-based file and folder management with tiered storage plans.",
};

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <SubscriptionTiers />
      <CTASection />
    </div>
  );
};

export default HomePage;
