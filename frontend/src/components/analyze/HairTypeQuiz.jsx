import { useState } from 'react';

function HairTypeQuiz({ onComplete }) {
  const [answers, setAnswers] = useState({
    hairType: '',
    texture: '',
    concerns: []
  });

  const hairTypes = [
    { value: 'straight', label: 'Straight', description: 'No curl pattern', emoji: '🪮' },
    { value: 'wavy', label: 'Wavy', description: 'Loose S-shaped waves', emoji: '〰️' },
    { value: 'curly', label: 'Curly', description: 'Defined curls', emoji: '🌀' },
    { value: 'coily', label: 'Coily', description: 'Tight coils or kinks', emoji: '🌿' }
  ];

  const textures = [
    { value: 'fine', label:  'Fine/Thin', emoji: '🧵' },
    { value: 'medium', label: 'Medium', emoji: '🪶' },
    { value: 'thick', label: 'Thick/Coarse', emoji: '🌾' }
  ];

  const concerns = [
    { value: 'frizz', label: 'Frizz', emoji: '☁️' },
    { value: 'dryness', label: 'Dryness', emoji: '🏜️' },
    { value: 'oiliness', label: 'Oiliness', emoji: '💧' },
    { value: 'breakage', label: 'Breakage', emoji: '✂️' },
    { value: 'dullness', label: 'Dullness', emoji: '🌫️' },
    { value: 'dandruff', label: 'Dandruff', emoji: '❄️' }
  ];

  const handleConcernToggle = (concernValue) => {
    setAnswers(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concernValue)
        ? prev.concerns.filter(c => c !== concernValue)
        : [...prev.concerns, concernValue]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.hairType && answers.texture) {
      onComplete(answers);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">💇</div>
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
                onClick={() => setAnswers(prev => ({ ...prev, hairType: type.value }))}
                className={`group p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                  answers.hairType === type.value
                    ? 'border-primary-blue bg-bg-accent shadow-md scale-105'
                    : 'border-gray-200 hover:border-primary-blue hover:shadow-md hover:scale-105'
                }`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{type.emoji}</div>
                <div className="font-bold text-lg text-text-primary mb-1">{type.label}</div>
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
                className={`group p-5 rounded-xl border-2 transition-all duration-300 ${
                  answers.texture === texture.value
                    ? 'border-primary-blue bg-bg-accent shadow-md scale-105'
                    : 'border-gray-200 hover:border-primary-blue hover:shadow-md'
                }`}
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{texture.emoji}</div>
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
                key={concern.value}
                type="button"
                onClick={() => handleConcernToggle(concern.value)}
                className={`group px-5 py-3 rounded-full border-2 transition-all duration-300 flex items-center gap-2 ${
                  answers.concerns.includes(concern.value)
                    ? 'border-primary-blue bg-primary-blue text-white shadow-md scale-105'
                    : 'border-gray-300 text-text-secondary hover:border-primary-blue hover:shadow-md bg-white'
                }`}
              >
                <span className="text-xl group-hover:scale-125 transition-transform duration-300">{concern.emoji}</span>
                <span className="font-medium">{concern.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!answers.hairType || !answers.texture}
          className="w-full bg-primary-blue text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
        >
          Continue →
        </button>
      </form>
    </div>
  );
}

export default HairTypeQuiz;