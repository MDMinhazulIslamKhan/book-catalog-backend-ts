"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const userValidation_1 = require("./userValidation");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(), user_controller_1.UserController.ownProfile);
router.post("/add-book-into-wishlist/:id", (0, auth_1.default)(), user_controller_1.UserController.addBookIntoWishlist);
router.post("/add-book-into-booklist/:id", (0, auth_1.default)(), (0, validateRequest_1.default)(userValidation_1.UserValidation.booklistZodSchema), user_controller_1.UserController.addBookIntoBooklist);
router.patch("/update-booklist/:id", (0, auth_1.default)(), (0, validateRequest_1.default)(userValidation_1.UserValidation.booklistZodSchema), user_controller_1.UserController.updateBooklist);
exports.UserRoutes = router;
