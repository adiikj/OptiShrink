import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { env, isProduction } from "../config/env.js";
import * as schema from "./schema.js";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: isProduction ? 20 : 5,
  ssl: env.DATABASE_URL.includes("sslmode=require") ? true : undefined,
});

export const db = drizzle(pool, { schema });

export async function checkDatabaseConnection(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("select 1");
  } finally {
    client.release();
  }
}

export async function closeDatabaseConnection(): Promise<void> {
  await pool.end();
}
