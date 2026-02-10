import { GenericContainer, StartedTestContainer } from "testcontainers";

export async function startPostgres() {
  const container: StartedTestContainer =
    await new GenericContainer("postgis/postgis:15-3.3")
      .withEnvironment({
        POSTGRES_DB: "testdb",
        POSTGRES_USER: "test",
        POSTGRES_PASSWORD: "test",
      })
      .withExposedPorts(5432)
      .start();

  const host = container.getHost();
  const port = container.getMappedPort(5432);

  const connectionString = `postgresql://test:test@${host}:${port}/testdb`;

  return { container, connectionString };
}
