import { Link } from 'react-router-dom';
import { FaSun, FaTint, FaLeaf } from 'react-icons/fa';

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-bg-secondary to-bg-accent h-[60vh] flex items-center overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10">
        <FaSun className="text-status-warning text-6xl opacity-20" />
      </div>
      <div className="absolute bottom-32 right-32">
        <FaTint className="text-primary-blue text-5xl opacity-20" />
      </div>
      <div className="absolute top-40 left-20">
        <FaLeaf className="text-primary-green text-5xl opacity-20" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
            Empowering Your Skin and Hair
            <br />
            <span className="text-primary-green">on Every Journey</span>
          </h1>
          
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Get scientific recommendations for skin & hair health wherever you go
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/analyze"
              className="bg-primary-green text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition duration-200"
            >
              Get Started Now →
            </Link>
            <button className="border-2 border-primary-green text-primary-green px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-green hover:text-white transition">
              Learn More
            </button>
          </div>

          <p className="text-sm text-text-muted mt-6">
            Step 1 of 6:  City search destination
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero