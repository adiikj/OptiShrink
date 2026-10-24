import { app } from "./app.js";
import { env } from "./config/env.js";
import { checkDatabaseConnection, closeDatabaseConnection } from "./db/index.js";

async function start(): Promise<void> {
  await checkDatabaseConnection();
  console.log("Database connection established.");

  const server = app.listen(env.PORT, () => {
    console.log(`OptiShrink API listening on http://localhost:${env.PORT}`);
  });

  let shuttingDown = false;

  const shutdown = async (signal: string): Promise<void> => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`Received ${signal}. Shutting down.`);

    server.close(async () => {
      await closeDatabaseConnection();
      process.exit(0);
    });

    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

start().catch((error) => {
  console.error("Failed to start OptiShrink API:", error);
  process.exit(1);
});
