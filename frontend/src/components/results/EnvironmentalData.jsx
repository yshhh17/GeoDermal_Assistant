import { FaTemperatureHigh, FaSun, FaWind, FaTint, FaSmog } from 'react-icons/fa';

function EnvironmentalData({ envData }) {
  const dataPoints = [
    {
      icon: FaTemperatureHigh,
      label: 'Temperature',
      value: `${envData.temperature_c}°C`,
      color: 'text-status-warning'
    },
    {
      icon: FaSun,
      label: 'UV Index',
      value: envData.uv_index,
      color: 'text-primary-orange'
    },
    {
      icon: FaTint,
      label: 'Humidity',
      value: `${envData.humidity}%`,
      color: 'text-primary-blue'
    },
    {
      icon: FaSmog,
      label: 'AQI',
      value: envData.aqi,
      color: 'text-status-error'
    },
    {
      icon: FaWind,
      label:  'PM2.5',
      value: `${envData.pm25} µg/m³`,
      color: 'text-text-secondary'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
        <FaWind className="mr-3 text-primary-blue" />
        Environmental Conditions
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dataPoints.map((point, index) => (
          <div key={index} className="text-center p-4 bg-bg-secondary rounded-lg">
            <point.icon className={`text-4xl ${point.color} mx-auto mb-2`} />
            <div className="text-sm text-text-secondary mb-1">{point.label}</div>
            <div className="text-xl font-bold text-text-primary">{point.value}</div>
          </div>
        ))}
      </div>

      {envData.coords && (
        <div className="mt-4 text-sm text-text-secondary text-center">
          📍 {envData.coords.display_name}
        </div>
      )}
    </div>
  );
}

export default EnvironmentalData;