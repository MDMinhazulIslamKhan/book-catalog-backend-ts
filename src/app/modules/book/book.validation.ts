import { z } from "zod";
import { bookGenre } from "./book.interface";

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required.",
    }),
    author: z.string({
      required_error: "Author is required.",
    }),
    genre: z.enum([...bookGenre] as [string, ...string[]], {
      required_error: "Genre is required",
    }),
    publicationDate: z.string({
      required_error: "Publication date is required.",
    }),
  }),
});

const reviewBookZodSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: "Review is required.",
    }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.enum([...bookGenre] as [string, ...string[]]).optional(),
    publicationDate: z.string().optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
  reviewBookZodSchema,
};
