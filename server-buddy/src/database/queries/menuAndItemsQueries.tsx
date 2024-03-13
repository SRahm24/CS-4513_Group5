import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

class MenuAndItemsQueries {

    getMenuByRestaurantID = async (restaurantId: string) => {
        const menuRef = collection(db, "Menus");
        const q = query(menuRef, where("Restaurant_ID", "==", restaurantId));
        const querySnapshot = await getDocs(q);
    }

    getItemByMenuIdAndItemName = async (restaurantId: string, menuId: string, itemName: string) => {
        const itemRef = collection(db, "Items");
        const q = query(itemRef, where("menuID", "==", menuId, ), where("Restaurant_ID", "==", restaurantId), where("itemName", "==", itemName));
        const querySnapshot = await getDocs(q);
    }

    getItemByItemID = async (restaurantId: string, itemId:  string) => {
        const itemRef = collection(db, "Items");
        const q = query(itemRef, where("itemID", "==", itemId), where("Restaurant_ID", "==", restaurantId));
        const querySnapshot = await getDocs(q);
    }
}