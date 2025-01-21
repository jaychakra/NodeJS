const Book = require('../src/models/book');
const BookController = require("../src/controllers/bookController");

jest.mock('../src/models/book');

describe('BookControler Unit Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });


    it("Should create a new book", async () => {
        const bookData = {
            title: "Harry Potter and the deathly hallows",
            author: "JK Rowling"
        };

        const createdBook = {...bookData, _id: "mockId", genre: "Fiction"}
       
        const response  = {...createdBook};
        Book.create.mockResolvedValue(createdBook);
        
        const result =  await BookController.createBook(createdBook);
        // .toBe and .toEqual        
        expect(result).toEqual(response);
        expect(Book.create).toHaveBeenCalled();
        // expect(Book.create).toHaveBeenCalledTimes(3);
        expect(Book.create).toHaveBeenCalledWith(createdBook);
         
        // .toBe => used to compare primitives, or shallow copy of the object



    });

    // it ("Should give me all the books", () => {
    //     //  create one more book

    //     //
    // })
})