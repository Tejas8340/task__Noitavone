// TechSupport.js

import React, { useEffect, useState } from 'react';
// import TicketService from './TicketService';
import TicketService from '../services/TicketService';

const TechSupport = () => {
  const [tickets, setTickets] = useState([]);
  console.log("tickets", tickets);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await TicketService.getAssignedTickets();
      if (Array.isArray(response)) { // Check if response is an array
        setTickets(response);
      } else {
        console.error('Response is not an array:', response);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleAnswerTicket = async (ticketId, description) => {
    try {
      await TicketService.answerTicket(ticketId, description);
      // Handle success
      // fetchTickets(); // Refresh tickets after answering
    } catch (error) {
      console.error('Error answering ticket:', error);
    }
  };

  const handleChange = (e, ticketId) => {

    const updatedTickets = tickets.map(ticket =>
      ticket._id === ticketId ? { ...ticket, description: e.target.value } : ticket
    );
    setTickets(updatedTickets);
  }

  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
        <table class="w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.title}</td>
                <td>
                  <form onSubmit={(e) => handleAnswerTicket(ticket._id, e.target.description.value)}>
                    <input type="text" class="border border-gray-300 rounded-md px-2 py-1 w-full" placeholder="Enter your answer" name='description' defaultValue={ticket.description} onChange={(e) => handleChange(e, ticket._id)} />
                  </form>
                </td>
                <td>
                  <button type='submit' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default TechSupport;
