import { FaSun, FaCut } from 'react-icons/fa';

function AnalysisType({ onTypeSelected }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          What Would You Like to Analyze?
        </h2>
        <p className="text-text-secondary">
          Choose the type of analysis for your trip
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Skin Analysis */}
        <button
          onClick={() => onTypeSelected('skin')}
          className="group bg-gradient-to-br from-bg-secondary to-bg-accent p-8 rounded-xl border-2 border-transparent hover:border-primary-green transition duration-300 transform hover:-translate-y-2 hover:shadow-xl"
        >
          <FaSun className="text-6xl text-status-warning mx-auto mb-4 group-hover:scale-110 transition" />
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            Skin Analysis
          </h3>
          <p className="text-text-secondary">
            Get UV index, pollution, and climate recommendations for your skin
          </p>
        </button>

        {/* Hair Analysis */}
        <button
          onClick={() => onTypeSelected('hair')}
          className="group bg-gradient-to-br from-bg-secondary to-bg-accent p-8 rounded-xl border-2 border-transparent hover: border-primary-blue transition duration-300 transform hover:-translate-y-2 hover: shadow-xl"
        >
          <FaCut className="text-6xl text-primary-blue mx-auto mb-4 group-hover:scale-110 transition" />
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            Hair Analysis
          </h3>
          <p className="text-text-secondary">
            Get humidity, water hardness, and climate tips for your hair
          </p>
        </button>
      </div>
    </div>
  );
}

export default AnalysisType;