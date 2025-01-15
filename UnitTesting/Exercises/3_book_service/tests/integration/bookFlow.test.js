const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app'); // Path to your Express app
const Book = require('../../src/models/book'); // Path to your Book model

describe('Integration Test: Book Routes with MongoMemoryServer', () => {
  let mongoServer;

  // Start the in-memory MongoDB server before all tests
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  // Clean up the database before each test
  beforeEach(async () => {
    await Book.deleteMany({});
  });

  // Stop the MongoMemoryServer and disconnect from the database after all tests
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it('should create a new book (POST /books)', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedYear: 1925,
      genre: 'Fiction',
    };

    const response = await request(app).post('/books').send(bookData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(bookData.title);

    const bookInDb = await Book.findById(response.body._id);
    expect(bookInDb).not.toBeNull();
    expect(bookInDb.title).toBe(bookData.title);
  });

//   it('should fetch all books (GET /books)', async () => {
//     const books = [
//       { title: 'Book 1', author: 'Author 1', publishedYear: 2000, genre: 'Sci-Fi' },
//       { title: 'Book 2', author: 'Author 2', publishedYear: 2010, genre: 'Fantasy' },
//     ];
//     await Book.insertMany(books);

//     const response = await request(app).get('/books');

//     expect(response.status).toBe(200);
//     expect(response.body.length).toBe(2);
//     expect(response.body[0].title).toBe(books[0].title);
//     expect(response.body[1].title).toBe(books[1].title);
//   });

//   it('should fetch a book by ID (GET /books/:id)', async () => {
//     const book = new Book({ title: 'Book A', author: 'Author A', publishedYear: 2020, genre: 'Horror' });
//     await book.save();

//     const response = await request(app).get(`/books/${book._id}`);

//     expect(response.status).toBe(200);
//     expect(response.body.title).toBe(book.title);
//   });

//   it('should update a book by ID (PUT /books/:id)', async () => {
//     const book = new Book({ title: 'Old Title', author: 'Old Author', publishedYear: 1990, genre: 'Old Genre' });
//     await book.save();

//     const updatedData = { title: 'New Title', author: 'New Author' };

//     const response = await request(app).put(`/books/${book._id}`).send(updatedData);

//     expect(response.status).toBe(200);
//     expect(response.body.title).toBe(updatedData.title);

//     const updatedBook = await Book.findById(book._id);
//     expect(updatedBook.title).toBe(updatedData.title);
//     expect(updatedBook.author).toBe(updatedData.author);
//   });

//   it('should delete a book by ID (DELETE /books/:id)', async () => {
//     const book = new Book({ title: 'To be deleted', author: 'Unknown', publishedYear: 1980, genre: 'Drama' });
//     await book.save();

//     const response = await request(app).delete(`/books/${book._id}`);

//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe('Book deleted');

//     const deletedBook = await Book.findById(book._id);
//     expect(deletedBook).toBeNull();
//   });

});