class manager extends employee{
    constructor(
    public managerId: number,
    public managerLastName: string,
    public managerFirstName: string,
    public restaurantId: string,
    public hourlyWage: number,
    // Roles: "Manager"
    public role: string = "manager",
    ) {
        super(managerId, managerLastName, managerFirstName, restaurantId, hourlyWage, role);
    }

    // Getters and Setters
    public getManagerId(): number {
        return this.managerId;
    }
    public setManagerId(managerId: number): void {
        this.managerId = managerId;
    }
    public getManagerLastName(): string {
        return this.managerLastName;
    }
    public setManagerLastName(managerLastName: string): void {
        this.managerLastName = managerLastName;
    }
    public getManagerFirstName(): string {
        return this.managerFirstName;
    }
    public setManagerFirstName(managerFirstName: string): void {
        this.managerFirstName = managerFirstName;
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