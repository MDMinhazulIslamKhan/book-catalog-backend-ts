import httpStatus from "http-status";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import {
  IGenericResponse,
  IPaginationOptions,
} from "../../../interfaces/common";
import { calculatePagination } from "../../../helpers/paginationHelper";
import mongoose, { SortOrder } from "mongoose";
import config from "../../../config";
import { IBook, IBookFilters } from "./book.interface";
import Book from "./book.model";
import User from "../auth/auth.model";
import { bookFilterableField } from "./book.constant";

const createBook = async (
  book: IBook,
  userInfo: JwtPayload | null
): Promise<IBook | null> => {
  const user = await User.findOne({ email: userInfo?.email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  book.publisher = user?._id;

  const createdBook = (await Book.create(book)).populate("publisher");
  if (!createdBook) {
    throw new ApiError(400, "Failed to create book!");
  }
  return createdBook;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // for filter data
  if (searchTerm) {
    andConditions.push({
      $or: bookFilterableField.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    });
  }

  // for exact match user and condition
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // if no condition is given
  const query = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(query)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate("publisher");

  const count = await Book.countDocuments(query);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id).populate("publisher");
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  userInfo: JwtPayload | null
): Promise<IBook | null> => {
  const { reviews, ...updatedBookInfo } = payload;
  if (updatedBookInfo.publisher || reviews) {
    throw new ApiError(httpStatus.CONFLICT, "Can't change publisher!!!");
  }

  const user = await User.findOne({ email: userInfo?.email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  const book = await Book.findById(id).populate("publisher");
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }
  if (user.id !== book.publisher.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "This is not your book!!!");
  }

  const result = await Book.findByIdAndUpdate({ _id: id }, updatedBookInfo, {
    new: true,
  }).populate("publisher");
  return result;
};

const reviewBook = async (
  bookId: string,
  review: Partial<IBook>,
  userInfo: JwtPayload | null
): Promise<IBook | null> => {
  const user = await User.findOne({ email: userInfo?.email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  const book = await Book.findById(bookId).populate("publisher");

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }

  const result = await Book.findByIdAndUpdate(
    { _id: bookId },
    {
      $push: { reviews: { name: user.name.firstName, review } },
    },
    {
      new: true,
    }
  ).populate("publisher");
  return result;
};

const deleteBook = async (
  bookId: string,
  userInfo: JwtPayload | null
): Promise<IBook | null> => {
  const user = await User.findOne({ email: userInfo?.email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  const book = await Book.findById(bookId).populate("publisher");
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }
  if (user.id !== book.publisher.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "This is not your book!!!");
  }
  const result = await Book.findByIdAndDelete(bookId);
  return result;
};

export const BookService = {
  createBook,
  updateBook,
  reviewBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
};
