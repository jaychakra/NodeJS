jest.mock("./db", () => ({
    orders: [],
    addOrder: jest.fn(),
    getOrders: jest.fn()
}));

const db = require("./db");
const OrderService = require('./orderService');

describe("Order Service Tests", () => {
    beforeEach(() => {
        db.orders = [];
        db.addOrder.mockClear();
        db.getOrders.mockClear();
    });

    it ("Should create a new Order", () => {
        db.addOrder.mockImplementation((order) => {
            db.orders.push(order);
            return order;
        });

        const order = OrderService.createOrder("Jay", "Laptop", 1);

        expect(order.id).toBe(1);
    });

    // it ("Should list all Orders", () => {
    //     OrderService.createOrder("Jay", "Laptop", 1);
    //     OrderService.createOrder("Raghav", "Laptop", 2);
    //     OrderService.createOrder('Srikant', "Pen", 2);

    //     const orders = OrderService.listOrders();
    //     const totalOrders = orders.length; 
    //     expect(totalOrders).toBe(3);
    // })


});




function processNumbers(a, b) {
    let result = a + b; 
    if (result > 10) { 
      result = result * 2; return result; 
    } else {  
      result = (a * b) + 
      (a - b);
    }
    return result; 
  }