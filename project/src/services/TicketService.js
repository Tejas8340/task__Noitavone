// TicketService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your backend API URL

const TicketService = {
  createTicket: async (ticketData) => {
    const formData = new FormData();
    formData.append('title', ticketData.title);
    formData.append('description', ticketData.description);
    if (ticketData.attachment) {
      formData.append('attachment', ticketData.attachment);
    }
    const response = await axios.post(`${API_URL}/create-ticket`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getAssignedTickets: async () => {
    try {
      const response = await axios.get(`${API_URL}/tickets`);
      return response.data; // Ensure response.data is an array
    } catch (error) {
      throw error; // Propagate the error
    }
  },
  answerTicket: async (ticketId, description) => {

    try {
      const response = await axios.put(`${API_URL}/update-ticket/${ticketId}`, description);
      const data = response.then((res) => res.json())
      return data;
     

      // Ensure response.data is an array
    } catch (error) {
      throw error; // Propagate the error
    }

  },
};

export default TicketService;
