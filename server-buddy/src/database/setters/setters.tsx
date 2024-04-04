
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Order } from "../../objects/order";
import { Restaurant } from "../../objects/restaurant";
import { Ticket } from "../../objects/ticket";
import { Item } from "../../objects/menuItem";

export class setters {
    /*
    pushOrder takes an order object and pushes it to the database
    orderDateTime is a timestamp from the firebase server
    Order object is defined in objects/order.tsx
     */
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

    /*
    pushTicket takes a ticket object and pushes it to the database
    ticketTime is a timestamp from the firebase server
    Ticket object is defined in objects/ticket.tsx
    */
    static async pushTicket(ticket: Ticket) {
        const ticketRef = collection(db, "Tickets");
        const ticketDoc = doc(ticketRef, ticket.getTicketId());
        await setDoc(ticketDoc, {
            ticketId: ticket.getTicketId(),
            tableId: ticket.getTableId(),
            restaurantId: ticket.getRestaurantId(),
            ticketStatus: ticket.getTicketStatus(),
            ticketDateTime: serverTimestamp(),
            ticketTotal: ticket.getTicketTotal(),
        });
    }

    /* 
    pushRestaurant takes a restaurant object and pushes it to the database
    Restaurant object is defined in objects/restaurant.tsx
    */

    static async pushRestaurant(restaurant: Restaurant) {
        const restaurantRef = collection(db, "Restaurants");
        const restaurantDoc = doc(restaurantRef, restaurant.getRestaurantId());
        await setDoc(restaurantDoc, {
            restaurantId: restaurant.getRestaurantId(),
            restaurantName: restaurant.getRestaurantName(),
            restaurantAddress: restaurant.getRestaurantAddress(),
            restaurantCity: restaurant.getRestaurantCity(),
            restaurantState: restaurant.getRestaurantState(),
            restaurantZip: restaurant.getRestaurantZip(),
            restaurantDescription: restaurant.getRestaurantDescription(),
            restaurantPhone: restaurant.getRestaurantPhone(),
            restaurantEmail: restaurant.getRestaurantEmail()
        });
    }

    /*
    pushItem takes an item object and pushes it to the database
    Item object is defined in objects/menuItem.tsx
    */
    static async pushItem(item: Item) {
        const itemRef = collection(db, "Items");
        const itemDoc = doc(itemRef, item.getItemId());
        await setDoc(itemDoc, {
            itemName: item.getItemName(),
            itemId: item.getItemId(),
            itemDescription: item.getItemDescription(),
            itemPrice: item.getItemPrice(),
            itemQuantity: item.getItemQuantity(),
            itemCategory: item.getItemCategory(),
            restaurantId: item.getRestaurantId(),
            
        });
    }

}