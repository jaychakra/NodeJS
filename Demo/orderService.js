const db = require('./db');

class OrderService {
    static createOrder(name, product, quantiy) {
        const order = {
            id: db.orders.length + 1,
            name, 
            product, 
            quantiy
        }

        return db.addOrder(order);
    }

    static listOrders() {
        return db.getOrders();
    }
}

module.exports = OrderService;