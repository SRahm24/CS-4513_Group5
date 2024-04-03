export class Restaurant {
    constructor(
    public restaurantId: string,
    public restaurantName: string,
    public restaurantAddress: string,
    public restaurantCity: string,
    public restaurantState: string,
    public restaurantZip: number,
    public restaurantDescription: string,
    public restaurantPhone: string,
    public restaurantEmail: string
    ){}

    // Getters and Setters
    public getRestaurantId(): string {
        return this.restaurantId;
    }
    public setRestaurantID(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }
    public getRestaurantName(): string {
        return this.restaurantName;
    }
    public setRestaurantName(restaurantName: string): void {
        this.restaurantName = restaurantName;
    }
    public getRestaurantAddress(): string {
        return this.restaurantAddress;
    }
    public setRestaurantAddress(restaurantAddress: string): void {
        this.restaurantAddress = restaurantAddress;
    }
    public getRestaurantCity(): string {
        return this.restaurantCity;
    }
    public setRestaurantCity(restaurantCity: string): void {
        this.restaurantCity = restaurantCity;
    }
    public getRestaurantState(): string {
        return this.restaurantState;
    }
    public setRestaurantState(restaurantState: string): void {
        this.restaurantState = restaurantState;
    }
    public getRestaurantZip(): number {
        return this.restaurantZip;
    }
    public setRestaurantZip(restaurantZip: number): void {
        this.restaurantZip = restaurantZip;
    }
    public getRestaurantDescription(): string {
        return this.restaurantDescription;
    }
    public setRestaurantDescription(restaurantDescription: string): void {
        this.restaurantDescription = restaurantDescription;
    }
    public getRestaurantPhone(): string {
        return this.restaurantPhone;
    }
    public setRestaurantPhone(restaurantPhone: string): void {
        this.restaurantPhone = restaurantPhone;
    }
    public getRestaurantEmail(): string {
        return this.restaurantEmail;
    }
    public setRestaurantEmail(restaurantEmail: string): void {
        this.restaurantEmail = restaurantEmail;
    }

}