
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Lightbulb className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Discover Premium AI Prompts
          <span className="text-blue-600 block">& Services</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Access thousands of expertly crafted prompts, AI tools, and services to enhance your productivity and creativity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
            <Link to="/browse-prompts">
              Browse Prompts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
