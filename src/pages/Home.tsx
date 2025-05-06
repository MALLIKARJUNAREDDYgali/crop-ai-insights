
import { useNavigate } from 'react-router-dom';
import { Sprout, Droplet, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/FeatureCard';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-section py-24 md:py-32 flex items-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Smarter Farming with AI
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Revolutionize your agricultural practices with our AI-powered solutions for crop management, fertilizer recommendations, and plant disease diagnosis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button 
              size="lg" 
              onClick={() => navigate('/crop-management')} 
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Get Crop Tips
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate('/fertilizer')} 
              className="bg-secondary hover:bg-secondary/90 text-white"
            >
              Fertilizer Suggestions
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate('/diagnosis')} 
              className="bg-accent hover:bg-accent/90"
            >
              Detect Plant Disease
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Smart Farming Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leverage the power of artificial intelligence and machine learning to optimize your farming operations and increase yields.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Sprout}
              title="Crop Management"
              description="Get personalized recommendations for crop selection and management based on your specific soil conditions, climate, and other environmental factors."
            />
            <FeatureCard 
              icon={Droplet}
              title="Fertilizer Recommendations"
              description="Receive precise fertilizer recommendations tailored to your crop's needs, soil nutrient levels, and growth stage to optimize yield and reduce waste."
            />
            <FeatureCard 
              icon={Bug}
              title="Disease Diagnosis"
              description="Quickly identify plant diseases through image recognition technology and get effective treatment recommendations to protect your crops."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform uses advanced machine learning algorithms to provide you with actionable insights for your farming operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Input Your Data</h3>
              <p className="text-gray-600">
                Provide information about your farm conditions, soil type, and specific needs through our easy-to-use forms.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI models analyze your data, comparing it with vast agricultural databases and research to generate insights.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive tailored recommendations and actionable insights to optimize your farming practices and increase productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Farming?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Start using our AI-powered tools today and see the difference in your agricultural productivity.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/crop-management')} 
            className="bg-white text-primary hover:bg-gray-100"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
