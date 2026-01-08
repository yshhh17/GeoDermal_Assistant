import { FaMapMarkerAlt, FaBrain, FaSuitcase } from "react-icons/fa";
import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: FaMapMarkerAlt,
      title: "Enter Your Destination",
      description:
        "Tell us where you're traveling and your home city for comparison",
      color: "bg-primary-green",
    },
    {
      number: "2",
      icon: FaBrain,
      title: "Get AI Analysis",
      description:
        "Our AI analyzes environmental data and assesses risks for your skin or hair",
      color: "bg-primary-blue",
    },
    {
      number: "3",
      icon: FaSuitcase,
      title: "Travel Prepared",
      description:
        "Receive personalized product recommendations and care tips for your trip",
      color: "bg-primary-sage",
    },
  ];

  return (
    <section className="bg-bg-secondary py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary text-center mb-10 sm:mb-14 lg:mb-20">
          How It Works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {/* Number */}
              <div
                className={`${step.color} w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg mb-6`}
              >
                {step.number}
              </div>

              {/* Icon */}
              <step.icon className="text-4xl sm:text-5xl text-text-primary mb-4" />

              {/* Title */}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <Link
            to="/analyze"
            className="inline-block bg-gradient-to-r from-primary-green to-primary-blue text-white px-7 sm:px-9 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
          >
            Start Your Analysis →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
