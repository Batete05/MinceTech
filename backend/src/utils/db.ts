import { db_url } from "@/utils/env";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";


const pool = new pg.Pool({
  connectionString: db_url,
});

export const db = drizzle(pool, {
  logger: true,
});


