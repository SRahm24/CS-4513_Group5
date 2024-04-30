import { DocumentData, Timestamp } from "firebase/firestore";
import { OrdersQueries } from "../database/queries/ordersQueries";
import { Ticket } from "../objects/ticket";
import { Item } from "../objects/menuItem";
import { Order } from "../objects/order";
import { setters } from "../database/setters/setters";
import { TicketsQueries } from "../database/queries/ticketQueries";
import { MenuAndItemsQueries } from "../database/queries/menuAndItemsQueries";
import { updateDB } from "../database/setters/updateDB";

export class TicketManager{
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

            let timestamp: Timestamp = new Timestamp(date.getSeconds(), date.getSeconds());

            let order: Order = new Order("", _ticketId, _employeeId, _tableNum, _restaurantId, timestamp, _status, _items);
            setters.pushOrder(order);
    }

    addTicket(name: string, status: string, itemPrices: {itemName: string, price: number}[]){
        
        let orderNameArray: string[] = [];
        let ticketPrice: number = 0;
        let i = 0;
        itemPrices.forEach(element => {
            i++;
            orderNameArray.push(element.itemName);
            ticketPrice += element.price;
        });

        let date = new Date();
        
        let timestamp: Timestamp = new Timestamp(date.getSeconds(), date.getSeconds());
        const newTicket: Ticket = new Ticket(name, "", "-1", "", status, timestamp, ticketPrice, 0, 0, 0);
        setters.pushTicket(newTicket).then(id => {
            const newOrder: Order = new Order("", id.toString(), "", -1, "", timestamp, "In Progress", orderNameArray);
            setters.pushOrder(newOrder);
        })
    }

    async getAllTicketData(){
        let entireMenu: DocumentData[] = [];
        MenuAndItemsQueries.getAllMenus().then(menus => {
            entireMenu = menus;
        });

        let tickets: Ticket[] = await TicketsQueries.getAllOpenTickets();
        let orders: Order[] = await OrdersQueries.getAllOrders();

        let allTicketData:{TicketId: String , Name: String, Time: String, Date: String, Status: String, order: any[]}[] = [];


        tickets.forEach(async ticket => {
            let tickId = ticket.ticketId;
            let tickName = ticket.ticketName;
            let tickStatus = ticket.ticketStatus;
            let date = ticket.ticketDateTime.toDate();
            console.log(ticket.ticketDateTime);
            let hours: String = (date.getHours() % 12).toString();
            let minutes: String = date.getMinutes().toString();
            if(hours == "0"){
                hours = "12";
            }
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

            //let ticketDate = (date.getMonth() + 1) + "/" + date.getDay() + "/" + date.getFullYear();
            let ticketDate: String = (date.getMonth() + 1).toString() + "/" + (date.getDate()).toString() + "/" + (date.getFullYear()).toString();


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

        return allTicketData;
        
    }

    async getOrdersByTicket(ticketId: string){

        let orders = await OrdersQueries.getOrdersByTicketId(ticketId);
        let formattedOrders: any[] = [];
        let itemId = 0;
        orders.forEach(order => {
            (order.getMenuItems()).forEach(async item => {
                itemId++;
                let itemInfo = this.getItemInfo(item);
                formattedOrders.push({itemId: itemId, item: item, type: (await itemInfo).type, quantity: 1, status: order.getOrderStatus(), price: (await itemInfo).price})
            });
        });

        for(let a = 0; a < formattedOrders.length; a++){
            let currentItem = formattedOrders[a];
            for(let b = a + 1; a < formattedOrders.length - 1; b++){
                let item = formattedOrders[b];
                if(currentItem.item == item.item){
                    currentItem.quantity++;
                    for(let c = b + 1; c < formattedOrders.length - 1; c++){
                        formattedOrders[b - 1] = formattedOrders[b];
                    }
                    formattedOrders.pop();
                }
            }
            currentItem.price = currentItem.price * currentItem.quantity;
            formattedOrders[a] = currentItem;
        }
        console.log(formattedOrders);
        return formattedOrders;
    }

    async getItemInfo(item: string){
        let entireMenu: DocumentData[] = [];
        MenuAndItemsQueries.getAllMenus().then(menus => {
            entireMenu = menus;
        });

        let type = "";
        let price = 0;

        entireMenu.forEach(menuItem => {
            if(menuItem.name == item){
                type = menuItem.type;
                price = menuItem.price;
            }
        });

        return {type, price};
    }

    async updateTicketStatusToPaid(ticketId: string){
        let ticket = new Ticket("", ticketId, "", "", "Paid", new Timestamp(0,0), 0, 0, 0, 0);
        await updateDB.updateTicketStatus(ticket);
        console.log(ticketId);
    }
}