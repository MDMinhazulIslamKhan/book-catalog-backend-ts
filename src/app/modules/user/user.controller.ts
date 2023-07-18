import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const addBookIntoWishlist = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const user = req.user;

  const result = await UserService.addBookIntoWishlist(bookId, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added into wishlist successfully!",
    data: result,
  });
});

const addBookIntoBooklist = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const { status } = req.body;
  const user = req.user;

  const result = await UserService.addBookIntoBooklist(bookId, user, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added into booklist successfully!",
    data: result,
  });
});

const updateBooklist = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const { status } = req.body;
  const user = req.user;

  const result = await UserService.updateBooklist(bookId, user, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booklist updated successfully!",
    data: result,
  });
});

const ownProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await UserService.ownProfile(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your profile retrieve successfully!",
    data: result,
  });
});

export const UserController = {
  addBookIntoWishlist,
  addBookIntoBooklist,
  updateBooklist,
  ownProfile,
};
