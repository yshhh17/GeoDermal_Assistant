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
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12">
          <div className="lg:sticky lg:top-24 h-fit">
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary-green mb-3">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-4">
              A vertical flow from destination to routine
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              Each step builds on the previous one so recommendations feel guided, not generic.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-6 top-6 bottom-24 w-px bg-gradient-to-b from-primary-green via-primary-blue to-primary-sage"></div>

            <div className="space-y-5 sm:space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="grid lg:grid-cols-[48px_1fr] gap-4 lg:gap-5 items-start"
                >
                  <div className="hidden lg:flex items-start justify-center pt-6">
                    <div className="w-9 h-9 rounded-full bg-white border-2 border-primary-blue flex items-center justify-center text-primary-blue text-sm font-bold z-10">
                      {step.number}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div
                        className={`${step.color} w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0`}
                      >
                        <step.icon className="text-xl sm:text-2xl" />
                      </div>

                      <div>
                        <p className="lg:hidden text-xs font-semibold text-primary-blue mb-2">
                          Step {step.number}
                        </p>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-left">
              <Link
                to="/analyze"
                className="inline-block bg-gradient-to-r from-primary-green to-primary-blue text-white px-7 sm:px-9 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
              >
                Start Your Analysis →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
