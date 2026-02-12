import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { PartnersController } from "../controllers/partnersControllers.js";
import { PartnerService } from "../services/partnerService.js";
import { PartnerModel } from "../models/partnerModel.js";

export default async function partnersRoutes(app: FastifyInstance) {
  const partnerService = new PartnerService((app as any).db);
  const controller = new PartnersController(partnerService);

  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        body: PartnerModel,
      },
    },
    async (request, reply) => {
      return controller.createPartner(request, reply);
    }
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    async (request, reply) => {
      return controller.getAllPartners(request, reply);
    }
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        params: z.object({
          id: z.coerce.number().int().positive(),
        }),
      },
    },
    async (request, reply) => {
      return controller.getPartnerById(request, reply);
    }
  );

  // app.get('/nearest', controller.getNearestPartner);
  app.withTypeProvider<ZodTypeProvider>().post(
    '/nearest',
    {
      schema: {
        body: z.object({
          longitude: z.coerce.number().min(-180).max(180),
          latitude: z.coerce.number().min(-90).max(90),
        }),
      },
    },
    async (request, reply) => {
      return controller.getNearestPartner(request, reply);
    }
  );  
}