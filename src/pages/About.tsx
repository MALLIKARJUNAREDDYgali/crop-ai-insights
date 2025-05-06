
import { Leaf, Users, Database, Zap, BarChart, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">About CropAI</h1>
          <p className="text-xl text-gray-600">
            Revolutionizing agriculture with AI-powered insights and recommendations.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At CropAI, we're dedicated to revolutionizing agriculture through intelligent data analysis and 
            machine learning. Our mission is to make advanced agricultural insights accessible to farmers of all sizes, 
            helping them make data-driven decisions that optimize crop yields, reduce resource usage, and minimize environmental impact.
          </p>
          <p className="text-gray-700">
            We believe that by combining cutting-edge AI technology with generations of agricultural knowledge, 
            we can help address global food security challenges while promoting sustainable farming practices. 
            Our tools are designed to be practical, accurate, and easy to use, bridging the gap between 
            complex agricultural science and everyday farming decisions.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Data-Driven Insights</h3>
              <p className="text-gray-600">
                Our AI models are trained on comprehensive agricultural datasets, incorporating 
                soil science, meteorology, plant pathology, and crop-specific research. This allows 
                us to provide tailored recommendations based on a wide range of factors.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Advanced ML Algorithms</h3>
              <p className="text-gray-600">
                We use state-of-the-art machine learning algorithms that continuously improve as 
                they process more data. Our models can identify patterns and correlations that might 
                be missed by traditional analysis methods.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Processing</h3>
              <p className="text-gray-600">
                Our system can process and analyze data in real-time, allowing farmers to receive 
                immediate feedback and recommendations based on current conditions and the latest 
                agricultural research.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Sustainable Solutions</h3>
              <p className="text-gray-600">
                Our recommendations prioritize sustainable farming practices, helping farmers 
                reduce chemical usage, conserve water, and maintain soil health while still 
                achieving optimal crop yields.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Our Team</h2>
          <p className="text-gray-700 mb-6">
            CropAI brings together a diverse team of experts in agriculture, data science, machine learning, and software engineering. 
            Our collaborative approach combines practical farming knowledge with cutting-edge AI research to create solutions that 
            address real-world agricultural challenges.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Team member" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold text-lg">Dr. Sarah Chen</h3>
              <p className="text-gray-600">Chief Data Scientist</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Team member" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold text-lg">Michael Rodriguez</h3>
              <p className="text-gray-600">Agricultural Expert</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3" alt="Team member" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold text-lg">Amara Johnson</h3>
              <p className="text-gray-600">ML Engineer</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="mr-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Agricultural Innovation Award 2023</h3>
                <p className="text-gray-600">Recognized for our contribution to sustainable farming practices through AI technology.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Tech for Good Summit Finalist</h3>
                <p className="text-gray-600">Selected as a finalist for developing technology with positive social impact.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">10,000+ Farmers Served</h3>
                <p className="text-gray-600">Our platform has helped over ten thousand farmers across 30 countries improve their crop management.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">15% Average Yield Increase</h3>
                <p className="text-gray-600">Farmers using our recommendations have reported an average 15% increase in crop yields.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
