const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required']
  },
  author: {
    type: String,
    required: [true, 'Author name is required']
  },
  publishedYear: {
    type: Number,
    validate: {
      validator: function (v) {
        return v >= 0 && v <= new Date().getFullYear();
      },
      message: props => `${props.value} is not a valid year`
    }
  },
  genre: {
    type: String,
    enum: ['Fiction', 'Non-Fiction', 'Mystery', 'Biography', 'Science Fiction', 'Fantasy'],
    default: 'Fiction'
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;