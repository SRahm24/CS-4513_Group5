
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import firebase from "firebase/app";


class setters {
  static async setServer(server: Server) {
    const db = firebase.firestore();
    const serverRef = db.collection('servers').doc(server.id);
    await serverRef.set(server);
  }
    static async setOrder(order: Order) {
        const db = firebase.firestore();
        const orderRef = db.collection('orders').doc(order.id);
        await orderRef.set(order);
    }
    static async setMenuItem(menu: Menu) {
        const db = firebase.firestore();
        const menuRef = db.collection('menus').doc(menu.id);
        await menuRef.set(menu);
    }
}