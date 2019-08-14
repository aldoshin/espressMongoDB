import express from "express";

import Book from "../models/bookModel.js";

const bookRouter = express.Router();

bookRouter.use("/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.book = book;
      next();
    }
  });
});

bookRouter
  .route("/")
  .get((req, res) => {
    Book.find({}, (err, books) => {
      res.json(books);
    });
  })
  .post((req, res) => {
    let book = new Book(req.body);
    book.save();
    res.status(201).send(book);
  });

bookRouter
  .route("/:bookId")
  .get((req, res) => {
    const book = req.book;
    res.json(book);
  })
  .put((req, res) => {
    const book = req.book;
    const { title, author } = req.body;
    Object.assign(book, {
      title,
      author
    });

    book.save();
    res.json(book);
  })
  .patch((req, res) => {
    if (req.body._id) {
      delete req.body._id;
    }
    const book = req.book;
    Object.assign(book, req.body);
    book.save();
    res.json(book);
  })
  .delete((req, res) => {
    const book = req.book;
    book.remove(err => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });

export default bookRouter;
