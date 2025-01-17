const {add} = require('./util');

describe("This tests the add function", () => {
    it("Should add 2 positive integers", () => {
        const sum = add(3, 5);
        expect(sum).toBe(8);
    });

    it("Should add 2 negative integers", () => {
        const sum = add(-3, -5);
        expect(sum).toBe(-8);
    });

    it("Should not add null", () => {
        const sum = add(3, null);
        expect(sum).toBe(NaN);
    });

    it("Should return NaN when adding strings", () => {
        const sum = add("Hello", "world");
        expect(sum).toBe(NaN);
    })

    it("Should add 2 decimal numbers", () => {
        const sum = add(3.5, 5.5);
        expect(sum).toBe(9);
    });
})