const db = require("./db");

class OrderSystem {
  static createOrder(customerName, product, quantity) {
    const order = {
      id: db.orders.length + 1,
      customerName,
      product,
      quantity,
    };
    return db.addOrder(order);
  }

  static listOrders() {
    return db.getOrders();
  }
}

module.exports = OrderSystem;