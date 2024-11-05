import Database from "bun:sqlite";
import { drizzle as drizzleSqlite } from "drizzle-orm/bun-sqlite";

export function dbSqlite() {
  const sqlite = new Database(process.env.DATABASE_URL);
  return drizzleSqlite(sqlite);
}
