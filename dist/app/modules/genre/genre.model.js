"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const genreSchema = new mongoose_1.Schema({
    genre: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Genre = (0, mongoose_1.model)("Genre", genreSchema);
exports.default = Genre;
