import { Request, Response } from "express";
import Review from "../models/Review";
import Book from "../models/Book";

export const addReview = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const userId = (req as any).user.id;

    const { rating, comment } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const existing = await Review.findOne({
      user: userId,
      book: bookId
    });

    if (existing) {
      return res.status(400).json({ message: "Already reviewed" });
    }

    const review = await Review.create({
      user: userId,
      book: bookId,
      rating,
      comment
    });

    res.status(201).json(review);

  } catch (err) {
    res.status(500).json({ message: "Error adding review" });
  }
};
