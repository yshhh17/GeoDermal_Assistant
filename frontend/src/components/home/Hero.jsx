import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSun,
  FaTint,
  FaLeaf,
  FaWind,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
} from 'react-icons/fa';

function Hero() {
  const spotlightCards = [
    {
      title: 'UV + Heat Watch',
      stat: 'High Sun Exposure',
      detail: 'Plan stronger sunscreen and lightweight hydration for daytime travel windows.',
      icon: FaSun,
      color: 'text-amber-400',
      bg: 'from-amber-50 to-orange-50',
    },
    {
      title: 'Water Profile Shift',
      stat: 'Hardness Difference',
      detail: 'Get routines tuned for mineral-heavy water when your destination differs from home.',
      icon: FaTint,
      color: 'text-blue-500',
      bg: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Air + Skin Stress',
      stat: 'AQI-Sensitive Days',
      detail: 'Receive calm-barrier recommendations when pollution spikes during your stay.',
      icon: FaWind,
      color: 'text-cyan-500',
      bg: 'from-cyan-50 to-sky-50',
    },
  ];

  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveCard((previous) => (previous + 1) % spotlightCards.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [spotlightCards.length]);

  const handlePrev = () => {
    setActiveCard((previous) =>
      previous === 0 ? spotlightCards.length - 1 : previous - 1,
    );
  };

  const handleNext = () => {
    setActiveCard((previous) => (previous + 1) % spotlightCards.length);
  };

  const CardIcon = spotlightCards[activeCard].icon;

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 min-h-[72vh] sm:min-h-[80vh] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-blue-400/10 to-teal-400/10 animate-pulse"></div>
      
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          <div className="relative">
            <div className="hidden lg:block absolute -left-6 top-2 bottom-2 w-1 rounded-full bg-gradient-to-b from-primary-green via-primary-blue to-accent-teal opacity-60"></div>

            <div className="mb-4 inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-white rounded-full px-4 py-2 text-sm text-text-primary font-medium">
              <FaMapMarkerAlt className="text-primary-blue" />
              Climate-aware beauty, city by city
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight animate-fade-in">
              Empowering Your Skin and Hair
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent drop-shadow-sm">
                on Every Journey
              </span>
            </h1>

            <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl font-medium leading-relaxed">
              Get scientific recommendations for skin & hair health wherever you go ✨
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
              <Link
                to="/analyze"
                className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-7 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:shadow-2xl hover:shadow-emerald-500/50 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Get Started Now →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                to="/how-it-works"
                className="border-2 border-emerald-600 text-emerald-700 bg-white/80 backdrop-blur-sm px-7 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white hover:shadow-xl hover:shadow-emerald-500/30 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-8 text-sm text-gray-600">
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

          <div className="relative">
            <div className="hidden lg:block absolute -left-6 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-primary-blue to-transparent"></div>

            <div className={`rounded-3xl border border-white/80 bg-gradient-to-br ${spotlightCards[activeCard].bg} shadow-2xl p-6 sm:p-8 backdrop-blur-sm`}>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs sm:text-sm uppercase tracking-wider text-text-secondary font-semibold">
                  Live Travel Spotlight
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-full bg-white text-text-primary hover:bg-bg-secondary transition"
                    aria-label="Previous highlight"
                  >
                    <FaChevronLeft className="mx-auto" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-9 h-9 rounded-full bg-white text-text-primary hover:bg-bg-secondary transition"
                    aria-label="Next highlight"
                  >
                    <FaChevronRight className="mx-auto" />
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center ${spotlightCards[activeCard].color} shadow-md`}>
                  <CardIcon className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-text-primary leading-tight mb-2">
                    {spotlightCards[activeCard].title}
                  </h3>
                  <p className="text-primary-blue font-semibold mb-3">
                    {spotlightCards[activeCard].stat}
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    {spotlightCards[activeCard].detail}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                {spotlightCards.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveCard(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === activeCard ? 'w-8 bg-primary-blue' : 'w-2 bg-primary-blue/30'
                    }`}
                    aria-label={`Go to highlight ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-white/70 rounded-xl p-3 text-center">
                <p className="text-xs text-text-muted">AQI</p>
                <p className="text-text-primary font-bold">Live</p>
              </div>
              <div className="bg-white/70 rounded-xl p-3 text-center">
                <p className="text-xs text-text-muted">UV</p>
                <p className="text-text-primary font-bold">Tracked</p>
              </div>
              <div className="bg-white/70 rounded-xl p-3 text-center">
                <p className="text-xs text-text-muted">Water</p>
                <p className="text-text-primary font-bold">Compared</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
