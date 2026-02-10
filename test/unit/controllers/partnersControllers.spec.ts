import { describe, it, expect, vi, beforeEach } from "vitest";
import { PartnersController } from "../../../src/controllers/partnersControllers";

describe("PartnersController", () => {
  let service: any;

  beforeEach(() => {
    service = {
      createPartner: vi.fn(),
      findNearestPartner: vi.fn(),
    };
  });

  it("should return 409 when partner is already created", async () => {
    service.createPartner.mockResolvedValue([]);

    const controller = new PartnersController(service);

    const request = {
      body: {
        tradingName: "Pizza Place",
        ownerName: "John Doe",
        document: "123",
        coverageArea: { type: "MultiPolygon", coordinates: [] },
        address: { type: "Point", coordinates: [1, 1] },
      },
    };

    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    await controller.createPartner(request as any, reply as any);

    expect(service.createPartner).toHaveBeenCalledTimes(1);
    expect(service.createPartner).toHaveBeenCalledWith(request.body);

    expect(reply.status).toHaveBeenCalledWith(409);
    expect(reply.send).toHaveBeenCalledWith({
      message: "Partner with this document already exists",
    });
  });

  it("should return 201 when partner is successfully created", async () => {
    service.createPartner.mockResolvedValue([{ id: 1 }]);

    const controller = new PartnersController(service);

    const request = {
      body: {
        tradingName: "Pizza Place",
        ownerName: "John Doe",
        document: "123",
        coverageArea: { type: "MultiPolygon", coordinates: [] },
        address: { type: "Point", coordinates: [1, 1] },
      },
    };

    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    await controller.createPartner(request as any, reply as any);

    expect(service.createPartner).toHaveBeenCalledTimes(1);
    expect(service.createPartner).toHaveBeenCalledWith(request.body);

    expect(reply.status).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith({
      id: 1,
      message: "Partner created",
    });
  });

  it("should return 404 when No partners available", async () => {
    service.findNearestPartner.mockResolvedValue(null);

    const controller = new PartnersController(service);

    const request = {
      body: {
        longitude: 1,
        latitude: 1,
      },
    };

    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    await controller.getNearestPartner(request as any, reply as any);

    expect(service.findNearestPartner).toHaveBeenCalledTimes(1);
    expect(service.findNearestPartner).toHaveBeenCalledWith(1, 1);

    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith({
      message: "No partners available",
    });
  });
});
