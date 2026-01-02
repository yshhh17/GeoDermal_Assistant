import { FaHome, FaPlane, FaArrowRight } from 'react-icons/fa';

function ComparisonCard({ homeCity, destinationCity }) {
  return (
    <div className="bg-gradient-to-r from-primary-green to-primary-blue text-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-4 text-center">Your Trip</h3>
      
      <div className="flex items-center justify-center space-x-4">
        {/* Home City */}
        <div className="flex flex-col items-center">
          <FaHome className="text-4xl mb-2" />
          <span className="text-lg font-semibold">{homeCity}</span>
          <span className="text-sm opacity-80">Home</span>
        </div>

        {/* Arrow */}
        <FaArrowRight className="text-3xl" />

        {/* Destination */}
        <div className="flex flex-col items-center">
          <FaPlane className="text-4xl mb-2" />
          <span className="text-lg font-semibold">{destinationCity}</span>
          <span className="text-sm opacity-80">Destination</span>
        </div>
      </div>
    </div>
  );
}

export default ComparisonCard;