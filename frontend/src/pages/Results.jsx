import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ComparisonCard from '../components/results/ComparisonCard';
import EnvironmentalData from '../components/results/EnvironmentalData';
import RiskScores from '../components/results/RiskScores';
import Recommendations from '../components/results/Recommendations';
import { FaSpinner, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import { analyzeDestination } from '../services/api';

function Results() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Get analysis data from localStorage
    const storedData = localStorage.getItem('analysisData');
    
    if (! storedData) {
      navigate('/analyze');
      return;
    }

    const data = JSON.parse(storedData);
    setAnalysisData(data);

    // Call backend API
    fetchAnalysis(data);
  }, [navigate]);

  const fetchAnalysis = async (data) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Calling backend with data:', data);
      const apiResults = await analyzeDestination(data);
      
      console.log('Received results:', apiResults);
      setResults(apiResults);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze destination.  Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-secondary to-bg-accent flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-6xl text-primary-green animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Analyzing Your Destination... 
          </h2>
          <p className="text-text-secondary">
            Gathering environmental data and generating personalized recommendations
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-secondary to-bg-accent">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <FaExclamationTriangle className="text-6xl text-status-error mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-status-error mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-text-secondary mb-6">{error}</p>
            <div className="space-x-4">
              <button
                onClick={() => fetchAnalysis(analysisData)}
                className="inline-block bg-primary-green text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Try Again
              </button>
              <Link
                to="/analyze"
                className="inline-block bg-text-secondary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Start Over
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (! results) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-secondary to-bg-accent">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          to="/analyze"
          className="inline-flex items-center text-text-secondary hover:text-primary-green transition mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Start New Analysis
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-bold text-text-primary mb-8 text-center">
          Your {analysisData.analysisType === 'skin' ? 'Skin' : 'Hair'} Analysis Results
        </h1>

        {/* Comparison Card */}
        <div className="mb-8">
          <ComparisonCard
            homeCity={analysisData.cities.homeCity}
            destinationCity={analysisData.cities.destinationCity}
          />
        </div>

        {/* Environmental Data */}
        <div className="mb-8">
          <EnvironmentalData envData={results.env_report} />
        </div>

        {/* Risk Scores */}
        <div className="mb-8">
          <RiskScores
            risks={results.risks}
            analysisType={analysisData.analysisType}
          />
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <Recommendations
            recommendations={results.recommendations}
            analysisType={analysisData.analysisType}
          />
        </div>

        {/* Confidence Badge */}
        {results.confidence && (
          <div className="text-center">
            <span className="inline-block bg-white px-6 py-3 rounded-full shadow-lg">
              <span className="text-text-secondary">Confidence Level: </span>
              <span className="font-bold text-primary-green capitalize">
                {results.confidence}
              </span>
            </span>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Results;