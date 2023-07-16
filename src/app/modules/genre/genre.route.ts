import express from "express";
import { GenreController } from "./genre.controller";

const router = express.Router();

router.get("/", GenreController.getAllGenre);

export const GenreRoutes = router;
