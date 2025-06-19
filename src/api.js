// src/api.js
import axios from 'axios';

// Base URL — switch here
export const API_BASE_URL = 'http://localhost:5000';
// export const API_BASE_URL = 'https://your-vercel-backend-url';

// LOGIN
export const login = (username, password) => {
  return axios.post(`${API_BASE_URL}/api/login`, { username, password });
};

// REGISTER
export const register = (username, password, email) => {
  return axios.post(`${API_BASE_URL}/api/register`, { username, password, email });
};

// FORGOT PASSWORD
export const forgotPassword = (email) => {
  return axios.post(`${API_BASE_URL}/api/forgot-password`, { email });
};

// CONTACT FORM — SEND EMAIL
export const sendEmail = (name, email, message) => {
  return axios.post(`${API_BASE_URL}/api/send-email`, { name, email, message });
};
