import { collection, getDocs, getDocsFromServer, query, where, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../firebase";

const menuRef = collection(db, "Menu");

export const getAllMenus = async () => {
    const q = query(menuRef)
    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    (await getDocsFromServer(q)).forEach((doc) => {
    result.push(doc);
});
    //console.log(result.map((doc) => doc.data()));
    return result.map((doc) => doc.data());
}


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