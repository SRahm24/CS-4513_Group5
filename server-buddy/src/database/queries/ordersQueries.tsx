import { collection, getDocs, getDocsFromServer, query, where, QueryDocumentSnapshot, DocumentData, } from "firebase/firestore";
import { db } from "../firebase";

const orderRef = collection(db, "Orders")

class OrdersQueries {
    
    getAllOrders = async() => {
        const q = query(orderRef)
        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        const querySnapshot = await getDocsFromServer(q)
        if (!querySnapshot.empty){
            querySnapshot.forEach((snapshot)=>{result.push(snapshot)})
            console.log("Orders:")
        } else {
            console.log("No such document")
        }
    }

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

    getOrderByTicketID = async () => {
        const q = query(orderRef, where("ticketId", "==", "ticketId"));
        const querySnapshot = await getDocs(q);
    }
    
    getOrdersByCustomerID = async () => {
        const q = query(orderRef, where("customerId", "==", "customerId"));
        const querySnapshot = await getDocs(q);
    }
}