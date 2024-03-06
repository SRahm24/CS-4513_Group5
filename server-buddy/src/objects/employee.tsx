class employee {
    constructor(
    public employeeId: number,
    public employeeLastName: string,
    public employeeFirstName: string,
    public restaurantId: string,
    public hourlyWage: number,

    // Roles: "Server", "Manager", "Chef", "Bartender", "Busser", "Host"
    // Roles are used to determine permissions and access to different parts of the application.
    public role: string,
    ) {}

    // Getters and Setters
    public getEmployeeId(): number {
        return this.employeeId;
    }
    public setEmployeeId(employeeId: number): void {
        this.employeeId = employeeId;
    }
    public getEmployeeLastName(): string {
        return this.employeeLastName;
    }
    public setEmployeeLastName(employeeLastName: string): void {
        this.employeeLastName = employeeLastName;
    }
    public getEmployeeFirstName(): string {
        return this.employeeFirstName;
    }
    public setEmployeeFirstName(employeeFirstName: string): void {
        this.employeeFirstName = employeeFirstName;
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