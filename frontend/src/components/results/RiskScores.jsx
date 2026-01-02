import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

function RiskScores({ risks, analysisType }) {
  // Define risk categories based on analysis type
  const skinRisks = [
    { key: 'dryness', label: 'Dryness Risk', icon: '💧' },
    { key:  'acne', label: 'Acne Risk', icon: '🔴' },
    { key: 'irritation', label: 'Irritation Risk', icon: '⚠️' },
    { key: 'uv_damage', label: 'UV Damage Risk', icon: '☀️' },
    { key: 'pigmentation', label: 'Pigmentation Risk', icon: '🎨' }
  ];

  const hairRisks = [
    { key: 'dryness', label: 'Dryness Risk', icon: '💧' },
    { key: 'frizz', label: 'Frizz Risk', icon: '🌊' },
    { key: 'breakage', label: 'Breakage Risk', icon: '✂️' },
    { key:  'hairfall', label: 'Hair Fall Risk', icon: '🍂' },
    { key: 'dandruff', label: 'Dandruff Risk', icon: '❄️' }
  ];

  const riskCategories = analysisType === 'skin' ? skinRisks : hairRisks;

  const getRiskColor = (score) => {
    if (score <= 3) return 'bg-status-success';
    if (score <= 6) return 'bg-status-warning';
    return 'bg-status-error';
  };

  const getRiskLabel = (score) => {
    if (score <= 3) return 'Low';
    if (score <= 6) return 'Moderate';
    return 'High';
  };

  const getRiskTextColor = (score) => {
    if (score <= 3) return 'text-status-success';
    if (score <= 6) return 'text-status-warning';
    return 'text-status-error';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
        <FaExclamationTriangle className="mr-3 text-status-warning" />
        Risk Assessment
      </h3>

      <div className="space-y-4">
        {riskCategories. map((risk) => {
          const score = risks[risk.key] || 0;
          const percentage = (score / 10) * 100;

          return (
            <div key={risk.key} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-text-primary font-semibold flex items-center">
                  <span className="text-2xl mr-2">{risk.icon}</span>
                  {risk.label}
                </span>
                <span className={`font-bold ${getRiskTextColor(score)}`}>
                  {score}/10 - {getRiskLabel(score)}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${getRiskColor(score)} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Summary */}
      <div className="mt-6 p-4 bg-bg-secondary rounded-lg">
        <div className="flex items-center justify-center">
          {Object.values(risks).some(score => score > 6) ? (
            <FaExclamationTriangle className="text-status-error text-2xl mr-3" />
          ) : (
            <FaCheckCircle className="text-status-success text-2xl mr-3" />
          )}
          <span className="text-text-primary font-semibold">
            {Object.values(risks).some(score => score > 6)
              ? 'High risk detected - Follow recommendations carefully'
              : 'Overall risk is manageable with proper care'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RiskScores;