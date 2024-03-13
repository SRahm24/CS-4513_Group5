class Order {
    constructor(
    public orderId: string,
    public ticketId: string,
    public employeeId: string,
    // If -1 Togo order, else dine in
    public tableId: number,
    public restaurantId: string,
    public orderTime: string = new Date().getTime().toString(),
    public orderDate: string = new Date().toLocaleDateString(),
    // orderStatus: "Sent", "In Progress", "Ready", "Closed"
    public orderStatus: string,
    public menuItems: MenuItem[],
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
    public getOrderTime(): string {
        return this.orderTime;
    }
    public getOrderDate(): string {
        return this.orderDate;
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
    public getMenuItems(): MenuItem[] {
        return this.menuItems;
    }
    public setMenuItems(menuItems: MenuItem[]): void {
        this.menuItems = menuItems;
    }
    public toJSONObject(): any {
        return {
            orderId: this.orderId,
            ticketId: this.ticketId,
            employeeId: this.employeeId,
            tableId: this.tableId,
            restaurantId: this.restaurantId,
            orderTime: this.orderTime,
            orderDate: this.orderDate,
            orderStatus: this.orderStatus,
            menuItems: this.menuItems
        }
    }
    
}