import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const consultantAPI = {
  // Get all consultants with optional filters
  getConsultants: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.country) params.append('country', filters.country);
    if (filters.state) params.append('state', filters.state);
    if (filters.city) params.append('city', filters.city);
    if (filters.profession) params.append('profession', filters.profession);
    if (filters.expertise) params.append('expertise', filters.expertise);
    const response = await api.get(`/api/consultants?${params.toString()}`);
    return response.data;
  },

  // Get consultant by ID
  getConsultant: async (id) => {
    const response = await api.get(`/api/consultant/${id}`);
    return response.data;
  },

  // Search consultants
  searchConsultants: async (query) => {
    const response = await api.get(`/api/consultants/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  // Create consultant (admin only)
  createConsultant: async (consultantData) => {
    const response = await api.post('/api/consultant/create', consultantData);
    return response.data;
  },

  // Fetch unique countries
  getCountries: async () => {
    const response = await api.get('/api/countries');
    return response.data;
  },

  // Fetch unique states for a country
  getStates: async (country) => {
    const response = await api.get(`/api/states?country=${encodeURIComponent(country)}`);
    return response.data;
  },

  // Fetch unique cities for a country and state
  getCities: async (country, state) => {
    let url = `/api/cities?`;
    if (country) url += `country=${encodeURIComponent(country)}`;
    if (state) url += `&state=${encodeURIComponent(state)}`;
    const response = await api.get(url);
    return response.data;
  },
};

export default api; 