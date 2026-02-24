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


export const deleteReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (userRole !== "admin" && review.user.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Review.findByIdAndDelete(reviewId);

    res.json({ message: "Review deleted" });

  } catch (err) {
    res.status(400).json({ message: "Invalid review id" });
  }
};