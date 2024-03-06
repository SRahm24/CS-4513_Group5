class order {
    constructor(
    public orderId: number,
    public ticketId: number,
    public employeeId: number,
    // If -1 Togo order, else dine in
    public tableId: number,
    public restaurantId: number,
    public orderTime: string,
    // orderStatus: "Sent", "In Progress", "Ready"
    public orderStatus: string,
    public menuItems: menuItem[],
    ){}

    // Getters and Setters
    public getOrderId(): number {
        return this.orderId;
    }
    public setOrderId(orderId: number): void {
        this.orderId = orderId;
    }
    public getTicketId(): number {
        return this.ticketId;
    }
    public setTicketId(ticketId: number): void {
        this.ticketId = ticketId;
    }
    public getEmployeeId(): number {
        return this.employeeId;
    }
    public setEmployeeId(employeeId: number): void {
        this.employeeId = employeeId;
    }
    public getTableId(): number {
        return this.tableId;
    }
    public setTableId(tableId: number): void {
        this.tableId = tableId;
    }
    public getRestaurantId(): number {
        return this.restaurantId;
    }
    public setRestaurantId(restaurantId: number): void {
        this.restaurantId = restaurantId;
    }
    public getOrderTime(): string {
        return this.orderTime;
    }
    public setOrderTime(orderTime: string): void {
        this.orderTime = orderTime;
    }
    public getOrderStatus(): string {
        return this.orderStatus;
    }
    public setOrderStatus(orderStatus: string): void {
        this.orderStatus = orderStatus;
    }
    public getMenuItems(): menuItem[] {
        return this.menuItems;
    }
    public setMenuItems(menuItems: menuItem[]): void {
        this.menuItems = menuItems;
    }
    
}