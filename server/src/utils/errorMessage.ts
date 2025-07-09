const errorResponse = {
  DATABASE: {
    CONNECTION_FAILURE: "Couldn't connect to the database.",
  },
  AUTH: {
    DUPLICATE_USER: "User already exists.",
    INVALID_PASSOWRD: "Invalid email or password.",
  },
  VALIDATION: {
    FAILED:
      "Some of the input data is invalid. Please review the highlighted fields and try again.",
  },
  AUTH_HEADER: {
    REQUIRED: "Coookie is missing. Please include it in your request.",
    MISSING: "Token is missing in cookie",
  },
  TOKEN: {
    EXPIRED: "Your session has expired. Please log in again to continue.",
  },
};

export { errorResponse };
