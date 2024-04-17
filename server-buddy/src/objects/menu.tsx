import { Item } from "./menuItem";

export class Menu {
    constructor (
        public menuId: string,
        public restaurantId: string,
        // menuType: "Breakfast", "Lunch", "Dinner", "Dessert", "Drinks", "Appetizers", "Entrees", "Sides", "Specials", "Kids", "Desserts", "Alcohol", "Non-Alcoholic", "All"
        public menuType: string,
        public menuItems: Item[],
    ){}

    // Getters and Setters
    public getMenuId(): string {
        return this.menuId;
    }
    public setMenuId(menuId: string): void {
        this.menuId = menuId;
    }
    public getRestaurantId(): string {
        return this.restaurantId;
    }
    public setRestaurantId(restaurantId: string): void {
        this.restaurantId = restaurantId;
    }
    public getMenuType(): string {
        return this.menuType;
    }
    public setMenuType(menuType: string): void {
        this.menuType = menuType;
    }
    public getMenuItems(): Item[] {
        return this.menuItems;
    }
    public setMenuItems(menuItems: Item[]): void {
        this.menuItems = menuItems;
    }
    
}