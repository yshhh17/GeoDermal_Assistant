import { useState } from 'react';

function HairTypeQuiz({ onComplete }) {
  const [answers, setAnswers] = useState({
    hairType: '',
    texture: '',
    concerns: []
  });

  const hairTypes = [
    { value: 'straight', label: 'Straight', description: 'No curl pattern' },
    { value: 'wavy', label: 'Wavy', description: 'Loose S-shaped waves' },
    { value: 'curly', label: 'Curly', description: 'Defined curls' },
    { value: 'coily', label: 'Coily', description: 'Tight coils or kinks' }
  ];

  const textures = [
    { value: 'fine', label:  'Fine/Thin' },
    { value: 'medium', label: 'Medium' },
    { value: 'thick', label: 'Thick/Coarse' }
  ];

  const concerns = [
    'Frizz', 'Dryness', 'Oiliness', 'Breakage', 'Dullness', 'Dandruff'
  ];

  const handleConcernToggle = (concern) => {
    setAnswers(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.hairType && answers.texture) {
      onComplete(answers);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          Tell Us About Your Hair
        </h2>
        <p className="text-text-secondary">
          Help us personalize your recommendations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hair Type */}
        <div>
          <label className="block text-lg font-semibold text-text-primary mb-4">
            What's your hair type? 
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            {hairTypes.map(type => (
              <button
                key={type.value}
                type="button"
                onClick={() => setAnswers(prev => ({ ...prev, hairType: type. value }))}
                className={`p-4 rounded-lg border-2 text-left transition ${
                  answers.hairType === type.value
                    ? 'border-primary-blue bg-bg-accent'
                    : 'border-gray-200 hover:border-primary-blue'
                }`}
              >
                <div className="font-bold text-text-primary">{type.label}</div>
                <div className="text-sm text-text-secondary">{type.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Texture */}
        <div>
          <label className="block text-lg font-semibold text-text-primary mb-4">
            What's your hair texture?
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            {textures.map(texture => (
              <button
                key={texture.value}
                type="button"
                onClick={() => setAnswers(prev => ({ ...prev, texture: texture.value }))}
                className={`p-4 rounded-lg border-2 transition ${
                  answers.texture === texture.value
                    ?  'border-primary-blue bg-bg-accent'
                    : 'border-gray-200 hover:border-primary-blue'
                }`}
              >
                <div className="font-bold text-text-primary text-center">{texture.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Concerns */}
        <div>
          <label className="block text-lg font-semibold text-text-primary mb-4">
            Any specific concerns? (Optional)
          </label>
          <div className="flex flex-wrap gap-3">
            {concerns.map(concern => (
              <button
                key={concern}
                type="button"
                onClick={() => handleConcernToggle(concern)}
                className={`px-4 py-2 rounded-full border-2 transition ${
                  answers.concerns.includes(concern)
                    ? 'border-primary-blue bg-primary-blue text-white'
                    :  'border-gray-200 text-text-secondary hover:border-primary-blue'
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
          disabled={!answers.hairType || !answers.texture}
          className="w-full bg-primary-blue text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition duration-200 disabled: opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Continue →
        </button>
      </form>
    </div>
  );
}

export default HairTypeQuiz;