import { PartnerModel } from "../models/partnerModel.js";
import { db } from '../db/index.js';
import { sql } from "drizzle-orm";
import { partners } from "../db/schema.js";

export class PartnerService {
    constructor(private readonly database = db) {}

    async createPartner(partner: PartnerModel) {
           const result = await this.database
            .insert(partners)
            .values({
                tradingName: partner.tradingName,
                ownerName: partner.ownerName,
                document: partner.document,

                coverageArea: sql`ST_SetSRID(
                ST_GeomFromGeoJSON(${JSON.stringify(partner.coverageArea)}),
                4326
                )`,

                address: sql`ST_SetSRID(
                ST_GeomFromGeoJSON(${JSON.stringify(partner.address)}),
                4326
                )`,
            })
            .onConflictDoNothing()
            .returning();

        return result;
    }

    async retrieveAllPartners() {
        const result = await this.database.execute(sql`
            SELECT
                id,
                trading_name,
                owner_name,
                document,
                ST_AsGeoJSON(coverage_area)::json as coverage_area,
                ST_AsGeoJSON(address)::json as address
            FROM partners       
            `);
        return result.rows;
    }

    async getPartnerById(id: string) {
        const result = await this.database.execute(sql`
            SELECT
                id,
                trading_name,
                owner_name,
                document,
                ST_AsGeoJSON(coverage_area)::json as coverage_area,
                ST_AsGeoJSON(address)::json as address
            FROM partners
            WHERE id = ${id}
        `);
        return result.rows[0];
    }

    async findNearestPartner(longitude: number, latitude: number) {
        const nearestPartner = await this.database.execute(sql`
            SELECT
                id,
                trading_name,
                owner_name,
                document,
                ST_Distance(address, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)) as distance
            FROM partners
            WHERE
                ST_Contains(coverage_area, ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326))
            ORDER BY distance ASC
            LIMIT 1;
        `);

        return nearestPartner.rows[0];  
    }
}

