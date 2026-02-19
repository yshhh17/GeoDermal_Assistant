import { useState } from 'react';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

function TravelDuration({ onComplete, analysisType }) {
  const [duration, setDuration] = useState('');
  const [customDays, setCustomDays] = useState('');

  const durations = [
    { value:  '1-3', label: '1-3 Days', icon: '🌙' },
    { value: '4-7', label: '4-7 Days', icon: '📅' },
    { value:  '1-2weeks', label: '1-2 Weeks', icon: '🗓️' },
    { value: '2-4weeks', label: '2-4 Weeks', icon: '📆' },
    { value: '1month+', label: '1+ Month', icon: '🌍' },
    { value: 'custom', label: 'Custom', icon: '✏️' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalDuration = duration === 'custom' ? `${customDays} days` : duration;
    if (finalDuration) {
      onComplete({ duration: finalDuration });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <FaCalendarAlt className="text-5xl text-primary-green mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          How Long Is Your Trip?
        </h2>
        <p className="text-text-secondary">
          This helps us tailor product recommendations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          {durations.map(dur => (
            <button
              key={dur.value}
              type="button"
              onClick={() => {
                setDuration(dur.value);
                if (dur.value !== 'custom') setCustomDays('');
              }}
              className={`p-6 rounded-lg border-2 transition transform hover:-translate-y-1 ${
                duration === dur.value
                  ? `border-${analysisType === 'skin' ? 'primary-green' : 'primary-blue'} bg-bg-secondary`
                  : 'border-gray-200 hover:border-primary-green'
              }`}
            >
              <div className="text-4xl mb-2">{dur.icon}</div>
              <div className="font-bold text-text-primary">{dur.label}</div>
            </button>
          ))}
        </div>

        {/* Custom Days Input */}
        {duration === 'custom' && (
          <div className="mt-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">
              <FaClock className="inline mr-2" />
              Enter Number of Days
            </label>
            <input
              type="number"
              min="1"
              value={customDays}
              onChange={(e) => setCustomDays(e.target.value)}
              placeholder="e.g., 10"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-green focus:outline-none transition"
              required
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!duration || (duration === 'custom' && ! customDays)}
          className={`w-full text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
            analysisType === 'skin' ?  'bg-primary-green' : 'bg-primary-blue'
          }`}
        >
          Get My Results →
        </button>
      </form>
    </div>
  );
}

export default TravelDuration;