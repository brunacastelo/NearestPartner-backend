import { pgTable, serial, text, geometry, customType } from "drizzle-orm/pg-core";

const polygons = customType<{ data: string }>({
    dataType() {
        return 'geometry(MultiPolygon, 4326)';
    },
});

export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  tradingName: text("trading_name").notNull(),
  ownerName: text("owner_name").notNull(),
  document: text("document").unique().notNull(),
  coverageArea: polygons("coverage_area").notNull(),
  address: geometry("address", {type: "Point", mode: "xy", srid: 4326}).notNull(),
});


// todo index to improve geospatial queries performance
// CREATE INDEX idx_coverage_area ON partners USING GIST (coverage_area);
// CREATE INDEX idx_address ON partners USING GIST (address);