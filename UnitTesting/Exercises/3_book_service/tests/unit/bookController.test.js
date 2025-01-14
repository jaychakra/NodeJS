const Book = require('../../src/models/book');
const BookController = require('../../src/controllers/bookController'); // Adjust the path

jest.mock('../../src/models/book'); // Mock the Book model

describe('BookController Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  it('should create a new book', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedYear: 1925,
      genre: 'Fiction',
    };

    const createdBook = { ...bookData, _id: 'mockId' };

    Book.create.mockResolvedValue(createdBook);

    const result = await BookController.createBook(bookData);
    expect(Book.create).toHaveBeenCalledWith(bookData);
    expect(result).toEqual(createdBook);
  });

  it('should retrieve all books', async () => {
    const mockBooks = [
      { title: 'Book 1', author: 'Author 1', publishedYear: 2000, genre: 'Fiction' },
      { title: 'Book 2', author: 'Author 2', publishedYear: 2010, genre: 'Non-Fiction' },
    ];

    Book.find.mockResolvedValue(mockBooks);

    const result = await BookController.getAllBooks();
    expect(Book.find).toHaveBeenCalled();
    expect(result).toEqual(mockBooks);
  });

  it('should retrieve a book by ID', async () => {
    const bookId = 'mockId';
    const mockBook = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedYear: 1925,
      genre: 'Fiction',
    };

    Book.findById.mockResolvedValue(mockBook);

    const result = await BookController.getBookById(bookId);
    expect(Book.findById).toHaveBeenCalledWith(bookId);
    expect(result).toEqual(mockBook);
  });

  it('should update a book by ID', async () => {
    const bookId = 'mockId';
    const updatedData = { title: 'Updated Title' };
    const updatedBook = {
      _id: bookId,
      title: 'Updated Title',
      author: 'F. Scott Fitzgerald',
      publishedYear: 1925,
      genre: 'Fiction',
    };

    Book.findByIdAndUpdate.mockResolvedValue(updatedBook);

    const result = await BookController.updateBook(bookId, updatedData);
    expect(Book.findByIdAndUpdate).toHaveBeenCalledWith(bookId, updatedData, { new: true });
    expect(result).toEqual(updatedBook);
  });

  it('should delete a book by ID', async () => {
    const bookId = 'mockId';

    Book.findByIdAndDelete.mockResolvedValue({ _id: bookId });

    const result = await BookController.deleteBook(bookId);
    expect(Book.findByIdAndDelete).toHaveBeenCalledWith(bookId);
    expect(result).toEqual({ _id: bookId });
  });
});