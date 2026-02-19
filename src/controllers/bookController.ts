import { Request, Response } from "express";
import Book from "../models/Book";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch {
    res.status(400).json({ message: "Invalid data" });
  }
};
