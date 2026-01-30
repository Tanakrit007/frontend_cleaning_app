import axios from 'axios';
import TokenService from './token.service';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to every request
API.interceptors.request.use((config) => {
  const token = TokenService.getToken();
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});

export default API;
