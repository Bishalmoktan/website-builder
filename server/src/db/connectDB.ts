import mongoose from "mongoose";

import config from "../config";
import { logger } from "../logging/logger";
import { ApiError } from "../utils/apiError";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../utils/errorMessage";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.database.mongodb.url);
    logger.info("Database connected successfully!");
  } catch (error) {
    logger.error({
      message:
        error instanceof Error
          ? `Database error: ${error.message}`
          : "Database connection error",
    });
    throw new ApiError(
      StatusCodes.SERVICE_UNAVAILABLE,
      errorResponse.DATABASE.CONNECTION_FAILURE
    );
  }
};
