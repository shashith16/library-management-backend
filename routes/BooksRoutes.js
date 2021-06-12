const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Books = require("../models/Books");
const jwt = require("jsonwebtoken");
const { v4: uuidV4 } = require("uuid");
const { response } = require("express");

router.post("/", async (req, res) => {
  const { bookName, bookAuthor, department } = req.body;
  const books = new Books({
    bookId: uuidV4(),
    bookName,
    bookAuthor,
    department,
  });
  try {
    const newBookResult = await books.save();
    res.status(201).json({
      success: true,
      data: newBookResult,
      message: "Add book success",
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      data: error,
      message: "Add book error",
    });
  }
});

router.get("/getAllBooks", async (req, res) => {
  const getAllBooks = await Books.find({});
  try {
    //res.send(getAllBooks);
    res.status(201).json({
      success: true,
      data: getAllBooks,
      message: "Get All books success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: error,
      message: "get All books error",
    });
  }
});

router.get("/getBooks/:bookId", async (req, res) => {
  //const { bookName, bookAuthor, department } = req.body;
  const { bookId } = req.params;
  console.log("bookId...", bookId);
  //const getBooks = await Books.find({});
  const getBooks = await Books.findOne({ bookId });
  try {
    //res.send(getBooks);
    res.status(201).json({
      success: true,
      data: getBooks,
      message: "Get book success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: error,
      message: "get book error",
    });
  }
});
router.delete("/deleteBooks/:bookId", async (req, res) => {
  //const { bookName, bookAuthor, department } = req.body;
  const { bookId } = req.params;

  const deleteBook = await Books.findOneAndRemove({ bookId });
  try {
    res.status(201).json({
      success: true,
      data: deleteBook,
      message: "Delete book success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: error,
      message: "Delete book error",
    });
  }
});

module.exports = router;
