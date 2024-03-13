import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

class RestaurantQueries {
    getRestaurantByRestaurantID = async (restaurantId: string) => {
        const restaurantRef = collection(db, "Restaurants");
        const q = query(restaurantRef, where("restaurantID", "==", restaurantId));
        const querySnapshot = await getDocs(q);
    }

    getMenuByRestaurantID = async (restaurantId: string) => {
        const menuRef = collection(db, "Menus");
        const q = query(menuRef, where("restaurantID", "==", restaurantId));
        const querySnapshot = await getDocs(q);
    }
}
