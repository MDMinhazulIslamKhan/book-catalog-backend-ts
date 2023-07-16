import { Schema, model } from "mongoose";
import { BookModel, IBook, bookGenre } from "./book.interface";

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: bookGenre,
      required: true,
    },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Book = model<IBook, BookModel>("Book", bookSchema);

export default Book;
