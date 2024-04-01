import { DocumentData } from "firebase/firestore";
import { getAllOrders, getOrderSize } from "../database/queries/ordersQueries";
import { Ticket } from "../objects/ticket";
import { Item } from "../objects/menuItem";
import { Order } from "../objects/order";
import { setters } from "../database/setters/setters";

export class TicketManager{
    ticketID: number = 0;
    orderID: number = 0;
    restauarantID: number = 0;

    constructor() {
    }

    addOrder(_ticketId: string,
        _employeeId: string,
        _tableNum: number,
        _restaurantId: string,
        _status: string,
        _items: string[]){
            let date = new Date(); 
            let hours: String = (date.getHours() % 12).toString();
            let minutes: String = date.getMinutes().toString();
            if (date.getMinutes() < 10){
              minutes = "0" + date.getMinutes();
            }

            let dateString: string = (date.getMonth()+1).toString() + "/" + (date.getDate()).toString();

            this.orderID += 1;
            let order: Order = new Order(this.orderID.toString(), _ticketId, _employeeId, _tableNum, _restaurantId, dateString, _status, _items);
            setters.pushOrder(order);
    }

    addTicket(_name: string, _status: string, _itemPrices: {itemName: string, price: number}[]){
        let orderIDArray: string[] = [];
        this.orderID += 1;
        orderIDArray.push(this.orderID.toString());
        let orderNameArray: string[] = [];
        let ticketPrice: number = 0;
        _itemPrices.forEach(element => {
            orderNameArray.push(element.itemName);
            ticketPrice += element.price;
        });

        let date = new Date();

        let dateString: string = (date.getMonth()+1).toString() + "/" + (date.getDate()).toString();
        this.ticketID += 1;
        let newTicket: Ticket = new Ticket(this.ticketID.toString(), orderIDArray, _name, "", _status, dateString, ticketPrice);
        let newOrder: Order = new Order(this.orderID.toString(), this.ticketID.toString(), "", -1, "", dateString, "In Progress", orderNameArray);

        setters.pushTicket(newTicket);
        setters.pushOrder(newOrder);
    }

}