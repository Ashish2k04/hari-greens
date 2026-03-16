import axios from 'axios';

// Centralised API configuration
// Ensure this points to your deployed backend URL in production

const API_BASE_URL = 'https://hari-greens.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
