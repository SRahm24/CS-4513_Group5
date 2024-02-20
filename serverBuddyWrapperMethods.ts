interface Ticket {
	employeeName: string;	// employee name under the order submitted
	itemCount: number;	// how many items ordered on this ticket
	itemArray: string[];	// contains items of objects ordered
	itemCostArray: number[];	// contains prices of items ordered
	timeStamp: Date;	// Unsure if this is right terminology
}

interface readOnlyTicket {
	readonly employeeName: string;
	readonly itemCount: number;
	readonly itemArray: string[];
	readonly itemCostArray: number[];
	readonly timeStamp: Date;
}

interface Server {
	employeeName: string;
	employeeID: number;
}

interface readOnlyServer {
	readonly employeeName: string;
	readonly employeeID: number;
}

interface Menus {
	menuType: string;
	menuItems: number;
}

interface readOnlyMenus {
	readonly menuType: string;
	readonly menuItems: number;
}

interface menuItem {
	menuType: Menus[];
	itemName: string;
	itemDesc: string;
	itemPrice: number;
}

interface readOnlyMenuItem {
	readonly menuType: Menus[];
	readonly itemName: string;
	readonly itemDesc: string;
	readonly itemPrice: number;
}

class serverBuddyWrapper {
	private tickets: Ticket[] = [];
	private menus: Menus[] = [];
	private menuItems: menuItem[] = [];

	addMenuItem(item: menuItem): void {
    this.tickets.push(item);
  }

	placeOrder(): Ticket {
	const total
	const ticket: Ticket = {
		menuItems: [...this.menuItems],
		total,
		timeStamp: new Date(),
		}
	this.tickets.push(ticket);
	this menuItems = [];

	return ticket;
	}
	
	
	getTickets(): Ticket[] {
		return this.tickets;
	}
}