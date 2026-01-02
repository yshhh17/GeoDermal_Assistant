import { useState } from 'react';

function SkinTypeQuiz({ onComplete }) {
  const [answers, setAnswers] = useState({
    skinType: '',
    sensitivity: '',
    concerns: []
  });

  const skinTypes = [
    { value: 'oily', label: 'Oily', description: 'Shiny, large pores' },
    { value: 'dry', label: 'Dry', description: 'Tight, flaky' },
    { value: 'combination', label: 'Combination', description: 'Oily T-zone, dry cheeks' },
    { value: 'normal', label: 'Normal', description: 'Balanced, few issues' }
  ];

  const sensitivities = [
    { value: 'low', label: 'Not Sensitive' },
    { value: 'medium', label: 'Moderately Sensitive' },
    { value: 'high', label:  'Very Sensitive' }
  ];

  const concerns = [
    'Acne', 'Wrinkles', 'Dark Spots', 'Redness', 'Dryness', 'Oiliness'
  ];

  const handleConcernToggle = (concern) => {
    setAnswers(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns. filter(c => c !== concern)
        : [...prev.concerns, concern]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.skinType && answers. sensitivity) {
      onComplete(answers);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          Tell Us About Your Skin
        </h2>
        <p className="text-text-secondary">
          Help us personalize your recommendations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Skin Type */}
        <div>
          <label className="block text-lg font-semibold text-text-primary mb-4">
            What's your skin type?
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            {skinTypes.map(type => (
              <button
                key={type.value}
                type="button"
                onClick={() => setAnswers(prev => ({ ...prev, skinType: type. value }))}
                className={`p-4 rounded-lg border-2 text-left transition ${
                  answers.skinType === type.value
                    ? 'border-primary-green bg-bg-secondary'
                    : 'border-gray-200 hover:border-primary-green'
                }`}
              >
                <div className="font-bold text-text-primary">{type.label}</div>
                <div className="text-sm text-text-secondary">{type.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sensitivity */}
        <div>
          <label className="block text-lg font-semibold text-text-primary mb-4">
            How sensitive is your skin?
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            {sensitivities.map(sens => (
              <button
                key={sens.value}
                type="button"
                onClick={() => setAnswers(prev => ({ ...prev, sensitivity: sens.value }))}
                className={`p-4 rounded-lg border-2 transition ${
                  answers.sensitivity === sens.value
                    ? 'border-primary-green bg-bg-secondary'
                    :  'border-gray-200 hover:border-primary-green'
                }`}
              >
                <div className="font-bold text-text-primary text-center">{sens.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Concerns */}
        <div>
          <label className="block text-lg font-semibold text-text-primary mb-4">
            Any specific concerns?  (Optional)
          </label>
          <div className="flex flex-wrap gap-3">
            {concerns.map(concern => (
              <button
                key={concern}
                type="button"
                onClick={() => handleConcernToggle(concern)}
                className={`px-4 py-2 rounded-full border-2 transition ${
                  answers.concerns.includes(concern)
                    ? 'border-primary-green bg-primary-green text-white'
                    : 'border-gray-200 text-text-secondary hover:border-primary-green'
                }`}
              >
                {concern}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!answers.skinType || ! answers.sensitivity}
          className="w-full bg-primary-green text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Continue →
        </button>
      </form>
    </div>
  );
}

export default SkinTypeQuiz;