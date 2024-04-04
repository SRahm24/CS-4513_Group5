import { collection, getDocs, getDocsFromServer, query, where, QueryDocumentSnapshot, DocumentData, } from "firebase/firestore";
import { db } from "../firebase";

const ticketRef = collection(db, "Tickets");

export const getAllTickets = async() => {
    const q = query(ticketRef)
    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    (await getDocsFromServer(q)).forEach((doc) => {
        result.push(doc);
    });
    console.log(result.map((doc) => doc.data()));
    return result.map((doc) => doc.data());
}