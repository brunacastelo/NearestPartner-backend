import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    pool: "forks",
    fileParallelism: false,
    globalSetup: ["test/setup/global.setup.ts"],
    setupFiles: ["test/setup/vitest.integration.setup.ts"],
    include: ["test/integration/**/*.spec.ts"],
    exclude: ["test/unit/**/*"],
    
    testTimeout: 120_000,
    hookTimeout: 120_000,
    isolate: false,
  },
});