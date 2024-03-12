import { collection, doc, getDocs, query, where, setDoc } from "firebase/firestore";
import { db } from "../firebase";



class OrderSetter {

    static async setOrder(order: Order) {
        await setDoc(doc(db, "Orders", order.getOrderId().toString()), order.toJSONObject());
    }
}