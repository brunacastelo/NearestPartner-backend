# 📍 Nearest Partner API

A high-performance geospatial API built with **Fastify + Drizzle + PostgreSQL/PostGIS** to manage commercial partners and efficiently locate the best match based on geographic coordinates.

## 🎯 Overview

The system is designed to solve complex location-based routing by:
* **Validating** whether a point is inside a partner's coverage area.
* **Handling** overlapping coverage regions seamlessly.
* **Ranking** and returning the nearest partner when multiple matches exist.

## 🚀 Technologies

* **Node.js + TypeScript** — Runtime & type safety.
* **Fastify** — High-performance HTTP framework.
* **Drizzle ORM** — Type-safe, SQL-first ORM.
* **PostgreSQL + PostGIS** — Spatial database & geospatial queries.
* **Zod** — Request validation & schemas.

---

## 📁 Project Structure

```text
nearest-partner/
├── src/
│   ├── db/                 # Database configuration and schemas (Drizzle)
│   ├── app.ts              # Fastify configuration and plugins
│   └── server.ts           # Entry point (server initialization)
├── drizzle/                # Generated SQL migrations
├── .env                    # Environment variables (DATABASE_URL)
├── drizzle.config.ts       # Drizzle Kit configuration
├── package.json
└── tsconfig.json
```

Com certeza! Refinei a formatação para destacar as regras de negócio e a tabela de testes, garantindo que o seu README.md fique visualmente organizado e fácil de ler.

Aqui está o código Markdown:

Markdown
## 🗺️ Search Logic (Geofencing)

The API utilizes **PostGIS** to handle `MultiPolygon` data for the `coverageArea` and `Point` data for the partner's address. To ensure accuracy, the system follows a two-step filtering process:

### Business Rules
1.  **Coverage Check:** The user's coordinates must be contained within the partner's defined `coverageArea`. This is handled using the `ST_Contains` spatial function.
2.  **Proximity Sorting:** If a user is located in an intersection (covered by two or more partners), the system calculates the distance between the user's location and each partner's `address` point using `ST_Distance`. The partner with the shortest distance wins.



---

## 🧪 Validated Test Scenarios

The following scenarios are used to validate the search algorithm and ensure the business logic is robust:

| Location | Coordinates (Long, Lat) | Expected Result | Logic |
| :--- | :--- | :--- | :--- |
| **Zone North** | `-46.60, -23.49` | Partner A | Inside A's coverage, outside others. |
| **Zone South** | `-46.60, -23.56` | Partner B | Inside B's coverage, outside others. |
| **Intersection** | `-46.60, -23.525` | **Partner B** | Inside A and B. Distance to B is 0.015, to A is 0.025. **B is closer.** |
| **Zone West** | `-46.70, -23.50` | Partner C | Isolated coverage in the West. |
| **Out of Bounds** | `-46.00, -23.00` | `404 Not Found` | No geographic coverage available here. |

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone 
cd nearest-partner
```

### 2. Configure Environment Variables
Create a .env file in the root directory and add your connection string:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/nearest_partner_db
```
### 3. Install Dependencies
```bash
npm install
```

### 4. Run Migrations
Apply the schema to your PostGIS-enabled database:

```bash
npx drizzle-kit push:pg
```

### 5. Start Development Server
```bash
npm run dev
```