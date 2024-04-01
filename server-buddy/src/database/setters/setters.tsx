
import { collection, doc, getDocs, query, setDoc, where, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Order } from "../../objects/order";
import { Restaurant } from "../../objects/restaurant";
import { Ticket } from "../../objects/ticket";

export class setters {
    // Add an order to the database
    static async pushOrder(order: Order) {
        const orderRef = collection(db, "Orders");
        const orderDoc = doc(orderRef, order.getOrderId());
        await setDoc(orderDoc, {
            orderId: order.getOrderId(),
            ticketId: order.getTicketId(),
            employeeId: order.getEmployeeId(),
            tableId: order.getTableId(),
            restaurantId: order.getRestaurantId(),
            orderDateTime: serverTimestamp(),
            orderStatus: order.getOrderStatus(),
            menuItems: order.getMenuItems()
        });
    }

    // Add a ticket to the database
    static async pushTicket(ticket: Ticket) {
        const ticketRef = collection(db, "Tickets");
        const ticketDoc = doc(ticketRef, ticket.getTicketId());
        await setDoc(ticketDoc, {
            ticketId: ticket.getTicketId(),
            orderIds: ticket.getOrderIds(),
            restaurantId: ticket.getRestaurantId(),
            ticketStatus: ticket.getTicketStatus(),
            ticketTime: serverTimestamp(),
        });
    }
}