import { beforeAll, beforeEach, afterAll } from "vitest";
import { createTestDb } from "../helpers/db";
import { buildApp } from "../../src/buildApp";

let app: ReturnType<typeof buildApp>;
let db: any;
let pgClient: any;

export const getApp = () => app;
export const getDb = () => db;

beforeAll(async () => {
    console.log("⚙️ [WORKER SETUP] Connecting to shared DB");

    if (!process.env.TEST_DB_URL) {
        throw new Error("TEST_DB_URL not defined");
    }

    const result = await createTestDb(process.env.TEST_DB_URL);

    db = result.db;
    pgClient = result.client;

    app = buildApp({ db });
    await app.ready();

    console.log("⚡ [WORKER SETUP] App ready");
});

beforeEach(async () => {
    console.log("🧹 [TEST] Cleaning database");
    await pgClient.query(
        "DELETE FROM partners"
    );
});

afterAll(async () => {
    console.log("⚙️ [WORKER TEARDOWN] Closing app/db");

    if (pgClient) await pgClient.end();
    if (app) await app.close();
});
