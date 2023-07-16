import Genre from "./genre.model";
import { IGenre } from "./genre.interface";

const getAllGenre = async (): Promise<IGenre[] | null> => {
  const result = await Genre.find();

  return result;
};

export const GenreService = {
  getAllGenre,
};
