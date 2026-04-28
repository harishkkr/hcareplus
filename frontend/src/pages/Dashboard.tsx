import { Navbar } from "@/components/landing/Navbar";
import { AlertsBanner } from "@/components/landing/AlertsBanner";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { DistrictHeatmap } from "@/components/landing/DistrictHeatmap";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Team } from "@/components/landing/Team";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <AlertsBanner />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <DashboardPreview />
        <DistrictHeatmap />
        <HowItWorks />
        <Testimonials />
        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
