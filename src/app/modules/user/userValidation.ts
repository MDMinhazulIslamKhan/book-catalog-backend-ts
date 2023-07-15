import { z } from "zod";
import { ReadingStatus } from "./user.interface";

const booklistZodSchema = z.object({
  body: z.object({
    status: z.enum([...ReadingStatus] as [string, ...string[]], {
      required_error: "Status is required!!!",
    }),
  }),
});

export const UserValidation = { booklistZodSchema };
