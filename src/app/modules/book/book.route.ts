import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { BookValidation } from "./book.validation";
import { BookController } from "./book.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/add-book",
  auth(),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

router.patch(
  "/update-book/:id",
  auth(),
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook
);

router.get("/get-single-book/:id", BookController.getSingleBook);

router.get("/get-all-books", BookController.getAllBooks);

router.get("/get-own-books", auth(), BookController.getOwnBooks);

router.delete("/delete-book/:id", auth(), BookController.deleteBook);

router.post(
  "/review/:id",
  auth(),
  validateRequest(BookValidation.reviewBookZodSchema),
  BookController.reviewBook
);

export const BookRoutes = router;
