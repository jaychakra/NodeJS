const express = require('express');
const supertest = require('supertest');
const bookController =  require('../src/controllers/bookController');
const bookRoute = require('../src/routes/bookRoutes');
jest.mock('../src/controllers/bookController');

const app = express()
app.use(express.json());
app.use('/books', bookRoute);

describe("Book Route Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new book', async () => {
        const bookData = {
            title: "Harry Potter and the deathly hallows",
            author: "JK Rowling",
            genre: "Fiction"
        };

        const requestData = {...bookData, _id: "mockId"};

        bookController.createBook.mockResolvedValue(requestData);
        
        
        const result = await supertest(app).post('/books');

        expect(result.status).toBe(201);
        expect(result.body).toEqual(requestData);
        expect(bookController.createBook).toHaveBeenCalledTimes(1);

    }); 

    it('should create a new book', async () => {
        const bookData = {
            title: "Harry Potter and the deathly hallows",
            genre: "Fiction"
        };

        const requestData = {...bookData, _id: "mockId"};

        bookController.createBook.mockRejectedValue({message: "Author field is missing"});
        
        const result = await supertest(app).post('/books');

        expect(result.status).toBe(400);
        expect(bookController.createBook).toHaveBeenCalledTimes(1);
        expect(result.body).toEqual({message: "Author field is missing"});

    }); 




});


