import { Link } from 'react-router-dom';
import { FaSun, FaTint, FaLeaf, FaWind } from 'react-icons/fa';

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 
      h-[50vh] sm:h-[60vh] flex items-center overflow-hidden"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-blue-400/10 to-teal-400/10 animate-pulse"></div>
      
      {/* Animated floating decorative elements */}
      <div className="hidden sm:block absolute top-20 right-10 animate-bounce" style={{ animationDuration: '3s' }}>
        <div className="relative">
          <FaSun className="text-amber-400 text-7xl drop-shadow-lg" />
          <div className="absolute inset-0 text-amber-400 text-7xl opacity-30 blur-md">
            <FaSun />
          </div>
        </div>
      </div>
      
      <div className="hidden md:block absolute bottom-32 right-32 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
        <div className="relative">
          <FaTint className="text-blue-500 text-6xl drop-shadow-lg" />
          <div className="absolute inset-0 text-blue-500 text-6xl opacity-30 blur-md">
            <FaTint />
          </div>
        </div>
      </div>
      
      <div className="hidden sm:block absolute top-40 left-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
        <div className="relative">
          <FaLeaf className="text-emerald-500 text-6xl drop-shadow-lg" />
          <div className="absolute inset-0 text-emerald-500 text-6xl opacity-30 blur-md">
            <FaLeaf />
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-20 left-32 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>
        <div className="relative">
          <FaWind className="text-cyan-500 text-5xl drop-shadow-lg" />
          <div className="absolute inset-0 text-cyan-500 text-5xl opacity-30 blur-md">
            <FaWind />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
        py-10 sm:py-20 relative z-10"
      >
        <div className="text-center">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl 
              font-bold text-gray-800 
              mb-2 leading-tight animate-fade-in"
            >
              Empowering Your Skin and Hair
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 
                bg-clip-text text-transparent drop-shadow-sm">
                on Every Journey
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-xl text-gray-600 
            mb-5 sm:mb-8 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Get scientific recommendations for skin & hair health wherever you go ✨
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row 
            gap-3 sm:gap-4 justify-center items-center"
          >
            <Link 
              to="/analyze"
              className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white 
                px-7 py-3 sm:px-8 sm:py-4 
                rounded-xl text-base sm:text-lg font-semibold 
                hover:shadow-2xl hover:shadow-emerald-500/50 
                transform hover:-translate-y-1 hover:scale-105 
                transition-all duration-300 
                overflow-hidden"
            >
              <span className="relative z-10">Get Started Now →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link to="/how-it-works">
              <button className="border-2 border-emerald-600 
                text-emerald-700 bg-white/80 backdrop-blur-sm
                px-7 py-3 sm:px-8 sm:py-4 
                rounded-xl text-base sm:text-lg font-semibold 
                hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 
                hover:text-white hover:shadow-xl hover:shadow-emerald-500/30
                transform hover:-translate-y-1 hover:scale-105
                transition-all duration-300"
              >
                Learn More
              </button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              <span className="font-medium">Real-time Environmental Data</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔬</span>
              <span className="font-medium">Science-backed Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="font-medium">Personalized Care</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
