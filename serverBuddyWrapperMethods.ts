interface Ticket {
	employeeName: string;	// employee name under the order submitted
	itemCount: number;	// how many items ordered on this ticket
	itemArray: string[];	// contains items of objects ordered
	itemCostArray: number[];	// contains prices of items ordered
	timeSubmitted: Date;	// Unsure if this is right terminology
}

interface readOnlyTicket {
	readonly employeeName
	readonly itemCount: number;
	readonly itemArray: string[];
	readonly itemCostArray: number[];
	readonly timeSubmitted: Date;
}

class serverBuddyWrapper {
	

}