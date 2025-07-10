import { Router } from "express";
import * as authController from "./auth.controller";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

export const authRouter = Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", authController.signIn);
authRouter.get("/me", isAuthenticated, authController.getMe);
authRouter.get("/logout", isAuthenticated, authController.logout);
