import { getAllTickets, getTicketById, createTicket } from "../services/tickets.services.js";

export async function create(req, res) {
    const { amount, purchaser } = req.body;
    if (  !amount || !purchaser) {
      res.status(400).json({ error: "Field missing" });
    }
    try {
      const newTicket = await createTicket(req.body);
      res.status(200).json({ message: "Ticket created", newTicket });
    } catch (error) {
      res.status(500).json(error);
    }
  }

export async function findById(req, res) {
    try {
      const { ticketId } = req.params;
      const ticket = await getTicketById(ticketId);
      if (!ticket) {
        res.status(200).json({ message: "Ticket incorrect" });
      } else {
        res.status(200).json({ message: "Ticket found", ticket });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  export async function findAll (req, res) {
    try {
      const tickets = await getAllTickets()    
      if (tickets.length === 0) {
        res.status(200).json({ message: "No tickets yet" });
      } else {
        res.status(200).json({ message: "Ticket found", tickets });
      }
    } catch (error) {
      res.status(500).json({message: error});
    }
  }
