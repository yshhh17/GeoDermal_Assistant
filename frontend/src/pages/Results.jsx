import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ComparisonCard from '../components/results/ComparisonCard';
import EnvironmentalData from '../components/results/EnvironmentalData';
import RiskScores from '../components/results/RiskScores';
import Recommendations from '../components/results/Recommendations';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';

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

    // TODO: Call your backend API here
    // For now, we'll simulate with mock data
    simulateAPICall(data);
  }, [navigate]);

  const simulateAPICall = async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock results data
    const mockResults = {
      env_report: {
        coords: {
          lat: 19.0760,
          lon: 72.8777,
          display_name: `${data.cities. destinationCity}, India`
        },
        temperature_c: 28.5,
        humidity: 65,
        uv_index: 7,
        aqi: 156,
        pm25: 89.3
      },
      risks: data.analysisType === 'skin' 
        ? {
            dryness: 6,
            acne: 7,
            irritation: 5,
            uv_damage:  8,
            pigmentation:  6
          }
        : {
            dryness: 5,
            frizz: 7,
            breakage: 6,
            hairfall: 5,
            dandruff: 4
          },
      recommendations: data.analysisType === 'skin'
        ? [
            "Use a hydrating moisturizer with hyaluronic acid daily",
            "Apply broad-spectrum SPF 50+ sunscreen every 2-3 hours",
            "Use a gentle, non-foaming cleanser twice daily",
            "Consider an antioxidant serum with vitamin C in the morning",
            "Avoid heavy makeup to prevent pore clogging in humid conditions",
            "Keep blotting papers handy for excess oil control",
            "Stay in shade during peak sun hours (10 AM - 4 PM)",
            "Drink at least 2-3 liters of water daily for hydration"
          ]
        :  [
            "Use a sulfate-free shampoo to prevent moisture loss",
            "Apply anti-frizz serum with silicone or argan oil",
            "Deep condition your hair twice a week",
            "Use a wide-tooth comb to prevent breakage",
            "Protect hair with a scarf or hat in high humidity",
            "Avoid heat styling tools during your trip",
            "Rinse hair with filtered water if possible",
            "Keep hair tied up in humid conditions to reduce frizz"
          ],
      confidence: 'high'
    };

    setResults(mockResults);
    setLoading(false);
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
            <h2 className="text-2xl font-bold text-status-error mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-text-secondary mb-6">{error}</p>
            <Link
              to="/analyze"
              className="inline-block bg-primary-green text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Try Again
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
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
            homeCity={analysisData. cities.homeCity}
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
        <div className="text-center">
          <span className="inline-block bg-white px-6 py-3 rounded-full shadow-lg">
            <span className="text-text-secondary">Confidence Level: </span>
            <span className="font-bold text-primary-green capitalize">
              {results.confidence}
            </span>
          </span>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Results;