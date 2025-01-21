// orderSystem.test.js
const db = require("./db");
const Orders = require("./orders");

describe("Order System Tests", () => {
  beforeAll(() => {
    db.connect(); 
  });

  afterAll(() => {
    db.disconnect(); 
  });

  beforeEach(() => {
    db.reset(); 
  });

  afterEach(() => {
    console.log("Test finished, database ready for next test.");
  });

  test("should create a new order", () => {
    const order = Orders.createOrder("John Doe", "Laptop", 1);
    expect(order).toEqual({
      id: 1,
      customerName: "John Doe",
      product: "Laptop",
      quantity: 1,
    });

    const orders = Orders.listOrders();
    expect(orders).toHaveLength(1);
  });

  test("should create multiple orders and list them", () => {
    Orders.createOrder("Alice", "Phone", 2);
    Orders.createOrder("Bob", "Tablet", 3);

    const orders = Orders.listOrders();
    expect(orders).toHaveLength(2);
    expect(orders).toEqual([
      { id: 1, customerName: "Alice", product: "Phone", quantity: 2 },
      { id: 2, customerName: "Bob", product: "Tablet", quantity: 3 },
    ]);
  });

  test("should reset the database before each test", () => {
    const orders = Orders.listOrders();
    expect(orders).toHaveLength(0); 
  });
});