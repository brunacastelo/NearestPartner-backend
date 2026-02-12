import type { FastifyReply, FastifyRequest } from "fastify";

import { PartnerService } from "../services/partnerService.js";
import { PartnerModel } from "../models/partnerModel.js";

export class PartnersController {
    constructor(
        private readonly partnerService: PartnerService
    ) { }

    async createPartner(request: FastifyRequest, reply: FastifyReply) {
        const partner = await this.partnerService.createPartner(request.body as PartnerModel);

        if (partner.length === 0) {
            reply.status(409).send({ message: "Partner with this document already exists" });
            return;
        }

        reply.status(201).send({ message: "Partner created", id: partner[0].id });
    }

    async getAllPartners(request: FastifyRequest, reply: FastifyReply) {
        const partners = await this.partnerService.retrieveAllPartners();
        reply.status(200).send({ partners });
    }

    async getPartnerById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const partner = await this.partnerService.getPartnerById(id);

        if (!partner) {
            reply.status(404).send({ message: "Partner not found" });
            return;
        }
        reply.status(200).send({ partner });
    }

    async getNearestPartner(request: FastifyRequest, reply: FastifyReply) {
        const { longitude, latitude } = request.body as { longitude: number; latitude: number };
     
        const nearestPartner = await this.partnerService.findNearestPartner(longitude, latitude);
        if (!nearestPartner) {      
            reply.status(404).send({ message: "No partners available" });
            return;
        }
        reply.status(200).send({ nearestPartner });
    }
}