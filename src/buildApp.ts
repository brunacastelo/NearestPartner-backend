// src/buildApp.ts
import Fastify from "fastify";
import "dotenv/config";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

import partnersRoutes from "./routes/index.js";
import { errorHandler } from "./errorHandler.js";

export function buildApp({ db }: { db?: any } = {}) {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.setErrorHandler(errorHandler);

  app.decorate("db", db);

  app.register(partnersRoutes, { prefix: "/partners" });

  return app;
}
