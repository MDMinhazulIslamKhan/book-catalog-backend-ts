"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const book_service_1 = require("./book.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const book_constant_1 = require("./book.constant");
const constant_1 = require("../../../constant");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = req.body;
    const user = req.user;
    const result = yield book_service_1.BookService.createBook(book, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: "Book create Successfully!",
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const book = req.body;
    const user = req.user;
    const result = yield book_service_1.BookService.updateBook(id, book, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book update successfully!",
        data: result,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.BookService.getSingleBook(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book retrieve successfully!",
        data: result,
    });
}));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constant_1.bookFilterableField);
    const paginationOptions = (0, pick_1.default)(req.query, constant_1.paginationFields);
    const result = yield book_service_1.BookService.getAllBooks(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Books retrieve successfully!",
        data: result,
    });
}));
const getOwnBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constant_1.bookFilterableField);
    const paginationOptions = (0, pick_1.default)(req.query, constant_1.paginationFields);
    const user = req.user;
    const result = yield book_service_1.BookService.getOwnBooks(filters, paginationOptions, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Books retrieve successfully!",
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.user;
    const result = yield book_service_1.BookService.deleteBook(id, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book deleted successfully!",
        data: result,
    });
}));
const reviewBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const { review } = req.body;
    const user = req.user;
    const result = yield book_service_1.BookService.reviewBook(bookId, review, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book reviewed successfully!",
        data: result,
    });
}));
exports.BookController = {
    updateBook,
    createBook,
    getSingleBook,
    getAllBooks,
    getOwnBooks,
    deleteBook,
    reviewBook,
};
