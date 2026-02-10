import { startPostgres } from "../helpers/postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";

export default async function globalSetup() {
  console.log("🌍 [GLOBAL SETUP] Starting Postgres container");

  const { container, connectionString } = await startPostgres();

  process.env.TEST_DB_URL = connectionString;

  console.log("🌍 [GLOBAL SETUP] Running migrations");

  const client = new Client({ connectionString });
  await client.connect();

  const db = drizzle(client);

  await migrate(db, { migrationsFolder: "drizzle" });

  await client.end();

  console.log("🌍 [GLOBAL SETUP] Postgres ready");

  return async () => {
    console.log("🌍 [GLOBAL TEARDOWN] Stopping Postgres");
    await container.stop({ remove: true, removeVolumes: true });
  };
}
