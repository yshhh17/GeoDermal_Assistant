import { Link } from 'react-router-dom';
import { FaSun, FaTint, FaLeaf } from 'react-icons/fa';

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-bg-secondary to-bg-accent 
      h-[50vh] sm:h-[60vh] flex items-center overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="hidden sm:block absolute top-20 right-10">
        <FaSun className="text-status-warning text-6xl opacity-20" />
      </div>
      <div className="hidden md:block absolute bottom-32 right-32">
        <FaTint className="text-primary-blue text-5xl opacity-20" />
      </div>
      <div className="hidden sm:block absolute top-40 left-20">
        <FaLeaf className="text-primary-green text-5xl opacity-20" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
        py-10 sm:py-20"
      >
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl 
            font-bold text-text-primary 
            mb-4 sm:mb-6"
          >
            Empowering Your Skin and Hair
            <br />
            <span className="text-primary-green">on Every Journey</span>
          </h1>

          <p className="text-base sm:text-xl text-text-secondary 
            mb-5 sm:mb-8 max-w-2xl mx-auto"
          >
            Get scientific recommendations for skin & hair health wherever you go
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row 
            gap-3 sm:gap-4 justify-center items-center"
          >
            <Link 
              to="/analyze"
              className="bg-primary-green text-white 
                px-7 py-3 sm:px-8 sm:py-4 
                rounded-xl text-base sm:text-lg font-semibold 
                hover:shadow-lg transform hover:-translate-y-1 transition"
            >
              Get Started Now →
            </Link>

            <button className="border-2 border-primary-green 
              text-primary-green 
              px-7 py-3 sm:px-8 sm:py-4 
              rounded-xl text-base sm:text-lg font-semibold 
              hover:bg-primary-green hover:text-white transition"
            >
              Learn More
            </button>
          </div>

          <p className="text-xs sm:text-sm text-text-muted mt-4 sm:mt-6">
            Step 1 of 6: City search destination
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
