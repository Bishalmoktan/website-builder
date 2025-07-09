import { Router } from "express";
import { authRouter } from "./auth/auth.route";

export const rootRouter = Router();

rootRouter.use("/auth", authRouter);
