import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: '' // Add role field to formData
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Registration successful');
      navigate("/");

    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border border-gray-300 p-4 max-w-md rounded-md shadow-md">
        <h1 className='text-center'>Registration Form</h1>
        <br />
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="block">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={formData.username}
            className="border border-gray-400 rounded-md py-2 px-3 w-full"
          />

          <label className="block">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="border border-gray-400 rounded-md py-2 px-3 w-full"
          />

          {/* Uncomment the lines below if you want to include the email field */}
          {/* <label className="block">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={handleChange}
        value={formData.email}
        className="border border-gray-400 rounded-md py-2 px-3 w-full"
      /> */}

          <label className="block">Role</label>
          <select
            id="role"
            name="role"
            onChange={handleChange}
            value={formData.role}
            className="border border-gray-400 rounded-md py-2 px-3 w-full"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="tech_support">Tech Support</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded w-full">
            Register
          </button>
        </form>
      </div>
    </div>


  );
};

export default Register;
