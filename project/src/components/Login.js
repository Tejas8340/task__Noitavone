import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Login successful');
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Decode token to get user role
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      // Navigate based on user role
      if (role === 'tech_support') {
        navigate("/techsupport");
      } else if (role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/enduser");
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid credentials');
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border border-gray-300 p-4 flex flex-col justify-center items-center shadow-lg rounded-md">
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <label className="mb-2">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={formData.username}
            className="border border-gray-400 rounded-md py-2 px-3 mb-3 w-full"
          />
          <label className="mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="border border-gray-400 rounded-md py-2 px-3 mb-3 w-full"
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded w-full mb-3">
            Login
          </button>
          <button onClick={navigateToRegister} className="text-blue-500 no-underline">
            Register New User
          </button>
        </form>
      </div>
    </div>

  );
};

export default Login;
