class ticket {
    constructor(
    public ticketId: number,
    public orderIds: number[],
    public tableId: number,
    public restaurantId: number,
    public ticketStatus: string,
    public ticketTime: string,
    public subTotal: number,
    public tip: number,
    public tax: number,
    public ticketTotal: number,
    ){}
}