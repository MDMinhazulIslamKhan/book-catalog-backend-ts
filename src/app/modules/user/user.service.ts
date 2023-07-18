import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import User from "../user/user.model";
import Book from "../book/book.model";
import { IUser } from "./user.interface";
import { JwtPayload } from "jsonwebtoken";

const addBookIntoWishlist = async (
  bookId: string,
  userInfo: JwtPayload | null
): Promise<IUser | null> => {
  const user = await User.findOne({ email: userInfo?.email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }

  user.wishList?.map((addedBook) => {
    if (addedBook.book.toString() === book.id) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "Book is already added into wishlist!"
      );
    }
  });

  const result = await User.findByIdAndUpdate(
    { _id: user._id },
    {
      $push: { wishList: { book: book.id } },
    },
    {
      new: true,
    }
  ).populate(["wishList.book", "bookList.book"]);
  return result;
};

const addBookIntoBooklist = async (
  bookId: string,
  userInfo: JwtPayload | null,
  status: string
): Promise<IUser | null> => {
  const user = await User.findOne({ email: userInfo?.email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }

  user.bookList?.map((addedBook) => {
    if (addedBook.book.toString() === book.id) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "Book is already added into booklist!"
      );
    }
  });

  const result = await User.findByIdAndUpdate(
    { _id: user._id },
    {
      $push: { bookList: { book: book.id, status } },
    },
    {
      new: true,
    }
  ).populate(["wishList.book", "bookList.book"]);
  return result;
};

const updateBooklist = async (
  bookId: string,
  userInfo: JwtPayload | null,
  status: string
) => {
  const user = await User.findOne({ email: userInfo?.email }).populate([
    "wishList.book",
    "bookList.book",
  ]);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found !");
  }

  const result = await User.findOneAndUpdate(
    {
      $and: [
        { _id: user.id },
        { bookList: { $elemMatch: { book: book._id } } },
      ],
    },
    {
      $set: { "bookList.$.status": status },
    },
    {
      new: true,
    }
  ).populate(["wishList.book", "bookList.book"]);

  return result;
};

const ownProfile = async (
  userInfo: JwtPayload | null
): Promise<IUser | null> => {
  const user = await User.findOne({ email: userInfo?.email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  return user;
};

export const UserService = {
  addBookIntoWishlist,
  addBookIntoBooklist,
  updateBooklist,
  ownProfile,
};
