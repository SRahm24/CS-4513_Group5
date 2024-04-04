
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Order } from "../../objects/order";
import { Restaurant } from "../../objects/restaurant";
import { Ticket } from "../../objects/ticket";
import { Item } from "../../objects/menuItem";
import { UniqueId } from "../uniqueId";


export class setters {
    
    /**
    * pushOrder takes an order object and pushes it to the database
    * @param order: Order object
    * @return uniqueId: string
    * 
    * orderDateTime is a timestamp from the firebase server
    * document reference is set by the firebase server
    * Order object is defined in objects/order.tsx
    */
    static async pushOrder(order: Order) {
        const orderRef = collection(db, "Orders");
        const orderDoc = doc(orderRef);
        const uniqueId = "ord_" + (Date.now() % 1000) + "__" + UniqueId.generateUniqueId(order.employeeId);
        await setDoc(orderDoc, {
            orderId: uniqueId,
            ticketId: order.getTicketId(),
            employeeId: order.getEmployeeId(),
            tableId: order.getTableId(),
            restaurantId: order.getRestaurantId(),
            orderDateTime: serverTimestamp(),
            orderStatus: order.getOrderStatus(),
            menuItems: order.getMenuItems()
        });
        return uniqueId;
    }

    /**
    * pushTicket takes a ticket object and pushes it to the database
    * @param ticket: Ticket object
    * @return uniqueId: string
    * ticketTime is a timestamp from the firebase server
    * document reference is set by the firebase server
    * Ticket object is defined in objects/ticket.tsx
    */
    static async pushTicket(ticket: Ticket) {
        const ticketRef = collection(db, "Tickets");
        const ticketDoc = doc(ticketRef);
        const uniqueId = "tick_" + (Date.now() % 1000) + "__" + UniqueId.generateUniqueId(ticket.restaurantId);
        await setDoc(ticketDoc, {
            ticketId: uniqueId,
            tableId: ticket.getTableId(),
            restaurantId: ticket.getRestaurantId(),
            ticketStatus: ticket.getTicketStatus(),
            ticketDateTime: serverTimestamp(),
            ticketTotal: ticket.getTicketTotal(),
        });
        return uniqueId;
    }

    /** 
    pushRestaurant takes a restaurant object and pushes it to the database
    @param restaurant: Restaurant object
    @return uniqueId: string
    document reference is set by the firebase server
    Restaurant object is defined in objects/restaurant.tsx
    */
    static async pushRestaurant(restaurant: Restaurant) {
        const restaurantRef = collection(db, "Restaurants");
        const restaurantDoc = doc(restaurantRef);
        const uniqueId = "rest_" + UniqueId.generateUniqueId(restaurant.getRestaurantName());
        await setDoc(restaurantDoc, {
            restaurantId: uniqueId,
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
    document reference is set by the firebase server
    Item object is defined in objects/menuItem.tsx
    */
    static async pushItem(item: Item) {
        const itemRef = collection(db, "Items");
        const itemDoc = doc(itemRef);
        const uniqueId = "item_" + UniqueId.generateUniqueId(item.getItemName());
        await setDoc(itemDoc, {
            itemName: item.getItemName(),
            itemId: uniqueId,
            itemDescription: item.getItemDescription(),
            itemPrice: item.getItemPrice(),
            itemQuantity: item.getItemQuantity(),
            itemCategory: item.getItemCategory(),
            restaurantId: item.getRestaurantId(),
            
        });
    }

}