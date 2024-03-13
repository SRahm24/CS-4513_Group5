import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

class Queries {
    
    getOrdersByCustomerID = async () => {
        const orderRef = collection(db, "Orders");
        const q = query(orderRef, where("customerID", "==", "customerID"));
        const querySnapshot = await getDocs(q);
    }

}