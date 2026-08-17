import axios from 'axios';

// In production (GitHub Pages) → points to deployed Render.com backend
// In development → Vite proxy handles /api → http://localhost:5000
const API_BASE = import.meta.env.VITE_API_URL || '/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token automatically if available
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('resumai_jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginAPI = async ({ email, password }) => {
  const response = await client.post('/auth/login', { email, password });
  if (response.data?.data?.token) {
    localStorage.setItem('resumai_jwt_token', response.data.data.token);
  }
  return response.data;
};

export const registerAPI = async ({ name, email, password, targetRole }) => {
  const response = await client.post('/auth/register', { name, email, password, targetRole });
  if (response.data?.data?.token) {
    localStorage.setItem('resumai_jwt_token', response.data.data.token);
  }
  return response.data;
};

export const getMeAPI = async () => {
  const response = await client.get('/auth/me');
  return response.data;
};

export const upgradePlanAPI = async ({ planName, newCredits }) => {
  const response = await client.post('/auth/upgrade-plan', { planName, newCredits });
  return response.data;
};

export const analyzeResumeAPI = async ({ file, targetRole, jobDescription, resumeText }) => {
  const formData = new FormData();
  if (file) {
    formData.append('resume', file);
  }
  formData.append('targetRole', targetRole);
  if (jobDescription) {
    formData.append('jobDescription', jobDescription);
  }
  if (resumeText) {
    formData.append('resumeText', resumeText);
  }

  const response = await client.post('/analyze-score', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getHistoryAPI = async () => {
  const response = await client.get('/history');
  return response.data;
};

export const getHistoryByIdAPI = async (id) => {
  const response = await client.get(`/history/${id}`);
  return response.data;
};

export const deleteHistoryAPI = async (id) => {
  const response = await client.delete(`/history/${id}`);
  return response.data;
};
