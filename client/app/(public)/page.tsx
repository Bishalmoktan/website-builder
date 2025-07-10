import Navbar from "@/components/landing/navbar";
import HeroSection from "@/components/landing/hero-section";
import FeatureSection from "@/components/landing/feature-section";
import ExampleSection from "@/components/landing/example-section";
import Testimonials from "@/components/landing/testimonials";
import CTA from "@/components/landing/cta";
import Footer from "@/components/landing/footer";

const Page = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection />

      <FeatureSection />

      <ExampleSection />

      <Testimonials />

      <CTA />

      <Footer />
    </div>
  );
};

export default Page;
