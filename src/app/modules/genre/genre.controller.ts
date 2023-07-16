import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { GenreService } from "./genre.service";

const getAllGenre = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await GenreService.getAllGenre();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All genre retrieve successfully!",
    data: result,
  });
});

export const GenreController = {
  getAllGenre,
};
