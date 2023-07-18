import express from "express";
import auth from "../../middleware/auth";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./userValidation";

const router = express.Router();

router.get("/", auth(), UserController.ownProfile);

router.post(
  "/add-book-into-wishlist/:id",
  auth(),
  UserController.addBookIntoWishlist
);

router.post(
  "/add-book-into-booklist/:id",
  auth(),
  validateRequest(UserValidation.booklistZodSchema),
  UserController.addBookIntoBooklist
);

router.patch(
  "/update-booklist/:id",
  auth(),
  validateRequest(UserValidation.booklistZodSchema),
  UserController.updateBooklist
);

export const UserRoutes = router;
