import { db } from "../firebase"
import { Order } from "../../objects/order"
import { Ticket } from "../../objects/ticket"
import { collection, doc, updateDoc } from "firebase/firestore"

export class updateDB {
    /*
    updateOrderStatus takes an order object and updates the orderStatus in the database
    Order object is defined in objects/order.tsx
    */
    static async updateOrderStatus(order: Order) {
        const orderRef = collection(db, "Orders");
        const orderDoc = doc(orderRef, order.getOrderId());
        await updateDoc(orderDoc, {
            orderStatus: order.getOrderStatus()
        });
    }

    /*
    updateTicketStatus takes a ticket object and updates the ticketStatus in the database
    Ticket object is defined in objects/ticket.tsx
    */
    static async updateTicketStatus(ticket: Ticket) {
        const ticketRef = collection(db, "Tickets");
        const ticketDoc = doc(ticketRef, ticket.getTicketId());
        await updateDoc(ticketDoc, {
            ticketStatus: ticket.getTicketStatus()
        });
    }
}
