import axios from 'axios';
import { getCurrentMonthOrSeason, mapDurationCategory } from '../utils/mappers';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new Error(error.response?.data?.detail || error.response?.data?.message || 'API error');
    }
    if (error.request) {
      throw new Error('Network error. Please check your connection.');
    }
    throw new Error(error.message || 'Unexpected error');
  }
);

export async function analyzeDestination(data) {
  const payload = {
    destination: data.cities.destinationCity,
    home_city: data.cities.homeCity,
    duration_category: mapDurationCategory(data.duration),
    month_or_season: getCurrentMonthOrSeason(),
    concern: data.analysisType,
  };

  if (data.analysisType === 'skin' && data.typeAnswers?.skinType) {
    payload.skin_type = data.typeAnswers.skinType;
  }

  if (data.analysisType === 'hair' && data.typeAnswers?.hairType) {
    payload.hair_type = data.typeAnswers.hairType;
  }

  const response = await api.post('/api/analyze', payload);
  return response.data;
}

export async function checkHealth() {
  const response = await api.get('/api/health');
  return response.data;
}
