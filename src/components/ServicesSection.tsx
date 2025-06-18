
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Edit, Zap, Users, Shield, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Search,
    title: "Prompt Discovery",
    description: "Browse thousands of high-quality prompts across different categories and use cases.",
    features: ["Advanced search", "Category filters", "Rating system"]
  },
  {
    icon: Edit,
    title: "Custom Prompt Creation",
    description: "Create and customize prompts tailored to your specific needs and requirements.",
    features: ["Template builder", "AI assistance", "Version control"]
  },
  {
    icon: Zap,
    title: "AI Optimization",
    description: "Optimize your prompts for better performance and more accurate results.",
    features: ["Performance analytics", "A/B testing", "Auto-optimization"]
  },
  {
    icon: Users,
    title: "Community Sharing",
    description: "Share your prompts with the community and discover what others are creating.",
    features: ["Public sharing", "Community feedback", "Collaboration tools"]
  },
  {
    icon: Shield,
    title: "Enterprise Solutions",
    description: "Scalable prompt management solutions for teams and organizations.",
    features: ["Team management", "Private repositories", "Advanced analytics"]
  },
  {
    icon: Sparkles,
    title: "Premium Services",
    description: "Access exclusive prompts, priority support, and advanced features.",
    features: ["Exclusive content", "Priority support", "Advanced features"]
  }
];

const ServicesSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create, discover, and optimize AI prompts for any use case.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <service.icon className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
