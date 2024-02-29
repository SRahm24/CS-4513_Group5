
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

class Queries {
    getEmployeesByRestaurantID = async () => {
        const employeeRef = collection(db, "Employees");
        const q = query(employeeRef, where("restaurantID", "==", "restaurantID"));
        const querySnapshot = await getDocs(q);
    }

    getEmployeeByEmployeeID = async () => {
        const employeeRef = collection(db, "Employees");
        const q = query(employeeRef, where("employeeID", "==", "employeeID"));
        const querySnapshot = await getDocs(q);
    }

    getRestaurantByRestaurantID = async () => {
        const restaurantRef = collection(db, "Restaurants");
        const q = query(restaurantRef, where("restaurantID", "==", "restaurantID"));
        const querySnapshot = await getDocs(q);
    }

    getMenuByRestaurantID = async () => {
        const menuRef = collection(db, "Menus");
        const q = query(menuRef, where("restaurantID", "==", "restaurantID"));
        const querySnapshot = await getDocs(q);
    }

    getOrdersByRestaurantID = async () => {
        const orderRef = collection(db, "Orders");
        const q = query(orderRef, where("restaurantID", "==", "restaurantID"));
        const querySnapshot = await getDocs(q);
    }

    getOrdersByEmployeeID = async () => {
        const orderRef = collection(db, "Orders");
        const q = query(orderRef, where("employeeID", "==", "employeeID"));
        const querySnapshot = await getDocs(q);
    }

    getOrdersByOrderID = async () => {
        const orderRef = collection(db, "Orders");
        const q = query(orderRef, where("orderID", "==", "orderID"));
        const querySnapshot = await getDocs(q);
    }

    getOrdersByCustomerID = async () => {
        const orderRef = collection(db, "Orders");
        const q = query(orderRef, where("customerID", "==", "customerID"));
        const querySnapshot = await getDocs(q);
    }

    getMenuItemsByType = async () => {
        const menuRef = collection(db, "Menus");
        const q = query(menuRef, where("type", "==", "type"));
        const querySnapshot = await getDocs(q);
    }


}