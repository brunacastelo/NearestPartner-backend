import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

export async function createTestDb(connectionString: string) {
  const client = new Client({ connectionString });
  await client.connect();

  const db = drizzle(client);

  return { db, client };
}
