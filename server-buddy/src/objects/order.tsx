import { Timestamp, serverTimestamp } from "firebase/firestore";

/*
Orders are used to build an order and send to the kitchen or bar.
Orders are created by employees and are associated with a ticket.
Orders can be dine-in(Table number) or to-go(Table -1).
*/
export class Order {
    constructor(
    public orderId: string,
    public ticketId: string,
    public employeeId: string,
    // If -1 Togo order, else dine in
    public tableId: number,
    public restaurantId: string,
    public orderDateTime: Timestamp,
    // orderStatus: "Sent", "In Progress", "Ready", "Closed"
    public orderStatus: string,
    // menuItems is an array of itemId on the order
    public menuItems: string[],
    ){}

    // Getters and Setters
    public getOrderId(): string {
        return this.orderId;
    }
    public setOrderId(orderId: string): void {
        this.orderId = orderId;
    }
    public getTicketId(): string {
        return this.ticketId;
    }
    public setTicketId(ticketId: string): void {
        this.ticketId = ticketId;
    }
    public getEmployeeId(): string {
        return this.employeeId;
    }
    public setEmployeeId(employeeId: string): void {
        this.employeeId = employeeId;
    }
    public getTableId(): number {
        return this.tableId;
    }
    public setTableId(tableId: number): void {
        this.tableId = tableId;
    }
    public getRestaurantId(): string {
        return this.restaurantId;
    }
    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }
    public getOrderDateTime(): Timestamp {
        return this.orderDateTime;
    }
    public getOrderStatus(): string {
        return this.orderStatus;
    }
    public setOrderStatus(orderStatus: string): void {
        this.orderStatus = orderStatus;
    }
    public getMenuItems(): string[] {
        return this.menuItems;
    }
    public setMenuItems(menuItems: []): void {
        this.menuItems = menuItems;
    }
    
}