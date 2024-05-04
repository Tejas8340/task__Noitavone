// Admin.js

import React, { useState, useEffect } from 'react';
// import TicketService from './TicketService';
import TicketService from '../services/TicketService';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await TicketService.getAllTickets();
      setTickets(response.data);
    } catch (error) {
      console.log(error)
    }
  };
  const handleAssignTechSupport = async (ticketId, techSupportId) => {
    try {
      await TicketService.assignTechSupport(ticketId, techSupportId);
      // Handle success
      fetchTickets(); // Refresh tickets after assignment
    } catch (error) {
      // Handle error
    }
  };

  const handleCloseTicket = async (ticketId) => {
    try {
      await TicketService.closeTicket(ticketId);
      // Handle success
      fetchTickets(); // Refresh tickets after closing
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>All Tickets</h2>
      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
          <button onClick={() => handleAssignTechSupport(ticket.id)}>Assign Tech Support</button>
          <button onClick={() => handleCloseTicket(ticket.id)}>Close Ticket</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
