class Order {
    constructor(
        public address: string,
        public number: number,
        public optionalAddress: string,
        public paymentOption: string,
        public orderItems: OrderItem[] = []
    ) { }
}

class OrderItem {
    constructor(public quantidade: number,
        public menuItem: string) {

    }
}

export { Order, OrderItem }