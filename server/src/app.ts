import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express, { Express, Request, Response } from "express";

import { rootRouter } from "./modules/root.router";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import config from "./config";

dotenv.config();

const app: Express = express();

app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health-check", (req: Request, res: Response) => {
  res.json({ message: "The server is running!" });
});

app.use("/api/v1", rootRouter);

app.use(globalErrorHandler);

export { app };
