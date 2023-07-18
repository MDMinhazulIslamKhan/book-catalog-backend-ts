import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookService } from "./book.service";
import { IBook } from "./book.interface";
import pick from "../../../shared/pick";
import { bookFilterableField } from "./book.constant";
import { paginationFields } from "../../../constant";

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const book = req.body;
    const user = req.user;
    const result = await BookService.createBook(book, user);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: "Book create Successfully!",
    });
  }
);

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const book = req.body;
  const user = req.user;
  const result = await BookService.updateBook(id, book, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book update successfully!",
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.getSingleBook(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieve successfully!",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BookService.getAllBooks(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieve successfully!",
    data: result,
  });
});

const getOwnBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableField);
  const paginationOptions = pick(req.query, paginationFields);
  const user = req.user;
  const result = await BookService.getOwnBooks(
    filters,
    paginationOptions,
    user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieve successfully!",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;
  const result = await BookService.deleteBook(id, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully!",
    data: result,
  });
});

const reviewBook = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const { review } = req.body;

  const user = req.user;
  const result = await BookService.reviewBook(bookId, review, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book reviewed successfully!",
    data: result,
  });
});

export const BookController = {
  updateBook,
  createBook,
  getSingleBook,
  getAllBooks,
  getOwnBooks,
  deleteBook,
  reviewBook,
};
