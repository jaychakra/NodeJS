const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Book = require('../../src/models/book');

let mongoServer;
// Can test all the methods. Then we would be testing the methods of mongoose. A better approach could be to test the validation logic. 


beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Book Model Unit Tests', () => {
  afterEach(async () => {
    await Book.deleteMany(); // Clean up database between tests
  });

  it('should create a book with valid data', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedYear: 1925,
      genre: 'Fiction',
    };

    const book = await Book.create(bookData);
    expect(book._id).toBeDefined();
    expect(book.title).toBe(bookData.title);
    expect(book.author).toBe(bookData.author);
    expect(book.publishedYear).toBe(bookData.publishedYear);
    expect(book.genre).toBe(bookData.genre);
  });

  it('should throw an error if required fields are missing', async () => {
    const invalidBookData = {
      publishedYear: 1925,
    };

    await expect(Book.create(invalidBookData)).rejects.toThrow(mongoose.Error.ValidationError);
  });

    it('should assign a default value to genre if not provided', async () => {
      const bookData = {
        title: '1984',
        author: 'George Orwell',
        publishedYear: 1949,
      };
  
      const book = await Book.create(bookData);
      expect(book.genre).toBe('Fiction'); // Default value
    });
  
    it('should enforce genre enum validation', async () => {
      const invalidBookData = {
        title: 'A Sci-Fi Story',
        author: 'Unknown Author',
        publishedYear: 2022,
        genre: 'Unknown Genre', // Not in enum
      };
  
      await expect(Book.create(invalidBookData)).rejects.toThrow(mongoose.Error.ValidationError);
    });
  
    it('should validate that the published year is within valid range', async () => {
      const invalidBookData = {
        title: 'Future Book',
        author: 'Future Author',
        publishedYear: 3000, // Year beyond current
        genre: 'Fiction',
      };
  
    //   await expect(Book.create(invalidBookData)).rejects.toThrow(mongoose.Error.ValidationError);
      await expect(Book.create(invalidBookData)).rejects.toThrow(/not a valid year/);
    });
  
    it('should allow books with no published year', async () => {
      const bookData = {
        title: 'Untold Story',
        author: 'Anonymous',
        genre: 'Mystery',
      };
  
      const book = await Book.create(bookData);
      expect(book.publishedYear).toBeUndefined(); // Not required
    });
  });