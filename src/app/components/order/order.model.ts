class OrderItem {
    constructor(public quantity: number, public menuId: string) {
    }
}

class Order {


    constructor(public address: string,
        public number: number,
        public addresstag: string,
        public save: boolean,
        public optionalAddress: string,
        public paymentOptions: string,
        public orderItems: OrderItem[] = [],
        public id?: string) {
    }
}

export { Order, OrderItem };
