import { Model, Types } from "mongoose";

export type Genre =
  | "Fiction"
  | "Non-fiction"
  | "Sci-fi"
  | "Mystery"
  | "Thriller"
  | "Children's book"
  | "Religious"
  | "History"
  | "Biography";

export const bookGenre: Genre[] = [
  "Fiction",
  "Non-fiction",
  "Sci-fi",
  "Mystery",
  "Thriller",
  "Children's book",
  "Religious",
  "History",
  "Biography",
];

export type IBook = {
  title: string;
  author: string;
  genre: Genre;
  publisher: Types.ObjectId;
  publicationDate: Date;
  reviews?: Array<{ name: string; review: string }>;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  publisher?: string;
  publicationDate?: string;
};
