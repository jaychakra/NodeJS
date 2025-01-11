const { add } = require('./init');


// Describe => Test Suit
// It => Discribe Tests
// Expect => Assertion
// --watchAll
describe("This tests the add function", () => {
    it("Should add 2 positive integers", () =>  {
        const sum = add(3, 5);
        expect(sum).toBe(8);
    });

    it("Should add 2 negative integers", () => {
        const sum = add(-3, -5);
        expect(sum).toBe(-8);
    });

    // test case for string
    // it("should return NaN when adding strings ", () => {
    //     const sum = add("Hello", "World!");
    //     expect(sum).toBe(NaN);
    // })

})

