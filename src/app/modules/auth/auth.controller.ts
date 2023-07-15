import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import { ILoginUserResponse } from "./auth.interface";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successfully!",
    data: result,
  });
});

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body;

    const result = await AuthService.createUser(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: "User create Successfully",
    });
  }
);

export const AuthController = {
  loginUser,
  createUser,
};
