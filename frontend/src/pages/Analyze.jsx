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
    cities: null,
    analysisType: null,
    typeAnswers: null,
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
    const finalData = { ...analysisData, duration: durationData. duration };
    // Store data and navigate to results
    localStorage.setItem('analysisData', JSON.stringify(finalData));
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-secondary to-bg-accent">
      <Navbar />
      
      <div className="max-w-5xl min-h-screen mx-auto px-12 py-12">
        {step > 1 && <ProgressBar currentStep={step - 1} totalSteps={totalSteps} />}
        
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