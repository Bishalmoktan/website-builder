import User, { IUser } from "../../models/user.model";
import { ApiError } from "../../utils/apiError";
import { errorResponse } from "../../utils/errorMessage";
import { StatusCodes } from "http-status-codes";
import { SignInInput, SignUpInput } from "./auth.validator";

export async function signup(data: SignUpInput) {
  const { email, name, password } = data;
  const existing = await User.findOne({ email });
  if (existing)
    throw new ApiError(StatusCodes.CONFLICT, errorResponse.AUTH.DUPLICATE_USER);

  const user = await User.create({ email, password, name });
  const token = user.generateAuthTokens();

  return { user, token };
}

export const signin = async (data: SignInInput) => {
  const { email, password } = data;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(
      StatusCodes.BAD_GATEWAY,
      errorResponse.AUTH.INVALID_PASSOWRD
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(
      StatusCodes.BAD_GATEWAY,
      errorResponse.AUTH.INVALID_PASSOWRD
    );
  }

  const token = user.generateAuthTokens();
  return { user, token };
};

export const getMe = async (userId: string) => {
  const user = await User.findOne({ _id: userId }).populate("websites");
  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, errorResponse.AUTH.NOT_FOUND);
  }
  return user;
};
