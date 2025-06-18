
import { Button } from '@/components/ui/button';
import { ArrowRight, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16 px-4 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already creating amazing content with our AI prompts and services.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
            <Link to="/register">
              <UserPlus className="mr-2 h-5 w-5" />
              Sign Up Free
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
          >
            <Link to="/browse-prompts">
              Explore Prompts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-blue-100">Quality Prompts</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">50,000+</div>
            <div className="text-blue-100">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">99.9%</div>
            <div className="text-blue-100">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
