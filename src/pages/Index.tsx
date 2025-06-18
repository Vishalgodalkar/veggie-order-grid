
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import CTASection from '@/components/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <CTASection />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">PromptHub</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Your trusted platform for high-quality prompts and AI services. 
              Discover, create, and optimize your AI interactions.
            </p>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2024 PromptHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
