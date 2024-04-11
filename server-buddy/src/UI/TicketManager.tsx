import { DocumentData } from "firebase/firestore";
import { getAllOrders, getOrderSize } from "../database/queries/ordersQueries";
import { Ticket } from "../objects/ticket";
import { Item } from "../objects/menuItem";
import { Order } from "../objects/order";
import { setters } from "../database/setters/setters";
import { getAllTickets } from "../database/queries/ticketQueries";
import { MenuAndItemsQueries } from "../database/queries/menuAndItemsQueries";

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
            let order: Order = new Order((this.orderID).toString(), _ticketId, _employeeId, _tableNum, _restaurantId, dateString, _status, _items);
            setters.pushOrder(order);
    }

    addTicket(name: string, status: string, itemPrices: {itemName: string, price: number}[]){
        let orderIDArray: string[] = [];
        this.orderID += 1;
        orderIDArray.push(this.orderID.toString());
        let orderNameArray: string[] = [];
        let ticketPrice: number = 0;
        let i = 0;
        itemPrices.forEach(element => {
            i++;
            orderNameArray.push(element.itemName);
            ticketPrice += element.price;
        });

        let date = new Date();

        let dateString: string = (date.getMonth()+1).toString() + "/" + (date.getDate()).toString();
        this.ticketID += 1;
        const newTicket: Ticket = new Ticket(this.ticketID.toString(), orderIDArray, name, "", status, dateString, ticketPrice);
        const newOrder: Order = new Order((this.orderID).toString(), this.ticketID.toString(), "", -1, "", dateString, "In Progress", orderNameArray);
        
        setters.pushTicket(newTicket);
        setters.pushOrder(newOrder);
    }

    async getAllTicketData(){
        let entireMenu: DocumentData[] = [];
        MenuAndItemsQueries.getAllMenus().then(menus => {
            entireMenu = menus;
        });

        let tickets: DocumentData[] = await getAllTickets();
        let orders: DocumentData[] = await getAllOrders();
        this.orderID = orders.length;

        let allTicketData:{TicketId: number, Name: String, Time: String, Date: String, Status: String, order: any[]}[] = [];


        tickets.forEach(ticket => {
            let tickId = ticket.ticketId;
            let tickName = ticket.ticketName;
            let tickStatus = ticket.ticketStatus;
            let date = ticket.ticketTime.toDate();
            let hours: String = (date.getHours() % 12).toString();
            let minutes: String = date.getMinutes().toString();
            if (date.getMinutes() < 10){
              minutes = "0" + date.getMinutes();
            }
            let ticketTime = hours + ":" + minutes;
            if(date.getHours() < 12){
                ticketTime += " AM";
            }
            else{
                ticketTime += " PM";
            }

            let ticketDate = (date.getMonth() + 1) + "/" + date.getDay() + "/" + date.getFullYear();

            let currentOrder: {itemId: number, item: string, type: string, quantity: number, status: string, price: number}[] = [];
            orders.forEach(order => {

                if(order.ticketId == tickId){
                    order.menuItems.forEach((_item: string) => {
                        currentOrder.push({itemId: 0, item: _item, type: "", quantity: 1, status: order.orderStatus, price: 0});
                    });
                }
            }); 

            for(let a = 0; a < currentOrder.length - 1; a++){
                for(let b = a + 1; b < currentOrder.length; b++){
                    if(currentOrder[a].item == currentOrder[b].item && currentOrder[a].status == currentOrder[b].status){
                        currentOrder[a].quantity++;
                        for(let c = b; c < currentOrder.length - 1; c++){
                            currentOrder[c] = currentOrder[c+1];
                        }
                        currentOrder.pop();
                    } 
                }
            }

            let _itemId = 1;
            currentOrder.forEach(item => {
                item.itemId = _itemId;
                _itemId++;

                entireMenu.forEach(menuItem => {
                    if(item.item == menuItem.name){
                        item.price = menuItem.price * item.quantity;
                        item.type = menuItem.type;
                    }
                });
            });
            console.log(currentOrder);

            allTicketData.push({TicketId: tickId, Name: tickName, Time: ticketTime, Date: ticketDate, Status: tickStatus, order: currentOrder});
        });

        this.ticketID = allTicketData.length;


        return allTicketData;
        
    }

}