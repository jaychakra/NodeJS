const db = {
    orders: [],
    
    connect: () => {
        console.log('connected to db');
    },

    disconnect: () => {
        console.log('Disconected from db');
    },

    reset: () => {
        this.orders =[];
        console.log("Database reset");
    },

    addOrder: (order) => {
        this.orders.push(order);
        return order;
    },

    getOrders: () => {
        return this.orders;
    }
}

module.exports = db;