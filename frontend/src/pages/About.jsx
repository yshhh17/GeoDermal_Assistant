import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FaHeart, FaLightbulb, FaUsers, FaGlobeAsia } from 'react-icons/fa';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-secondary to-bg-accent">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-text-primary mb-4">
            About GeoDermal Assistant
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Your intelligent travel companion for personalized skin and hair care recommendations based on environmental conditions
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold text-text-primary">Our Mission</h2>
          </div>
          <p className="text-lg text-text-secondary leading-relaxed mb-4">
            GeoDermal Assistant was born from a simple observation: travelers often struggle with unexpected skin and hair problems when visiting new destinations. Climate changes, water quality differences, pollution levels, and UV exposure can significantly impact your appearance and comfort during trips. 
          </p>
          <p className="text-lg text-text-secondary leading-relaxed">
            Our mission is to empower travelers with personalized, data-driven recommendations so you can look and feel your best wherever you go. We combine real-time environmental data with AI-powered analysis to provide actionable advice tailored to your unique needs.
          </p>
        </div>

        {/* What We Do */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold text-text-primary">What We Do</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-start">
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Real-Time Environmental Analysis</h3>
                <p className="text-text-secondary">
                  We gather live data on temperature, humidity, UV index, air quality (AQI, PM2.5), and water hardness for 30+ major Indian cities.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">AI-Powered Risk Assessment</h3>
                <p className="text-text-secondary">
                  Our AI analyzes how environmental changes will affect your specific skin or hair type, providing personalized risk scores for conditions like dryness, acne, frizz, and more.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Personalized Recommendations</h3>
                <p className="text-text-secondary">
                  Get tailored advice on products, routines, and precautions based on your trip duration, skin/hair type, and destination conditions.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Comprehensive Reports</h3>
                <p className="text-text-secondary">
                  Receive detailed analysis including environmental data, risk scores, and actionable recommendations all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold text-text-primary">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-bg-secondary p-6 rounded-xl">
              <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center">
                Accuracy
              </h3>
              <p className="text-text-secondary">
                We use reliable data sources and advanced AI to provide accurate, trustworthy recommendations.
              </p>
            </div>

            <div className="bg-bg-accent p-6 rounded-xl">
              <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center">
                Privacy
              </h3>
              <p className="text-text-secondary">
                Your data is never shared or sold.  We respect your privacy and protect your information.
              </p>
            </div>

            <div className="bg-bg-secondary p-6 rounded-xl">
              <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center">
                Innovation
              </h3>
              <p className="text-text-secondary">
                We continuously improve our AI models and expand our coverage to serve you better.
              </p>
            </div>

            <div className="bg-bg-accent p-6 rounded-xl">
              <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center">
                User-First
              </h3>
              <p className="text-text-secondary">
                Every feature we build starts with understanding what travelers actually need.
              </p>
            </div>
          </div>
        </div>

        {/* Coverage */}
        <div className="bg-gradient-to-r from-primary-green to-primary-blue text-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <FaGlobeAsia className="text-6xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Coverage Across India</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Currently serving 30+ major cities across India with comprehensive water quality data and real-time environmental monitoring.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Kochi', 'Goa']. map(city => (
              <span key={city} className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                {city}
              </span>
            ))}
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
              +20 more cities
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;