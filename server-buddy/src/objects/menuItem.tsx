class MenuItem {
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
    public getName(): string {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }
    public getItemId(): string {
        return this.itemId;
    }
    public setItemId(itemId: string): void {
        this.itemId = itemId;
    }
    public getDescription(): string {
        return this.description;
    }
    public setDescription(description: string): void {
        this.description = description;
    }
    public getPrice(): number {
        return this.price;
    }
    public setPrice(price: number): void {
        this.price = price;
    }
    public getQuantity(): number {
        return this.quantity;
    }
    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }
    public getCategory(): string {
        return this.category;
    }
    public setCategory(category: string): void {
        this.category = category;
    }
    public getRestaurantId(): string {
        return this.restaurantId;
    }
    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }
    
}