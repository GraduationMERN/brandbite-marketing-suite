import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeatureWalkthrough from "@/components/landing/FeatureWalkthrough";
import CustomerFlowStory from "@/components/landing/CustomerFlowStory";
import RoleBasedDemo from "@/components/landing/RoleBasedDemo";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeatureWalkthrough />
      {/* <CustomerFlowStory /> */}
      <div id="demo">
        <RoleBasedDemo />
      </div>
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
