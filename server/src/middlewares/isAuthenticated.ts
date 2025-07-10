import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/apiError";
import { errorResponse } from "../utils/errorMessage";
import User from "../models/user.model";
import config from "../config";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.cookies)
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        errorResponse.AUTH_HEADER.REQUIRED
      );

    const token = req.cookies.token;
    if (!token)
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        errorResponse.AUTH_HEADER.MISSING
      );

    const decoded = jwt.verify(
      token,
      config.jwt.secret || "supersecret"
    ) as jwt.JwtPayload;
    const user = await User.findById(decoded._id);

    if (!user)
      next(new ApiError(StatusCodes.UNAUTHORIZED, errorResponse.TOKEN.EXPIRED));

    res.locals.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};
