import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import * as websiteController from "./website.controller";

export const websiteRouter = Router();

websiteRouter.get("/", isAuthenticated, websiteController.getUserWebsites);
websiteRouter.post("/", isAuthenticated, websiteController.createWebsite);
websiteRouter.get("/:id", isAuthenticated, websiteController.getWebsiteById);
websiteRouter.put("/:id", isAuthenticated, websiteController.updateWebsite);
websiteRouter.delete("/:id", isAuthenticated, websiteController.deleteWebsite);
