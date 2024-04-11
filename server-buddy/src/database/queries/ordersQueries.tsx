import { collection, getDocsFromServer, query, where, QueryDocumentSnapshot, DocumentData, } from "firebase/firestore";
import { db } from "../firebase";
import { Order } from "../../objects/order";

const orderRef = collection(db, "Orders")

export class OrdersQueries {
    /**
    * Retrieves all orders from the database.
    * @returns An array of Order objects representing the orders.
    */
    static getAllOrders = async() => {
        const q = query(orderRef)
        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        (await getDocsFromServer(q)).forEach((doc) => {
        result.push(doc);
            });
        result.map((doc) => doc.data());
        const orders: Order[] = [];
        for (let i = 0; i < result.length; i++) {
            orders.push(new Order(
                result[i].get("orderId"),
                result[i].get("ticketId"),
                result[i].get("employeeId"),
                result[i].get("tableId"),
                result[i].get("restaurantId"),
                result[i].get("orderDateTime"),
                result[i].get("orderStatus"),
                result[i].get("menuItems")));
        }
        // console.log(orders);
        return orders;
    }
    /*
    Returns all orders "In Progress" for the kitchen view
    */
    static getKitchenOrders = async() => {
        const q = query(orderRef, where("orderStatus", "==", "In Progress"));
        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        (await getDocsFromServer(q)).forEach((doc) => {
        result.push(doc);
            });
        // console.log(result.map((doc) => doc.data()));
        result.map((doc) => doc.data());
        const orders: Order[] = [];
        for (let i = 0; i < result.length; i++) {
            orders.push(new Order(
                result[i].get("orderId"),
                result[i].get("ticketId"),
                result[i].get("employeeId"),
                result[i].get("tableId"),
                result[i].get("restaurantId"),
                result[i].get("orderDateTime"),
                result[i].get("orderStatus"),
                result[i].get("menuItems")));
        }
        // console.log(orders);
        return orders;
    }

    /*
    Returns all orders associated with a ticketId
    param: ticketId
    */
    static getOrdersByTicketId = async (ticketId: string) => {
        const q = query(orderRef, where("ticketId", "==", ticketId));
        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        (await getDocsFromServer(q)).forEach((doc) => {
        result.push(doc);
            });
        result.map((doc) => doc.data());
        const orders: Order[] = [];
        for (let i = 0; i < result.length; i++) {
            orders.push(new Order(
                result[i].get("orderId"),
                result[i].get("ticketId"),
                result[i].get("employeeId"),
                result[i].get("tableId"),
                result[i].get("restaurantId"),
                result[i].get("orderDateTime"),
                result[i].get("orderStatus"),
                result[i].get("menuItems")));
        }
        // console.log(orders);
        return orders;
    }

    // getAllOrdersByRestaurantID = async (restaurantId: string) => {
    //     const q = query(orderRef, where("restaurantId", "==", restaurantId));
    //     const querySnapshot = await getDocs(q);
    // }

    // getTimeRangeOrdersByRestaurantID = async (restaurantId: string, date: string) => {
    //     const q = query(orderRef, where("restaurantId", "==", restaurantId), where("orderDate", ">=", date));
    //     const querySnapshot = await getDocs(q);
    // }

    // getOrdersByEmployeeID = async (restaurantId: string, employeeId: string) => {
    //     const q = query(orderRef, where("employeeId", "==", employeeId), where("restaurantId", "==", restaurantId));
    //     const querySnapshot = await getDocs(q);
    // }

    // getOrdersByRestaurantAndOrderID = async (restaurantId:string, orderId: number) => {
    //     const q = query(orderRef, where("orderId", "==", orderId), where("restaurantId", "==", restaurantId));
    //     const querySnapshot = await getDocs(q);
    // }

    // getOrderByStatus = async () => {
    //     const q = query(orderRef, where("status", "==", "status"));
    //     const querySnapshot = await getDocs(q);
    // }

    // getOderByTicketID = async () => {
    //     const q = query(orderRef, where("ticketId", "==", "ticketId"));
    //     const querySnapshot = await getDocs(q);
    // }
    
    // getOrdersByCustomerID = async () => {
    //     const q = query(orderRef, where("customerId", "==", "customerId"));
    //     const querySnapshot = await getDocs(q);
    // }
}