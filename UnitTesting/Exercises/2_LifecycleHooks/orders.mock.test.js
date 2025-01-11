jest.mock("./db", () => ({
    orders: [],
    addOrder: jest.fn(),
    getOrders: jest.fn(),
  }));
  
  const db = require("./db"); // The mocked db
  const Orders = require("./orders");
  
  describe("Orders Tests with Mocked DB", () => {
    beforeEach(() => {
      // Reset the mock implementations and clear state before each test
      db.orders = [];
      db.addOrder.mockClear();
      db.getOrders.mockClear();
    });
  2a2aa
    test("should create a new order", () => {
      db.addOrder.mockImplementation((order) => {
        db.orders.push(order);
        return order;
      });

      db.getOrders.mockImplementation(() => {
        return db.orders;
        // return order;
      });
  
      const order = Orders.createOrder("John Doe", "Laptop", 1);
      const totalOrders = Orders.listOrders().length;
  
      expect(totalOrders).toBe(1);
      expect(db.addOrder).toHaveBeenCalledWith({
        id: 1,
        customerName: "John Doe",
        product: "Laptop",
        quantity: 1,
      });
      expect(order).toEqual({
        id: 1,
        customerName: "John Doe",
        product: "Laptop",
        quantity: 1,
      });
    });
  
    test("should list all orders", () => {
      const ordersList = [
        { id: 1, customerName: "Alice", product: "Phone", quantity: 2 },
        { id: 2, customerName: "Bob", product: "Tablet", quantity: 3 },
      ];
  
      db.getOrders.mockReturnValue(ordersList); // Mock getOrders behavior
  
      const orders = Orders.listOrders();
  
      expect(db.getOrders).toHaveBeenCalledTimes(1);
      expect(orders).toEqual(ordersList);
    });
  
    test("should handle an empty order list", () => {
      db.getOrders.mockReturnValue([]); // Mock an empty list
  
      const orders = Orders.listOrders();
  
      expect(db.getOrders).toHaveBeenCalledTimes(1);
      expect(orders).toEqual([]);
    });
  });