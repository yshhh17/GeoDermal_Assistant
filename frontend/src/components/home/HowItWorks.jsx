import { FaMapMarkerAlt, FaBrain, FaSuitcase } from 'react-icons/fa';

function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: FaMapMarkerAlt,
      title:  "Enter Your Destination",
      description: "Tell us where you're traveling and your home city for comparison",
      color: "bg-primary-green"
    },
    {
      number: "2",
      icon: FaBrain,
      title: "Get AI Analysis",
      description: "Our AI analyzes environmental data and assesses risks for your skin or hair",
      color: "bg-primary-blue"
    },
    {
      number: "3",
      icon: FaSuitcase,
      title: "Travel Prepared",
      description: "Receive personalized product recommendations and care tips for your trip",
      color:  "bg-primary-sage"
    }
  ];

  return (
    <section className="bg-bg-secondary py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary text-center mb-10 sm:mb-12 lg:mb-16">
          How It Works
        </h2>

        <div className="relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-1 bg-text-muted opacity-20" style={{width: '66%', left: '17%'}}></div>

          {/* Vertical Connecting Line (Mobile/Tablet only) */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex lg:flex-col lg:text-center relative z-10">
                {/* Mobile/Tablet Layout (Horizontal) */}
                <div className="lg:hidden flex-shrink-0 mr-6">
                  {/* Number Circle */}
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {step.number}
                  </div>
                </div>

                {/* Desktop Layout (Vertical) */}
                <div className="hidden lg:block">
                  {/* Number Circle */}
                  <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg`}>
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 lg:flex-none">
                  {/* Icon */}
                  <step.icon className="text-4xl sm:text-5xl text-text-primary lg:mx-auto mb-3 sm:mb-4" />

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 sm:mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks