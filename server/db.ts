import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_db) {
    const url = process.env.RAILWAY_DATABASE_URL || process.env.DATABASE_URL;
    if (!url) {
      throw new Error("RAILWAY_DATABASE_URL ou DATABASE_URL est requis");
    }
    const pool = new Pool({ connectionString: url });
    _db = drizzle(pool, { schema });
  }
  return _db;
}
