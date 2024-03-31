import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Order } from "../../objects/order";

const orderRef = collection(db, "Orders");

// Add an order to the database
export const addOrder = async (order: Order) => {
    const orderDoc = doc(orderRef, order.getOrderId());
    await setDoc(orderDoc, {
        orderId: order.getOrderId(),
        ticketId: order.getTicketId(),
        employeeId: order.getEmployeeId(),
        tableId: order.getTableId(),
        restaurantId: order.getRestaurantId(),
        orderTime: order.getOrderTime(),
        orderDate: order.getOrderDate(),
        orderStatus: order.getOrderStatus(),
        menuItems: order.getMenuItems()
    });
}
