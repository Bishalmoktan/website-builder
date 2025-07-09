import { CorsOptions } from "cors";
import { env } from "./env";

const isProduction = env.NODE_ENV === "production";

export default {
  app: {
    isProduction,
    port: env.PORT || 8080,
  },
  cors: {
    origin: [
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      env.CLIENT_BASE_URL,
    ],
    credentials: true,
  } as CorsOptions,
  database: {
    mongodb: {
      url: env.DATABASE_URL,
    },
  },
  jwt: {
    secret: env.JWT_SECRET,
  },
} as const;
