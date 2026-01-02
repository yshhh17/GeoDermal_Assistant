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
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary text-center mb-10 sm:mb-12 lg:mb-16">
          Why Choose GeoDermal
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
            >
              <feature. icon className={`text-5xl sm:text-6xl ${feature.color} mb-4 sm:mb-6`} />
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features