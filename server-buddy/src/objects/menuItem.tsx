export class Item {
    constructor(
        public name: string,
        // itemId is the primary key, also used for odering and ticketing.
        public itemId: string,
        public description: string,
        public price: number,
        // quantity is used for inventory tracking and ordering.
        public quantity: number,
        public category: string,
        public restaurantId: string,
    ) {}

    // Getters and Setters
    public getItemName(): string {
        return this.name;
    }
    public setItemName(name: string): void {
        this.name = name;
    }
    public getItemId(): string {
        return this.itemId;
    }
    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }
    public getItemDescription(): string {
        return this.description;
    }
    public setItemDescription(description: string): void {
        this.description = description;
    }
    public getItemPrice(): number {
        return this.price;
    }
    public setItemPrice(price: number): void {
        this.price = price;
    }
    public getItemQuantity(): number {
        return this.quantity;
    }
    public setItemQuantity(quantity: number): void {
        this.quantity = quantity;
    }
    public getItemCategory(): string {
        return this.category;
    }
    public setItemCategory(category: string): void {
        this.category = category;
    }
    public getRestaurantId(): string {
        return this.restaurantId;
    }
    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }
    
}