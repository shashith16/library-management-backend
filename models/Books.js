const mongoose = require("mongoose");


const booksSchema = mongoose.Schema({
  bookId: String,
  bookName: String,
  bookAuthor: String,
  department: String,
});

const Books = mongoose.model("book_table", booksSchema);
module.exports = Books;
