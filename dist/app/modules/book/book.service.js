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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const book_model_1 = __importDefault(require("./book.model"));
const book_constant_1 = require("./book.constant");
const user_model_1 = __importDefault(require("../user/user.model"));
const createBook = (book, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    book.publisher = user === null || user === void 0 ? void 0 : user._id;
    const createdBook = (yield book_model_1.default.create(book)).populate("publisher");
    if (!createdBook) {
        throw new ApiError_1.default(400, "Failed to create book!");
    }
    return createdBook;
});
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // for filter data
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookSearchableFields.map((field) => ({
                [field]: { $regex: searchTerm, $options: "i" },
            })),
        });
    }
    // for exact match user and condition
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // if no condition is given
    const query = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.default.find(query)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("publisher");
    const count = yield book_model_1.default.countDocuments(query);
    return {
        meta: {
            page,
            limit,
            count,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.default.findById(id).populate("publisher");
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    return result;
});
const updateBook = (id, payload, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviews } = payload, updatedBookInfo = __rest(payload, ["reviews"]);
    if (updatedBookInfo.publisher || reviews) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Can't change publisher!!!");
    }
    const user = yield user_model_1.default.findOne({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const book = yield book_model_1.default.findById(id).populate("publisher");
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    if (user.id !== book.publisher.id) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "This is not your book!!!");
    }
    const result = yield book_model_1.default.findByIdAndUpdate({ _id: id }, updatedBookInfo, {
        new: true,
    }).populate("publisher");
    return result;
});
const reviewBook = (bookId, review, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const book = yield book_model_1.default.findById(bookId).populate("publisher");
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    const result = yield book_model_1.default.findByIdAndUpdate({ _id: bookId }, {
        $push: { reviews: { name: user.name.firstName, review } },
    }, {
        new: true,
    }).populate("publisher");
    return result;
});
const deleteBook = (bookId, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const book = yield book_model_1.default.findById(bookId).populate("publisher");
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    if (user.id !== book.publisher.id) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "This is not your book!!!");
    }
    const result = yield book_model_1.default.findByIdAndDelete(bookId);
    return result;
});
const getOwnBooks = (filters, paginationOptions, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo.email });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [{ publisher: { $eq: user.id } }];
    // for filter data
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookSearchableFields.map((field) => ({
                [field]: { $regex: searchTerm, $options: "i" },
            })),
        });
    }
    // for exact match user and condition
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // if no condition is given
    const query = { $and: andConditions };
    const result = yield book_model_1.default.find(query)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate("publisher");
    const count = yield book_model_1.default.countDocuments(query);
    return {
        meta: {
            page,
            limit,
            count,
        },
        data: result,
    };
});
exports.BookService = {
    createBook,
    updateBook,
    reviewBook,
    deleteBook,
    getAllBooks,
    getSingleBook,
    getOwnBooks,
};
