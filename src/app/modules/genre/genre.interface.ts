import { Model } from "mongoose";

export type IGenre = {
  genre: string;
};

export type GenreModel = Model<IGenre, Record<string, unknown>>;
