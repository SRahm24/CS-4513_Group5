export class Ticket {
    constructor(
    public ticketId: string,
    public orderIds: string[],
    public tableId: number,
    public restaurantId: string,
    // ticketStatus: "Open", "Paid", "Void"
    public ticketStatus: string = "Open",
    public ticketTime: string,
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
    public getOrderIds(): string[] {
        return this.orderIds;
    }
    public setOrderIds(orderIds: string[]): void {
        this.orderIds = orderIds;
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
    public addOrder(orderId: string): void {
        this.orderIds.push(orderId);
    }
}