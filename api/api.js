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


// REGISTER
export const register = (loginId, password, email) => {
  const token = localStorage.getItem("token");

  return axios.post(`${API_BASE_URL}/api/register`, {
    username: loginId,
    password,
    email
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
