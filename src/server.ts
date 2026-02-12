// src/server.ts
import { buildApp } from "./buildApp.js";

const app = buildApp();

const start = async () => {
  try {
    const PORT = Number(process.env.PORT) || 3000;
    await app.listen({ port: PORT, host: "0.0.0.0" });
    app.log.info(`Server listening on ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
