import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    genre: { type: String },
    publishedYear: { type: Number },
    description: { type: String },
    stock: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
