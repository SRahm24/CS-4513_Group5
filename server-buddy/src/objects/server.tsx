class server extends employee{
    constructor(
    public serverId: number,
    public serverLastName: string,
    public serverFirstName: string,
    public restaurantId: number,
    public hourlyWage: number,
    public role: string,
    ) {
        super(serverId, serverLastName, serverFirstName, restaurantId, hourlyWage, role);
    }
}