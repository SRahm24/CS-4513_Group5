import { collection, getDocsFromServer, query, QueryDocumentSnapshot, DocumentData, where} from "firebase/firestore";
import { db } from "../firebase";
import { Ticket } from "../../objects/ticket";

/*
Represents a collection of queries for retrieving ticket data from the database.
*/
const orderRef = collection(db, "Tickets")


export class TicketsQueries {
    /**
     * Retrieves all orders from the database.
     * @returns An array of Ticket objects representing the orders.
     */
    static getAllTickets = async() => {
        const q = query(orderRef);
        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        (await getDocsFromServer(q)).forEach((doc) => {
            result.push(doc);
        });
        result.map((doc) => doc.data());
        const ticket: Ticket[] = [];
        for (let i = 0; i < result.length; i++) {
            ticket.push(new Ticket(
                result[i].get("ticketName"),
                result[i].get("ticketId"),
                result[i].get("tableId"),
                result[i].get("restaurantId"),
                result[i].get("ticketStatus"),
                result[i].get("ticketDateTime"),
                result[i].get("subTotal"),
                result[i].get("tip"),
                result[i].get("tax"),
                result[i].get("total")));
        }
        return ticket;
    }
    static getAllOpenTickets = async() => {
        const q = query(orderRef, where("ticketStatus", "==", "Open"));
        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        (await getDocsFromServer(q)).forEach((doc) => {
            result.push(doc);
        });
        result.map((doc) => doc.data());
        const ticket: Ticket[] = [];
        for (let i = 0; i < result.length; i++) {
            ticket.push(new Ticket(
                result[i].get("ticketName"),
                result[i].get("ticketId"),
                result[i].get("tableId"),
                result[i].get("restaurantId"),
                result[i].get("ticketStatus"),
                result[i].get("ticketDateTime"),
                result[i].get("subTotal"),
                result[i].get("tip"),
                result[i].get("tax"),
                result[i].get("total")));
        }
        return ticket;
    }
}