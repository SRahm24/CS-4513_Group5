import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

class EmployeeQueries {
    /* 
    Parameters: restaurantID
    Returns: all employees that work at a specific restaurant
    */
    getEmployeesByRestaurantID = async (restaurantId: string) => {
        const employeeRef = collection(db, "Employees");
        const q = query(employeeRef, where("Works_For", "==", restaurantId));
        const querySnapshot = await getDocs(q);
        
    }
    getEmployeeByEmployeeID = async (employeeId: number, restaurantId: string) => {
        const employeeRef = collection(db, "Employees");
        const q = query(employeeRef, where("employeeID", "==", employeeId, ), where("Works_For", "==", restaurantId));
        const querySnapshot = await getDocs(q);
    }

}