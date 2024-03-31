import { collection, getDocs, getDocsFromServer, query, where, QueryDocumentSnapshot, DocumentData, } from "firebase/firestore";
import { db } from "../firebase";
import { Order } from "../../objects/order";

const orderRef = collection(db, "Orders")

export const getAllOrders = async() => {
    const q = query(orderRef)
    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    (await getDocsFromServer(q)).forEach((doc) => {
    result.push(doc);
});
    console.log(result.map((doc) => doc.data()));
    return result.map((doc) => doc.data());
}


class OrdersQueries {

    getAllOrdersByRestaurantID = async (restaurantId: string) => {
        const q = query(orderRef, where("restaurantId", "==", restaurantId));
        const querySnapshot = await getDocs(q);
    }

    getTimeRangeOrdersByRestaurantID = async (restaurantId: string, date: string) => {
        const q = query(orderRef, where("restaurantId", "==", restaurantId), where("orderDate", ">=", date));
        const querySnapshot = await getDocs(q);
    }

    getOrdersByEmployeeID = async (restaurantId: string, employeeId: string) => {
        const q = query(orderRef, where("employeeId", "==", employeeId), where("restaurantId", "==", restaurantId));
        const querySnapshot = await getDocs(q);
    }

    getOrdersByRestaurantAndOrderID = async (restaurantId:string, orderId: number) => {
        const q = query(orderRef, where("orderId", "==", orderId), where("restaurantId", "==", restaurantId));
        const querySnapshot = await getDocs(q);
    }

    getOrderByStatus = async () => {
        const q = query(orderRef, where("status", "==", "status"));
        const querySnapshot = await getDocs(q);
    }

    getOderByTicketID = async () => {
        const q = query(orderRef, where("ticketId", "==", "ticketId"));
        const querySnapshot = await getDocs(q);
    }
    
    getOrdersByCustomerID = async () => {
        const q = query(orderRef, where("customerId", "==", "customerId"));
        const querySnapshot = await getDocs(q);
    }
}