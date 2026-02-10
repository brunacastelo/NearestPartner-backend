import { describe, it, expect } from "vitest";
import { getApp } from "../setup/vitest.integration.setup";

describe("GET /partners/:id", () => {
  it("should retrieve a partner by ID", async () => {

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
      method: "GET",
      url: `/partners/${postResponse.json().id}`
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().partner.trading_name).equals("Pizza Place");
    
  });

  it("should return not found when id does not exists", async () => {

    const response = await getApp().inject({
      method: "GET",
      url: `/partners/${1}`
    });

    expect(response.statusCode).toBe(404);
    expect(response.json().message).equals("Partner not found");
    
  });

  it("should return bad request when id is not number", async () => {

    const response = await getApp().inject({
      method: "GET",
      url: `/partners/abc`
    });

    expect(response.statusCode).toBe(400);
    
  });
});