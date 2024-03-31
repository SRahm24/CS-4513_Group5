import { collection, getDocs, getDocsFromServer, query, where, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../firebase";
import { Menu } from "../../objects/menu";

const menuRef = collection(db, "Menu");

export class MenuAndItemsQueries {
    static getAllMenus = async () => {
        const q = query(menuRef)
        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        (await getDocsFromServer(q)).forEach((doc) => {
        result.push(doc);
            });
        //console.log(result.map((doc) => doc.data()));
        result.map((doc) => doc.data());
        const menus: Menu[] = [];
        for (let i = 0; i < result.length; i++) {
            console.log(result[i].get("name"));
            menus.push(new Menu(
                "menuId" + i,
                result[i].get("name"),
                result[i].get("price"),
                result[i].get("type")));
        }
        console.log(menus);
        return menus;
    }

    // getMenuByRestaurantID = async (restaurantId: string) => {
    //     const menuRef = collection(db, "Menus");
    //     const q = query(menuRef, where("Restaurant_ID", "==", restaurantId));
    //     const querySnapshot = await getDocs(q);
    // }

    // getItemByMenuIdAndItemName = async (restaurantId: string, menuId: string, itemName: string) => {
    //     const itemRef = collection(db, "Items");
    //     const q = query(itemRef, where("menuID", "==", menuId, ), where("Restaurant_ID", "==", restaurantId), where("itemName", "==", itemName));
    //     const querySnapshot = await getDocs(q);
    // }

    // getItemByItemID = async (restaurantId: string, itemId:  string) => {
    //     const itemRef = collection(db, "Items");
    //     const q = query(itemRef, where("itemID", "==", itemId), where("Restaurant_ID", "==", restaurantId));
    //     const querySnapshot = await getDocs(q);
    // }
}