import { describe, it, expect } from "vitest";
import { getApp } from "../setup/vitest.integration.setup";

describe("GET /partners/nearest", () => {
  it("should nearest partner", async () => {

    const postResponse = await getApp().inject({
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

    const response = await getApp().inject({
      method: "POST",
      url: `/partners/nearest`,
      payload: {
        longitude: -46.55,
        latitude: -23.55,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().nearestPartner.trading_name).equals("Pizza Place");

  });

  it("should return not found partners outside the covered area", async () => {
    await getApp().inject({
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
    
    const response = await getApp().inject({
      method: "POST",
      url: `/partners/nearest`,
      payload: {
        longitude: 10.55,
        latitude: 10.55,
      },
    });

    expect(response.statusCode).toBe(404);
    expect(response.json().message).equals("No partners available");

  });

});