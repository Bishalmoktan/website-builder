import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";
import { signin, signup } from "./auth.validator";
import { ApiError } from "../../utils/apiError";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../utils/errorMessage";
import * as authService from "./auth.service";
import config from "../../config";

export const signUp = async (req: Request, res: Response) => {
  try {
    const result = signup.safeParse(req.body);
    if (!result.success)
      throw new ApiError(
        StatusCodes.BAD_GATEWAY,
        errorResponse.VALIDATION.FAILED
      );

    const { user, token } = await authService.signup({
      ...result.data,
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: config.app.isProduction,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Signup successful",
        user,
      });
  } catch (err) {
    throw err;
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const result = signin.safeParse(req.body);
    if (!result.success)
      throw new ApiError(
        StatusCodes.BAD_GATEWAY,
        errorResponse.VALIDATION.FAILED
      );

    const { user, token } = await authService.signin({
      ...result.data,
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: config.app.isProduction,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Signin successful",
        user,
      });
  } catch (err) {
    throw err;
  }
};
