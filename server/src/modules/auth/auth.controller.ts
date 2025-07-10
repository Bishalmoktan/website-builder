import { Request, Response } from "express";
import { signin, signup } from "./auth.validator";
import { ApiError } from "../../utils/apiError";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../utils/errorMessage";
import * as authService from "./auth.service";
import config from "../../config";
import { apiResponse } from "../../utils/apiResponse";
import { responseMessage } from "../../utils/responseMessage";

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

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.app.isProduction,
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful!",
  });
};

export const getMe = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const user = await authService.getMe(userId);
  return apiResponse(res, StatusCodes.OK, {
    data: user,
    message: responseMessage.USER.RETRIEVED,
  });
};
