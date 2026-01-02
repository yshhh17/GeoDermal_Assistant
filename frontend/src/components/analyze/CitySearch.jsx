import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

function CitySearch({ onCitiesSelected }) {
  const [homeCity, setHomeCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');

  // Indian cities with water quality data (from your backend dataset)
  const indianCities = [
    'Agra',
    'Ahmedabad',
    'Amritsar',
    'Bangalore',
    'Bhopal',
    'Chandigarh',
    'Chennai',
    'Coimbatore',
    'Delhi',
    'Goa',
    'Guwahati',
    'Hyderabad',
    'Indore',
    'Jaipur',
    'Kochi',
    'Kolkata',
    'Lucknow',
    'Ludhiana',
    'Madurai',
    'Mumbai',
    'Nagpur',
    'Nashik',
    'Patna',
    'Pune',
    'Rajkot',
    'Surat',
    'Thiruvananthapuram',
    'Vadodara',
    'Varanasi',
    'Visakhapatnam'
  ].sort();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (homeCity && destinationCity) {
      onCitiesSelected({ homeCity, destinationCity });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto my-40">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          Where Are You Traveling? 
        </h2>
        <p className="text-text-secondary">
          Select your home city and destination to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Home City */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            <FaMapMarkerAlt className="inline mr-2 text-primary-green" />
            Home City
          </label>
          <select
            value={homeCity}
            onChange={(e) => setHomeCity(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-green focus:outline-none transition bg-white"
            required
          >
            <option value="">-- Select your home city --</option>
            {indianCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Destination City */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            <FaSearch className="inline mr-2 text-primary-blue" />
            Destination City
          </label>
          <select
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-blue focus: outline-none transition bg-white"
            required
          >
            <option value="">-- Select your destination --</option>
            {indianCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary-green text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-200"
        >
          Continue →
        </button>
      </form>
    </div>
  );
}

export default CitySearch;