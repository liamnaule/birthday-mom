import axios from 'axios';

const baseURL =
  (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

export const API = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});
