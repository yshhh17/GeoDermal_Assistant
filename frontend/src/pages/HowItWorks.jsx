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
      description: 'Tell us whether you want skin care or hair care recommendations for your trip.',
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
      description: 'Help us understand your skin or hair type and any specific concerns you have.',
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
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-text-primary mb-4">
            How It Works
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Get personalized skin and hair care recommendations in 6 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => (
            <div key={step.number} className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg`}>
                    {step.number}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <step.icon className="text-4xl text-primary-green" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-lg text-text-secondary mb-4">
                    {step.description}
                  </p>
                  
                  {/* Details */}
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start">
                        <FaCheckCircle className="text-primary-green mt-1 mr-3 flex-shrink-0" />
                        <span className="text-text-secondary">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Powered by Advanced Technology
          </h2>
          <div className="grid md: grid-cols-3 gap-6">
            <div className="text-center p-6 bg-bg-secondary rounded-xl">
              <h3 className="text-xl font-bold text-text-primary mb-2">Real-Time APIs</h3>
              <p className="text-text-secondary">
                Open-Meteo for weather & UV, OpenAQ for air quality, custom water quality database
              </p>
            </div>

            <div className="text-center p-6 bg-bg-accent rounded-xl">
              <h3 className="text-xl font-bold text-text-primary mb-2">AI Analysis</h3>
              <p className="text-text-secondary">
                Groq LLM for intelligent risk assessment and personalized recommendations
              </p>
            </div>

            <div className="text-center p-6 bg-bg-secondary rounded-xl">
              <h3 className="text-xl font-bold text-text-primary mb-2">Secure & Private</h3>
              <p className="text-text-secondary">
                Your data is never shared.  Rate limiting prevents abuse.  Built with security first.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-green to-primary-blue text-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Get personalized skin or hair care recommendations for your next trip in under 5 minutes
          </p>
          <a
            href="/analyze"
            className="inline-block bg-white text-primary-green px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
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