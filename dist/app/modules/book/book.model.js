"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const book_interface_1 = require("./book.interface");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        enum: book_interface_1.bookGenre,
        required: true,
    },
    publisher: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            review: {
                type: String,
                required: true,
            },
        },
    ],
}, {
    timestamps: true,
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
