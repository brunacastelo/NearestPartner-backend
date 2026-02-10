CREATE TABLE "partners" (
	"id" serial PRIMARY KEY NOT NULL,
	"trading_name" text NOT NULL,
	"owner_name" text NOT NULL,
	"document" text NOT NULL,
	"coverage_area" geometry(MultiPolygon, 4326) NOT NULL,
	"address" geometry(point) NOT NULL,
	CONSTRAINT "partners_document_unique" UNIQUE("document")
);
