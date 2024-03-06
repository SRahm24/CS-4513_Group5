class order {
    constructor(
    public orderId: number,
    public ticketId: number,
    public employeeId: number,
    public tableId: number,
    public restaurantId: number,
    public orderTime: string,
    public orderStatus: string,
    public menuItems: menuItem[],
    ){}
}