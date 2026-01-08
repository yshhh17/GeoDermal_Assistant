import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FaMapMarkerAlt, FaClipboardCheck, FaBrain, FaChartLine, FaLightbulb, FaCheckCircle } from 'react-icons/fa';

function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: FaMapMarkerAlt,
      title: 'Select Your Cities',
      description: 'Choose your home city and travel destination from our list of 30+ major Indian cities.',
      color: 'from-primary-green to-primary-blue',
      details: [
        'Select from cities with comprehensive water quality data',
        'Compare environmental conditions between locations',
        'Works for both domestic and international travel planning'
      ]
    },
    {
      number: 2,
      icon: FaClipboardCheck,
      title: 'Choose Analysis Type',
      description:  'Tell us whether you want skin care or hair care recommendations for your trip.',
      color: 'from-primary-blue to-primary-orange',
      details: [
        'Skin analysis: UV, pollution, climate effects',
        'Hair analysis: Humidity, water quality, environmental factors',
        'Personalized based on your specific type and concerns'
      ]
    },
    {
      number: 3,
      icon: FaBrain,
      title: 'Answer Quick Questions',
      description:  'Help us understand your skin or hair type and any specific concerns you have.',
      color: 'from-primary-sage to-status-warning',
      details: [
        'Takes less than 2 minutes',
        'Covers type, sensitivity, and specific concerns',
        'All information kept private and secure'
      ]
    },
    {
      number:  4,
      icon: FaChartLine,
      title: 'Set Travel Duration',
      description: 'Let us know how long you\'ll be traveling so we can tailor product recommendations.',
      color: 'from-status-warning to-primary-green',
      details: [
        'Options from 1 day to 1+ month',
        'Custom duration available',
        'Affects product size and routine recommendations'
      ]
    },
    {
      number: 5,
      icon: FaLightbulb,
      title: 'Get AI-Powered Analysis',
      description: 'Our AI analyzes real-time environmental data and generates your personalized report.',
      color: 'from-primary-green to-primary-blue',
      details: [
        'Real-time weather, UV, AQI, and water quality data',
        'AI-powered risk assessment using Groq LLM',
        'Confidence scoring for reliability'
      ]
    },
    {
      number: 6,
      icon: FaCheckCircle,
      title: 'Receive Recommendations',
      description:  'Get detailed risk scores and personalized recommendations for your trip.',
      color: 'from-primary-blue to-status-success',
      details: [
        'Risk scores for specific conditions (1-10 scale)',
        'Actionable product and routine recommendations',
        'Environmental data breakdown for context'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-secondary to-bg-accent">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-3 sm:mb-4">
            How It Works
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto px-4">
            Get personalized skin and hair care recommendations in 6 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-12 lg:mb-16">
          {steps.map((step, index) => (
            <div key={step.number} className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-5 sm:p-8 lg:p-12 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${step.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg`}>
                    {step.number}
                  </div>
                  <div className="sm:mt-4 flex justify-center">
                    <step.icon className="text-3xl sm:text-4xl text-primary-green" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base sm:text-lg text-text-secondary mb-3 sm:mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Details */}
                  <div className="space-y-2 sm:space-y-2. 5">
                    {step. details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 sm:gap-3">
                        <FaCheckCircle className="text-primary-green mt-0.5 sm:mt-1 flex-shrink-0 text-sm sm:text-base" />
                        <span className="text-sm sm:text-base text-text-secondary leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connector Line (not last item) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center mt-6 sm:mt-8">
                  <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-gray-300 to-transparent rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Technology Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-12 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 sm:mb-8 text-center">
            Powered by Advanced Technology
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-5 sm:p-6 bg-bg-secondary rounded-xl hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">Real-Time APIs</h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                Open-Meteo for weather & UV, OpenAQ for air quality, custom water quality database
              </p>
            </div>

            <div className="text-center p-5 sm:p-6 bg-bg-accent rounded-xl hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">AI Analysis</h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                Groq LLM for intelligent risk assessment and personalized recommendations
              </p>
            </div>

            <div className="text-center p-5 sm:p-6 bg-bg-secondary rounded-xl hover:shadow-md transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">Secure & Private</h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                Your data is never shared.  Rate limiting prevents abuse. Built with security first.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-green to-primary-blue text-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Get Started?</h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
            Get personalized skin or hair care recommendations for your next trip in under 5 minutes
          </p>
          <a
            href="/analyze"
            className="inline-block bg-white text-primary-green px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            Start Your Analysis Now →
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HowItWorks;