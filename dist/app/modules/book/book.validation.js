"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const book_interface_1 = require("./book.interface");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required.",
        }),
        author: zod_1.z.string({
            required_error: "Author is required.",
        }),
        genre: zod_1.z.enum([...book_interface_1.bookGenre], {
            required_error: "Genre is required",
        }),
        publicationDate: zod_1.z.string({
            required_error: "Publication date is required.",
        }),
    }),
});
const reviewBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string({
            required_error: "Review is required.",
        }),
    }),
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.enum([...book_interface_1.bookGenre]).optional(),
        publicationDate: zod_1.z.string().optional(),
    }),
});
exports.BookValidation = {
    createBookZodSchema,
    updateBookZodSchema,
    reviewBookZodSchema,
};
