import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User";
import Book from "./models/Book";
import Review from "./models/Review";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to DB");

    // Clear existing data
    await Review.deleteMany({});
    await Book.deleteMany({});
    await User.deleteMany({});

    console.log("Old data cleared");

    // Create users
    const password = await bcrypt.hash("password123", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password,
      role: "admin"
    });

    const user1 = await User.create({
      name: "User One",
      email: "user1@test.com",
      password,
      role: "user"
    });

    const user2 = await User.create({
      name: "User Two",
      email: "user2@test.com",
      password,
      role: "user"
    });

    console.log("Users created");

    // Create 20 books
    const books = [];

    for (let i = 1; i <= 20; i++) {
      books.push({
        title: `Book ${i}`,
        author: `Author ${i}`,
        isbn: `ISBN-${i}`,
        price: 100 + i,
        genre: "Fiction",
        stock: 10
      });
    }

    const createdBooks = await Book.insertMany(books);

    console.log("Books created");

    // Create sample reviews
    await Review.create({
      user: user1._id,
      book: createdBooks[0]._id,
      rating: 5,
      comment: "Amazing book"
    });

    await Review.create({
      user: user2._id,
      book: createdBooks[0]._id,
      rating: 4,
      comment: "Nice read"
    });

    console.log("Reviews created");

    console.log("Seeding complete");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();