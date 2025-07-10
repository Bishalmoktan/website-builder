import { Router } from "express";
import { authRouter } from "./auth/auth.route";
import { websiteRouter } from "./website/website.route";

export const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/website", websiteRouter);
