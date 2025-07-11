import { Request, Response } from "express";
import * as websiteService from "./website.service";
import { websiteSchema } from "./website.validator";
import { ApiError } from "../../utils/apiError";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../utils/errorMessage";
import { apiResponse } from "../../utils/apiResponse";

export const createWebsite = async (req: Request, res: Response) => {
  try {
    const parsed = websiteSchema.safeParse(req.body);
    if (!parsed.success)
      throw new ApiError(
        StatusCodes.BAD_GATEWAY,
        errorResponse.VALIDATION.FAILED
      );

    const website = await websiteService.createWebsite(
      res.locals.user._id,
      parsed.data
    );
    return apiResponse(res, StatusCodes.OK, {
      data: website,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserWebsites = async (req: Request, res: Response) => {
  try {
    const websites = await websiteService.getUserWebsites(res.locals.user._id);
    return apiResponse(res, StatusCodes.OK, {
      data: websites,
    });
  } catch (error) {
    throw error;
  }
};

export const getAllWebsites = async (req: Request, res: Response) => {
  try {
    const websites = await websiteService.getAllWebsites();
    return apiResponse(res, StatusCodes.OK, {
      data: websites,
    });
  } catch (error) {
    throw error;
  }
};

export const getWebsiteById = async (req: Request, res: Response) => {
  try {
    const website = await websiteService.getWebsiteById(req.params.id);
    if (
      !website?.isPublished &&
      (!website || website.user.toString() !== res.locals.user._id.toString())
    )
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        errorResponse.MESSAGES.UNAUTHORIZED
      );
    return apiResponse(res, StatusCodes.OK, {
      data: website,
    });
  } catch (error) {
    throw error;
  }
};

export const updateWebsite = async (req: Request, res: Response) => {
  try {
    const website = await websiteService.getWebsiteById(req.params.id);
    if (!website || website.user.toString() !== res.locals.user._id.toString())
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        errorResponse.MESSAGES.UNAUTHORIZED
      );
    const updated = await websiteService.updateWebsite(req.params.id, req.body);
    return apiResponse(res, StatusCodes.OK, {
      data: updated,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteWebsite = async (req: Request, res: Response) => {
  try {
    const website = await websiteService.getWebsiteById(req.params.id);
    if (!website || website.user.toString() !== res.locals.user._id.toString())
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        errorResponse.MESSAGES.UNAUTHORIZED
      );
    await websiteService.deleteWebsite(req.params.id);
    return apiResponse(res, StatusCodes.OK, {
      success: true,
      message: "Website deleted",
    });
  } catch (error) {
    throw error;
  }
};
