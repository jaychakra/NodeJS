const express = require('express');
const supertest = require('supertest');
const bookController = require('../../src/controllers/bookController'); // Adjust the path
const bookRouter = require('../../src/routes/bookRoutes'); // Adjust the path

jest.mock('../../src/controllers/bookController'); // Mock the controller

const app = express();
app.use(express.json());
app.use('/books', bookRouter);

describe('Book Routes Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset all mocks before each test
  });

  it('should create a new book on POST /books', async () => {
    const newBook = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedYear: 1925,
      genre: 'Fiction',
    };

    bookController.createBook.mockResolvedValue({ ...newBook, _id: 'mockId' });

    const response = await supertest(app).post('/books').send(newBook);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ ...newBook, _id: 'mockId' });
    expect(bookController.createBook).toHaveBeenCalledWith(newBook);
  });

  it('should return 400 if book creation fails on POST /books', async () => {
    const invalidBook = {
      author: 'F. Scott Fitzgerald', // Missing required fields like "title" and "publishedYear"
    };

    bookController.createBook.mockRejectedValue(new Error('Invalid book data'));

    const response = await supertest(app).post('/books').send(invalidBook);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid book data' });
    expect(bookController.createBook).toHaveBeenCalledWith(invalidBook);
  });

  it('should retrieve all books on GET /books', async () => {
    const books = [
      { title: 'Book 1', author: 'Author 1', publishedYear: 2000, genre: 'Fiction' },
      { title: 'Book 2', author: 'Author 2', publishedYear: 2010, genre: 'Non-Fiction' },
    ];

    bookController.getAllBooks.mockResolvedValue(books);

    const response = await supertest(app).get('/books');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(books);
    expect(bookController.getAllBooks).toHaveBeenCalled();
  });

  it('should retrieve a book by ID on GET /books/:id', async () => {
    const bookId = 'mockId';
    const book = {
      _id: bookId,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedYear: 1925,
      genre: 'Fiction',
    };

    bookController.getBookById.mockResolvedValue(book);

    const response = await supertest(app).get(`/books/${bookId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(book);
    expect(bookController.getBookById).toHaveBeenCalledWith(bookId);
  });

  it('should return 404 if book is not found on GET /books/:id', async () => {
    const bookId = 'mockId';

    bookController.getBookById.mockResolvedValue(null);

    const response = await supertest(app).get(`/books/${bookId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Book not found' });
    expect(bookController.getBookById).toHaveBeenCalledWith(bookId);
  });

  it('should update a book by ID on PUT /books/:id', async () => {
    const bookId = 'mockId';
    const updatedBook = {
      title: 'Updated Title',
      author: 'Updated Author',
      publishedYear: 1930,
      genre: 'Non-Fiction',
    };

    bookController.updateBook.mockResolvedValue({ ...updatedBook, _id: bookId });

    const response = await supertest(app).put(`/books/${bookId}`).send(updatedBook);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ...updatedBook, _id: bookId });
    expect(bookController.updateBook).toHaveBeenCalledWith(bookId, updatedBook);
  });

  it('should delete a book by ID on DELETE /books/:id', async () => {
    const bookId = 'mockId';

    bookController.deleteBook.mockResolvedValue({ _id: bookId });

    const response = await supertest(app).delete(`/books/${bookId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Book deleted' });
    expect(bookController.deleteBook).toHaveBeenCalledWith(bookId);
  });
});