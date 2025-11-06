import axios from 'axios';

// Base URL — switch here
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (loginId, password) => {
  const response = await axios.post(`${API_BASE_URL}/api/login`, {
    loginId,
    password,
  });

  // Store token
  const token = response.data.token;
  if (token) {
    localStorage.setItem("token", token);
  }

  return response;
};



export const register = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/api/register`, data);
  return response;
};



// FORGOT PASSWORD
export const forgotPassword = (email) => {
  return axios.post(`${API_BASE_URL}/api/forgot-password`, { email });
};

// CONTACT FORM — SEND EMAIL (no token needed)
// CONTACT FORM — SEND EMAIL
export const sendEmail = (name, email, message) => {
  return axios.post(`${API_BASE_URL}/api/send-email`, {
    name,
    email,
    message
  });
};
