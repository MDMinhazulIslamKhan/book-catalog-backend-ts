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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const book_model_1 = __importDefault(require("../book/book.model"));
const addBookIntoWishlist = (bookId, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.default.findOne({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const book = yield book_model_1.default.findById(bookId);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    (_a = user.wishList) === null || _a === void 0 ? void 0 : _a.map((addedBook) => {
        if (addedBook.book.toString() === book.id) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, "Book is already added into wishlist!");
        }
    });
    const result = yield user_model_1.default.findByIdAndUpdate({ _id: user._id }, {
        $push: { wishList: { book: book.id } },
    }, {
        new: true,
    }).populate(["wishList.book", "bookList.book"]);
    return result;
});
const addBookIntoBooklist = (bookId, userInfo, status) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = yield user_model_1.default.findOne({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const book = yield book_model_1.default.findById(bookId);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    (_b = user.bookList) === null || _b === void 0 ? void 0 : _b.map((addedBook) => {
        if (addedBook.book.toString() === book.id) {
            throw new ApiError_1.default(http_status_1.default.CONFLICT, "Book is already added into booklist!");
        }
    });
    const result = yield user_model_1.default.findByIdAndUpdate({ _id: user._id }, {
        $push: { bookList: { book: book.id, status } },
    }, {
        new: true,
    }).populate(["wishList.book", "bookList.book"]);
    return result;
});
const updateBooklist = (bookId, userInfo, status) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email }).populate([
        "wishList.book",
        "bookList.book",
    ]);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const book = yield book_model_1.default.findById(bookId);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    const result = yield user_model_1.default.findOneAndUpdate({
        $and: [
            { _id: user.id },
            { bookList: { $elemMatch: { book: book._id } } },
        ],
    }, {
        $set: { "bookList.$.status": status },
    }, {
        new: true,
    }).populate(["wishList.book", "bookList.book"]);
    return result;
});
const ownProfile = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email }).populate([
        "wishList.book",
        "bookList.book",
    ]);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    return user;
});
exports.UserService = {
    addBookIntoWishlist,
    addBookIntoBooklist,
    updateBooklist,
    ownProfile,
};
