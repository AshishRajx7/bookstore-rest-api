import { Request, Response } from "express";
import Book from "../models/Book";
// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json(book);
  } catch (err) {
    return res.status(400).json({ message: "Invalid data" });
  }
};

//Read all books used Pagination
export const getBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const query: any = {};

    // Filtering
    if (req.query.author) {
      query.author = req.query.author;
    }
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) {
        query.price.$gte = parseInt(req.query.minPrice as string);
      }
      if (req.query.maxPrice) {
        query.price.$lte = parseInt(req.query.maxPrice as string);
      }
    }
    if (req.query.search) {
      query.title = {
        $regex: req.query.search,
        $options: "i"
      };
    }

    // Sorting
    let sort: any = {};

    if (req.query.sortBy) {
      const field = req.query.sortBy as string;
      const order = req.query.order === "asc" ? 1 : -1;
      sort[field] = order;
    }

    const books = await Book.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(query);

    res.json({
      books,
      page,
      total
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
};



// Read one book by id
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.json(book);
  } catch (err) {
    return res.status(400).json({ message: "Invalid id" });
  }
};
//update a book by id
export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.json(book);
  } catch (err) {
    return res.status(400).json({ message: "Invalid id or data" });
  }
};
//delete a book by id
export const deleteBook = async(req:Request, res:Response) => {
    try{
        const book= await Book.findByIdAndDelete(req.params.id);
        if(!book){
            return res.status(404).json({message:"Book not found"});
        }
        return res.json({message:"Book deleted"});
    } catch(err){
        return res.status(400).json({message:"Invalid id"});        
    }
};

