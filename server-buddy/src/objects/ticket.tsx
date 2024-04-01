/*
Tickets are created when a table is seated. They are used to keep track of orders and payments.
*/
export class Ticket {


    constructor(
    // ticketId is used to keep track of the ticket.
    public ticketId: string,
    // orderIds are used to keep track of all orders associated with the ticket.
    public orderIds: string[],
    // tableId is used to keep track of the table associated with the ticket. -1 is to-go.
    public ticketName: string,
    // restaurantId is used to keep track of the restaurant associated with the ticket.
    public restaurantId: string,
    // ticketStatus: "Open", "Paid", "Void"
    public ticketStatus: string = "Open",
    // ticketTime is the time the ticket was created and set to fireStore serverTimestamp.
    public ticketTime: string,
    public subTotal: number
    ){}

    // Getters and Setters
    public getTicketId(): string {
        return this.ticketId;
    }
    public setTicketId(ticketId: string): void {
        this.ticketId = ticketId;
    }
    public getOrderIds(): string[] {
        return this.orderIds;
    }
    public setOrderIds(orderIds: string[]): void {
        this.orderIds = orderIds;
    }
    public getTicketName(): string {
        return this.ticketName;
    }
    public setTicketName(ticketName: string): void {
        this.ticketName = ticketName;
    }
    public getRestaurantId(): string {
        return this.restaurantId;
    }
    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }
    public getTicketStatus(): string {
        return this.ticketStatus;
    }
    public setTicketStatus(ticketStatus: string): void {
        this.ticketStatus = ticketStatus;
    }
    public getTicketTime(): string {
        return this.ticketTime;
    }
    public setTicketTime(ticketTime: string): void {
        this.ticketTime = ticketTime;
    }
    public getSubTotal(): number {
        return this.subTotal;
    }
    public setSubTotal(subTotal: number): void {
        this.subTotal = subTotal;
    }
    public addOrder(orderId: string): void {
        this.orderIds.push(orderId);
    }
}