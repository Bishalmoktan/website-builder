import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { logger } from "../logging/logger";
import { ApiError } from "../utils/apiError";

export const globalErrorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let issues: { path: string; message: string }[] | null = null;

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    issues = err.errors.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

  // Handle custom ApiError
  else if (err instanceof ApiError) {
    statusCode = err.statusCode || 500;
    message = err.message || "Something went wrong";
  }

  // Catch unexpected built-in errors (like TypeError, etc.)
  else if (err instanceof Error) {
    message = err.message;
  }

  // Log the error
  logger.error({
    message: err instanceof Error ? err.message : "Unknown error",
    path: req.originalUrl,
    method: req.method,
    stack: err instanceof Error ? err.stack : null,
  });

  // Return the response
  res.status(statusCode).json({
    success: false,
    message,
    ...(issues ? { issues } : {}),
  });
};
