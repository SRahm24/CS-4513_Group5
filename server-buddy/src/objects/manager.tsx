class manager extends employee{
    constructor(
    public managerId: number,
    public managerLastName: string,
    public managerFirstName: string,
    public restaurantId: number,
    public hourlyWage: number,
    public role: string,
    ) {
        super(managerId, managerLastName, managerFirstName, restaurantId, hourlyWage, role);
    }
}