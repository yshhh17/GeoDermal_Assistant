import { FaLightbulb, FaShoppingCart } from 'react-icons/fa';

function Recommendations({ recommendations, analysisType }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
        <FaLightbulb className="mr-3 text-primary-orange" />
        Personalized Recommendations
      </h3>

      <div className="space-y-3">
        {recommendations && recommendations.length > 0 ?  (
          recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-start p-4 bg-bg-secondary rounded-lg hover:shadow-md transition"
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${
                analysisType === 'skin' ?  'bg-primary-green' : 'bg-primary-blue'
              } text-white flex items-center justify-center font-bold mr-3`}>
                {index + 1}
              </div>
              <p className="text-text-primary flex-1">{rec}</p>
            </div>
          ))
        ) : (
          <p className="text-text-secondary italic">No recommendations available</p>
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-6 p-4 bg-gradient-to-r from-bg-accent to-bg-secondary rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaShoppingCart className="text-primary-green text-2xl mr-3" />
            <span className="text-text-primary font-semibold">
              Need product recommendations?
            </span>
          </div>
          <button className="bg-primary-green text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;