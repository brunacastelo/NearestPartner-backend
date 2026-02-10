import { describe, it, expect } from "vitest";
import { getApp } from "../setup/vitest.integration.setup";

describe("POST /partners", () => {

  it("should create a partner", async () => {
    const response = await getApp().inject({
      method: "POST",
      url: "/partners",
      payload: {
        tradingName: "Pizza Place",
        ownerName: "John Doe",
        document: "0133145678999",
        coverageArea: {
          type: "MultiPolygon",
          coordinates: [
            [[
              [-46.5, -23.5],
              [-46.6, -23.5],
              [-46.6, -23.6],
              [-46.5, -23.6],
              [-46.5, -23.5],
            ]],
          ],
        },
        address: {
          type: "Point",
          coordinates: [-46.55, -23.55],
        },
      },
    });

    expect(response.statusCode).toBe(201);
  });

  it("should return conflict once a partner already exists", async () => {
    const payload = {
      tradingName: "Pizza Place",
      ownerName: "John Doe",
      document: "0133145678999",
      coverageArea: {
        type: "MultiPolygon",
        coordinates: [
          [[
            [-46.5, -23.5],
            [-46.6, -23.5],
            [-46.6, -23.6],
            [-46.5, -23.6],
            [-46.5, -23.5],
          ]],
        ],
      },
      address: {
        type: "Point",
        coordinates: [-46.55, -23.55],
      },
    };

    await getApp().inject({
      method: "POST",
      url: "/partners",
      payload,
    });

    const response = await getApp().inject({
      method: "POST",
      url: "/partners",
      payload,
    });

    expect(response.statusCode).toBe(409);

  });

  it("should return bad request when required field missing", async () => {
    const response = await getApp().inject({
      method: "POST",
      url: "/partners",
      payload: {
        ownerName: "John Doe",
        document: "0133145678999",
        coverageArea: {
          type: "MultiPolygon",
          coordinates: [
            [[
              [-46.5, -23.5],
              [-46.6, -23.5],
              [-46.6, -23.6],
              [-46.5, -23.6],
              [-46.5, -23.5],
            ]],
          ],
        },
        address: {
          type: "Point",
          coordinates: [-46.55, -23.55],
        },
      },
    });

    expect(response.statusCode).toBe(400);
  });
});