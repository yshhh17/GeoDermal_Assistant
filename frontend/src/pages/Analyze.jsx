import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProgressBar from '../components/analyze/ProgressBar';
import CitySearch from '../components/analyze/CitySearch';
import AnalysisType from '../components/analyze/AnalysisType';
import SkinTypeQuiz from '../components/analyze/SkinTypeQuiz';
import HairTypeQuiz from '../components/analyze/HairTypeQuiz';
import TravelDuration from '../components/analyze/TravelDuration';
function Analyze() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [analysisData, setAnalysisData] = useState({
    cities:  null,
    analysisType:  null,
    typeAnswers:  null,
    duration: null
  });

  const totalSteps = 4;

  const handleCitiesSelected = (cities) => {
    setAnalysisData(prev => ({ ...prev, cities }));
    setStep(2);
  };

  const handleTypeSelected = (type) => {
    setAnalysisData(prev => ({ ...prev, analysisType: type }));
    setStep(3);
  };

  const handleTypeQuizComplete = (answers) => {
    setAnalysisData(prev => ({ ...prev, typeAnswers: answers }));
    setStep(4);
  };

  const handleDurationComplete = (durationData) => {
    const finalData = { ...analysisData, duration: durationData.duration };
    localStorage.setItem('analysisData', JSON.stringify(finalData));
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-secondary to-bg-accent relative overflow-hidden">
      {/* Background SVG Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        {/* DNA Helix - Top Right */}
        <svg className="absolute top-10 right-10 w-32 h-32 md:w-48 md:h-48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 4 Q12 8 20 4 M4 8 Q12 12 20 8 M4 12 Q12 16 20 12 M4 16 Q12 20 20 16 M4 20 Q12 24 20 20" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="4" cy="4" r="1.5" fill="currentColor"/>
          <circle cx="20" cy="4" r="1.5" fill="currentColor"/>
          <circle cx="4" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="20" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="4" cy="20" r="1.5" fill="currentColor"/>
          <circle cx="20" cy="20" r="1.5" fill="currentColor"/>
        </svg>

        {/* Droplet - Bottom Left */}
        <svg className="absolute bottom-20 left-10 w-24 h-24 md:w-36 md:h-36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>

        {/* Sun/UV - Top Left */}
        <svg className="absolute top-32 left-20 w-28 h-28 md:w-40 md:h-40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="4" strokeWidth="1.5"/>
          <line x1="12" y1="1" x2="12" y2="3" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="12" y1="21" x2="12" y2="23" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="1" y1="12" x2="3" y2="12" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="21" y1="12" x2="23" y2="12" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        {/* Molecule - Bottom Right */}
        <svg className="absolute bottom-32 right-20 w-28 h-28 md:w-40 md:h-40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="2" strokeWidth="1.5" fill="currentColor"/>
          <circle cx="6" cy="6" r="2" strokeWidth="1.5" fill="currentColor"/>
          <circle cx="18" cy="6" r="2" strokeWidth="1.5" fill="currentColor"/>
          <circle cx="6" cy="18" r="2" strokeWidth="1.5" fill="currentColor"/>
          <circle cx="18" cy="18" r="2" strokeWidth="1.5" fill="currentColor"/>
          <line x1="12" y1="12" x2="6" y2="6" strokeWidth="1.5"/>
          <line x1="12" y1="12" x2="18" y2="6" strokeWidth="1.5"/>
          <line x1="12" y1="12" x2="6" y2="18" strokeWidth="1.5"/>
          <line x1="12" y1="12" x2="18" y2="18" strokeWidth="1.5"/>
        </svg>

        {/* Leaf/Natural - Center Right */}
        <svg className="absolute top-1/2 right-32 w-20 h-20 md:w-32 md:h-32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.67C7.89 17.03 10.15 12.9 17 11V8zm0-2l4 4-4 4V8z"/>
        </svg>
      </div>

      <Navbar />
      
      <div className="max-w-5xl min-h-[calc(100vh-200px)] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12">
        {step > 1 && (
          <div className="mb-6 sm:mb-8">
            <ProgressBar currentStep={step - 1} totalSteps={totalSteps} />
          </div>
        )}
        
        {step === 1 && <CitySearch onCitiesSelected={handleCitiesSelected} />}
        {step === 2 && <AnalysisType onTypeSelected={handleTypeSelected} />}
        {step === 3 && analysisData.analysisType === 'skin' && (
          <SkinTypeQuiz onComplete={handleTypeQuizComplete} />
        )}
        {step === 3 && analysisData.analysisType === 'hair' && (
          <HairTypeQuiz onComplete={handleTypeQuizComplete} />
        )}
        {step === 4 && (
          <TravelDuration 
            onComplete={handleDurationComplete} 
            analysisType={analysisData.analysisType}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Analyze;