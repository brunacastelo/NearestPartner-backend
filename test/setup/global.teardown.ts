export default async function globalTeardown() {
  console.log("🌍 [GLOBAL TEARDOWN] Stopping Postgres container");

  // @ts-ignore
  const container = global.__TEST_PG_CONTAINER__;

  if (container) {
    await container.stop({
      timeout: 1000,
      remove: true,
      removeVolumes: true,
    });
  }

  console.log("🌍 [GLOBAL TEARDOWN] Done");
}
