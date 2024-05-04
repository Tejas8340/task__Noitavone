// EndUser.js

import React, { useState } from 'react';
import TicketService from '../services/TicketService';
import { useNavigate } from 'react-router-dom';

const EndUserDashboard = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    attachment: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await TicketService.createTicket(formData);
      navigate("/techsupport")
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border border-gray-300 p-4 max-w-md rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Create Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              className="border border-gray-400 rounded-md py-2 px-3"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              className="border border-gray-400 rounded-md py-2 px-3"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Attachment</label>
            <input
              type="file"
              name="attachment"
              onChange={handleFileChange}
              className="border border-gray-400 rounded-md py-2 px-3"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded w-full">
            Submit
          </button>
        </form>
      </div>
    </div>

  );
};

export default EndUserDashboard;
