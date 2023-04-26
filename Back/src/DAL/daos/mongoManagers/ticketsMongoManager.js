import { ticketsModel } from "../../models/ticket.model.js";

export default class TicketsMongoManager {
  async createTicket(objTicket) {
    try {
      const newTicket = await ticketsModel.create(objTicket);
      return newTicket;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const tickets = await ticketsModel.find();
      return tickets;
    } catch (error) {
      console.log(error);
    }
  }

  async getTicketById(idTicket) {
    try {
      const ticket = await ticketsModel.findById(idTicket).populate("users");
      return ticket;
    } catch (error) {
      console.log(error);
    }
  }
}
