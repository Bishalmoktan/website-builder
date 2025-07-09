import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express, { Express, Request, Response } from "express";

import { rootRouter } from "./modules/root.router";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { isAuthenticated } from "./middlewares/isAuthenticated";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health-check", (req: Request, res: Response) => {
  res.json({ message: "The server is running!" });
});

app.use("/api/v1", rootRouter);
app.use("/api/v1/test", isAuthenticated, (req, res) => {
  res.json({
    message: "Authorized",
  });
});

app.use(globalErrorHandler);

export { app };
