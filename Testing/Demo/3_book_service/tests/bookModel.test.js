const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const Book = require('../src/models/book');


describe("Book Model Unit Tests", () => {
    let mongoServer;
    beforeAll (async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async ()=> {
        await mongoose.disconnect()
        await mongoServer.stop();
    });

    beforeEach (async () => {
        await Book.deleteMany();
    });
    
    afterEach(async () => {
        console.log("Test completed. Ready for next");
    })

    it("Should create a book with valid data", async () => {
        const bookData = {
            title: "Harry Potter and the deathly hallows",
            author: "JK Rowling"
        };

        const book =  await Book.create(bookData);
        expect(book.title).toBe(bookData.title);
        expect(book.author).toBe(bookData.author);
        expect(book._id).toBeDefined();
        expect(book.genre).toBe("Fiction");
    });

    it("Should not create a book with future date", async () => {
        const invalidBookData = {
            title: "Unit Testing in NodeJS",
            author: "AirTribe",
            publishedYear: 2026
        };

       await expect(Book.create(invalidBookData)).rejects.toThrow(/not a valid year/);
    });

})


