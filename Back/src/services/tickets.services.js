import TicketsMongoManager from "../DAL/daos/mongoManagers/ticketsMongoManager.js";

const ticketsManager = new TicketsMongoManager()

export async function getAllTickets() {
    try {
        const tickets = await ticketsManager.getAll()
        return tickets
    } catch (error) {
        return error;
    }
}

export async function getTicketById(ticketId) {
    try {
        const ticket = await ticketsManager.getTicketById(ticketId)
        return ticket
    } catch (error) {
        return error;
    }
}

export async function createTicket(objTicket) {
    try {
        const ticket = await ticketsManager.createTicket(objTicket)
        return ticket
    } catch (error) {
        return error;
    }
}