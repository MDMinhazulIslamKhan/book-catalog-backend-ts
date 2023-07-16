import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookRoutes } from "../modules/book/book.route";
import { UserRoutes } from "../modules/user/user.route";
import { GenreRoutes } from "../modules/genre/genre.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/book",
    route: BookRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/genre",
    route: GenreRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const ApplicationRouters = router;
