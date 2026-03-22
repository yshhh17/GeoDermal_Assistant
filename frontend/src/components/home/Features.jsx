import { FaMicroscope, FaBrain, FaHeart } from 'react-icons/fa';

function Features() {
  const features = [
    {
      icon: FaMicroscope,
      title: "Real-Time Analysis",
      description: "Get up-to-date environmental data including UV index, air quality, humidity, and water hardness for any destination.",
      color: "text-accent-teal"
    },
    {
      icon: FaBrain,
      title: "AI-Powered Insights",
      description: "Our AI analyzes environmental factors and provides personalized risk assessments for your specific skin or hair type.",
      color: "text-primary-blue"
    },
    {
      icon: FaHeart,
      title: "Personalized Care",
      description: "Receive tailored recommendations and product suggestions based on your travel duration and personal care needs.",
      color: "text-primary-green"
    }
  ];

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-12 items-start">
          <div className="lg:sticky lg:top-24">
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary-blue mb-3">
              Why Choose GeoDermal
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-4">
              Intelligence stacked vertically, not just in rows
            </h2>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
              A focused flow that walks travelers from environment signals to practical care decisions.
            </p>
          </div>

          <div className="relative pl-0 lg:pl-8">
            <div className="hidden lg:block absolute left-0 top-2 bottom-2 w-1 rounded-full bg-gradient-to-b from-primary-green via-primary-blue to-accent-teal"></div>

            <div className="space-y-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border border-bg-secondary rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                    <div className="w-14 h-14 rounded-xl bg-bg-secondary flex items-center justify-center shrink-0">
                      <feature.icon className={`text-3xl ${feature.color}`} />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features