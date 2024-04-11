/*
Tickets are created when a table is seated. They are used to keep track of orders and payments.
*/
export class Ticket {
    

    constructor(
    // ticketId is used to keep track of the ticket.
    public ticketId: string,
    // tableId is used to keep track of the table associated with the ticket. -1 is to-go.
    public tableId: string,
    // restaurantId is used to keep track of the restaurant associated with the ticket.
    public restaurantId: string,
    // ticketStatus: "Open", "Paid", "Void"
    public ticketStatus: string,
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
    public getTableId(): string {
        return this.tableId;
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
}