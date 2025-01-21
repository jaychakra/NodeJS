const db = {
    orders: [],
  
    connect() {
      console.log("Database connected");
    },
  
    disconnect() {
      console.log("Database disconnected");
    },
  
    reset() {
      this.orders = [];
      console.log("Database reset");
    },
  
    addOrder(order) {
      this.orders.push(order);
      return order;
    },
  
    getOrders() {
      return this.orders;
    },
  };
  
  module.exports = db;