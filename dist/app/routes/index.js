"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRouters = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const book_route_1 = require("../modules/book/book.route");
const user_route_1 = require("../modules/user/user.route");
const genre_route_1 = require("../modules/genre/genre.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/book",
        route: book_route_1.BookRoutes,
    },
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/genre",
        route: genre_route_1.GenreRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.ApplicationRouters = router;
