class Server extends Employee{
    constructor(
    public serverId: string,
    public serverLastName: string,
    public serverFirstName: string,
    public restaurantId: string,
    public hourlyWage: number,
    public role: string = "Server",
    ) {
        super(serverId, serverLastName, serverFirstName, restaurantId, hourlyWage, role);
    }

    // Getters and Setters
    public getServerId(): string {
        return this.serverId;
    }
    public setServerId(serverId: string): void {
        this.serverId = serverId;
    }
    public getServerLastName(): string {
        return this.serverLastName;
    }
    public setServerLastName(serverLastName: string): void {
        this.serverLastName = serverLastName;
    }
    public getServerFirstName(): string {
        return this.serverFirstName;
    }
    public setServerFirstName(serverFirstName: string): void {
        this.serverFirstName = serverFirstName;
    }
    public getRestaurantId(): string {
        return this.restaurantId;
    }
    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }
    public getHourlyWage(): number {
        return this.hourlyWage;
    }
    public setHourlyWage(hourlyWage: number): void {
        this.hourlyWage = hourlyWage;
    }
    public getRole(): string {
        return this.role;
    }
    public setRole(role: string): void {
        this.role = role;
    }

}