import axios from 'axios';
import { jwtDecode } from 'jwt-decode'

const API_URL = 'http://localhost:5000'; // Your backend API URL

const AuthService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  },
  register: async (username, password) => {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    }
    return null;
  }
};

export default AuthService;
