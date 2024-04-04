/*
Tickets are created when a table is seated. They are used to keep track of orders and payments.
*/
export class Ticket {
    constructor(
    // ticketId is used to keep track of the ticket.
    public ticketId: string,
    // orderIds are used to keep track of all orders associated with the ticket.
    // ticketId is tracked in the order object.
    // public orderIds: string[],
    // tableId is used to keep track of the table associated with the ticket. -1 is to-go.
    public tableId: number,
    // restaurantId is used to keep track of the restaurant associated with the ticket.
    public restaurantId: string,
    // ticketStatus: "Open", "Paid", "Void"
    public ticketStatus: string = "Open",
    // ticketTime is the time the ticket was created and set to fireStore serverTimestamp.
    public ticketDateTime: string,
    public subTotal: number,
    public tip: number,
    public tax: number,
    public ticketTotal: number,
    ){}

    // Getters and Setters
    public getTicketId(): string {
        return this.ticketId;
    }
    public setTicketId(ticketId: string): void {
        this.ticketId = ticketId;
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
    public getTicketStatus(): string {
        return this.ticketStatus;
    }
    public setTicketStatus(ticketStatus: string): void {
        this.ticketStatus = ticketStatus;
    }
    public getTicketDateTime(): string {
        return this.ticketDateTime;
    }
    public setTicketDateTime(ticketDateTime: string): void {
        this.ticketDateTime = ticketDateTime;
    }
    public getSubTotal(): number {
        return this.subTotal;
    }
    public setSubTotal(subTotal: number): void {
        this.subTotal = subTotal;
    }
    public getTip(): number {
        return this.tip;
    }
    public setTip(tip: number): void {
        this.tip = tip;
    }
    public getTax(): number {
        return this.tax;
    }
    public setTax(tax: number): void {
        this.tax = tax;
    }
    public getTicketTotal(): number {
        return this.ticketTotal;
    }
    public setTicketTotal(ticketTotal: number): void {
        this.ticketTotal = ticketTotal;
    }
    // public addOrder(orderId: string): void {
    //     this.orderIds.push(orderId);
    // }
    // public getOrderIds(): string[] {
    //     return this.orderIds;
    // }
    // public setOrderIds(orderIds: string[]): void {
    //     this.orderIds = orderIds;
    // }
}