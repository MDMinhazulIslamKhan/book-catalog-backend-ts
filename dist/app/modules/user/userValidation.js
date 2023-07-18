"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
const booklistZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...user_interface_1.ReadingStatus], {
            required_error: "Status is required!!!",
        }),
    }),
});
exports.UserValidation = { booklistZodSchema };
