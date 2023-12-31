import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ApplicationRouters } from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome in book_catalog.");
});

app.use("/api/v1", ApplicationRouters);

app.use(globalErrorHandler);

// No routes
app.use((req, res) => {
  return res.status(404).json({
    success: false,

    message: "Not found.",
    errorMessage: {
      path: req.originalUrl,
      message: "Api not found!!! Wrong url, there is no route in this url.",
    },
  });
});

export default app;
