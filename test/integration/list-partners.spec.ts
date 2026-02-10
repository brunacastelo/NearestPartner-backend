import { describe, it, expect } from "vitest";
import { getApp } from "../setup/vitest.integration.setup";

describe("GET /partners", () => {
  it("should retrieve all partners", async () => {

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
      method: "GET",
      url: "/partners"
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().partners.length).equals(1)
    expect(response.json().partners[0].trading_name).equals("Pizza Place");
    expect(response.json().partners[0].owner_name).equals("John Doe");
    expect(response.json().partners[0].document).equals("0133145678999"); 
    expect(response.json().partners[0].coverage_area).toBeDefined();
    expect(response.json().partners[0].coverage_area.type).equals("MultiPolygon");
    expect(response.json().partners[0].coverage_area.coordinates).toEqual([
      [[
        [-46.5, -23.5],
        [-46.6, -23.5],
        [-46.6, -23.6],
        [-46.5, -23.6],
        [-46.5, -23.5],
      ]],
    ]);
    expect(response.json().partners[0].address).toBeDefined();
    expect(response.json().partners[0].address.type).equals("Point");
    expect(response.json().partners[0].address.coordinates).toEqual([-46.55, -23.55]);
    
  });
});