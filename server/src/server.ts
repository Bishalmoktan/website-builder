import { cpus } from "os";
import cluster from "cluster";

import { app } from "./app";
import config from "./config";
import { logger } from "./logging/logger";
import { connectDB } from "./db/connectDB";

const PORT = config.app.port;
const isProduction = config.app.isProduction;

if (isProduction) {
  const numCpus = cpus().length;

  if (cluster.isPrimary) {
    for (let i = 0; i < numCpus; i++) {
      cluster.fork();
    }

    cluster.on("exit", () => {
      cluster.fork();
    });
  } else {
    app.listen(PORT, async () => {
      logger.info(`Production server is running on ${process.pid}`);
      await connectDB();
    });
  }
} else {
  app.listen(PORT, async () => {
    logger.info(`Development server is running at: ${PORT}`);
    await connectDB();
  });
}
