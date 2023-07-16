import { Schema, model } from "mongoose";
import { GenreModel, IGenre } from "./genre.interface";

const genreSchema = new Schema<IGenre, GenreModel>(
  {
    genre: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Genre = model<IGenre, GenreModel>("Genre", genreSchema);

export default Genre;
