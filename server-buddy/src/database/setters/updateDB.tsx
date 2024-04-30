import { db } from "../firebase"
import { Order } from "../../objects/order"
import { Ticket } from "../../objects/ticket"
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { Item } from "../../objects/menuItem";

export class updateDB {
    /**
     * updateOrderStatus takes an order object and updates the orderStatus in the database
     * @param order: Order object
     */
    static async updateOrderStatus(order: Order) {
        const orderRef = collection(db, "Orders");
        const orderDoc = doc(orderRef, order.getOrderId());
        await updateDoc(orderDoc, {
            orderStatus: order.getOrderStatus()
        });
    }

    /**
     * updateTicketStatus takes a ticket object and updates the ticketStatus in the database
     * @param ticket: Ticket object
     */
    static async updateTicketStatus(ticket: Ticket) {
        const ticketRef = collection(db, "Tickets");
        const ticketDoc = doc(ticketRef, ticket.getTicketId());
        await updateDoc(ticketDoc, {
            ticketStatus: ticket.getTicketStatus()
        });
    }

    /**
     * deleteItem takes an item object and deletes it from the database
     * @param item: Item object
     */
    static async deleteItem(item: Item) {
        const itemRef = collection(db, "MenuItems");
        const itemDoc = doc(itemRef, item.getItemId());
        await deleteDoc(itemDoc);
    }
    /**
     * voidOrder takes an order object and updates the orderStatus to "void" in the database
     * @param order: Order object
     */
    static async voidOrder(order: Order) {
        const orderRef = collection(db, "Orders");
        const orderDoc = doc(orderRef, order.getOrderId());
        await updateDoc(orderDoc, {
            orderStatus: "void"
        });
    }

    /**
     * voidTicket takes a ticket object and updates the ticketStatus to "void" in the database
     * @param ticket: Ticket object
     */
    static async voidTicket(ticket: Ticket) {
        const ticketRef = collection(db, "Tickets");
        const ticketDoc = doc(ticketRef, ticket.getTicketId());
        await updateDoc(ticketDoc, {
            ticketStatus: "void"
        });
    }
}
