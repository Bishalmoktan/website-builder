import { Router } from "express";
import * as authController from "./auth.controller";

export const authRouter = Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", authController.signIn);
// authRouter.get("/me");
// authRouter.get("/logout");
