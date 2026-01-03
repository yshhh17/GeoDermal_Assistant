import axios from 'axios';

// Base URL for your backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.detail || error.response.data.message || 'An error occurred');
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }
);

/**
 * Analyze destination for skin/hair recommendations
 * @param {Object} data - Analysis request data
 * @returns {Promise} - Analysis results
 */
export const analyzeDestination = async (data) => {
  try {
    // Map frontend data to backend API format
    const payload = {
      destination: data.cities.destinationCity,
      home_city: data.cities.homeCity,
      duration_category: mapDurationCategory(data.duration),
      month_or_season: getCurrentMonthOrSeason(),
      concern: data.analysisType, // 'skin' or 'hair'
    };

    // Add type-specific data
    if (data.analysisType === 'skin' && data.typeAnswers) {
      payload.skin_type = data.typeAnswers.skinType;
    } else if (data.analysisType === 'hair' && data.typeAnswers) {
      payload.hair_type = data.typeAnswers.hairType;
    }

    console.log('Sending request to backend:', payload);

    const response = await api.post('/api/analyze', payload);
    return response.data;
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
};

/**
 * Map frontend duration to backend duration_category
 */
const mapDurationCategory = (duration) => {
  if (! duration) return '2-7d';
  
  const durationStr = duration.toLowerCase();
  
  if (durationStr.includes('1-3') || durationStr.includes('day')) {
    return '<48h';
  } else if (durationStr.includes('4-7') || durationStr.includes('week')) {
    return '2-7d';
  } else if (durationStr.includes('1-2weeks') || durationStr.includes('2-4weeks') || durationStr.includes('month')) {
    return '1-4w';
  } else if (durationStr.includes('1month+')) {
    return 'relocation';
  }
  
  // Parse custom days
  const daysMatch = duration.match(/(\d+)\s*days?/);
  if (daysMatch) {
    const days = parseInt(daysMatch[1]);
    if (days < 2) return '<48h';
    if (days <= 7) return '2-7d';
    if (days <= 28) return '1-4w';
    return 'relocation';
  }
  
  return '2-7d'; // default
};

/**
 * Get current month or season
 */
const getCurrentMonthOrSeason = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const now = new Date();
  return months[now.getMonth()];
};

/**
 * Check API health
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

/**
 * Get API stats
 */
export const getStats = async () => {
  try {
    const response = await api.get('/api/stats');
    return response.data;
  } catch (error) {
    console.error('Stats fetch failed:', error);
    throw error;
  }
};

export default api;